# Goal

Catch two additional Liska/Cassia prose slop examples while preserving the already-covered hesitation case.

# Approach

1. Add `narrative-slop:emotion-telling` for blunt state labels such as `She was still very angry.`
2. Add `narrative-slop:attention-redirection` for camera/attention setup pairs such as `Cassia looked at Arden. Remal had focused on the front latch, but Liska was showing them a different way.`
3. Keep `Liska hesitated for a second...` under the existing `empty-beat` rule.
4. Add hit and no-hit cases for the two new rule surfaces.
5. Mirror the cases into `narrative-scenes` corpus and preserve metadata.
6. Run narrative fixtures, full textlint fixtures, and package checks.

# Key Decisions

- Keep these in `narrative-slop` because both are fiction-prose craft failures.
- Keep emotion telling separate from empty beats because a blunt emotion label is not a pause or body tag.
- Keep attention redirection separate from perception density because this is a two-part steering formula, not simple verb density.
- Do not touch the uncommitted G3TS debug files.

# Files To Modify

- `src/rules/narrative-slop/emotion-telling.ts`
- `src/rules/narrative-slop/attention-redirection.ts`
- `src/registries/narrative-slop.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- `behavior/golden/textlint-rules-cases-narrative-slop/*`
- `behavior/golden/textlint-rules-corpus-narrative-scenes/*`

# Verification

- `node dist/cli.js --stdin --stdin-filename liska-more-probe.md`
- `scripts/fixture3.sh check --suite textlint-rules-cases-narrative-slop`
- `scripts/fixture3.sh check --suite textlint-rules-corpus-narrative-scenes`
- `scripts/fixture3.sh check --feature textlint-rules`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run lint:css`
- `pnpm run typecov`
