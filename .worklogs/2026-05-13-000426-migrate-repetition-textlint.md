# Summary

Migrated the Rust repetition-shaped cadence checks into the textlint package: `fragment-stacking`, `triple-repeat`, and `demonstrative-emphasis`. Added behavior fixture coverage, manifest rows, corpus comparison reports, and a clean registry layer so root exports do not deep-import every rule.

# Decisions Made

- Placed all three rules under `syntactic-patterns/repetition` because each rule depends on sentence windows or repeated sentence templates.
- Moved package rule aggregation into `src/registries` because putting `index.ts` files inside textlint `--rulesdir` directories makes textlint try to load them as rules.
- Made `npm run build` clean `dist` before compiling so removed rule files do not survive as stale compiled rules.
- Extended sentence splitting to handle textlint hard-break compaction like `version.If`, which otherwise missed Rust triple-repeat behavior.

# Key Files

- `packages/textlint-rules/src/families/syntactic-patterns/repetition/fragment-stacking.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/triple-repeat.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/repetition/demonstrative-emphasis.ts`
- `packages/textlint-rules/src/shared/text/sentences.ts`
- `packages/textlint-rules/src/registries/`
- `.plans/2026-05-13-000248-repetition-rust-good-catches.md`
- `.plans/2026-05-13-000248-repetition-textlint-diff.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Rust/textlint corpus comparison across 202 fixture files: 51 `fragment-stacking`, 101 `triple-repeat`, 80 `demonstrative-emphasis` on both sides.

# Next Steps

- Build master fixtures from the context-bearing repetition catch report when consolidating golden behavior fixtures.
