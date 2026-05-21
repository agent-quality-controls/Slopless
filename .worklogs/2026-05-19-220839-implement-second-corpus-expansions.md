# Summary

Implemented the second fresh-corpus expansion pass across phrases, semantic thinness, syntactic patterns, academic slop, and vocabulary density. Promoted the reviewed hit/no-hit candidates into family cases, mirrored them into corpus prose, and approved the corresponding fixture3 output.

# Decisions Made

- Kept em dash behavior unchanged.
- Kept new vocabulary terms density-only; no new one-to-one word bans were added.
- Fixed a vocabulary guard bug where `customer` suppressed every density token in a sentence.
- Added a narrow legal-entity context guard for `next-generation growth` so company names such as `Next-Generation Growth Partners` do not fail the phrases direct no-hit verifier.
- Split single-sentence contrastive aphorism matching into a private matcher to keep the main rule file under lint limits.

# Key Files For Context

- `.plans/2026-05-19-214048-implement-second-corpus-expansions.md`
- `src/rules/phrases/corporate-speak.ts`
- `src/rules/semantic-thinness/private/pattern-matcher.ts`
- `src/rules/syntactic-patterns/contrast/contrastive-aphorism.ts`
- `src/rules/syntactic-patterns/contrast/private/single-sentence-aphorism.ts`
- `src/rules/words/llm-vocabulary-density.ts`
- `behavior/fixtures/textlint-rules/cases/`
- `behavior/fixtures/textlint-rules/corpus/`
- `behavior/golden/textlint-rules-*`

# Verification

- `pnpm run build`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`

# Next Steps

- Mine the expanded corpus output again for remaining direct-coverage gaps and new broadening candidates.
