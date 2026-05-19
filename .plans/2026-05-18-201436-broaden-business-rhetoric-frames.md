# Goal

Catch the remaining LinkedIn/business-rhetoric slop categories with broad existing rule families, not draft-specific edge cases.

# Approach

- Broaden `hollow-significance` so `the boring X is Y` is a reusable template, not the exact phrase `the boring fix is often the right one`.
- Broaden `deictic-summary` so `that is the kind/type of X...` catches longer deictic summary lines even when they contain generic numeric punchlines.
- Broaden `generic-signposting` so `what helped more:` is caught as a generic "what helped/mattered/worked..." section frame.
- Broaden `negation-reframe` so adjacent `That does not mean X. It means Y.` and similar `this/it/that does not mean... it means...` pairs are caught.
- Replace the previous blunt `digit` and `before/after` suppression with narrower concrete-evidence guards:
  - reject obvious URLs, handles, inline code, ticket IDs, dotted identifiers
  - reject evidence/cause connectors
  - reject technical terms that indicate the sentence is explaining a real implementation detail
  - reject numeric evidence only when the number is tied to a measurement, date, percentage, money, or explicit technical/business metric

# Files To Modify

- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `src/rules/syntactic-patterns/contrast/private/negative-slop-frames.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.preserve.json`

# Verification

- Run Slopless on the original LinkedIn draft and compare against the requested lines.
- Run Fixture3.
- Run `scripts/verify-all.sh`.
- Run `npm run validate`.
