# Summary

Expanded the `cliches` phrase data from the larger Vale proselint cliche list.

The lexicon now has 771 literal entries after deduplication, regex-token expansion, and the existing unsafe `pain in the` exclusion.

# Decisions Made

- Added the Vale `proselint/proselint/Cliches.yml` source beside the existing `no-cliches` source because it is the larger cliche list we had not fully imported.
- Kept `pain in the` excluded because it was already documented as a known false-positive source for literal medical prose.
- Expanded `whet (?:the|your) appetite` into `whet the appetite` and `whet your appetite` because Slopless phrase matching uses literal phrase tokens, not regex data.
- Added one expected-hit fixture for `on the same page` and one expected-no-hit fixture for `pain in the neck`.
- Added both new fixture lines to the editorial corpus and approved the updated fixture3 golden output.

# Key Files For Context

- `src/families/phrases/data/cliches.json`
- `src/families/phrases/data/cliches.source.md`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/golden/textlint-rules/approved.normalized.json`

# Verification

- `npm run validate`
- `fixture3 check --suite textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-split-slopless.py`
- Local source comparison: zero missing Vale proselint cliche entries after regex-token expansion and the documented `pain in the` exclusion.

# Next Steps

- Commit and push the lexicon and fixture update.
