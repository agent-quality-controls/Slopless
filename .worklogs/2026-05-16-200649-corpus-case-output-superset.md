# Summary

Made corpus rule coverage a mechanical superset of case rule coverage.

Corpus now preserves all case lines and produces every rule ID that cases produce. It may also produce additional corpus-only rule IDs.

# Decisions Made

- Added sidecar textlint config support using `corpus-file.<family>.textlintrc.json`.
- Added a `technical-terminology.md` corpus file so term-policy hit behavior is visible without the term-policy no-hit line suppressing the configured rule output.
- Added false-question lines at section endings in `engineering-review.md` because that rule is section-position sensitive.
- Extended `scripts/verify-corpus-preserve.py` to fail when latest fixture3 received output has a case rule ID missing from corpus output.

# Key Files For Context

- `.plans/2026-05-16-200226-corpus-case-output-superset.md`
- `scripts/behavior-replay.sh`
- `scripts/verify-corpus-preserve.py`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/technical-terminology.md`
- `behavior/fixtures/textlint-rules/corpus/technical-terminology.term-policy.textlintrc.json`

# Verification

- `fixture3 check --suite textlint-rules`: completed and returned `different` because approved output is intentionally `[]`.
- `scripts/verify-corpus-preserve.py`: 740 preserved cases, 6 corpus files, 44 case rule IDs, 45 corpus rule IDs, status ok.
- Rule-ID diff: no case rule IDs missing from corpus; one extra corpus rule ID, `summative-closer`.
- `npm run validate` in `packages/textlint-rules`.

# Next Steps

- Decide whether to add stricter line-level hit parity after rule-ID coverage.
- If line-level parity is required, handle document-level rules separately because term-policy and readability rules report at document or paragraph level rather than on the exact preserved line.
