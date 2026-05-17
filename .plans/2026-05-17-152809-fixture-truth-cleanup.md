# Goal

Make fixture truth coherent before accepting any new fixture output.

The end state:

- Every line that is a legitimate rule hit lives in the relevant `hits.md`.
- Every line in `no-hits.md` is clean for the rule family it is meant to test.
- Each moved or newly classified hit also appears in corpus text as cohesive prose.
- Preserve files still prove that cases are represented in corpus.
- Fixture output is regenerated only for review, not accepted.

# Approach

1. Inventory current no-hit findings from `.fixture3/textlint-rules/received.normalized.json`.
2. Split fixes by fixture family and corpus file.
3. Move real positives into the right hit files:
   - `semantic-thinness/no-hits.md:47` -> semantic thinness hit material.
   - `syntactic-patterns/no-hits.md:57`, `71`, `73`, `89` -> syntactic pattern hit material where useful.
4. Rewrite no-hit fixtures that accidentally trigger unrelated rules:
   - metrics no-hit lines that repeat `We`.
   - readability-heavy academic and term-policy no-hit files.
   - semantic no-hit lines that trigger cross-family syntax rules.
5. Add cohesive corpus paragraphs and preserve entries for moved/newly classified material.
6. Regenerate received output only.
7. Run:
   - `npm run validate`
   - `scripts/verify-all.sh`
   - a no-hit scanner over all `no-hits.md` files

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/academic-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/metrics/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/hits.md`
- `behavior/fixtures/textlint-rules/cases/semantic-thinness/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/cases/term-policy/no-hits.md`
- relevant corpus `.md` and `.preserve.json` files

# Non-Goals

- Do not change golden output.
- Do not accept fixture3 output.
- Do not change rule logic unless fixture cleanup proves a rule bug remains.
