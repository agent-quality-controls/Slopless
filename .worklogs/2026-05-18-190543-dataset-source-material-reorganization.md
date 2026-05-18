# Summary

Separated external labeled data from application behavior fixtures. Fixture3 fixtures and golden output stayed under `behavior`, while source/training/evaluation data moved under `datasets/labeled`.

# Decisions Made

- Created `datasets/labeled` for academic slop, academic NLP, AI slop, plain-English, prose-linter lexicons, style guides, and writing corpus material.
- Kept reviewed implementation/skipped/deferred notes under `legacy/source-material/reviewed`.
- Kept raw source captures and extraction reports under `legacy/source-material/raw-provenance`.
- Left runtime rule data under `src/rules/**/data`.
- Added `datasets` to ESLint, Prettier, and CSpell ignores because external datasets are not app source code.
- Updated source-material and fixture coverage verifiers to use the new dataset and legacy paths.

# Key Files For Context

- `datasets/README.md`
- `datasets/INVENTORY.md`
- `legacy/source-material/INVENTORY.md`
- `.plans/2026-05-18-185457-dataset-source-material-reorganization.md`
- `.plans/2026-05-18-185457-dataset-source-material-reorganization.md.manifest.toml`
- `scripts/verify-dataset-source-reorganization.py`
- `scripts/verify-source-material.py`
- `scripts/verify-fixture-corpus-coverage.py`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`

# Verification

- `scripts/verify-all.sh`
- `scripts/fixture3.sh check --suite textlint-rules`
- `npm run validate`

# Next Steps

- Use `datasets/labeled` for model-data preparation.
- Derive specific dataset examples into `behavior/fixtures` only when they become behavior tests.
