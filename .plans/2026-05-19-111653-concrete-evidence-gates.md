# Goal

Reduce false positives introduced by the widened slop rules without reverting the useful broadening. Use reusable concrete-evidence gates instead of exact fixture exceptions.

# Approach

- Add a shared concrete-evidence helper:
  - detect numeric evidence by character scanning
  - classify concrete technical, correction, authority, implementation, medical-place, and inventory-head tokens
  - expose helpers for concrete correction, concrete implementation summary, concrete authority claim, and concrete subject inventories
- Wire the helper into widened rules:
  - `negation-reframe`: suppress concrete corrections and explicit replacement pairs with concrete evidence
  - `llm-openers`: suppress first-person reversals about technical objects
  - `repeated-predicate-end`: suppress repeated endings when nearby sentence subjects share a concrete inventory head
  - `authority-padding`: suppress claims with concrete evidence, measured outcomes, or source scope
  - `boilerplate-conclusion`: suppress concrete summary complements
  - `semantic-thinness`: suppress deictic summaries with concrete evidence after colon/cause markers where existing matcher gates do not catch it
  - `demonstrative-emphasis`: suppress demonstrative explanatory frames with concrete evidence
- Keep `uncited-authority` untouched for now because it is citation-policy behavior, not a widened slop-rule regression.

# Files to modify

- `src/shared/matchers/concrete-evidence.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/rules/syntactic-patterns/authority/authority-padding.ts`
- `src/rules/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `src/rules/syntactic-patterns/repetition/demonstrative-emphasis.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `behavior/probes/widened-rule-false-positive-edge-cases.md`

# Verification

- Run the local built CLI on `behavior/probes/widened-rule-false-positive-edge-cases.md`.
- `scripts/fixture3.sh check --suite textlint-rules`
- `npm run validate`
- `scripts/verify-all.sh`

# Acceptance rule

The probe should lose the direct false positives from widened rules while keeping the existing fixture corpus behavior explainable. If fixture3 output changes, inspect added and removed findings before accepting.
