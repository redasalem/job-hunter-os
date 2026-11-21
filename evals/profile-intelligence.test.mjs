import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CLI = [
  process.env.JHO_CLI_PATH,
  path.join(ROOT, 'bin', 'cli.mjs'),
  path.join(os.homedir(), '.job-hunter-os', 'bin', 'cli.mjs'),
].find(p => p && fs.existsSync(p));
assert.ok(CLI, 'Could not locate bin/cli.mjs');

const engine = await import(pathToFileURL(path.join(path.dirname(CLI), 'profile-intelligence.mjs')).href);

const planSchema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas', 'profile-update-plan.schema.json'), 'utf8'));
const resumeSchema = JSON.parse(fs.readFileSync(path.join(ROOT, 'schemas', 'resume-data.schema.json'), 'utf8'));
const groundTruth = JSON.parse(fs.readFileSync(path.join(ROOT, 'evals', 'fixtures', 'ground-truth.json'), 'utf8'));
const skillText = fs.readFileSync(path.join(ROOT, 'skills', 'profile-intelligence-engine.md'), 'utf8');

const FACTS_CONFIG = {
  allowedMetrics: new Set(groundTruth.ground_truth_metrics.map(m => String(m).trim().toLowerCase())),
  forbiddenSkills: groundTruth.forbidden_skills,
};

function runCli(args, cwd = ROOT) {
  return spawnSync(process.execPath, [CLI, ...args], {
    cwd,
    encoding: 'utf8',
    env: { ...process.env, NO_COLOR: '1' },
  });
}

function makeValidPlan(overrides = {}) {
  return {
    schema_version: '1.0',
    plan_id: 'plan-linkedin-001',
    target_role: 'Senior Full-Stack Engineer',
    target_job_url: 'https://boards.greenhouse.io/cloudpayledger/jobs/70112',
    platform: 'linkedin',
    profile_url: 'https://www.linkedin.com/in/example-candidate',
    mode: 'draft_only',
    created_at: '2026-11-21T02:00:00Z',
    adapter: {
      platform_id: 'linkedin',
      capabilities: { read: true, draft: true, fill: true, save: true, verify: true },
      requires_approval: true,
      limitations: ['Live edit requires APPROVE'],
    },
    missing_facts: ['Kubernetes production years (not verified; excluded)'],
    skipped_unchanged: ['contact.email'],
    changes: [
      {
        section: 'intro',
        field: 'headline',
        action: 'replace',
        before: 'Software Engineer',
        after: 'Senior Full-Stack Engineer | TypeScript, Node.js, React, PostgreSQL | 38% faster payment webhooks',
        reason: 'Align headline with target backend/full-stack keywords and verified latency impact.',
        evidence: ['evals/fixtures/candidate-profile.md#L1-L12'],
        confidence: 0.96,
        requires_confirmation: false,
        fact_basis: 'verified',
        adapter_capability: 'save_and_verify_supported',
        verification_evidence: null,
        status: 'draft',
      },
    ],
    ...overrides,
  };
}

test('1. Schema: profile-update-plan & resume-data schemas enforce additive-only edits and valid structures', () => {
  assert.equal(planSchema.properties.schema_version.const, '1.0');
  assert.deepEqual(planSchema.$defs.change.properties.action.enum, ['add', 'replace']);
  assert.ok(!planSchema.$defs.change.properties.action.enum.includes('remove'));
  assert.deepEqual(planSchema.properties.mode.enum, ['draft_only', 'review', 'approved_apply']);
  assert.deepEqual(planSchema.$defs.change.properties.status.enum, [
    'draft',
    'needs_user_confirmation',
    'approved',
    'applied',
    'verified',
    'not_verified',
    'blocked',
    'needs_review',
  ]);

  // Extended universal profile schema preserves backward compatibility and adds provenance/platform fields
  for (const key of ['target_job_titles', 'career_objectives', 'publications', 'work_preferences', 'fact_provenance', 'platform_profiles']) {
    assert.ok(resumeSchema.properties[key], `Missing resume-data schema property: ${key}`);
  }
  assert.ok(resumeSchema.properties.work_history.items.properties.responsibilities);
  assert.ok(resumeSchema.properties.work_history.items.properties.achievements);
  assert.ok(resumeSchema.properties.work_history.items.properties.measurable_impact);

  const valid = engine.validateProfileUpdatePlan(makeValidPlan(), { factsConfig: FACTS_CONFIG });
  assert.equal(valid.valid, true, valid.errors.join('; '));

  // Reject destructive remove action
  const badRemove = makeValidPlan();
  badRemove.changes[0].action = 'remove';
  const removeRes = engine.validateProfileUpdatePlan(badRemove);
  assert.equal(removeRes.valid, false);
  assert.match(removeRes.errors.join('\n'), /not allowed|remove/i);

  // Reject invalid status & out-of-range confidence & extra property
  const badStruct = makeValidPlan({ extra_top_key: true });
  badStruct.changes[0].status = 'unknown_state';
  badStruct.changes[0].confidence = 1.5;
  badStruct.changes[0].evidence = [];
  const structRes = engine.validateProfileUpdatePlan(badStruct);
  assert.equal(structRes.valid, false);
  assert.ok(structRes.errors.length >= 4);
});

