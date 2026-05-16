# Summary

Migrated the Rust flow checks `paragraph-length` and `word-repetition` into the TypeScript `metrics` family. Added the metrics registry, exports, everything preset wiring, behavior fixture coverage, and Rust/textlint corpus comparison reports.

# Decisions Made

- Placed both rules under `metrics` because they count paragraph-level properties and compare them to fixed thresholds.
- Count metrics against parsed paragraph text while reporting against the original paragraph range, so markdown markers and link syntax do not affect counts.
- Kept `Intl.Segmenter` for sentence splitting because `sentence-splitter` merged quoted prompt sequences and lost Rust findings.
- Split one syntactic fixture paragraph so metrics rules do not pollute that family fixture.

# Key Files

- `.plans/2026-05-13-005702-migrate-metrics-flow-textlint.md`
- `.plans/2026-05-13-010306-metrics-flow-rust-good-catches.md`
- `.plans/2026-05-13-010306-metrics-flow-textlint-diff.md`
- `packages/textlint-rules/src/families/metrics/paragraph-length.ts`
- `packages/textlint-rules/src/families/metrics/word-repetition.ts`
- `packages/textlint-rules/src/shared/text/sections.ts`
- `behavior/fixtures/textlint-rules/metrics/family.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Corpus comparison: Rust found 109 `paragraph-length` and 27 `word-repetition`; textlint found 112 `paragraph-length` and 27 `word-repetition`.

# Next Steps

- Continue migrating the next Rust-backed source checks into the TypeScript taxonomy.
