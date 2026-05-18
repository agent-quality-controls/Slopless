# Slop Source Analysis Plan

## Summary

Added a plan for analyzing the extracted source material and deciding what Slopless should build next. This commit does not execute the analysis and does not change product code or fixtures.

## Decisions Made

- Kept the plan as analysis-only because implementation selection needs a full candidate ledger first.
- Required four decision states: `build-now`, `fixture-only`, `source-only`, and `reject`.
- Required concrete false-positive examples and deterministic implementation shape before any candidate can be selected for implementation.

## Key Files For Context

- `.plans/2026-05-18-130253-slop-source-analysis-selection.md`
- `legacy/source-material/expansion-2026-05-18/`

## Next Steps

- Execute the plan in a separate analysis pass.
- Do not implement rules or change fixtures until the candidate ledger and build-now list are reviewed.
