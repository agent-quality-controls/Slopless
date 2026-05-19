# Goal

Widen semantic-thinness templates as far as the current architecture can safely support. The rule should catch embedded abstract-personification, emotion-substance, silence-actor, truth/answer movement, real-work payoff, and point/lesson frame slop while preserving concrete no-hit controls.

# Approach

- Expand slot lists for the target patterns instead of adding exact sentences.
- Move `emotion-as-substance` to `contains` mode so it catches embedded clauses.
- Keep broad semantic patterns behind concrete-evidence and cause gates.
- Add adversarial hit cases for embedded slop.
- Add no-hit cases with the same surface grammar but concrete cause, measurement, object, time, record, or literal meaning.
- Preserve every new case line in topic-relevant corpus prose.

# Widening Manifest

- `abstract-personification-line`
  - Bad slots: `doubt`, `shame`, `certainty`, `hope`, `pressure`; `the call`, `the review`, `the table`.
  - Hit shape: abstract state enters or moves through a social space.
  - No-hit shape: the same grammar with concrete evidence such as auditor, signatures, billing email, or named owner.
- `emotion-as-substance`
  - Bad slots: `relief`, `certainty`, `confusion`; `washed`, `tightened`, `spread`, `moved`; `the group`, `the team`.
  - Hit shape: emotion behaves like liquid, weight, or pressure.
  - No-hit shape: literal fluid, physical measurement, or explicit cause.
- `silence-as-actor`
  - Bad slots: `silence became heavy`, `silence turned strange`, `the room became empty`.
  - Hit shape: silence or room state replaces concrete action.
  - No-hit shape: acoustic measurement or a named sound source.
- `truth-answer-moves`
  - Bad slots: `answer`, `truth`, `pattern`, `meaning`; `arrived`, `emerged`, `surfaced`; `small signal`.
  - Hit shape: answer/truth arrives without the actual answer.
  - No-hit shape: answer arrives by signed email or named evidence.
- `real-work-begins` and `point-is-frame`
  - Bad slots: `began`, `started`, `happened`, `lived`; `control`, `clarity`, `certainty`, `performance`.
  - Hit shape: announces the real work or the point without saying the work or point.
  - No-hit shape: literal crew time, trial control group, or named technical work.

# Audit Result

- Fixture no-hit files: 0 findings after concrete-evidence gating.
- Corpus coverage: every case finding is present in corpus output after approval.
- Suppression used: broad semantic patterns now reject concrete evidence tokens and concrete causal summaries.

# Files To Modify

- `src/rules/semantic-thinness/patterns/abstract-personification-line.json`
- `src/rules/semantic-thinness/patterns/emotion-as-substance.json`
- `src/rules/semantic-thinness/patterns/silence-as-actor.json`
- `src/rules/semantic-thinness/patterns/truth-answer-moves.json`
- `src/rules/semantic-thinness/patterns/real-work-begins.json`
- `src/rules/semantic-thinness/patterns/point-is-frame.json`
- `src/rules/semantic-thinness/private/concrete-guards.ts`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`

# Verification

- `scripts/verify-maximal-widening.py`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
