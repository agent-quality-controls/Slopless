# Summary

Fixed the reviewed false positive where `prohibited-phrases` reported inside quoted sample text.

The rule now uses the shared unquoted phrase matcher and skips link text, matching the behavior already used by the reviewed phrase rules. I also removed duplicate phrase ownership for `at the end of the day`, `in light of`, and `this point in time` so those findings belong to the narrower rule family.

# Decisions Made

- Reused `findUnquotedPhraseMatches` instead of adding local quote parsing to `prohibited-phrases`.
- Added `RuleHelper` link skipping to `prohibited-phrases` because link text is citation/navigation text, not prose being judged.
- Kept `at the end of the day` in `cliches`, not `prohibited-phrases`.
- Removed `in light of` and `this point in time` from `cliches` because the reviewed active examples are wordiness cases covered by `wordiness`.
- Did not accept fixture3 output.

# Key Files For Context

- `src/families/phrases/prohibited-phrases.ts`
- `src/families/phrases/data/prohibited-phrases.json`
- `src/families/phrases/data/cliches.json`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `.fixture3/textlint-rules/received.normalized.json`

# Verification

- `npm run validate`
- `scripts/behavior-replay.sh > .fixture3/textlint-rules/received.raw.json`
- `scripts/normalize-textlint-golden-output.py < .fixture3/textlint-rules/received.raw.json > .fixture3/textlint-rules/received.normalized.json`
- `scripts/verify-all.sh`

# Next Steps

- Review the regenerated received output before accepting fixture3 changes.
