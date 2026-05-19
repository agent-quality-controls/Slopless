## Summary

Widened the overtightened syntactic and semantic slop detectors across negation reframes, LLM openers, repeated endings, authority padding, boilerplate closers, summative closers, and deictic semantic-thinness patterns. Accepted the new fixture3 output after removing no-hit regressions from the first broad pass.

## Decisions made

- Kept broader recall for `the point is`, `the lesson is`, and related closer frames because the added hits land in existing hit/corpus material.
- Added abstract-complement gating to authority padding so `Research shows that children need sleep` remains a no-hit while vague business authority frames still report.
- Excluded `not help but` from negation-reframe contrast matching because it is an idiom, not a not-X-then-Y construction. Narrative slop rules can still catch bad versions through their own detectors.
- Used token helpers instead of regex in the widened LLM opener detector to comply with prose-rule linting.

## Key files for context

- `.plans/2026-05-19-104132-widen-overtightened-rules.md`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/rules/syntactic-patterns/authority/authority-padding.ts`
- `src/rules/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `src/rules/syntactic-patterns/closers/summative-closer.ts`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/vague-connective-payoff.json`
- `behavior/golden/textlint-rules/approved.normalized.json`

## Verification

- `npm run validate`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`

## Next steps

- Review the 40 added fixture findings for whether any of the newly caught `the point is` hits should be narrowed by position, concreteness, or density.
