# Goal

Clean up textlint matcher ownership before semantic-thinness work starts.

# Approach

- Rename neutral `shared/matchers/llm-slop.ts` to `shared/matchers/prose-patterns.ts`.
- Update all imports that currently reference `llm-slop.js`.
- Move negation-only matcher code from `shared/matchers/syntactic-templates.ts` to `families/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`.
- Move negation-only helper parts from `shared/matchers/negation-reframe-parts.ts` to `families/syntactic-patterns/contrast/private/negation-reframe-parts.ts`.
- Update `negation-reframe.ts` to import its local matcher.
- Remove the old shared files.

# Key Decisions

- `prose-patterns` is the right shared name because the helpers support sentence-local and multi-sentence prose rules.
- Negation reframe code is not shared infrastructure because only one rule imports it and its vocabulary is rule-specific.
- Semantic-thinness should use `shared/text/*` and `shared/matchers/prose-patterns.ts`, then keep any new semantic-specific matcher local until reuse is proven.

# Verification

- `npm run validate` in `packages/textlint-rules`
- `rg "llm-slop|syntactic-templates|shared/matchers/negation-reframe-parts" packages/textlint-rules/src`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/syntactic-patterns/family.md`
