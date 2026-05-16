# Textlint rules smoke

## Summary

Scaffolded `@prosesmasher/textlint-rules` and implemented the first textlint rule, `em-dashes`. Built the package, verified ESLint regex guardrails, ran textlint on the orthography fixture, and confirmed the rule reports exactly the closed em dash case.

## Decisions Made

- Kept one package boundary for all rules.
- Used `--rulesdir` for the first CLI integration smoke because the package preset loader is not needed to prove rule execution.
- Disabled declaration output for the first slice because `textlint --rulesdir` loads every emitted file in the rule directory, including `.d.ts`.
- Added `node_modules/` and `dist/` to `.gitignore`.
- Fixed the TypeScript strict baseline so `g3ts --family tsconfig` passes.

## Key Files

- `packages/textlint-rules/package.json`
- `packages/textlint-rules/src/families/orthography/em-dashes.ts`
- `packages/textlint-rules/eslint.config.js`
- `packages/textlint-rules/tsconfig.json`
- `behavior/fixtures/textlint-rules/orthography/family.md`

## Next Steps

- Bring the package ESLint config to full G3TS compliance.
- Add shared text helpers and the remaining first-slice rules.
- Add behavior replay scripts and generated baselines.
