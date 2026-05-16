# Summary

Moved the corpus-only `summative-closer` sentence into a section-ending position in the syntactic-patterns hit cases.

The sentence now produces both `false-question` and `summative-closer` in cases, matching the corpus behavior.

# Decisions Made

- Kept the exact corpus sentence: `That's why it matters, isn't that the point?`
- Moved it to the final line of `cases/syntactic-patterns/hits.md` because both rules inspect section-ending sentences.
- Removed the older false-question-only case line from the preserve manifest because the moved sentence now covers that rule too.

# Key Files For Context

- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/false-question.ts`
- `packages/textlint-rules/src/families/syntactic-patterns/closers/summative-closer.ts`

# Verification

- `fixture3 check --suite textlint-rules`: completed and returned `different` because approved output is intentionally `[]`.
- `scripts/verify-corpus-preserve.py`: 739 preserved cases, 6 corpus files, 45 case rule IDs, 45 corpus rule IDs, status ok.
- Corpus-only rule ID query: no output.
- `npm run validate` in `packages/textlint-rules`.

# Next Steps

- None.
