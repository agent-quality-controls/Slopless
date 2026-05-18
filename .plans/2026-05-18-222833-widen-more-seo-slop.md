# Goal

Widen Slopless so the new 2026 SEO LinkedIn draft no longer passes while still preserving concrete technical lines.

# Target Misses

- `That changes the page brief.`
- `the content plan is missing the conversation after the query`
- `The audit move:`
- `That fits the world we are in.`
- `So the audit question is not just: ... It is:`
- `The lazy conclusion is: ... The better conclusion:`
- `That is a different job.`
- `It is less screenshot-friendly. It is more useful...`
- `Visibility now has layers, and the layers can disagree.`

# Approach

- Extend existing semantic-thinness patterns rather than creating new rule families.
- Extend `deictic-summary` for:
  - `That changes the {summary noun}`
  - `That fits the {abstract situation}`
  - `That is a different job`
- Extend `hollow-significance` for:
  - `Visibility now has layers...`
  - `structured data still has work to do`
- Add a small semantic pattern for metaphorical missing conversation plans.
- Extend block-level negation reframe so pronoun continuation catches `X is not just: ... It is:`.
- Extend syntactic signposting for `The audit move:` and lazy/better conclusion frames.
- Add case and corpus coverage for hits and no-hits.

# Files To Modify

- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/semantic-thinness/patterns/missing-conversation-plan.json`
- `src/rules/semantic-thinness/private/pattern-data-b.ts`
- `src/rules/syntactic-patterns/contrast/private/block-negation-reframe.ts`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/*.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/*.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`

# Verification

- Direct Slopless run on the new 2026 SEO draft.
- Direct no-hit checks for semantic-thinness and syntactic-patterns.
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/fixture3.sh approve --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
