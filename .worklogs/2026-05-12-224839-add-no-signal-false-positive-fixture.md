# Add No-Signal False-Positive Fixture

## Summary

Added a textlint behavior fixture for accepted false-positive boundaries that must produce zero findings. The initial contents cover confirmed `negation-reframe` false positives fixed in the recent matcher passes.

## Decisions Made

- Put the fixture under `behavior/fixtures/textlint-rules/no-signal` so behavior replay treats it as an independent family with an empty baseline.
- Included only confirmed fixed false positives. Word, phrase, and link-label boundary questions are not included because their policy is still undecided.
- Generated `behavior/baselines/textlint-rules/no-signal.json` from `scripts/behavior-replay.sh` so `scripts/behavior-verify.sh` guards the fixture.

## Key Files

- `behavior/fixtures/textlint-rules/no-signal/family.md`
- `behavior/fixtures/textlint-rules/no-signal/fixture.toml`
- `behavior/baselines/textlint-rules/no-signal.json`

## Verification

- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/no-signal/family.md`
- `scripts/behavior-verify.sh`
- `npm run validate`
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`

## Next Steps

- Add future accepted false positives to this fixture only after the corresponding rule boundary is fixed or confirmed clean.
