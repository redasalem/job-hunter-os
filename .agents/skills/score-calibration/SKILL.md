---
name: score-calibration
description: Load when calibrating 1-10 job match scores against real interview callbacks in logs/applications-log.json and tuning scoring weights or min_match_score with owner approval.
---

# Veycraft Score Calibration

1. Read `AGENTS.md` and `skills/REGISTRY.md` first.
2. Follow `skills/17-score-calibration.md` to separate in-flight from decided outcomes, produce a band yield table and verdict (`separating`/`flat`/`inverted`/`insufficient`), and apply approved weight updates in `context/preferences.yaml`.
