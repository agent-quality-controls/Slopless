# Goal

Catch the remaining bad LinkedIn draft slop without flagging the two acceptable lines: "That maps cleanly to SEO pages" and "useful to humans and retrievable by AI systems".

# Approach

- Extend `semantic-thinness` / `solution-boring-frame` for deictic solution-like checks:
  - catch `This check is boring, fast, and easy...`
  - add `check` as a solution-like noun only in the existing bounded solution-boring pattern
  - keep no-hits for entertainment, events, reports, audits, and literal process checks
- Add a repetition-family density rule for repeated predicate endings:
  - catch nearby sentences ending in the same weak predicate, especially `can help`
  - use document-source units so paragraph-separated LinkedIn cadence is visible
  - require 3+ nearby hits
- Extend `negation-reframe` for Markdown-separated quote/list reframes:
  - catch `{subject} is not:` followed shortly by `{same subject} is:`
  - use document-source units so blank lines and quoted blocks are visible
  - do not catch single-sentence factual definitions
- Add a bounded semantic-thinness pattern for vague summary-cost lines:
  - catch `All of that gets expensive when nobody knows which problem they are solving`
  - keep it narrow to all-of-that summary subjects plus abstract problem/issue/question objects
- Add cases and corpus coverage for each widening.
- Preserve the existing accepted lines as no-change cases by not adding broad bridge/generic usefulness rules.

# Files To Modify

- `src/adapters/textlint/units.ts`
- `src/rules/private/textlint-rule-builders.ts`
- `src/rules/semantic-thinness/patterns/solution-boring-frame.json`
- `src/rules/semantic-thinness/patterns/vague-summary-cost.json`
- `src/rules/semantic-thinness/private/pattern-data-d.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/syntactic-patterns/contrast/negation-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/registries/syntactic-patterns/repetition.ts`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/**`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`

# Verification

- Direct CLI check against the rewritten LinkedIn draft.
- Direct CLI checks for hit/no-hit snippets.
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/fixture3.sh approve --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
