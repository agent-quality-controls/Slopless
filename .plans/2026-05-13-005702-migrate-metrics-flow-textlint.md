# Goal

Migrate the Rust `flow` source checks into the TypeScript `metrics` family.

# Scope

Rust source checks:

- `paragraph-length`
- `word-repetition`

Textlint target files:

- `packages/textlint-rules/src/families/metrics/paragraph-length.ts`
- `packages/textlint-rules/src/families/metrics/word-repetition.ts`

# Approach

1. Add manifest rows for both rules under `metrics`.
2. Add a metrics registry and export it from package index.
3. Add paragraph traversal support to the shared section helper.
4. Implement `paragraph-length` with Rust default max 6 sentences.
5. Implement `word-repetition` with Rust default max 5 and default English exclusions.
6. Extend the metrics replay fixture with positive and negative examples.
7. Run Rust and textlint on the fixture corpus for both checks.
8. Write context-bearing good-catch and diff reports.
9. Run validation, behavior verify, manifest verify, then commit.

# Key Decisions

- The destination family is `metrics` because both rules produce paragraph-level counts and compare them to thresholds.
- The Rust source crate is `flow`; that is provenance only.
- This slice does not migrate readability formulas yet.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/src/shared/text/sections.ts`
- `packages/textlint-rules/src/families/metrics/paragraph-length.ts`
- `packages/textlint-rules/src/families/metrics/word-repetition.ts`
- `packages/textlint-rules/src/registries/metrics.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `behavior/fixtures/textlint-rules/metrics/family.md`
- `behavior/fixtures/textlint-rules/metrics/fixture.toml`
- `behavior/baselines/textlint-rules/metrics.json`
- `.plans/*metrics-flow*good-catches.md`
- `.plans/*metrics-flow*diff.md`
