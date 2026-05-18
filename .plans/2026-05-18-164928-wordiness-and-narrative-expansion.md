# Wordiness And Narrative Expansion

## Goal

Implement the next two researched categories:

- wordiness and redundancy expansion
- fiction slop and narrative cliche expansion

The end state is source-backed rule coverage, fixture cases, corpus prose, Fixture3 output, bookkeeping, and deterministic verification.

## Approach

1. Expand existing phrase data, not rule code, for closed wordiness and redundancy pairs.
   - Modify `src/rules/phrases/data/wordiness-patterns.json`.
   - Modify `src/rules/phrases/data/redundancy-patterns.json`.
   - Do not add broad one-word replacements such as `methodology` or `functionality`.
   - Do not duplicate entries already covered by `phrases:wordiness`, `phrases:redundancy`, `words:simplicity`, or `words:prohibited-words`.

2. Expand narrative source-backed cues without turning every ordinary fiction action into a standalone error.
   - Modify `src/rules/narrative-slop/body-action-density.ts` for density-gated cue phrases.
   - Modify `src/rules/narrative-slop/data/narrative-cliches.json` for high-confidence stock narrative phrases that are safe as one-to-one reports.
   - Keep broad breath, heart, voice, smile, and gaze actions density-gated where single use can be normal.

3. Add fixture cases.
   - Add minimal hit lines to `behavior/fixtures/textlint-rules/cases/phrases/hits.md`.
   - Add no-hit lines to `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`.
   - Add minimal hit lines to `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`.
   - Add no-hit lines to `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`.

4. Add corpus coverage.
   - Add topic-relevant prose to existing corpus files so corpus coverage includes the new cases in flowing text.
   - Prefer `editorial-style.md` for phrase linting.
   - Prefer `narrative-scenes.md` for narrative cues.

5. Update research bookkeeping.
   - Add an implemented archive file under `legacy/source-material/reviewed/implemented/`.
   - Update `legacy/source-material/reviewed/implemented/incorporation-record.md`.

6. Add deterministic verification.
   - Add `scripts/verify-wordiness-and-narrative-expansion.py`.
   - The verifier checks source data, fixtures, corpus, and bookkeeping.

## Key Decisions

- Use exact phrases for wordiness and redundancy because those sources are low-risk when the phrase itself is redundant.
- Reject broad one-word replacements because they need domain and sentence context.
- Use density for ordinary narrative physical cues because one breath, look, or smile is not automatically slop.
- Use one-to-one narrative cliche reports only for stock phrases that are strongly formulaic.

## Files To Modify

- `src/rules/phrases/data/wordiness-patterns.json`
- `src/rules/phrases/data/redundancy-patterns.json`
- `src/rules/narrative-slop/body-action-density.ts`
- `src/rules/narrative-slop/data/narrative-cliches.json`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`
- `legacy/source-material/reviewed/implemented/2026-05-18-wordiness-and-narrative-expansion.md`
- `scripts/verify-wordiness-and-narrative-expansion.py`
