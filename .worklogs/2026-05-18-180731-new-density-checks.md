# New Density Checks

## Summary

Implemented the planned syntactic checks for formal transition density, repeated sentence starts, and uncited authority. Added case and corpus fixture coverage, accepted Fixture3 output, and added a manifest verifier for this plan.

## Decisions Made

- Kept formal transitions density-gated because one transition opener is normal.
- Kept repeated sentence starts density-gated, but the detector only emits frames that repeat in the paragraph so unrelated starts do not satisfy the reporting policy.
- Kept uncited authority one-to-one, with named-source, citation, and minimum-length guards to avoid short banal statements and cited claims.
- Moved new case lines to the end of `syntactic-patterns/hits.md` after preserve verification caught line-number drift from an earlier middle insertion.

## Key Files For Context

- `.plans/2026-05-18-171548-new-density-checks.md.manifest.toml`
- `scripts/verify-new-density-checks.py`
- `src/rules/syntactic-patterns/lead-ins/formal-transition-density.ts`
- `src/rules/syntactic-patterns/repetition/repeated-sentence-starts.ts`
- `src/rules/syntactic-patterns/authority/uncited-authority.ts`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/hits.md`
- `behavior/fixtures/textlint-rules/cases/syntactic-patterns/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/engineering-review.md`
- `behavior/fixtures/textlint-rules/corpus/health-and-parenting.md`

## Verification

- `scripts/verify-new-density-checks.py` passed.
- `scripts/verify-all.sh` passed.
- `scripts/fixture3.sh check --suite textlint-rules` passed with `status: matched`.
- `npm run validate` passed.

## Next Steps

- Review the next remaining source categories before adding more rules.
