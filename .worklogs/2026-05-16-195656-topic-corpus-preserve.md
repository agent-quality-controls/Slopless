# Summary

Replaced the scattered textlint corpus with five topic-first corpus files and sibling preserve manifests.

The new corpus duplicates all 740 reviewed case lines in topic files. The preserve verifier fails if a required line is removed or if a case line is not represented in corpus metadata.

# Decisions Made

- Used topic files instead of family files because corpus should read as source prose, while `cases/` stays family-specific.
- Kept exact case lines in Markdown and tracked them in `.preserve.json` files.
- Deleted the 87 scattered corpus Markdown files, including generated batches and Sunstone chapter files.
- Added `scripts/verify-corpus-preserve.py` as the mechanical check for corpus-to-case coverage.

# Key Files For Context

- `.plans/2026-05-16-195443-topic-corpus-preserve.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/health-and-parenting.md`
- `behavior/fixtures/textlint-rules/corpus/metrics-and-markdown.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `scripts/verify-corpus-preserve.py`

# Verification

- `scripts/verify-corpus-preserve.py`: 740 preserved cases, 5 corpus files, status ok.
- `fixture3 doctor`
- `fixture3 explain --suite textlint-rules`: 21 fixtures.
- `fixture3 check --suite textlint-rules`: completed and returned `different` because approved output is intentionally `[]`.
- `npm run validate` in `packages/textlint-rules`.
- `git diff --check`.

# Next Steps

- Rewrite each topic corpus with an LLM using the preserve JSON as exact lines to keep.
- After each rewrite, run `scripts/verify-corpus-preserve.py` before reviewing textlint output.
