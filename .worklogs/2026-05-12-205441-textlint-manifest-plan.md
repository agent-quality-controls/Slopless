# Textlint manifest plan

## Summary

Created the textlint migration taxonomy, implementation plan, manifest, and deterministic verifier scripts. The plan now uses manifest-driven development and golden replay fixtures instead of TDD-style rule assertions.

## Decisions Made

- Added `@prosesmasher/textlint-rules` as the package boundary instead of one package per preset or family.
- Required G3TS for the TypeScript package.
- Required ESLint guardrails to ban regex in rule source.
- Replaced unit/integration rule behavior tests with family-level golden replay fixtures.
- Added manifest verification as the implementation checklist.

## Key Files

- `.plans/2026-05-12-180446-textlint-rule-taxonomy.md`
- `.plans/2026-05-12-203442-textlint-implementation-plan.md`
- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `scripts/verify-textlint-implementation-manifest.py`
- `scripts/verify-all.sh`

## Next Steps

- Scaffold `packages/textlint-rules`.
- Add the smallest textlint rule package integration.
- Run textlint against a fixture and compare the output shape.