test('2. Fact integrity: blocks fabricated metrics/skills/slop and prevents promoting inferences without confirmation', () => {
  // Fabricated metric, forbidden skill, AI cliché, and em-dash must fail
  const hallucinated = makeValidPlan();
  hallucinated.changes[0].after = 'Spearheaded Kubernetes clusters — boosting revenue by 99%.';
  const halRes = engine.validateProfileUpdatePlan(hallucinated, { factsConfig: FACTS_CONFIG });
  assert.equal(halRes.valid, false);
  assert.match(halRes.errors.join('\n'), /unverified metric.*99%/i);
  assert.match(halRes.errors.join('\n'), /Kubernetes/i);
  assert.match(halRes.errors.join('\n'), /spearheaded/i);
  assert.match(halRes.errors.join('\n'), /em-dash/i);

  // Inferred claim cannot skip confirmation or move to approved/applied/verified
  const inferredAutoApprove = makeValidPlan({ mode: 'approved_apply' });
  inferredAutoApprove.changes[0].fact_basis = 'inferred';
  inferredAutoApprove.changes[0].requires_confirmation = false;
  inferredAutoApprove.changes[0].status = 'approved';
  const infRes = engine.validateProfileUpdatePlan(inferredAutoApprove);
  assert.equal(infRes.valid, false);
  assert.match(infRes.errors.join('\n'), /requires_confirmation must be true/i);
  assert.match(infRes.errors.join('\n'), /inferred claim cannot have status "approved"/i);

  // Profile vault provenance guard prevents duplicating inferred claims as verified_facts
  const badVault = {
    fact_provenance: {
      verified_facts: [{ claim: 'Led GraphQL migration', source: 'cv.md' }],
      inferred_info: [{ claim: 'Led GraphQL migration', basis: 'Mentioned API schema', requires_confirmation: true }],
    },
  };
  const vaultRes = engine.validateProfileVault(badVault);
  assert.equal(vaultRes.valid, false);
});

test('3. Safety: draft-first enforcement, adapter limitations, unknown-platform fallback, and workflow invariants', () => {
  // Draft-only plan cannot contain applied/verified statuses
  const draftApplied = makeValidPlan({ mode: 'draft_only' });
  draftApplied.changes[0].status = 'applied';
  assert.equal(engine.validateProfileUpdatePlan(draftApplied).valid, false);

  // Adapter contract enforces read/draft-only fallback on unknown platforms
  const unknownAdapter = engine.getPlatformAdapter('mystery-regional-board');
  assert.equal(unknownAdapter.platform_id, 'generic');
  assert.equal(unknownAdapter.unknown_platform_fallback, true);
  assert.equal(unknownAdapter.capabilities.read, true);
  assert.equal(unknownAdapter.capabilities.draft, true);
  assert.equal(unknownAdapter.capabilities.fill, false);
  assert.equal(unknownAdapter.capabilities.save, false);
  assert.equal(unknownAdapter.requires_approval, true);

  // Plan targeting an adapter without save support cannot mark applied
  const nonSavePlan = makeValidPlan({
    platform: 'mystery-regional-board',
    mode: 'approved_apply',
    adapter: {
      platform_id: 'generic',
      capabilities: { read: true, draft: true, fill: false, save: false, verify: false },
      requires_approval: true,
      limitations: ['Generic read/draft-only fallback'],
    },
  });
  nonSavePlan.changes[0].status = 'applied';
  const nonSaveRes = engine.validateProfileUpdatePlan(nonSavePlan);
  assert.equal(nonSaveRes.valid, false);
  assert.match(nonSaveRes.errors.join('\n'), /does not support save/i);

  for (const phrase of [
    'Never delete existing profile content',
    'Never invent employers, dates, titles, metrics',
    'Default to preview/draft',
    'Do not bypass authentication, CAPTCHA, MFA, rate limits',
    'Batch-fill',
    'fresh read-back',
  ]) {
    assert.ok(skillText.includes(phrase), `Missing skill invariant/workflow phrase: ${phrase}`);
  }
});

test('4. Efficiency: skips unchanged fields, consolidates single review, and avoids redundant snapshots', () => {
  const unchangedPlan = makeValidPlan();
  unchangedPlan.changes[0].before = 'Senior Full-Stack Engineer';
  unchangedPlan.changes[0].after = 'Senior Full-Stack Engineer';
  const unchRes = engine.validateProfileUpdatePlan(unchangedPlan);
  assert.equal(unchRes.valid, false);
  assert.match(unchRes.errors.join('\n'), /unchanged field/i);

  const reviewMd = engine.formatConsolidatedReview(makeValidPlan());
  assert.match(reviewMd, /Consolidated Profile Update Review/);
  assert.match(reviewMd, /Skipped Unchanged Fields/);
  assert.match(reviewMd, /contact\.email/);
  assert.match(reviewMd, /APPROVE ALL/);
  assert.ok(skillText.includes('18-condition-based-browser-waiting'));
  assert.ok(skillText.includes('19-on-demand-mcp-routing'));
});

