# Goal

Widen syntactic slop frames broadly enough to catch less literal LLM/posting formulas: summative closers, affirmation closers, boilerplate endings, lesson wrappers, and observer bridges.

# Approach

- Expand slot nouns, adjectives, and verbs in existing rules.
- Add broader but gated formulas:
  - `that/this is what makes...`
  - `this/that is why...`
  - `the lesson here is...`
  - `the practical takeaway is...`
  - `watch how...`
  - `you can see it everywhere...`
- Preserve concrete no-hits with named facts, measurements, table references, literal observations, or implementation details.
- Do not add a new syntactic family.

# Widening Manifest

- Summative closers
  - Bad slots: `that is what makes`, `this is what makes`, `this is why it works`, `the practical takeaway is`.
  - No-hit controls: motor rotation, token expiry, table reference, voltage/fuse, microscope/dye.
- Affirmation closers
  - Bad slots: `key`, `point`, `the real shift`, `whole point`, `thing`, `answer`.
  - No-hit controls: concrete implementation summaries reject before formula reporting.
- Boilerplate conclusions
  - Bad slots: `method`, `powerful`, `practical takeaway`, `the point was`.
  - No-hit controls: concrete summary tokens and numeric evidence.
- Lesson framing
  - Bad slots: `the lesson here is`, `the lesson here is clear`, `the takeaway is clear`.
  - No-hit controls: signing key rotation and concrete implementation summaries.
- Observer guidance
  - Bad slots: `watch how`, `watch how the frame changes`, `you can see it everywhere now`.
  - No-hit controls: voltage change, microscope slide, and concrete observation details.

# Audit Result

- Fixture no-hit files: 0 findings.
- Corpus coverage: exact boilerplate case findings required tail-position duplication in corpus.
- Suppression used: concrete implementation tokens, numeric evidence, colon evidence, and domain objects.

# Files To Modify

- `src/rules/syntactic-patterns/closers/summative-closer.ts`
- `src/rules/syntactic-patterns/closers/affirmation-closers.ts`
- `src/rules/syntactic-patterns/closers/boilerplate-conclusion.ts`
- `src/rules/syntactic-patterns/lead-ins/lesson-framing.ts`
- `src/rules/syntactic-patterns/lead-ins/observer-guidance.ts`
- `src/shared/matchers/concrete-evidence.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`

# Verification

- `scripts/verify-maximal-widening.py`
- `scripts/fixture3.sh check --suite textlint-rules`
- `scripts/verify-all.sh`
- `npm run validate`
