# Goal

Remove the over-specific `attention-redirection` rule and make the third Liska/Cassia example fail through existing looking density instead.

# Approach

1. Delete `src/rules/narrative-slop/attention-redirection.ts`.
2. Remove `attention-redirection` from `src/registries/narrative-slop.ts`.
3. Add `focus/focused/focusing/focuses` to `perception-verb-density`, so `Cassia looked at Arden. Remal had focused on...` is reported as a looking/perception-density problem.
4. Re-approve narrative cases and corpus output.
5. Keep the blunt emotion and empty hesitation rules.
6. Do not touch the uncommitted G3TS debug files.

# Verification

- `scripts/behavior-replay.sh` on the three new examples
- `scripts/fixture3.sh check --suite textlint-rules-cases-narrative-slop`
- `scripts/fixture3.sh check --suite textlint-rules-corpus-narrative-scenes`
- `scripts/fixture3.sh check --feature textlint-rules`
- `pnpm run build`
- `pnpm run lint`
