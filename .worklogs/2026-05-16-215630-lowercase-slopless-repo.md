# Summary

Renamed the Slopless repository and local folder to lowercase.

The active local path is now `/Users/tartakovsky/Projects/agent-quality-controls/slopless`, and the GitHub repository is `agent-quality-controls/slopless`.

# Decisions Made

- Published a patch version because npm package metadata is immutable per version.
- Approved the fixture baseline again because the approved output stores absolute fixture paths.
- Ignored `.plans` and `.worklogs` in formatter and spellcheck because they contain historical research and source material, not package source.

# Key Files For Context

- `package.json`
- `package-lock.json`
- `src/cli.ts`
- `behavior/golden/textlint-rules/approved.normalized.json`
- `.plans/2026-05-16-215549-lowercase-slopless-repo.md`

# Verification

- `npm run validate`
- `fixture3 check --suite textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-split-slopless.py`

# Next Steps

- Commit and push the lowercase repository metadata.
- Publish `slopless@0.2.3`.
