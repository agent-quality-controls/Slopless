# Goal

Migrate the Rust readability source checks into the TypeScript `metrics` family, except `markdown-layout`, which is explicitly skipped for now.

# Scope

Rust readability source checks:

- `flesch-kincaid`
- `gunning-fog`
- `coleman-liau`
- `avg-sentence-length`

Skipped source family:

- `markdown-layout`: skipped by current decision. Do not migrate document-policy checks in this slice.

# Dependency Decision

Use `@lunarisapp/readability` for readability formulas.

Reasons:

- Published in March 2026.
- MIT license.
- TypeScript declarations included.
- Covers Flesch Reading Ease, Gunning Fog, and Coleman-Liau.
- Smaller and more current than `retext-readability`, `flesch`, `gunning-fog`, and `coleman-liau`.

Do not use `retext-readability` for this slice. It is still forbidden in the manifest.

# Approach

1. Add `@lunarisapp/readability` as a runtime dependency and manifest dependency.
2. Add manifest rows for the four readability rules under `metrics`.
3. Implement shared document prose extraction for readability checks using existing parsed paragraph text.
4. Implement `flesch-kincaid` as Flesch Reading Ease with minimum 61, calibrated to preserve Rust corpus failures with the package scorer.
5. Implement `gunning-fog` with maximum 12, calibrated to preserve Rust corpus failures with the package scorer.
6. Implement `coleman-liau` with maximum 12, calibrated to preserve Rust corpus failures with the package scorer.
7. Implement `avg-sentence-length` with maximum 24 using existing sentence/token helpers.
8. Extend the metrics behavior fixture with positive and negative readability examples.
9. Run Rust and textlint on the fixture corpus for these four checks.
10. Write context-bearing good-catch and diff reports.
11. Run package validation, behavior verify, manifest verify, write worklog, commit, push.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/package-lock.json`
- `packages/textlint-rules/cspell.config.json`
- `packages/textlint-rules/eslint.config.js`
- `packages/textlint-rules/src/families/metrics/flesch-kincaid.ts`
- `packages/textlint-rules/src/families/metrics/gunning-fog.ts`
- `packages/textlint-rules/src/families/metrics/coleman-liau.ts`
- `packages/textlint-rules/src/families/metrics/avg-sentence-length.ts`
- `packages/textlint-rules/src/registries/metrics.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `behavior/fixtures/textlint-rules/metrics/family.md`
- `behavior/fixtures/textlint-rules/metrics/fixture.toml`
- `behavior/baselines/textlint-rules/metrics.json`
- `.plans/*readability-metrics*good-catches.md`
- `.plans/*readability-metrics*diff.md`
