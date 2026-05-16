# Generated Slop Corpus Mining Report

## Corpus

- Path: `behavior/fixtures/textlint-rules/generated-slop-corpus/`
- Files: 30
- Word range: 290-444 words per file
- Total forms: story, article, essay, vignette, noir, horror, workplace, classroom, fantasy, memoir, puzzle, product, travel, sports, science explainer

## Current Rule Result

Semantic-thinness-only run:

- Files: 30
- Findings: 1

Only hit:

```text
behavior/fixtures/textlint-rules/generated-slop-corpus/batch-c-06.md:11
The room looked unchanged.
Semantic thinness (empty-scene-state): Catch short scene-setting lines that name a place or scene element and assign an empty state without action, cause, or concrete detail. Matched template: {placeSubject} {linkingVerb} {thinState}.
```

Conclusion: the current template matcher works, but the current templates are too narrow for generated slop prose.

## Full Ruleset Result

Full textlint replay over the generated corpus:

- Total findings: 128
- `paragraph-length`: 33
- `triple-repeat`: 31
- `sentence-case`: 18
- `negation-reframe`: 15
- `fragment-stacking`: 13
- `demonstrative-emphasis`: 6
- `semantic-thinness`: 1

Existing syntactic rules catch surface cadence well. Semantic-thinness needs broader phrase shapes.

## High-Value Candidate Patterns

### `real-work-begins`

Problem: announces importance or maturity with "the real work begins" instead of naming the action.

Examples:

```text
People spend years chasing better systems, better habits, better teams, and better outcomes, but the real work begins when they stop hiding behind noise and start naming what matters.
They knew the real work begins after the excitement fades and the system has to earn its place.
```

Template candidates:

```text
{realWorkSubject} begins when {genericSubject} {abstractAction}.
{realWorkSubject} begins after {abstractEvent} {fadesVerb}.
{realWorkSubject} begins where {genericWork} {startVerb}.
```

Slots:

- `realWorkSubject`: `the real work`, `the actual work`, `the deeper work`, `the hard work`
- `abstractAction`: `start naming what matters`, `stop hiding behind noise`, `learn to listen`, `choose clarity`, `do the hard thing`
- `abstractEvent`: `the excitement`, `the noise`, `the moment`, `the launch`, `the drama`
- `fadesVerb`: `fades`, `settles`, `ends`, `passes`

### `that-is-the-part`

Problem: generic evaluative pronouncement.

Examples:

```text
That is the part nobody wants to hear because it sounds too simple, yet simple is often the only thing that survives contact with reality.
That is the real promise, and it is enough.
That is the strange truth no one says out loud soon enough.
That is the lesson, and it applies more widely than people think.
This is the part fans love because it feels emotional in a clean way.
```

Template candidates:

```text
{deicticSubject} {linkingVerb} the {evaluativeNoun} {genericAudience} {reactionVerb}.
{deicticSubject} {linkingVerb} the {evaluativeNoun}, and {genericSubject} {thinPredicate}.
{deicticSubject} {linkingVerb} the {evaluativeAdjective} {summaryNoun}.
```

Slots:

- `deicticSubject`: `that`, `this`, `it`
- `evaluativeNoun`: `part`, `promise`, `truth`, `lesson`, `point`, `reward`, `nature`
- `genericAudience`: `nobody`, `people`, `fans`, `everyone`, `most people`
- `reactionVerb`: `wants to hear`, `loves`, `misses`, `forgets`, `avoids`
- `evaluativeAdjective`: `real`, `strange`, `deeper`, `hard`, `quiet`, `simple`

### `something-shifted`

Problem: declares an abstract change without naming what changed.

Examples:

```text
Something had shifted.
Ana took one step forward, then another, and understood in a very general way that whatever happened next would probably be described later as the moment everything changed.
But something in the arrangement of the day had shifted, and she could feel it in the way people turned, paused, purchased, and moved on as if all of them were carrying a private understanding they had not yet shared.
The room did not change, but something in it did, and she knew without knowing how that the house had been waiting for her to ask the wrong question.
```

Template candidates:

```text
{genericSubject} had {changeVerb}.
{genericSubject} in {abstractContainer} had {changeVerb}.
{concreteSubject} did not {changeVerb}, but {genericSubject} in it did.
{humanSubject} understood in {weakEpistemicPhrase} that {futureMoment} {changeVerb}.
```

Slots:

