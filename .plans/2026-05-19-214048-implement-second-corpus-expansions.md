# Goal

Implement the second fresh-corpus rule-expansion candidates without touching em dash behavior.

# Approach

1. Promote the reviewed second-pass candidates into behavior case fixtures and corpus fixtures.
2. Expand `phrases:corporate-speak` with high-signal literals and existing phrase templates.
3. Expand `semantic-thinness` abstract agency, body wisdom, and empty emergence templates.
4. Expand syntactic formulas through existing lead-in/signposting and contrast rules.
5. Expand `academic-slop:academic-formula-frames` and academic boilerplate literals.
6. Expand `words:llm-vocabulary-density` only, with contextual no-hit gates.
7. Run fixture3, preserve verification, full validation, then commit and push.

# Decisions

- No em dash behavior changes.
- No new one-to-one word bans.
- Density vocabulary remains density-only.
- Metrics, orthography, and term-policy are not changed in this pass.
- Prefer existing rule files and pattern data over new families.

# Files To Modify

- `behavior/fixtures/textlint-rules/cases/*/{hits,no-hits}.md`
- `behavior/fixtures/textlint-rules/corpus/*.md`
- `behavior/fixtures/textlint-rules/corpus/*.preserve.json`
- `behavior/golden/textlint-rules-*`
- `src/rules/academic-slop/data/*`
- `src/rules/phrases/*`
- `src/rules/semantic-thinness/patterns/*`
- `src/rules/syntactic-patterns/*`
- `src/rules/words/*`

# Verification

- `scripts/fixture3.sh check --feature textlint-rules`
- `scripts/verify-all.sh`
- `pnpm run validate`
