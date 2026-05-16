# Summary

Rewrote the orthography migration catch reports to store full review context instead of only matched glyphs or short fragments. The good-catch list now records the sentence, heading, or paragraph needed to build reusable fixture text.

# Decisions Made

- Used the Rust evidence fields directly: sentence for sentence-level rules, heading text for sentence-case, and paragraph text for exclamation density.
- Updated the textlint diff report to include full source-line context for textlint-only differences.
- Did not change rule code because this was a reporting and fixture-source issue, not a detector issue.

# Key Files

- `.plans/2026-05-12-232659-orthography-rust-good-catches.md`
- `.plans/2026-05-12-232659-orthography-textlint-diff.md`

# Next Steps

- Use these context-bearing catch lists when building master orthography fixtures.
