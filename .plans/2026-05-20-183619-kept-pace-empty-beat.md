# Goal

Catch `kept pace` when it is used as an empty narrative movement beat in Liska/Cassia prose.

# Approach

- Add a failing hit case for `Cassia kept pace` inside the Liska yard-compound sequence.
- Add no-hit controls where `kept pace` has a concrete object, measurement, or explicit purpose.
- Extend `narrative-slop:empty-beat`, because this is another single-sentence filler movement beat.
- Mirror the new cases into `narrative-scenes.md` and update the preserve ledger.
- Approve only the narrative fixture output after reviewing the changed findings.

# Key Decisions

- Do not create a new rule. The issue is filler movement, not a new prose family.
- Do not add `kept` broadly. `kept her eyes on...` is a separate looking/perception pattern and should not be caught by an empty-beat shortcut.
- Keep literal pace contexts as no-hits, including timing, music, running, and explicit purpose.

# Files To Modify

- `src/rules/narrative-slop/empty-beat.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- Narrative fixture golden files after review.
