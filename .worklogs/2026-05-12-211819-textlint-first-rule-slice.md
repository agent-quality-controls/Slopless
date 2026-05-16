# Textlint first rule slice

## Summary

Implemented the manifest-listed first textlint rule slice: shared text helpers, prohibited words, prohibited phrases, and negation-reframe. Added per-family golden replay fixtures, generated baselines, and behavior replay scripts.

## Decisions Made

- Used `Intl.Segmenter` and `sentence-splitter` for deterministic token and sentence boundaries.
- Kept phrase and word data in JSON files without category metadata.
- Stored golden baselines per fixture family under `behavior/baselines/textlint-rules`.
- Kept empty-family fixtures so every planned family has replay coverage before rules are ported.

## Key Files

- `packages/textlint-rules/src/shared/text/tokens.ts`
- `packages/textlint-rules/src/shared/text/sentences.ts`
- `packages/textlint-rules/src/shared/matchers/phrases.ts`
- `packages/textlint-rules/src/shared/matchers/syntactic-templates.ts`
- `packages/textlint-rules/src/families/words/prohibited-words.ts`
- `packages/textlint-rules/src/families/phrases/prohibited-phrases.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/contrast/negation-reframe.ts`
- `scripts/behavior-verify.sh`

## Next Steps

- Port the next rule family using the same fixture-first golden replay workflow.
- Replace the simple negation port with the richer Rust matcher shapes when that family becomes the active migration target.
