# Goal

Create a generated slop corpus and mine it for semantic-thinness slot and pattern candidates.

# Approach

1. Use small delegated agents to generate short slop-heavy prose across several genres.
2. Store the generated corpus under `behavior/fixtures/textlint-rules/generated-slop-corpus/`.
3. Add a local `.textlintrc.json` that enables only `semantic-thinness`.
4. Run the current rule over the corpus.
5. Extract:
   - current semantic-thinness hits
   - repeated sentence openers
   - repeated body-emotion, gaze, atmosphere, realization, stakes, and summary shapes
   - likely misses that should become new slots or new patterns
6. Write a compact mining report under `.plans/`.

# Files To Modify

- `behavior/fixtures/textlint-rules/generated-slop-corpus/.textlintrc.json`
- `behavior/fixtures/textlint-rules/generated-slop-corpus/*.md`
- `.plans/2026-05-13-183302-generated-slop-corpus-mining-report.md`

# Verification

- semantic-thinness-only textlint run over the generated corpus
- no-signal fixture still returns zero messages
