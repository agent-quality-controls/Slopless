# Goal

Build the first active `semantic-thinness` textlint rule from the local pattern JSON inventory.

The rule should report sentence-level semantic-thinness findings from declared templates and slots. It should remain local to `families/semantic-thinness` and should not create shared semantic matcher code yet.

# Approach

1. Add a local typed pattern matcher under `packages/textlint-rules/src/families/semantic-thinness/private/`.
2. Add one rule module at `packages/textlint-rules/src/families/semantic-thinness/semantic-thinness.ts`.
3. Load the existing pattern JSON files, expand templates against local slots, and match paragraph sentences by token sequence.
4. Add concrete reject gates for the first pass:
   - quoted example text is ignored by existing `cleanSentence`.
   - sentences with numbers are ignored.
   - sentences with obvious cause/result clauses are ignored.
   - sentences over a short length cap are ignored.
5. Wire the rule into package exports, the semantic-thinness registry, the top-level registry, the `everything` preset, and behavior replay rulesdirs.
6. Replace the placeholder semantic-thinness fixture with positive and negative examples.

# Key Decisions

- Use one active rule, `semantic-thinness`, because the pattern inventory is data-driven and should emit one coherent family signal.
- Keep matcher code private to `semantic-thinness` because reuse has not been proven.
- Use token/template matching, not regex.
- Use the JSON files as source data. Do not duplicate slot lists in TypeScript.
- Keep the old pattern-data manifest as superseded by this active-rule plan.

# Files To Modify

- `.plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml`
- `scripts/verify-semantic-thinness-rule-manifest.py`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/src/families/semantic-thinness/semantic-thinness.ts`
- `packages/textlint-rules/src/families/semantic-thinness/private/pattern-matcher.ts`
- `packages/textlint-rules/src/registries/semantic-thinness.ts`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `scripts/behavior-replay.sh`
- `behavior/fixtures/textlint-rules/semantic-thinness/.textlintrc.json`
- `behavior/fixtures/textlint-rules/semantic-thinness/family.md`
- `behavior/fixtures/textlint-rules/semantic-thinness/fixture.toml`

# Verification

- `python3 scripts/verify-semantic-thinness-rule-manifest.py --manifest .plans/2026-05-13-180323-semantic-thinness-rule.md.manifest.toml all`
- `npm run validate` in `packages/textlint-rules`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/semantic-thinness/family.md`
