# Summary

Widened the rules for the remaining bad LinkedIn draft slop. The draft now reports Markdown-separated negation reframes, solution-like boring check frames, repeated `can help` cadence, and vague `all of that gets expensive` summary-cost lines.

# Decisions Made

- Kept the accepted lines out of scope: `That maps cleanly to SEO pages` and `useful to humans and retrievable by AI systems`.
- Extended `solution-boring-frame` with `this check` / `check` coverage instead of adding a draft-specific phrase.
- Added `vague-summary-cost` as a narrow semantic-thinness pattern because the global connector guard would otherwise suppress `when` clauses.
- Added `repeated-predicate-end` as a syntactic-patterns density rule. It reports only after 3 nearby repeated weak endings, such as `can help`.
- Split block-level negation detection into `block-negation-reframe.ts` and kept sentence-level negation detection paragraph-local. This avoids creating false positives across independent case lines.
- Added a raw document unit for rules that need Markdown paragraph boundaries and source-stable ranges.

# Key Files For Context

- `.plans/2026-05-18-212500-widen-linkedin-slop-rules.md`
- `src/rules/semantic-thinness/patterns/solution-boring-frame.json`
- `src/rules/semantic-thinness/patterns/vague-summary-cost.json`
- `src/rules/syntactic-patterns/repetition/repeated-predicate-end.ts`
- `src/rules/syntactic-patterns/contrast/negation-reframe.ts`
- `src/rules/syntactic-patterns/contrast/private/block-negation-reframe.ts`
- `src/adapters/textlint/units.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`

# Verification

- `node dist/cli.js /Users/tartakovsky/Projects/websmasher/websmasher/content/linkedin/2026-05-18-ai-search-linkedin-post-ideas.md`
- `node dist/cli.js behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `node dist/cli.js behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/fixture3.sh approve --suite textlint-rules --comment "Widen LinkedIn slop rules"`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`

# Next Steps

- Reinstall the local global package before using the `slopless` binary outside the repo, because the global install still points at the previous build until reinstalled.
