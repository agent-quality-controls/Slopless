# Summary

Broadened existing semantic-thinness and generic-signposting coverage for the remaining LinkedIn/business-rhetoric slop lines. The original draft now reports the previously missed "kind of issue", "What helped more", "does not mean", and "it means" frames.

# Decisions Made

- Added a reusable `the {thinModifier} {summaryNoun} is ...` template instead of only matching `the boring fix`.
- Broadened deictic summary frames for `that is the kind of issue`, `that does not mean X is Y`, and `it means the post has to contain source material worth retrieving`.
- Added a bounded `What helped more:` generic-signposting frame that only matches the short fragment form, not full comparative explanations.
- Moved concrete-evidence suppression into `concrete-guards.ts` to keep `pattern-matcher.ts` below the file length limit.
- Replaced the old blunt digit/before suppression with concrete-marker, numeric-evidence, concrete-colon, and concrete-explanation guards.

# Key Files For Context

- `.plans/2026-05-18-201436-broaden-business-rhetoric-frames.md`
- `src/rules/semantic-thinness/private/concrete-guards.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/syntactic-patterns/lead-ins/generic-signposting.ts`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`

# Verification

- `npm exec -- slopless /Users/tartakovsky/Projects/websmasher/websmasher/content/linkedin/2026-05-18-ai-search-linkedin-post-ideas.md`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`

# Next Steps

- If future real drafts show many isolated broad semantic hits, consider moving the broadest semantic-thinness templates to density reporting.
