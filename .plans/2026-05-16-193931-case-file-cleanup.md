# Goal

Make textlint case fixtures clean and navigable.

Each family should have `hits.md` and `no-hits.md` files where each case is one Markdown line. Cases should be assigned to the family whose rule intent they test, not blindly inherited from old TOML source files.

# Approach

1. Review every `behavior/fixtures/textlint-rules/cases/<family>/*.md` file.
2. Preserve exact sentence wording.
3. Remove comments, blockquotes, headings, and explanatory wrapper text from case files unless the Markdown shape itself is the case.
4. Move misplaced cases to the family they actually test.
5. Keep all generated cases and all old family fixture content represented somewhere.
6. Verify with fixture counts, duplicate checks, `fixture3 doctor`, `fixture3 check --suite textlint-rules`, and `npm run validate`.

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/**/*.md`
- `.worklogs/*case-file-cleanup.md`

# Key Decisions

- `hits.md` means the sentence or Markdown line should report in that family.
- `no-hits.md` means the sentence or Markdown line should not report in that family.
- A no-hit example may have the same surface grammar as another family, but only if that contrast is needed to prove the owning family does not overreach.
- If that contrast is primarily about a different family, move it.
