# Summary

Replaced the first-pass fresh corpus analysis with a line-level review based on separate Slopless runs for generated long texts and generated edge cases. The corrected review states that generated corpus material is excluded from spellcheck only, not from Slopless review or feature mining.

# Decisions Made

- Removed the earlier aggregate command that scanned README and analysis Markdown alongside generated corpus files.
- Recorded the correct review inputs: `texts/**/*.md` and `edge-cases/**/*.md`.
- Separated long-text behavior from edge-case behavior because several generated edge-case files do not match the rule shapes they were meant to test.
- Marked metrics, term-policy, isolated narrative cases, and broad single-word expansion as invalid next targets from this evidence.

# Key Files For Context

- `new-corpus/2026-05-19-fresh-slop-expansion/analysis/initial-expansion-ideas.md`
- `new-corpus/2026-05-19-fresh-slop-expansion/texts/`
- `new-corpus/2026-05-19-fresh-slop-expansion/edge-cases/`
- `scripts/verify-fresh-slop-corpus.py`

# Verification

- `scripts/verify-fresh-slop-corpus.py`
- `pnpm run validate`

# Next Steps

- Plan implementation around semantic-thinness template expansion, phrase and syntactic lead-in expansion, negation-reframe guard cleanup, and academic boilerplate.
- Do not promote generated edge cases into behavior fixtures until each family file is reshaped to match the rule behavior being tested.
