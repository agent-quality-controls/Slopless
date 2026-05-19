# Summary

Added reusable concrete-evidence gates for widened slop rules so concrete corrections, implementation summaries, and inventory repetitions stop reporting as rhetorical slop. Kept `uncited-authority` unchanged because it is citation-policy behavior rather than a widened slop-rule false positive.

# Decisions Made

- Added `src/shared/matchers/concrete-evidence.ts` instead of local suppressions in each rule so the false-positive control is reusable.
- Suppressed only concrete-evidence classes tied to the false-positive probe: technical corrections, implementation summaries, causal summaries, concrete authority evidence, and concrete inventory subjects.
- Accepted the fixture3 golden removal of the concrete repayment-job demonstrative-emphasis hit because it belongs to the same concrete implementation-summary class.
- Updated `validate` to use direct `prettier`, `cspell`, and strict `type-coverage` calls because G3TS does not follow `npm run` script hops for those checks.
- Made `TextUnit.node` a typed textlint AST node and removed the old unknown-node guard so strict type coverage can prove the boundary.

# Key Files

- `src/shared/matchers/concrete-evidence.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/lead-ins/llm-openers.ts`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/rules/syntactic-patterns/repetition/triple-repeat.ts`
- `src/rules/syntactic-patterns/repetition/fragment-stacking.ts`
- `src/rules/syntactic-patterns/repetition/demonstrative-emphasis.ts`
- `src/rules/syntactic-patterns/authority/authority-padding.ts`
- `src/rules/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `behavior/probes/widened-rule-false-positive-edge-cases.md`
- `package.json`
- `guardrail3-ts.toml`

# Verification

- `npm run validate`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `node dist/cli.js behavior/probes/widened-rule-false-positive-edge-cases.md`

# Next Steps

- If broader false positives appear in real prose, add them to `behavior/probes/widened-rule-false-positive-edge-cases.md` first, then extend the concrete-evidence helper by class instead of adding exact sentence exceptions.
