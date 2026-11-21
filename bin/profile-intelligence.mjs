// Zero-dependency Profile Intelligence Engine validator, platform adapters & review utilities.
// Uses Node.js built-in capabilities only.

export const ALLOWED_PLAN_MODES = Object.freeze(['draft_only', 'review', 'approved_apply']);
export const ALLOWED_CHANGE_ACTIONS = Object.freeze(['add', 'replace']);
export const ALLOWED_CHANGE_STATUSES = Object.freeze([
  'draft',
  'needs_user_confirmation',
  'approved',
  'applied',
  'verified',
  'not_verified',
  'blocked',
  'needs_review',
]);
export const ALLOWED_FACT_BASES = Object.freeze([
  'verified',
  'user_confirmed',
  'inferred',
  'platform_specific',
]);
export const ALLOWED_ADAPTER_CAPABILITIES = Object.freeze([
  'read_only',
  'draft_only',
  'fill_supported',
  'save_and_verify_supported',
]);
export const ALLOWED_VERIFICATION_OUTCOMES = Object.freeze([
  'prepared',
  'approved',
  'applied',
  'verified',
  'partially_applied',
  'blocked',
  'not_verified',
]);

export const DEFAULT_BANNED_CLICHES = Object.freeze([
  'delve',
  'testament',
  'tapestry',
  'spearheaded',
  'synergy',
  'thrilled to apply',
  'moreover',
  'furthermore',
  'orchestrated',
  'hit the ground running',
  'results-driven',
  'passionate about',
  'seasoned professional',
  'dynamic team player',
  'fast-paced environment',
  'leveraged',
  'proven track record',
  'deeply excited',
]);

export const PLATFORM_ADAPTERS = Object.freeze({
  linkedin: Object.freeze({
    platform_id: 'linkedin',
    display_name: 'LinkedIn',
    supported_sections: ['headline', 'about', 'experience', 'projects', 'skills', 'featured', 'open_to_work'],
    capabilities: Object.freeze({ read: true, draft: true, fill: true, save: true, verify: true }),
    required_permissions: ['signed_in_browser_session', 'explicit_owner_approve'],
    requires_approval: true,
    limitations: [
      'Live edits require an authenticated LinkedIn session and explicit APPROVE per section or batch.',
      'Pinned Top Skills reordering may require manual UI confirmation on some LinkedIn layouts.',
    ],
    field_mappings: {
      headline: ['textbox "Headline"', 'Headline'],
      about: ['textbox "About"', 'Summary'],
      experience: ['Description', 'Experience'],
      projects: ['Project name', 'Description'],
      skills: ['Skill', 'Add skill'],
    },
  }),
  wellfound: Object.freeze({
    platform_id: 'wellfound',
    display_name: 'Wellfound (AngelList Talent)',
    supported_sections: ['bio', 'headline', 'experience', 'skills', 'links', 'preferences'],
    capabilities: Object.freeze({ read: true, draft: true, fill: true, save: false, verify: true }),
    required_permissions: ['signed_in_browser_session', 'explicit_owner_approve'],
    requires_approval: true,
    limitations: [
      'Live saving requires explicit owner approval; defaults to draft/fill review.',
    ],
    field_mappings: {
      headline: ['Headline', 'Role'],
      bio: ['Bio', 'Summary'],
      links: ['LinkedIn', 'GitHub', 'Portfolio'],
    },
  }),
  ats: Object.freeze({
    platform_id: 'ats',
    display_name: 'Applicant Tracking Systems (Greenhouse / Lever / Ashby / Workable)',
    supported_sections: ['contact', 'resume', 'links', 'experience', 'custom_questions', 'eeo_gdpr'],
    capabilities: Object.freeze({ read: true, draft: true, fill: true, save: false, verify: true }),
    required_permissions: ['authorized_browser_session', 'explicit_owner_approve'],
    requires_approval: true,
    limitations: [
      'Delegates form execution to skills/04-fill-and-apply.md and skills/platforms/ats-engines.md.',
      'Account-gated portals (Workday / Taleo) default to manual_apply + needs_review.',
    ],
    field_mappings: {
      contact: ['Full name', 'First name', 'Last name', 'Email', 'Phone'],
      links: ['LinkedIn URL', 'GitHub URL', 'Portfolio URL', 'Website'],
    },
  }),
  job_boards: Object.freeze({
    platform_id: 'job_boards',
    display_name: 'Job Boards (Wuzzuf / Bayt / Indeed / Glassdoor / Remote Boards)',
    supported_sections: ['headline', 'summary', 'experience', 'skills', 'preferences'],
    capabilities: Object.freeze({ read: true, draft: true, fill: true, save: false, verify: false }),
    required_permissions: ['signed_in_browser_session', 'explicit_owner_approve'],
    requires_approval: true,
    limitations: [
      'Cloudflare or anti-bot walls trigger immediate halt and draft-only manual fallback.',
    ],
    field_mappings: {
      headline: ['Job Title', 'Headline'],
      summary: ['Career Objective', 'Summary', 'About Me'],
    },
  }),
  portfolio: Object.freeze({
    platform_id: 'portfolio',
    display_name: 'Portfolio & GitHub Profiles',
    supported_sections: ['bio', 'readme', 'projects', 'links'],
    capabilities: Object.freeze({ read: true, draft: true, fill: false, save: false, verify: true }),
    required_permissions: ['public_read_or_explicit_repo_write_approval'],
    requires_approval: true,
    limitations: [
      'Audits live links and drafts bio/README improvements without mutating remote repositories.',
    ],
    field_mappings: {
      bio: ['Bio', 'Tagline'],
      projects: ['Project Title', 'Description', 'Live URL'],
    },
  }),
  generic: Object.freeze({
    platform_id: 'generic',
    display_name: 'Generic / Unknown Web Profile',
    supported_sections: ['headline', 'summary', 'experience', 'skills', 'links'],
    capabilities: Object.freeze({ read: true, draft: true, fill: false, save: false, verify: false }),
    required_permissions: ['explicit_owner_approve'],
    requires_approval: true,
    limitations: [
      'Unknown platform fallback: read and draft-only preview; never assumes fill or save support.',
    ],
    field_mappings: {},
  }),
});

