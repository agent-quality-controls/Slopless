# Goal

Add the next three Vale-derived phrase rules from proselint:

- `phrases/corporate-speak`
- `phrases/skunked-terms`
- `phrases/uncomparables`

After all three are implemented, measure them across all fixture Markdown files excluding MDX and report findings separately per rule.

# Source

- Source package: `proselint==0.16.0`
- Source license: BSD-3-Clause
- Source repository: `https://github.com/amperser/proselint`
- Cross-check source: Vale package `proselint@0.1.0`, also BSD-3-Clause

# Approach

- Store source data as JSON under `packages/textlint-rules/src/families/phrases/data/`.
- Store one attribution file per source list.
- Implement one rule per file under `packages/textlint-rules/src/families/phrases/`.
- Use token-boundary matching, not regex.
- Use quote-skipping phrase matching for direct phrase lists.
- Implement uncomparables as comparator token(s) plus adjective token, with the same exceptions as proselint.
- Add all three rules to the phrase registry, package exports, and the `everything` preset.
- Add positive and no-signal examples to the existing phrase behavior fixture.
- Regenerate the phrase baseline.
- Run `npm run validate`.
- Run the full fixture corpus excluding `*.mdx` and split results by the three new rules.

# Files To Modify

- `packages/textlint-rules/src/families/phrases/corporate-speak.ts`
- `packages/textlint-rules/src/families/phrases/skunked-terms.ts`
- `packages/textlint-rules/src/families/phrases/uncomparables.ts`
- `packages/textlint-rules/src/families/phrases/data/corporate-speak.json`
- `packages/textlint-rules/src/families/phrases/data/skunked-terms.json`
- `packages/textlint-rules/src/families/phrases/data/uncomparables.json`
- `packages/textlint-rules/src/families/phrases/data/*.source.md`
- `packages/textlint-rules/src/registries/phrases.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/cspell.config.json`
- `behavior/fixtures/textlint-rules/phrases/family.md`
- `behavior/fixtures/textlint-rules/phrases/fixture.toml`
- `behavior/baselines/textlint-rules/phrases.json`
- `.plans/textlint-phrases/*`

# Verification

- `npm run validate`
- `scripts/behavior-replay.sh behavior/fixtures/textlint-rules/phrases/family.md`
- `scripts/behavior-replay.sh $(find fixtures -type f -name '*.md' | sort)`
