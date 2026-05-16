# Summary

Migrated the Rust lexical word-level checks into the TypeScript `words` family. Added `hedge-stacking`, `simplicity`, default simplicity-pair data, fixture coverage, manifest rows, and corpus comparison reports.

# Decisions Made

- Placed `hedge-stacking` and `simplicity` under `words` because both inspect word tokens rather than phrase collocations or syntax templates.
- Used Rust's default hedge list and threshold 2 because textlint rule options are not wired yet.
- Kept `simplicity` more precise than Rust output: Rust reports file-level failures without evidence rows, while textlint reports each matched complex word.

# Key Files

- `.plans/2026-05-13-004512-migrate-words-textlint.md`
- `.plans/2026-05-13-004928-words-rust-good-catches.md`
- `.plans/2026-05-13-004928-words-textlint-diff.md`
- `packages/textlint-rules/src/families/words/hedge-stacking.ts`
- `packages/textlint-rules/src/families/words/simplicity.ts`
- `packages/textlint-rules/src/families/words/data/simplicity-pairs.json`
- `behavior/fixtures/textlint-rules/words/family.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Corpus comparison: `hedge-stacking` exact parity; `simplicity` same 7 files with textlint reporting 9 word-level findings.

# Next Steps

- Continue with the next TypeScript taxonomy family migration.