const PLATFORM_ALIASES = {
  linkedin: 'linkedin',
  wellfound: 'wellfound',
  angellist: 'wellfound',
  greenhouse: 'ats',
  lever: 'ats',
  ashby: 'ats',
  workable: 'ats',
  smartrecruiters: 'ats',
  breezyhr: 'ats',
  ats: 'ats',
  indeed: 'job_boards',
  glassdoor: 'job_boards',
  wuzzuf: 'job_boards',
  bayt: 'job_boards',
  remoteok: 'job_boards',
  job_boards: 'job_boards',
  github: 'portfolio',
  portfolio: 'portfolio',
};

export function getPlatformAdapter(platformId) {
  const key = String(platformId || '').trim().toLowerCase();
  const resolved = PLATFORM_ALIASES[key] || (PLATFORM_ADAPTERS[key] ? key : 'generic');
  const base = PLATFORM_ADAPTERS[resolved];
  return {
    ...base,
    unknown_platform_fallback: resolved === 'generic' && key !== 'generic',
  };
}

function isPlainObject(v) {
  return Boolean(v) && typeof v === 'object' && !Array.isArray(v);
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildWordRegex(term) {
  const escaped = escapeRegExp(term);
  const left = /^[A-Za-z0-9_]/.test(term) ? '(?<![A-Za-z0-9_])' : '(?<!\\.)';
  const right = /[A-Za-z0-9_]$/.test(term) ? '(?![A-Za-z0-9_])' : '(?![A-Za-z0-9_+])';
  return new RegExp(`${left}${escaped}${right}`, 'i');
}

const PLAN_ALLOWED_KEYS = new Set([
  'schema_version',
  'plan_id',
  'target_role',
  'target_job_url',
  'platform',
  'profile_url',
  'mode',
  'created_at',
  'adapter',
  'missing_facts',
  'skipped_unchanged',
  'verification_summary',
  'changes',
]);

const CHANGE_ALLOWED_KEYS = new Set([
  'section',
  'field',
  'action',
  'before',
  'after',
  'reason',
  'evidence',
  'confidence',
  'requires_confirmation',
  'fact_basis',
  'adapter_capability',
  'verification_evidence',
  'status',
]);

const METRIC_TOKEN_RE = /(?<![A-Za-z0-9_])\$?\d[\d,]*(?:\.\d+)?(?:\s*(?:%|k|m|b|x|ms|sec|seconds|min|minutes|hrs|hours|days|weeks|months|years)\b|%|[KMBX]\b|\+)?/gi;

export function validateProfileUpdatePlan(plan, { factsConfig = null, bannedCliches = DEFAULT_BANNED_CLICHES } = {}) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(plan)) {
    return { valid: false, errors: ['Profile update plan root must be a JSON object.'], warnings };
  }

  for (const k of Object.keys(plan)) {
    if (!PLAN_ALLOWED_KEYS.has(k)) {
      errors.push(`Unexpected top-level property "${k}" in profile update plan.`);
    }
  }

  if (plan.schema_version !== '1.0') {
    errors.push(`schema_version must be "1.0" (got ${JSON.stringify(plan.schema_version)}).`);
  }
  for (const reqKey of ['target_role', 'platform']) {
    if (typeof plan[reqKey] !== 'string' || !plan[reqKey].trim()) {
      errors.push(`${reqKey} must be a non-empty string.`);
    }
  }
  if (!ALLOWED_PLAN_MODES.includes(plan.mode)) {
    errors.push(`mode must be one of ${ALLOWED_PLAN_MODES.join(', ')} (got ${JSON.stringify(plan.mode)}).`);
  }
  if (!Array.isArray(plan.changes)) {
    errors.push('changes must be an array.');
    return { valid: false, errors, warnings };
  }

  if (plan.adapter !== undefined) {
    if (!isPlainObject(plan.adapter)) {
      errors.push('adapter must be an object when provided.');
    } else {
      if (typeof plan.adapter.platform_id !== 'string' || !plan.adapter.platform_id.trim()) {
        errors.push('adapter.platform_id must be a non-empty string.');
      }
      if (!isPlainObject(plan.adapter.capabilities)) {
        errors.push('adapter.capabilities must be an object.');
      } else {
        for (const cap of ['read', 'draft', 'fill', 'save', 'verify']) {
          if (typeof plan.adapter.capabilities[cap] !== 'boolean') {
            errors.push(`adapter.capabilities.${cap} must be a boolean.`);
          }
        }
      }
      if (typeof plan.adapter.requires_approval !== 'boolean') {
        errors.push('adapter.requires_approval must be a boolean.');
      }
    }
  }

  const adapterAllowsSave = isPlainObject(plan.adapter?.capabilities) ? plan.adapter.capabilities.save : null;

  plan.changes.forEach((ch, idx) => {
    const label = `changes[${idx}]`;
    if (!isPlainObject(ch)) {
      errors.push(`${label} must be an object.`);
      return;
    }
    for (const k of Object.keys(ch)) {
      if (!CHANGE_ALLOWED_KEYS.has(k)) {
        errors.push(`${label}: unexpected property "${k}".`);
      }
    }
    for (const reqStr of ['section', 'field', 'after', 'reason']) {
      if (typeof ch[reqStr] !== 'string' || !ch[reqStr].trim()) {
        errors.push(`${label}.${reqStr} must be a non-empty string.`);
      }
    }
    if (ch.before !== null && typeof ch.before !== 'string') {
      errors.push(`${label}.before must be a string or null.`);
    }
    if (!ALLOWED_CHANGE_ACTIONS.includes(ch.action)) {
      errors.push(`${label}.action "${ch.action}" is not allowed; only ${ALLOWED_CHANGE_ACTIONS.join('/')} are supported (destructive remove is forbidden).`);
    }
    if (!Array.isArray(ch.evidence) || ch.evidence.length === 0 || ch.evidence.some(e => typeof e !== 'string' || !e.trim())) {
      errors.push(`${label}.evidence must be a non-empty array of non-empty strings.`);
    }
    if (typeof ch.confidence !== 'number' || Number.isNaN(ch.confidence) || ch.confidence < 0 || ch.confidence > 1) {
      errors.push(`${label}.confidence must be a number between 0 and 1.`);
    }
    if (typeof ch.requires_confirmation !== 'boolean') {
      errors.push(`${label}.requires_confirmation must be a boolean.`);
    }
    if (!ALLOWED_FACT_BASES.includes(ch.fact_basis)) {
      errors.push(`${label}.fact_basis must be one of ${ALLOWED_FACT_BASES.join(', ')}.`);
    }
    if (ch.adapter_capability !== undefined && !ALLOWED_ADAPTER_CAPABILITIES.includes(ch.adapter_capability)) {
      errors.push(`${label}.adapter_capability must be one of ${ALLOWED_ADAPTER_CAPABILITIES.join(', ')}.`);
    }
    if (!ALLOWED_CHANGE_STATUSES.includes(ch.status)) {
      errors.push(`${label}.status "${ch.status}" is invalid.`);
    }

    // Fact integrity: inferred claims cannot bypass confirmation or reach live states
    if (ch.fact_basis === 'inferred') {
      if (ch.requires_confirmation !== true) {
        errors.push(`${label}: inferred claim requires_confirmation must be true.`);
      }
      if (ch.status === 'approved' || ch.status === 'applied' || ch.status === 'verified') {
        errors.push(`${label}: inferred claim cannot have status "${ch.status}" without user confirmation.`);
      }
    }

    // Draft-first safety
    if (plan.mode === 'draft_only' && (ch.status === 'applied' || ch.status === 'verified')) {
      errors.push(`${label}: mode "draft_only" cannot contain status "${ch.status}".`);
    }

    // Adapter save capability guard
    if (adapterAllowsSave === false && (ch.status === 'applied' || ch.status === 'verified')) {
      errors.push(`${label}: platform adapter does not support save; status "${ch.status}" is unauthorized.`);
    }

    // Truthful verification guard
    if (ch.status === 'verified' && (typeof ch.verification_evidence !== 'string' || !ch.verification_evidence.trim())) {
      errors.push(`${label}: status "verified" requires non-empty verification_evidence from a fresh read-back.`);
    }

    // Efficiency: skip unchanged fields instead of emitting no-op edits
    if (ch.action === 'replace' && typeof ch.before === 'string' && typeof ch.after === 'string' && ch.before.trim() === ch.after.trim()) {
      errors.push(`${label}: unchanged field ("before" equals "after") must be skipped into skipped_unchanged instead of planned as a change.`);
    }

    // Hygiene & anti-hallucination checks on proposed text
    if (typeof ch.after === 'string') {
      if (/\{\{[A-Za-z0-9_]+\}\}/.test(ch.after)) {
        errors.push(`${label}.after contains unresolved template placeholder.`);
      }
      if (ch.after.includes('—')) {
        errors.push(`${label}.after contains prose em-dash (—).`);
      }
      const foundCliches = bannedCliches.filter(cl => buildWordRegex(cl).test(ch.after));
      if (foundCliches.length > 0) {
        errors.push(`${label}.after contains banned AI cliché(s): ${foundCliches.join(', ')}.`);
      }
      if (factsConfig) {
        const metrics = ch.after.match(METRIC_TOKEN_RE) || [];
        const unverified = metrics.filter(m => !factsConfig.allowedMetrics.has(m.trim().toLowerCase()));
        if (unverified.length > 0) {
          errors.push(`${label}.after contains unverified metric(s): ${[...new Set(unverified)].join(', ')}.`);
        }
        const forbidden = (factsConfig.forbiddenSkills || []).filter(sk => buildWordRegex(sk).test(ch.after));
        if (forbidden.length > 0) {
          errors.push(`${label}.after claims forbidden/unverified skill(s): ${forbidden.join(', ')}.`);
        }
      }
    }
  });

  if (plan.verification_summary !== undefined) {
    const vs = plan.verification_summary;
    if (!isPlainObject(vs)) {
      errors.push('verification_summary must be an object.');
    } else if (!ALLOWED_VERIFICATION_OUTCOMES.includes(vs.outcome)) {
      errors.push(`verification_summary.outcome "${vs.outcome}" is invalid.`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateProfileVault(profileData) {
  const errors = [];
  const warnings = [];
  if (!isPlainObject(profileData)) {
    return { valid: false, errors: ['Profile data must be an object.'], warnings };
  }
  const prov = profileData.fact_provenance;
  if (prov !== undefined) {
    if (!isPlainObject(prov)) {
      errors.push('fact_provenance must be an object.');
    } else {
      const verifiedClaims = new Set(
        (Array.isArray(prov.verified_facts) ? prov.verified_facts : [])
          .map(item => String(item?.claim || '').trim().toLowerCase())
          .filter(Boolean),
      );
      const inferred = Array.isArray(prov.inferred_info) ? prov.inferred_info : [];
      inferred.forEach((item, idx) => {
        if (!isPlainObject(item) || typeof item.claim !== 'string' || !item.claim.trim()) {
          errors.push(`fact_provenance.inferred_info[${idx}] must include a non-empty claim.`);
          return;
        }
        if (item.requires_confirmation !== true) {
          errors.push(`fact_provenance.inferred_info[${idx}] must keep requires_confirmation: true.`);
        }
        if (verifiedClaims.has(item.claim.trim().toLowerCase())) {
          errors.push(`fact_provenance.inferred_info[${idx}] ("${item.claim}") cannot be simultaneously listed in verified_facts without removing from inferred_info after confirmation.`);
        }
      });
    }
  }
  return { valid: errors.length === 0, errors, warnings };
}

export function formatConsolidatedReview(plan) {
  const escapeCell = v => String(v ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
  const lines = [
    `# Consolidated Profile Update Review — ${plan.platform} (${plan.target_role})`,
    '',
    `- **Mode:** \`${plan.mode}\` (draft-first; no live writes until approved)`,
    `- **Changes Planned:** ${Array.isArray(plan.changes) ? plan.changes.length : 0}`,
    `- **Skipped Unchanged:** ${Array.isArray(plan.skipped_unchanged) ? plan.skipped_unchanged.length : 0}`,
    '',
    '| # | Section | Field | Action | Before | After | Reason | Evidence | Confidence | Confirm? | Status |',
    '|---|---|---|---|---|---|---|---|---|---|---|',
  ];

  (plan.changes || []).forEach((ch, idx) => {
    lines.push(
      `| ${idx + 1} | ${escapeCell(ch.section)} | ${escapeCell(ch.field)} | \`${ch.action}\` | ${escapeCell(ch.before ?? '(empty)')} | ${escapeCell(ch.after)} | ${escapeCell(ch.reason)} | ${escapeCell((ch.evidence || []).join('; '))} | ${ch.confidence} | ${ch.requires_confirmation ? 'Yes' : 'No'} | \`${ch.status}\` |`,
    );
  });

  if (Array.isArray(plan.missing_facts) && plan.missing_facts.length > 0) {
    lines.push('', '## Missing Facts Requiring Confirmation', ...plan.missing_facts.map(m => `- ${m}`));
  }
  if (Array.isArray(plan.skipped_unchanged) && plan.skipped_unchanged.length > 0) {
    lines.push('', '## Skipped Unchanged Fields', ...plan.skipped_unchanged.map(s => `- ${s}`));
  }
  lines.push(
    '',
    '## Approval Options',
    '- Reply `APPROVE ALL` to authorize approved batch execution, `REJECT ALL` to discard, or specify item numbers (e.g., `APPROVE 1,3 / REJECT 2`).',
  );
  return lines.join('\n');
}

export function summarizeVerificationOutcome(plan) {
  const changes = Array.isArray(plan?.changes) ? plan.changes : [];
  const total = changes.length;
  const counts = {
    verified: 0,
    applied: 0,
    approved: 0,
    blocked: 0,
    not_verified: 0,
    needs_review: 0,
    draft: 0,
    needs_user_confirmation: 0,
  };
  for (const ch of changes) {
    if (counts[ch?.status] !== undefined) counts[ch.status]++;
  }

  let outcome = 'prepared';
  if (total > 0) {
    if (counts.verified === total) outcome = 'verified';
    else if (counts.blocked === total) outcome = 'blocked';
    else if (counts.applied === total) outcome = 'applied';
    else if (counts.approved === total) outcome = 'approved';
    else if (counts.verified > 0 || counts.applied > 0) {
      if (counts.not_verified > 0 && counts.verified === 0 && counts.applied === 0) outcome = 'not_verified';
      else if (counts.applied > 0 && counts.verified === 0 && counts.blocked === 0 && counts.not_verified === 0) outcome = 'applied';
      else outcome = 'partially_applied';
    } else if (counts.not_verified > 0) outcome = 'not_verified';
    else if (counts.blocked > 0) outcome = 'blocked';
    else if (counts.approved > 0) outcome = 'approved';
  }

  return {
    outcome,
    verified_count: counts.verified,
    applied_count: counts.applied,
    blocked_count: counts.blocked,
    not_verified_count: counts.not_verified,
    total_changes: total,
  };
}
