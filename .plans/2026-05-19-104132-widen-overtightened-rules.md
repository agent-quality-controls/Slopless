# Goal

Widen the currently overtightened slop rules in the areas identified after the last cleanup. The first pass should prefer recall over precision, then fixture3 output will show where narrowing is needed.

# Approach

- Widen `syntactic-patterns:negation-reframe`:
  - Add explicit sentence-pair support for `not X; instead/rather Y`.
  - Add inline contrast support for `not a X, but/rather/instead a Y`.
  - Add broader `not just/only X; also Y` detection.
- Widen `syntactic-patterns:llm-openers`:
  - Detect first-person reversal openers such as `I used to think...`, `I used to treat...`, and `I used to read...`.
  - Keep this scoped to section-opening sentences.
- Widen `syntactic-patterns:repeated-predicate-end`:
  - Add weak endings such as `still matters`, `changes`, `does the work`, `is the point`, and `is the job`.
  - Keep density reporting unchanged.
- Widen `syntactic-patterns:authority-padding`:
  - Add uncited generic authority subjects and predicates around research, studies, evidence, experts, and data.
  - Keep it sentence-level and direct.
- Widen conclusion and summative frames:
  - Expand `boilerplate-conclusion` and `summative-closer` for `the takeaway/lesson/point is...`, `that is why...`, and `that is the reason...` wrappers.
- Widen `semantic-thinness:semantic-thinness`:
  - Expand existing deictic summary and vague-connective payoff patterns rather than creating a new family.
  - Add broader `This is where/how/why...` templates with abstract slots.

# Files to modify

- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/rules/syntactic-patterns/authority/authority-padding.ts`
- `src/rules/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `src/rules/syntactic-patterns/closers/summative-closer.ts`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/vague-connective-payoff.json`
- `behavior/golden/textlint-rules/approved.normalized.json`
- `behavior/golden/textlint-rules/approved.meta.json`

# Verification

- `npm run validate`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`

# Acceptance rule

Accept the broader fixture output only if the new hits are explainable as slop signals or useful harsh catches. Do not add one-off false-positive exceptions in this pass.
