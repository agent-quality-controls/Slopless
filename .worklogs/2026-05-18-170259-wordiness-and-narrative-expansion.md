# Wordiness And Narrative Expansion

## Summary

Implemented the first two remaining researched categories: wordiness/redundancy expansion and fiction/narrative slop expansion. Added source-backed data, fixtures, corpus coverage, Fixture3 approved output, bookkeeping, and a manifest verifier.

## Decisions Made

- Added only exact multiword wordiness and redundancy phrases because broad one-word replacements need context.
- Kept ordinary fiction cues density-gated in `body-action-density` so a single breath, feeling, smile, or gaze cue does not report by itself.
- Added only narrow one-to-one narrative cliche templates for omniscient foreshadowing, tentative hope, and inflated time passage.
- Moved new case lines to the end of case files so existing preserve metadata stayed stable.

## Key Files For Context

- `.plans/2026-05-18-164928-wordiness-and-narrative-expansion.md`
- `.plans/2026-05-18-164928-wordiness-and-narrative-expansion.md.manifest.toml`
- `scripts/verify-wordiness-and-narrative-expansion.py`
- `src/rules/phrases/data/wordiness-patterns.json`
- `src/rules/phrases/data/redundancy-patterns.json`
- `src/rules/narrative-slop/body-action-density.ts`
- `src/rules/narrative-slop/data/narrative-cliches.json`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `legacy/source-material/expansion-2026-05-18/implemented/2026-05-18-wordiness-and-narrative-expansion.md`

## Verification

- `scripts/verify-all.sh` passed.
- `scripts/fixture3.sh check --suite textlint-rules` passed with `status: matched`.
- `npm run validate` passed.

## Next Steps

- Continue with the remaining active research queue: formal transition density, uncited authority, and repeated sentence starts.
