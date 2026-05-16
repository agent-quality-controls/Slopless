# Summary

Refactored textlint matcher ownership without intended behavior changes.

Neutral LLM-slop helpers were renamed to `prose-patterns`, and negation-reframe matcher internals moved out of `shared` into the contrast family.

# Decisions Made

- Renamed `shared/matchers/llm-slop.ts` to `shared/matchers/prose-patterns.ts` because the helpers apply to general prose patterns, not only LLM artifacts.
- Moved negation-reframe matcher files into `families/syntactic-patterns/contrast/private/` because textlint `--rulesdir` loads sibling JS files as rule modules.
- Kept `shared/text/*` and `shared/matchers/phrases.ts` unchanged because they are neutral and used across multiple families.

# Key Files For Context

- `packages/textlint-rules/src/shared/matchers/prose-patterns.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/private/negation-reframe-parts.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/negation-reframe.ts`
- `.plans/2026-05-13-125738-shared-matcher-boundary-refactor.md`

# Verification

- `npm run validate` in `packages/textlint-rules`
- `rg "llm-slop|syntactic-templates|shared/matchers/negation-reframe-parts" packages/textlint-rules/src`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/syntactic-patterns/family.md`

# Next Steps

- Keep semantic-thinness matchers local until at least two rule families prove the same neutral abstraction is needed.
