# Summary

Audited the previous textlint family catch files for fixture-building usefulness. Rewrote the early negation bad-catch report so fragment-only matches now include source review context.

# Decisions Made

- Kept the later negation kept/rejected files unchanged because they already store complete sentences or full enough review text.
- Kept orthography unchanged because it was already repaired to sentence, heading, or paragraph context.
- Expanded the early negation bad-catch report with `Matched text` and `Review context` for every entry, using the fixture source line and neighboring blocks when the original match was a short label or fragment.

# Key Files

- `.plans/2026-05-12-215056-negation-reframe-bad-catches.md`
- `.plans/2026-05-12-215056-negation-reframe-good-catches.md`
- `.plans/2026-05-12-223007-negation-reframe-kept-findings.md`
- `.plans/2026-05-12-223007-negation-reframe-rejected-findings.md`
- `.plans/2026-05-12-232659-orthography-rust-good-catches.md`

# Verification

- Checked the repaired negation bad-catch file has 115 review contexts and zero short context-only entries.

# Next Steps

- Build the master no-signal fixture from the repaired `Review context` blocks, not from `Matched text`.
