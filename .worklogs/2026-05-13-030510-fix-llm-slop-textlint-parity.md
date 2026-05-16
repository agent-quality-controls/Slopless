# Summary

Fixed two LLM-slop parity gaps found by comparing Rust and textlint output across 143 fixture files. Textlint now preserves apostrophe contractions during quote stripping and includes Rust's guarded `the basic rule is simple` boilerplate-conclusion template.

# Decisions Made

- Removed straight apostrophe from `stripQuotedSegments` quote openers because normalized contractions like `it's` are word content, not quoted spans.
- Added `the basic rule is simple` as a guarded response-close template, matching Rust behavior only when the sentence ends after the template.
- Added behavior fixture rows for both parity cases and regenerated the syntactic-patterns baseline.

# Key Files

- `packages/textlint-rules/src/shared/matchers/llm-slop.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
- `behavior/baselines/textlint-rules/syntactic-patterns.json`

# Verification

- `npm run validate`
- `./scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Rust/textlint LLM-slop corpus comparison: Rust 137 findings, textlint 142 findings, no Rust-only count losses.

# Next Steps

- Continue migrating remaining Rust-backed families when selected.
