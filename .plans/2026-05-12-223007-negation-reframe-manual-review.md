# Negation-Reframe Manual Review

## Result

- Current kept findings: 384
- Rejected findings fixed during review: 5
- Current definitely bad catches after fixes: 0 found in this manual pass

## Kept Counts

- `inline_comma_not`: 174
- `other_sentence_pair`: 17
- `other_single_sentence`: 2
- `pronoun_reframe_pair`: 166
- `same_prefix_pair`: 25

## Rejection Criteria Applied

- Reject negative-to-negative pairs because the second sentence is not a reframe.
- Reject inline `not too` modifier negation because it is not a contrast reframe.
- Reject inline `not all` quantifier negation because it is not a contrast reframe.

## Files

- `.plans/2026-05-12-223007-negation-reframe-kept-findings.md`
- `.plans/2026-05-12-223007-negation-reframe-rejected-findings.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/negation-reframe-master.md`
