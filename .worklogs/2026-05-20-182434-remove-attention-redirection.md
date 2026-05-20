# Summary

Removed `narrative-slop:attention-redirection` because the Cassia/Remal example is a perception-density problem, not a separate rule family concept. Added focus/focused forms to `perception-verb-density` so the existing density policy catches `looked` plus `focused`.

# Decisions Made

- Deleted the attention redirection rule instead of keeping an unused alias around.
- Kept the fix in `perception-verb-density` because the reported issue is repeated camera/perception language.
- Split the corpus control paragraph so concrete `looked` and `focused` examples remain preserved but do not form a false density cluster.
- Left the G3TS debug files uncommitted.

# Key Files For Context

- `.plans/2026-05-20-181745-remove-attention-redirection.md`
- `src/rules/narrative-slop/perception-verb-density.ts`
- `src/registries/narrative-slop.ts`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/golden/textlint-rules-cases-narrative-slop/approved.normalized.json`
- `behavior/golden/textlint-rules-corpus-narrative-scenes/approved.normalized.json`

# Verification

- `pnpm run build`
- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run lint:css`
- `pnpm run typecov`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-fresh-corpus-actionability.py`
- `scripts/verify-all.sh`

# Next Steps

- Keep future Liska/Cassia looking examples in the density detector unless there is a new distinct prose failure mode with evidence from fixtures.
