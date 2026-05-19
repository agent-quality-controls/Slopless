# Goal

Implement the mined fresh-corpus rule candidates except spaced em dashes.

# Approach

1. Add reviewed hit and no-hit controls to behavior cases and topic corpus prose.
2. Expand corporate phrase formulas through phrase lists and token templates.
3. Add a same-sentence narrative beat-chain density detector.
4. Add a narrow `not because X, but because Y` syntactic detector.
5. Expand AI vocabulary density only, not one-to-one vocabulary reporting.
6. Add academic formula frame detection with constrained templates.
7. Add semantic abstract-agency/personification patterns with concrete no-hit controls.
8. Approve fixture3 output after reviewing no-hit behavior.

# Decisions

- Do not touch em dash behavior.
- Do not add new one-word prohibited words.
- Broad words only count toward `llm-vocabulary-density`.
- Metrics and term-policy remain unchanged.
- New semantic and academic checks must be slot/template based, not exact sentence lists.

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/academic-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/academic-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/hits.md`
- `behavior/fixtures/textlint-rules/cases/phrases/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/words/hits.md`
- `behavior/fixtures/textlint-rules/cases/words/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.md`
- `behavior/fixtures/textlint-rules/corpus/editorial-style.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.preserve.json`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- `src/rules/academic-slop/*`
- `src/rules/phrases/data/*`
- `src/rules/narrative-slop/*`
- `src/rules/syntactic-patterns/contrast/*`
- `src/rules/semantic-thinness/patterns/*`
- `src/rules/words/llm-vocabulary-density.ts`

# Verification

- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`
