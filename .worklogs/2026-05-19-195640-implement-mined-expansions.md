# Summary

Implemented the mined fresh-corpus rule expansions except em dash handling. Added broad hit/no-hit cases and mirrored them into corpus fixtures with approved fixture3 output.

# Decisions Made

- Skipped em dash changes per request.
- Put new single words only into `llm-vocabulary-density`; no new one-to-one word bans were added.
- Kept `double-click on` as corporate-speak only outside literal UI contexts such as files, icons, and installers.
- Moved inline `not because X, but because Y` detection into a private helper to keep the negation matcher under the max-lines guardrail.
- Removed an overbroad `sample` narrative guard because it suppressed a valid corpus coverage hit.

# Key Files For Context

- `.plans/2026-05-19-193855-implement-mined-rule-expansions.md`
- `src/rules/academic-slop/academic-formula-frames.ts`
- `src/rules/phrases/corporate-speak.ts`
- `src/rules/narrative-slop/low-information-beat-density.ts`
- `src/rules/syntactic-patterns/contrast/private/inline-not-because-reframe.ts`
- `src/rules/semantic-thinness/patterns/abstract-agency-personification.json`
- `src/rules/words/llm-vocabulary-density.ts`
- `behavior/fixtures/textlint-rules/cases/`
- `behavior/fixtures/textlint-rules/corpus/`

# Verification

- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`
- `scripts/fixture3.sh check --suite textlint-rules-cases-syntactic-patterns`
- `scripts/fixture3.sh check --suite textlint-rules-corpus-engineering-review`

# Next Steps

- Mine the new corpus output for remaining slop classes after this wider pass.
