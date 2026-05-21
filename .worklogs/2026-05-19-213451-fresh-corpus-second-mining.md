# Summary

Mined the fresh generated corpus after the first rule-expansion pass. Added reviewed hit/no-hit candidates for academic formulas, corporate phrases, semantic thinness, syntactic formulas, and vocabulary density, then wrote a second mining analysis.

# Decisions Made

- Did not implement production rules in this pass.
- Kept em dash behavior out of scope.
- Treated metrics, orthography, and term-policy as low-actionability from this corpus pass.
- Added no-hit controls beside each new candidate group so future widening has concrete false-positive checks.

# Key Files For Context

- `.plans/2026-05-19-212641-fresh-corpus-second-mining.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/analysis/second-rule-mining.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/academic-slop.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/phrases.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/semantic-thinness.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/syntactic-patterns.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/hits/words.md`

# Verification

- `scripts/verify-fresh-corpus-actionability.py`

# Next Steps

- Implement the second-pass expansion candidates in rule order: phrases, semantic-thinness, syntactic-patterns, academic-slop, then words.
