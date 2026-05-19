# Goal

Broaden semantic-thinness so it catches business and LinkedIn-style low-information rhetoric without adding draft-specific edge cases.

# Approach

- Expand existing semantic templates:
  - `hollow-significance`: cover "the X is Y", "the X is not Y", "the X feels Y", "the X gets Y", and "the X changes Y" where X is an abstract business/content/report noun and Y is an abstract evaluation or punchline.
  - `vague-threshold-change`: cover abstract business subjects such as report, decision, spreadsheet, audit, strategy, content, and plan.
  - `deictic-summary`: cover "that/this changes/maps/means..." and "that is the kind/type of..." summary glue.
  - `puffery-evaluative-claim`: cover broader comparative business aphorisms such as "the second one is less glamorous" only through abstract slots, not exact lines.
- Add matcher guards:
  - Keep rejecting digits and cause/evidence conjunctions for broad full-sentence templates.
  - Add rejection for code-like strings, URLs, emails, and precise citation markers.
  - Do not reject every named entity, because AI slop often surrounds named entities with generic rhetoric.
- Change semantic-thinness reporting:
  - Use one-to-one for high-confidence exact templates only if the existing architecture supports it cheaply.
  - Otherwise use density reporting for broad semantic-thinness detections so a single broad "the X is Y" sentence does not create noisy output.
- Fixture work:
  - Add the LinkedIn draft as corpus.
  - Add extracted broad pattern lines to semantic-thinness hits.
  - Add no-hit variants where the same frames include concrete technical evidence.
- Verification:
  - Run the local CLI on the LinkedIn draft and confirm non-empty findings.
  - Run Fixture3.
  - Run `npm run validate`.
  - Do not accept golden output until findings are reviewed.

# Key Decisions

- Do not create rules named after the draft examples.
- Do not add literal-only phrases for "boring fix" or "pay the bills".
- Use existing semantic pattern families because the issue is a missing generalized slot inventory.
- Prefer density for broad patterns because "The report is final" and "The decision is worse" should not be treated equally.

# Files To Modify

- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/semantic-thinness/patterns/vague-threshold-change.json`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/semantic-thinness/semantic-thinness.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`
