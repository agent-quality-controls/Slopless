# Summary

Added two narrative-slop rules for the new Liska/Cassia examples: `emotion-telling` catches blunt emotion labels, and `attention-redirection` catches camera/attention steering pairs. The existing `empty-beat` rule already caught `Liska hesitated for a second...`.

# Decisions Made

- Kept emotion labels separate from empty beats because they are direct emotional telling rather than waiting or body shorthand.
- Kept attention redirection separate from perception density because the issue is a two-part formula: empty look-at-person sentence followed by `had focused on..., but ... was showing ... different way`.
- Added no-hit controls for concrete emotion context, purposeful looking, and factual focused-on work.
- Left the G3TS debug files uncommitted.

# Key Files For Context

- `.plans/2026-05-20-180904-liska-emotion-and-attention-beats.md`
- `src/rules/narrative-slop/emotion-telling.ts`
- `src/rules/narrative-slop/attention-redirection.ts`
- `src/registries/narrative-slop.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`

# Verification

- `scripts/behavior-replay.sh /tmp/liska-more-probe.*.md`
- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-corpus-preserve.py`
- `scripts/verify-all.sh`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run lint:css`
- `pnpm run typecov`

# Next Steps

- If more attention formulas appear, expand `attention-redirection` only around paired steering structures, not around every single `looked at` sentence.
