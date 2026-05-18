# Dataset And Source Material Reorganization

## Goal

Separate labeled data from application behavior fixtures.

Application fixtures stay under `behavior/fixtures` and `behavior/golden`. Datasets move under `datasets/labeled` because they are training, evaluation, and future model material, not app behavior tests.

Reviewed source notes stay under `legacy/source-material` with an inventory that records whether each source was implemented, skipped, deferred, or kept only as provenance.

## Approach

1. Create `datasets/README.md` and `datasets/INVENTORY.md`.
2. Move label-bearing external data into `datasets/labeled`.
3. Keep Fixture3 fixtures and golden output untouched.
4. Move reviewed implementation/skipped/deferred notes under `legacy/source-material/reviewed`.
5. Move raw capture pages and extraction reports under `legacy/source-material/raw-provenance`.
6. Add `legacy/source-material/INVENTORY.md` explaining every top-level group and its implementation state.
7. Update source-material verifiers to check the new dataset paths.
8. Add a manifest verifier for this reorganization.

## Dataset Groups

- `datasets/labeled/academic-slop`
- `datasets/labeled/academic-nlp`
- `datasets/labeled/ai-slop`
- `datasets/labeled/plain-english`
- `datasets/labeled/prose-linter-lexicons`
- `datasets/labeled/style-guides`
- `datasets/labeled/writing-corpora`

## Legacy Groups

- `legacy/source-material/reviewed/implemented`
- `legacy/source-material/reviewed/skipped`
- `legacy/source-material/reviewed/deferred`
- `legacy/source-material/raw-provenance`

## Key Decisions

- Do not move `behavior/fixtures` or `behavior/golden`.
- Preserve raw provenance because the current source material is about 16 MB, so size is not a blocker.
- Keep copied rule data under `src/rules/**/data` where the product needs it at runtime.
- Treat lexicons as labeled datasets when the upstream source assigns a category such as cliche, wordiness, subjectivity, puffery, slop vocabulary, plain-English replacement, or tortured phrase.

## Files To Modify

- `datasets/README.md`
- `datasets/INVENTORY.md`
- `legacy/source-material/INVENTORY.md`
- `scripts/verify-source-material.py`
- `scripts/verify-dataset-source-reorganization.py`
- `scripts/verify-all.sh`
- `.plans/2026-05-18-185457-dataset-source-material-reorganization.md.manifest.toml`
