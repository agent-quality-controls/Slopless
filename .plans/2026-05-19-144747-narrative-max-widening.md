# Goal

Widen fiction slop detection for stock prose beyond the existing literal cliche list. Catch more stock voice, breath, smile, glint, gaze, time-passage, foreshadowing, and mixed low-information beats.

# Approach

- Expand `narrative-cliches.json` slots and templates.
- Add `narrative-slop:low-information-beat-density` as a mixed density rule over body, movement, and perception beats.
- Keep single body or movement cues as no-hits unless they occur in a dense cluster.
- Add adversarial no-hit cases with medical, stage, sport, equipment, clue-search, and young-reader pacing controls.
- Export, register, and enable the new rule.

# Widening Manifest

- Narrative cliche templates
  - Bad slots: `a flicker of doubt crossed her face`, `eyes flashed with something unreadable`, `released a breath she did not know she was holding`, `time seemed to slow`.
  - No-hit controls: blue signal light, red stage reflector, diver breath, slow display refresh.
- Low-information beat density
  - Bad slots: `glanced`, `throat`, `tightened`, `stepped`, `eyes`, `found`, `waited`, plus nearby body/action beats.
  - Report threshold: 5 weak beats in a paragraph or short sentence window.
  - No-hit controls: clue search with concrete action words such as `arrow`, `copied`, `gate`, `symbol`, `guards`.

# Audit Result

- Fixture no-hit files: 0 findings.
- Corpus coverage: every case finding is present in corpus output after approval.
- Suppression used: density threshold plus concrete action words for clue-search narration.

# Files To Modify

- `src/rules/narrative-slop/data/narrative-cliches.json`
- `src/rules/narrative-slop/low-information-beat-density.ts`
- `src/registries/narrative-slop.ts`
- `src/presets/everything.ts`
- `package.json`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`

# Verification

- `scripts/verify-maximal-widening.py`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
