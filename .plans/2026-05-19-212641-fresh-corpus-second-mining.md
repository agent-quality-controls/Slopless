# Goal

Mine the fresh generated corpus again after the first rule-expansion pass and turn remaining high-signal misses into reviewed hit/no-hit candidates.

# Approach

1. Replay Slopless over `new-corpus/2026-05-19-fresh-slop-expansion`.
2. Extract direct-family misses from `edge-cases/hits`.
3. Read the long `texts` corpus for repeated formulas that are not represented well enough in edge-case files.
4. Add reviewed candidates to `edge-cases/hits` and adversarial controls to `edge-cases/no-hits`.
5. Write a concrete analysis file that maps new candidates to possible rule expansions and false-positive gates.
6. Run `scripts/verify-fresh-corpus-actionability.py`.

# Key Decisions

- Do not implement rule changes in this pass.
- Do not change em dash behavior.
- Treat `metrics`, `orthography`, and `term-policy` as low-actionability here unless they reveal a concrete non-punctuation slop pattern.
- Focus on `semantic-thinness`, `phrases`, `syntactic-patterns`, `academic-slop`, and `words`.

# Files To Modify

- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/*.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/no-hits/*.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/analysis/second-rule-mining.md`

# Verification

- `scripts/verify-fresh-corpus-actionability.py`
