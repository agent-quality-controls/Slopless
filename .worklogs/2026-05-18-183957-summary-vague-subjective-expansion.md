# Summary

Implemented the summary, vague attribution, vague quantifier, and subjective puffery candidates from the 2026-05-18 research queue. Light-verb wordiness stayed skipped, and MAGPIE stayed source-only because idiom literalness is not a safe default slop signal.

# Decisions

- Expanded `summative-closer` into a sentence-level summative-frame detector so case fixtures can prove phrases such as `in summary` and `the bottom line is`.
- Expanded `uncited-authority` with vague attribution frames and source guards. Digits, citations, URLs, parenthetical citations, and named sources suppress the finding.
- Expanded `universalizing-claims` with vague quantifier plus abstract noun patterns. Evidence markers such as `including`, `such as`, cause clauses, and digits suppress the finding.
- Expanded `puffery-evaluative-claim` with bounded subjective claim templates instead of importing broad peacock words.
- Updated the previous density manifest no-hit text after the old no-hit sentence collided with `triple-repeat`.

# Key Files

- `.plans/2026-05-18-182750-summary-vague-subjective-expansion.md`
- `.plans/2026-05-18-182750-summary-vague-subjective-expansion.md.manifest.toml`
- `scripts/verify-summary-vague-subjective-expansion.py`
- `src/rules/syntactic-patterns/closers/summative-closer.ts`
- `src/rules/syntactic-patterns/authority/uncited-authority.ts`
- `src/rules/syntactic-patterns/generalization/universalizing-claims.ts`
- `src/rules/semantic-thinness/patterns/puffery-evaluative-claim.json`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/health-and-parenting.md`
- `legacy/source-material/expansion-2026-05-18/remaining-candidates.md`
- `legacy/source-material/incorporation-record.md`

# Verification

- `scripts/verify-summary-vague-subjective-expansion.py`
- `scripts/verify-all.sh`
- `scripts/fixture3.sh check --suite textlint-rules`
- `npm run validate`

# Next Steps

- Review the deferred Markdown-layout candidates separately if prose-rule expansion continues.
