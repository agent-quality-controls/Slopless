# Summary

Cleaned textlint case fixtures so each case file uses one Markdown line per case with blank lines between cases.

Moved the parser/offset negation example out of semantic-thinness no-hits and into syntactic-patterns no-hits. Removed old wrapper comments, blockquotes, and non-case headings from case files.

# Decisions Made

- Kept orthography Markdown headings because heading shape is the case for sentence-case checks.
- Removed no-signal wrapper headings and moved its negation-reframe false-positive lines into syntactic-patterns no-hits.
- Deleted exact duplicate syntactic-pattern case lines after confirming the same text remained once.
- Preserved sentence wording while changing only fixture placement and Markdown wrappers.

# Key Files For Context

- `.plans/2026-05-16-193931-case-file-cleanup.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/no-signal/no-hits.md`

# Verification

- `fixture3 check --suite textlint-rules`
- `npm run validate` in `packages/textlint-rules`
- Case-format audit: 16 case files, 0 adjacent nonblank-line format issues.
- Duplicate-line audit: 740 unique case lines, 0 duplicate lines.
- Heading/comment audit: only orthography heading cases remain.

# Next Steps

- Reduce `behavior/fixtures/textlint-rules/corpus/` from 87 files into a smaller realistic corpus while preserving useful rule coverage.