test('5. Integration & regression: registry, manifest, wrappers, CLI route, and CLI verify work together', () => {
  const registry = fs.readFileSync(path.join(ROOT, 'skills', 'REGISTRY.md'), 'utf8');
  const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'skills', 'skills-manifest.json'), 'utf8'));
  const entry = manifest.skills.find(s => s.name === 'profile-intelligence-engine');

  assert.ok(entry, 'Missing profile-intelligence-engine in skills-manifest.json');
  assert.deepEqual(entry.requires_mcp, ['none']);
  assert.ok(entry.optional_mcp.includes('playwright'));
  assert.equal(entry.path, 'skills/profile-intelligence-engine.md');
  assert.ok(registry.includes('skills/profile-intelligence-engine.md'));
  assert.ok(fs.existsSync(path.join(ROOT, '.agents', 'skills', 'profile-intelligence-engine', 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(ROOT, '.agent', 'workflows', 'profile-update.md')));
  assert.ok(fs.existsSync(path.join(ROOT, 'commands', 'profile-update.md')));

  // Cross-platform profile prompts route to profile-intelligence-engine without forcing /setup
  for (const prompt of [
    '/profile-update',
    'Optimize my professional profile.',
    'Update my profile for this job.',
    'Sync my career profile across platforms.',
    'Improve my headline and About section.',
    'Tailor my profile for a target role.',
    'Review my professional profile.',
    'Update my job board profiles.',
  ]) {
    const res = runCli(['route', prompt, '--json']);
    assert.equal(res.status, 0, `route failed for "${prompt}": ${res.stderr}`);
    const parsed = JSON.parse(res.stdout);
    assert.ok(parsed.skills.includes('profile-intelligence-engine'), `Missing profile-intelligence-engine for "${prompt}"`);
    assert.match(parsed.readiness, /task-specific/i);
  }

  // Regression check: LinkedIn-specific routes keep linkedin-growth while also surfacing profile-intelligence-engine
  const liRes = runCli(['route', 'Improve my LinkedIn headline and About section.', '--json']);
  assert.equal(liRes.status, 0);
  const liParsed = JSON.parse(liRes.stdout);
  assert.equal(liParsed.intent, 'linkedin-profile');
  assert.ok(liParsed.skills.includes('linkedin-growth'));
  assert.ok(liParsed.skills.includes('profile-intelligence-engine'));

  // CLI verify validates Profile Update Plan JSON deterministically
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'jho-pie-verify-'));
  try {
    const goodPath = path.join(tmp, 'good-plan.json');
    fs.writeFileSync(goodPath, JSON.stringify(makeValidPlan(), null, 2));
    const goodRun = runCli(['verify', goodPath, '--facts', path.join(ROOT, 'evals', 'fixtures', 'ground-truth.json')]);
    assert.equal(goodRun.status, 0, goodRun.stdout + goodRun.stderr);

    const badPlan = makeValidPlan();
    badPlan.changes[0].after = 'Built Kubernetes pipelines reducing cost by 99%.';
    const badPath = path.join(tmp, 'bad-plan.json');
    fs.writeFileSync(badPath, JSON.stringify(badPlan, null, 2));
    const badRun = runCli(['verify', badPath, '--facts', path.join(ROOT, 'evals', 'fixtures', 'ground-truth.json')]);
    assert.notEqual(badRun.status, 0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('6. Verification outcomes: requires fresh read-back evidence for verified and summarizes all 7 lifecycle outcomes', () => {
  // Cannot claim verified without verification_evidence
  const unbackedVerified = makeValidPlan({ mode: 'approved_apply' });
  unbackedVerified.changes[0].status = 'verified';
  unbackedVerified.changes[0].verification_evidence = '';
  const unverRes = engine.validateProfileUpdatePlan(unbackedVerified);
  assert.equal(unverRes.valid, false);
  assert.match(unverRes.errors.join('\n'), /requires non-empty verification_evidence/i);

  // Valid verified change passes
  const backedVerified = makeValidPlan({ mode: 'approved_apply' });
  backedVerified.changes[0].status = 'verified';
  backedVerified.changes[0].verification_evidence = 'browser_snapshot readback 2026-11-21T02:05:00Z confirmed headline text';
  assert.equal(engine.validateProfileUpdatePlan(backedVerified, { factsConfig: FACTS_CONFIG }).valid, true);

  // Outcome summaries for all 7 truthful lifecycle states
  const makeTwo = (s1, s2) => ({
    changes: [
      { ...makeValidPlan().changes[0], status: s1 },
      { ...makeValidPlan().changes[0], field: 'about', status: s2 },
    ],
  });
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('draft', 'draft')).outcome, 'prepared');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('approved', 'approved')).outcome, 'approved');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('applied', 'applied')).outcome, 'applied');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('verified', 'verified')).outcome, 'verified');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('verified', 'blocked')).outcome, 'partially_applied');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('blocked', 'blocked')).outcome, 'blocked');
  assert.equal(engine.summarizeVerificationOutcome(makeTwo('not_verified', 'not_verified')).outcome, 'not_verified');
});
