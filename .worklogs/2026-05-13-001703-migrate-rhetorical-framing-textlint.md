# Summary

Migrated the Rust rhetorical-framing checks into the textlint package. Added section-aware traversal, four textlint rules, fixture coverage, baseline updates, and corpus comparison reports.

# Decisions Made

- Added `shared/text/sections.ts` because the migrated checks need first or last sentence per markdown section, which paragraph-local rules cannot provide.
- Kept Rust parity for the migrated family instead of broadening the rules during migration.
- Registered lead-ins and closers as separate syntactic-pattern subfamilies while exposing all rules through the single `everything` preset.

# Key Files

- `.plans/2026-05-13-000640-migrate-rhetorical-framing-textlint.md`
- `.plans/2026-05-13-001540-rhetorical-framing-rust-good-catches.md`
- `.plans/2026-05-13-001540-rhetorical-framing-textlint-diff.md`
- `packages/textlint-rules/src/shared/text/sections.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/lead-ins/llm-openers.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/affirmation-closers.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/summative-closer.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/false-question.ts`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Rust/textlint corpus comparison across 202 fixture files: both found 8 `affirmation-closers` findings, with 0 Rust-only and 0 textlint-only findings.

# Next Steps

- Migrate the next Rust-backed family from the manifest using the same corpus comparison flow.