- `genericSubject`: `something`, `everything`, `the room`, `the day`, `the moment`, `the arrangement`
- `changeVerb`: `shifted`, `changed`, `moved`, `turned`, `crossed a line`
- `abstractContainer`: `it`, `the room`, `the day`, `the arrangement`, `the moment`
- `weakEpistemicPhrase`: `a very general way`, `some vague way`, `a total way`, `a way she could not name`

### `felt-the-small-shift`

Problem: stock interior sensation announces character change without concrete thought or choice.

Examples:

```text
Talia closed her notebook, stood up, and felt the small shift inside herself that comes when a day stops being a sequence of tasks and starts becoming something you might remember later.
She felt the old familiar stir of caution, the newer, less useful stir of curiosity, and beneath both, the plain recognition that an ordinary afternoon had already slipped into another shape.
By the time she reached the wall, she felt hollowed out in a way that made every sensation seem slightly too loud.
Jules could not have said why, but the morning now felt like a message addressed to him alone.
```

Template candidates:

```text
{humanSubject} felt the {weakAdjective} {interiorNoun} {insidePhrase}.
{humanSubject} felt {hollowState} in a way that {genericEffect}.
{sceneSubject} felt like {abstractMessage}.
```

Slots:

- `weakAdjective`: `small`, `old`, `familiar`, `quiet`, `strange`, `newer`, `less useful`
- `interiorNoun`: `shift`, `stir`, `certainty`, `pressure`, `recognition`, `ache`
- `insidePhrase`: `inside herself`, `inside himself`, `inside them`, `under the fear`
- `hollowState`: `hollowed out`, `empty`, `far away`, `small`, `unsteady`
- `abstractMessage`: `a message`, `a warning`, `an omen`, `a sign`, `a test`

### `silence-as-actor`

Problem: silence/quiet becomes an abstract actor without concrete sound, source, or action.

Examples:

```text
She was a woman who could make silence feel crowded.
The silence was not empty.
This only made the silence feel more deliberate.
It only made the silence feel arranged.
By Thursday the office had gone quiet in the way offices do when everyone is pretending not to notice the deadline.
```

Template candidates:

```text
{silenceSubject} {linkingVerb} not {thinState}.
{deicticSubject} only made {silenceSubject} feel {thinState}.
{placeSubject} had gone quiet in {mannerFrame}.
{humanSubject} could make {silenceSubject} feel {thinState}.
```

Slots:

- `silenceSubject`: `the silence`, `silence`, `the quiet`, `the room`, `the office`
- `thinState`: `empty`, `crowded`, `deliberate`, `arranged`, `heavy`, `strange`, `loud`
- `mannerFrame`: `the way offices do`, `the way rooms do`, `the way old houses do`

### `edge-of-something`

Problem: declares significance with a vague threshold image.

Examples:

```text
It was full of the sort of feeling that hangs around when children think they are standing at the edge of something bigger than a game.
Only the same old promise that the realm was on the edge of something and that only the chosen would understand what to do when the time arrived.
All of it seemed to be pointing at something larger than itself.
```

Template candidates:

```text
{genericSubject} stood at the edge of {vagueMagnitude}.
{genericSubject} was on the edge of {vagueMagnitude}.
{genericSubject} pointed at {vagueMagnitude}.
```

Slots:

- `vagueMagnitude`: `something bigger`, `something larger`, `something deeper`, `something more`, `something larger than itself`

### `truth-surfaces`

Problem: truth moves like a generic object instead of naming the fact.

Examples:

```text
Eventually the truth surfaces.
Everything looked ordinary in the way an ordinary crime scene always does before the truth starts moving around.
Each answer came with its own tiny pause, the kind people use when they are checking whether the truth will be allowed to stay small.
```

Template candidates:

```text
{truthSubject} {emergenceVerb}.
{truthSubject} starts {motionVerb}.
{humanSubject} checked whether {truthSubject} would be allowed to {thinAction}.
```

Slots:

- `truthSubject`: `the truth`, `the answer`, `the pattern`, `the meaning`
- `emergenceVerb`: `surfaces`, `arrives`, `appears`, `emerges`
- `motionVerb`: `moving around`, `taking shape`, `showing itself`
- `thinAction`: `stay small`, `come out`, `be seen`, `matter`

## Existing Slots Worth Expanding

### `empty-scene-state`

Add:

- `the office`
- `the market`
- `the station`
- `the classroom`
- `the hallway`
- `the courtyard`
- `the street`
- `the world`

Add states:

- `arranged`
- `crowded`
- `deliberate`
- `unchanged`
- `farther away`
- `under control`

### `body-emotion-shorthand`

Add body subjects:

- `the body`
- `the mind`
- `her expression`
- `his expression`
- `her voice`
- `his voice`

