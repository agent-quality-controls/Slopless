# Rules Reporting Refactor

## Summary

Refactored the Textlint rule implementation tree from `src/families` to `src/rules` and added `src/reporting` for shared reporting policies. Moved density-window logic out of narrative rule files so those rules now detect candidate cues while `reporting/report-density.ts` decides whether density is high enough to report.

## Decisions Made

- `src/rules/*` is now the canonical rule implementation path because rule files are runnable Textlint rules, not family-owned architecture.
- `src/reporting/*` owns cross-rule reporting policy because density thresholds should be independent from a specific rule family.
- Package exports now use `./rules/*` and `./dist/rules/*`; old `./families/*` exports were removed to avoid two public names for the same implementation.
- Existing plan manifests and verification scripts were updated where they encode live source paths. Historical plans and worklogs are not treated as source of truth by the architecture verifier.
- Rebase integration updated the new community contributing guide to point contributors at `src/rules` and removed a README badge URL that violated the split-slopless verifier's forbidden text check.

## Key Files

- `src/rules/`
- `src/reporting/report-density.ts`
- `src/reporting/types.ts`
- `src/rules/narrative-slop/body-action-density.ts`
- `src/rules/narrative-slop/perception-verb-density.ts`
- `scripts/verify-rules-reporting-architecture.py`
- `scripts/behavior-replay.sh`
- `package.json`

## Verification

- `scripts/verify-rules-reporting-architecture.py`
- `scripts/verify-all.sh`
- `npm run validate`
- `scripts/fixture3.sh check --suite textlint-rules`

## Next Steps

- Use `src/reporting` for any later cross-rule report policy, especially if more rules need density or sequence gates.
