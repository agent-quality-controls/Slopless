# Textlint parity analysis

## Summary

Compared the first textlint rule slice against the existing Rust fixture corpus for the migrated rules. Added the parity findings and the MDX support requirement to the textlint implementation plan.

## Decisions Made

- Did not treat textlint-only prohibited-term hits as automatically correct. Smart-quote phrase hits are useful; heading/list/link scope needs an explicit rule policy.
- Did not treat the negation mismatch as a comparator issue. The current textlint rule is materially broader than Rust and needs a real matcher-shape port before parity can be claimed.
- Recorded MDX support as required because `fixtures/article1.mdx` is invisible to the current textlint parity run.

## Key Files

- `.plans/2026-05-12-203442-textlint-implementation-plan.md`
- `/tmp/prosesmasher-rust-fixtures.jsonl`
- `/tmp/prosesmasher-textlint-fixtures.json`

## Next Steps

- Decide node-scope policy for words, phrases, and orthography: paragraphs only, headings too, link labels too, or per-family scope.
- Port `negation-reframe` from Rust matcher shapes instead of using the current broad first-slice matcher.
- Add MDX parsing support to the textlint parity workflow before full-corpus fixture claims.