Add sensation nouns:

- `alarm`
- `certainty`
- `pressure`
- `recognition`
- `stir`
- `ache`
- `haze`

### `gaze-choreography`

Add shapes:

- `{humanSubject} looked toward {gazeTarget}, then back to {gazeTarget}.`
- `{humanSubject} stared at {objectSubject} as if {abstractPossibility}.`
- `{gazeSubject} fixed on {gazeTarget}.`
- `{gazeSubject} moved from {gazeTarget} to {gazeTarget}.`

Add targets:

- `the edge of the desk`
- `the porch steps`
- `the notebook pages`
- `the station wall`
- `the glass`
- `the floor`

## Next Implementation Batch

Highest-confidence additions:

1. `that-is-the-part`
2. `something-shifted`
3. `silence-as-actor`
4. `real-work-begins`
5. `truth-surfaces`

Lower-confidence additions:

1. `felt-the-small-shift`
2. `edge-of-something`

Reason: the high-confidence group has clear formulaic phrase shapes and low reliance on broad word lists. The lower-confidence group needs stronger reject gates to avoid catching legitimate interiority or fantasy language.

## Persona Expansion

Second generated batch:

- Added 30 files: `batch-d-01.md` through `batch-f-10.md`
- Total generated corpus: 60 files
- Total words: 20,642
- Word range: 255-444 words per file
- Persona targets:
  - yoga/wellness/breathwork/spiritual coach
  - LinkedIn founder/productivity/product marketing/executive coach
  - literary/spiritual/mythic/grief/horror narrator

Semantic-thinness-only run over all 60 generated files:

- Findings: 5

Hits:

```text
batch-c-06.md: The room looked unchanged.
batch-e-03.md: The lesson is simple.
batch-e-05.md: That is the part that matters.
batch-e-09.md: The lesson is simple.
batch-f-02.md: The air felt different.
```

Full ruleset run over all 60 generated files:

- Total findings: 357
- `triple-repeat`: 99
- `negation-reframe`: 60
- `paragraph-length`: 59
- `sentence-case`: 38
- `fragment-stacking`: 24
- `demonstrative-emphasis`: 19
- `affirmation-closers`: 13
- `generic-signposting`: 8
- `semantic-thinness`: 5

Conclusion: existing syntactic rules catch generated cadence, but semantic-thinness still needs phrase-shape templates with partial matching. Exact full-sentence templates are not enough.

## Persona Expansion Candidate Counts

Detected candidate families in the 60-file corpus:

- `deictic-summary`: 73
- `real-work`: 4
- `something-shifted`: 10
- `silence-actor`: 11
- `truth-answer-moves`: 4
- `edge-of-something`: 5
- `body-knows`: 6
- `nervous-system`: 1

Most repeated openings:

```text
30  that is the
11  that is the part
9   the point is
9   the point was
7   that is the lesson
6   that is where
6   it is about
5   that is the part that
4   the real work
4   the lesson is
4   the point is not to
4   it can look like
3   the invitation is
3   sometimes the answer
3   before there was
3   after there is
```

High-confidence implementation additions from the persona batch:

1. `deictic-summary`
   - Catches `that/this/it is the part/truth/lesson/point/reward...`
   - Best evidence: 73 candidates, 30 `that is the` openings.

2. `point-is-frame`
   - Catches `the point is not...`, `the point is to...`, `the point was not...`
   - Best evidence: 18 repeated `point is/was` openings.

3. `real-work-begins`
   - Catches `the real work begins...`, `where the work begins...`
   - Best evidence: 4 exact family hits, low ambiguity in generated slop.

4. `something-shifted`
   - Catches `something shifted`, `something in the room had shifted`, `everything changed`.
   - Best evidence: 10 candidates.

5. `silence-actor`
   - Catches `the silence was not empty`, `made the silence feel arranged`, `the office had gone quiet`.
   - Best evidence: 11 candidates.

6. `body-knows`
   - Catches wellness-specific body wisdom abstractions: `the body knows`, `the body learns`, `the body notices`.
   - Best evidence: 6 candidates plus high relevance to yoga/wellness slop.

7. `truth-answer-moves`
   - Catches `the truth surfaces`, `the answer arrives`, `the meaning arrives`.
   - Best evidence: 4 candidates, high precision.

Lower-confidence but useful later:

- `edge-of-something`
- `felt-the-small-shift`
- `nervous-system-knows`

Reason: these need broader phrase-tail matching and stronger rejection gates. They are real slop signals, but they are easier to overmatch in literary prose.
