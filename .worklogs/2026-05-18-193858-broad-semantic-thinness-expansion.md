# Summary

Broadened existing semantic-thinness patterns so short-form business rhetoric and LinkedIn-style consultant punchlines are caught without adding draft-specific rules. Added LinkedIn AI-search corpus coverage and approved the resulting Fixture3 drift.

# Decisions Made

- Expanded existing `hollow-significance`, `vague-threshold-change`, `deictic-summary`, and `puffery-evaluative-claim` slots instead of creating new edge-case rules.
- Added common concrete-marker guards using character scans, not regex, to preserve technical no-hit cases.
- Added broad hit/no-hit cases and a corpus preserve file so case coverage and corpus coverage stay aligned.
- Fixed the CLI package build so `dist/cli.js` is executable for npm/npx usage.

# Key Files For Context

- `.plans/2026-05-18-192757-broad-semantic-thinness-expansion.md`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/semantic-thinness/patterns/hollow-significance.json`
- `src/rules/semantic-thinness/patterns/vague-threshold-change.json`
- `src/rules/semantic-thinness/patterns/deictic-summary.json`
- `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.md`
- `behavior/fixtures/textlint-rules/corpus/linkedin-ai-search.preserve.json`

# Verification

- `scripts/verify-all.sh`
- `scripts/fixture3.sh check --suite textlint-rules`
- `npm run validate`
- `npm pack --dry-run --json`
- `npm exec -- slopless --version`
- `npm exec -- slopless /Users/tartakovsky/Projects/websmasher/websmasher/content/linkedin/2026-05-18-ai-search-linkedin-post-ideas.md`

# Next Steps

- Review whether semantic-thinness should use mixed one-to-one and density reporting for broad business rhetoric once more real drafts are available.
