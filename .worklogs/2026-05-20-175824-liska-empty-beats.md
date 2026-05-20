# Summary

Added `narrative-slop:empty-beat` to catch strong empty hesitation, placeholding, and animal body-tag beats. Added the two Liska examples to hit cases and mirrored them into the narrative corpus with no-hit controls for concrete purpose and physical cause.

# Decisions Made

- Kept the rule in `narrative-slop` because the issue is prose motion and body shorthand, not abstract semantic thinness.
- Made the rule one-to-one for strong single beats instead of changing existing density rules.
- Guarded concrete purpose or cause with markers such as `to`, `because`, `until`, and `when`.
- Left the current G3TS-generated package/npmrc/debug files uncommitted because they belong to the separate G3TS debugging thread.

# Key Files For Context

- `.plans/2026-05-20-175252-liska-empty-beats.md`
- `src/rules/narrative-slop/empty-beat.ts`
- `src/registries/narrative-slop.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`

# Verification

- `pnpm run build`
- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run lint:css`
- `pnpm run typecov`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-all.sh`
- `node dist/cli.js --stdin --stdin-filename liska-probe.md`

# Next Steps

- If more Liska prose produces similar misses, add them to `empty-beat` only when they are strong one-to-one findings; keep weaker repeated movement in the existing density rules.
