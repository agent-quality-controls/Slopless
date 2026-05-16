# Negation reframe review split

## Summary

Split the current textlint `negation-reframe` fixture-corpus findings into review files for good catches and bad catches. The split is judgment-based and intended for rule design review, not as a golden baseline.

## Decisions Made

- Marked bare `not just` findings as bad because the evidence is only a fragment and should not be owned by `negation-reframe` in that form.
- Marked repeated-subject, pronoun-reframe, and comma-not constructions as good unless the match was a factual definition, a legitimate genetic-risk clarification, or a broken extraction.
- Kept the files under `.plans` because they are rule-design artifacts for the textlint migration.

## Key Files

- `.plans/2026-05-12-215056-negation-reframe-good-catches.md`
- `.plans/2026-05-12-215056-negation-reframe-bad-catches.md`

## Next Steps

- Review the bad-catch file manually.
- Convert accepted bad-catch categories into rule narrowing requirements.
- Decide whether `not just` should become a separate full-context pattern or be ignored.
