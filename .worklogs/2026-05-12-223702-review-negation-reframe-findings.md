# Review Negation-Reframe Findings

## Summary

Manually reviewed the current textlint `negation-reframe` fixture-corpus findings. Fixed five definite false positives, recorded 384 kept in-family findings, and added a master fixture containing every kept example.

## Decisions Made

- Rejected negative-to-negative sentence pairs because they do not reframe into a positive or corrective second sentence.
- Rejected inline `not too` and `not all` matches because modifier and quantifier negation are not contrast reframes.
- Kept the remaining 384 findings as in-family examples for the current harsh negation/contrast rule.
- Stored review artifacts under `.plans` and stored runnable example material under `behavior/fixtures/textlint-rules/syntactic-patterns/negation-reframe-master.md`.

## Key Files

- `.plans/2026-05-12-223007-negation-reframe-manual-review.md`
- `.plans/2026-05-12-223007-negation-reframe-kept-findings.md`
- `.plans/2026-05-12-223007-negation-reframe-rejected-findings.md`
- `behavior/fixtures/textlint-rules/syntactic-patterns/negation-reframe-master.md`
- `packages/textlint-rules/src/shared/matchers/syntactic-templates.ts`

## Verification

- `npm run validate`
- `scripts/behavior-verify.sh`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`
- Full fixture corpus after fixes: 384 `negation-reframe` findings.

## Next Steps

- Use the master fixture as the source for future negation family regression coverage.
