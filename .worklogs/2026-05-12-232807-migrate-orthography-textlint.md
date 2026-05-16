# Summary

Migrated the Rust orthography checks into the textlint rule package: smart quotes, sentence case, exclamation density, fake timestamps, and dramatic colons. Tightened em dash scanning to paragraph-level prose so it aligns with Rust block ownership better.

# Decisions Made

- Used `Intl.Segmenter` for sentence splitting instead of `sentence-splitter` output because it matches Rust ICU behavior more closely on the fixture corpus.
- Kept paragraph rules out of list and table parents because Rust style-signal checks ignore list and code blocks.
- Limited sentence-case to H1/H2 because the Rust document model only emits section headings for this check.
- Preserved colon-dramatic as a migrated rule even though it remains false-positive-prone; the diff report records the remaining textlint-only timestamp-shaped catches.

# Key Files

- `packages/textlint-rules/src/families/orthography/`
- `packages/textlint-rules/src/shared/text/sentences.ts`
- `packages/textlint-rules/src/shared/text/whitespace.ts`
- `behavior/fixtures/textlint-rules/orthography/family.md`
- `.plans/2026-05-12-232659-orthography-rust-good-catches.md`
- `.plans/2026-05-12-232659-orthography-textlint-diff.md`

# Verification

- `npm run validate` in `packages/textlint-rules`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Rust/textlint fixture comparison across 202 fixture files

# Next Steps

- Review whether `colon-dramatic` should stay in `everything` once presets split beyond the migration baseline.
