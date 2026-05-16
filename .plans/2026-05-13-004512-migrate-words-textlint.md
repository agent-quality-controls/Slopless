# Goal

Migrate the remaining Rust lexical word-level checks into the TypeScript `words` family.

# Scope

Rust source checks:

- `hedge-stacking`
- `simplicity`

Textlint target files:

- `packages/textlint-rules/src/families/words/hedge-stacking.ts`
- `packages/textlint-rules/src/families/words/simplicity.ts`
- `packages/textlint-rules/src/families/words/data/simplicity-pairs.json`

# Approach

1. Add manifest rows for both rules under the `words` family.
2. Implement `hedge-stacking` as sentence-level hedge token counting with Rust's default English hedge list and threshold 2.
3. Implement `simplicity` as word-token matching over the default Rust simplicity pairs.
4. Register rules in package exports, word registry, and the `everything` preset.
5. Extend the `words` replay fixture with positive and negative examples.
6. Run Rust on the fixture corpus for both checks.
7. Run textlint on the same files for both checks.
8. Write context-bearing good-catch and diff reports.
9. Run validation, behavior verify, manifest verify, then commit.

# Key Decisions

- The destination family is `words` because both rules inspect word tokens or per-sentence word-class counts.
- This is not the Rust `lexical` family name; `lexical` is source provenance only.
- The textlint port uses the Rust default threshold and default word lists because textlint rule options are not wired yet.

# Files To Modify

- `.plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml`
- `packages/textlint-rules/src/families/words/hedge-stacking.ts`
- `packages/textlint-rules/src/families/words/simplicity.ts`
- `packages/textlint-rules/src/families/words/data/simplicity-pairs.json`
- `packages/textlint-rules/src/registries/words.ts`
- `packages/textlint-rules/src/presets/everything.ts`
- `packages/textlint-rules/package.json`
- `behavior/fixtures/textlint-rules/words/family.md`
- `behavior/fixtures/textlint-rules/words/fixture.toml`
- `behavior/baselines/textlint-rules/words.json`
- `.plans/*words*good-catches.md`
- `.plans/*words*diff.md`

# Verification Result

- `npm run validate`: pass.
- `./scripts/behavior-verify.sh`: pass.
- `python3 scripts/verify-textlint-implementation-manifest.py --manifest .plans/2026-05-12-203442-textlint-implementation-plan.md.manifest.toml all`: pass.
- `hedge-stacking` corpus comparison: Rust 5 evidence rows, textlint 5 findings, exact context parity.
- `simplicity` corpus comparison: Rust 7 file-level failures with no evidence rows, textlint 9 word-level findings across the same 7 files.
