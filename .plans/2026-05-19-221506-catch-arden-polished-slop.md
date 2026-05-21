# Goal

Make Slopless catch the three Arden chapter slop signals the user classified, without adding new rule families.

# Approach

1. Copy the current chapter draft into corpus fixtures as a stable repo-formatted snapshot.
2. Add the two negation misses and adversarial no-hit controls to `syntactic-patterns` cases.
3. Add the semantic-thinness cluster and adversarial no-hit controls to `semantic-thinness` cases.
4. Add preserve metadata for the copied chapter hit cases and for added controls.
5. Expand `syntactic-patterns:negation-reframe` for:
   - "It wasn't just a sound; it was a vibration..."
   - "Bella didn't wait."
6. Expand `semantic-thinness` patterns for:
   - "Silence filled the yard."
   - "Everyone went quiet."
7. Do not implement the other lines from the draft in this pass.
8. Run the named draft through the local source CLI and verify the new findings.

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/arden-chapter-1-polished.md`
- `behavior/fixtures/textlint-rules/corpus/arden-chapter-1-polished.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- `behavior/golden/textlint-rules-*`
- `fixture3.yaml`
- `src/rules/semantic-thinness/patterns/empty-scene-state.json`
- `src/rules/syntactic-patterns/contrast/private/negation-reframe-matcher.ts`

# Verification

- `pnpm run build`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`
- `node dist/cli.js /Users/tartakovsky/Projects/writing/sunstone/context/arden_and_cassia/books/book_1/drafts/chapter_1_polished.md`
