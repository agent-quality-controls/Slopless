# Textlint rules guardrails

## Summary

Hardened the `@prosesmasher/textlint-rules` package so its package-local quality gates pass. Added G3TS-required ESLint, Stylelint, Prettier, CSpell, type coverage, Syncpack, and JSCPD wiring.

## Decisions Made

- Kept guardrails package-local because this repository is not yet a TypeScript workspace.
- Added the G3TS style policy with a harmless denied class token so the rule is active without affecting prose rule code.
- Added root `.jscpd.json` because G3TS checks duplication policy from the package's repository root.

## Key Files

- `packages/textlint-rules/eslint.config.js`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/guardrail3-ts.toml`
- `packages/textlint-rules/stylelint.config.js`
- `packages/textlint-rules/cspell.config.json`
- `.jscpd.json`

## Next Steps

- Add the manifest-listed shared helpers and first-slice rules.
- Add family fixtures and behavior replay scripts.
- Run `scripts/verify-all.sh` until every manifest layer passes.
