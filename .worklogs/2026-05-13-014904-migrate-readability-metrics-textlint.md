# Summary

Migrated the Rust readability checks into the TypeScript `metrics` family. Added `@lunarisapp/readability`, four document-level metric rules, metrics fixture coverage, skipped-layout documentation, and Rust/textlint corpus comparison reports.

# Decisions Made

- Used `@lunarisapp/readability` because it is MIT licensed, typed, published in March 2026, and covers the readability formulas we need.
- Kept `retext-readability` forbidden because it is older and brings a runner-shaped dependency we are not using here.
- Calibrated package-based thresholds to preserve every Rust readability corpus failure: Flesch minimum 61, Gunning Fog maximum 12, Coleman-Liau maximum 12, average sentence length maximum 24.
- Changed `import-x/no-cycle` to ignore external modules because the new package exposes `main` and `module` fields without an `exports` map, which triggers an import-x resolver failure during external cycle traversal.
- Kept `markdown-layout` skipped and made inactive-family fixtures readability-safe instead of accepting cross-family readability noise in their baselines.

# Key Files

- `.plans/2026-05-13-012735-migrate-readability-metrics-textlint.md`
- `.plans/2026-05-13-012735-readability-metrics-rust-good-catches.md`
- `.plans/2026-05-13-012735-readability-metrics-textlint-diff.md`
- `packages/textlint-rules/src/families/metrics/flesch-kincaid.ts`
- `packages/textlint-rules/src/families/metrics/gunning-fog.ts`
- `packages/textlint-rules/src/families/metrics/coleman-liau.ts`
- `packages/textlint-rules/src/families/metrics/avg-sentence-length.ts`
- `packages/textlint-rules/src/shared/text/document.ts`
- `behavior/fixtures/textlint-rules/metrics/family.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Corpus comparison: Rust found 127 `flesch-kincaid`, 106 `gunning-fog`, 79 `coleman-liau`, and 34 `avg-sentence-length`; textlint found 130, 111, 91, and 34 respectively, with 0 Rust-only failures.

# Next Steps

- Continue with the next Rust-backed non-layout source checks.
