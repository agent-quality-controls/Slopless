# Goal

Catch the new Liska slop examples as narrative-slop without changing G3TS-generated files.

# Approach

1. Add a focused one-to-one `narrative-slop:empty-beat` rule for strong single findings.
2. Detect empty hesitation beats such as `Liska paused for a second.` when not followed by purpose, cause, or concrete action.
3. Detect empty lingering/waiting beats such as `Liska lingered in the dusty yard-compound`.
4. Detect generic animal body tags such as `her tail twitching`, while guarding concrete physical causes.
5. Add hit/no-hit case coverage and mirror the cases into `narrative-scenes` corpus with preserve metadata.
6. Register the rule and run targeted fixtures plus build/lint checks.

# Key Decisions

- Use `narrative-slop`, not `semantic-thinness`, because the issue is prose motion/rhythm and body-tag shorthand.
- Report these one-to-one because the examples are strong enough without density.
- Keep the older density rules intact. This rule catches strong single beats; density rules catch clusters.
- Do not implement unrelated G3TS policy fixes in this change.

# Files To Modify

- `src/rules/narrative-slop/empty-beat.ts`
- `src/registries/narrative-slop.ts`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/hits.md`
- `behavior/fixtures/textlint-rules/cases/narrative-slop/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.preserve.json`
- `behavior/golden/textlint-rules-cases-narrative-slop/*`
- `behavior/golden/textlint-rules-corpus-narrative-scenes/*`

# Verification

- `pnpm run build`
- `pnpm run lint`
- `scripts/fixture3.sh check --suite textlint-rules-cases-narrative-slop`
- `scripts/fixture3.sh check --suite textlint-rules-corpus-narrative-scenes`
- `scripts/fixture3.sh check --feature textlint-rules`
