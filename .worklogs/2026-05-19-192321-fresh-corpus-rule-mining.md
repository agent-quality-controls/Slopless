# Summary

Mined the restored fresh generated corpus against the current Slopless rules and wrote the next rule-candidate report. The report separates implementable expansion candidates from fixture-shape issues and high-risk ideas.

# Decisions Made

- Ranked spaced em dash, corporate phrase formulas, same-sentence narrative beat chains, not-because/because frames, vocabulary density expansion, academic formula frames, and abstract agency/personification as the next implementable candidates.
- Rejected metrics threshold changes from this evidence because the misses are semantic/syntactic slop, not numeric readability failures.
- Rejected term-policy behavior changes because the misses come from document-level configured policy shape.
- Kept single-word bans out of scope; vocabulary expansion should go through density with contextual guards.

# Key Files For Context

- `.plans/2026-05-19-191729-fresh-corpus-rule-mining.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/analysis/next-rule-mining.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/`
- `scripts/verify-fresh-slop-corpus.py`
- `scripts/verify-fresh-corpus-actionability.py`

# Next Steps

- Implement the candidates in ranked order, starting with spaced em dash and corporate phrase formulas.
- Before widening each family, add the listed no-hit controls to behavior fixtures and corpus prose.
