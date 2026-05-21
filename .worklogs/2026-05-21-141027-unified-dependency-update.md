# Unified Dependency Update

## Summary

Created one coherent dependency update to replace the broken split Dependabot textlint PRs and the broad dev-dependency PR. The runtime floor is now Node `>=22.13.0`, Node type checking uses Node 22 types, textlint packages are updated together, and ESLint 10 plus TypeScript 6 validate successfully.

## Decisions Made

- Updated `textlint`, `@textlint/types`, and `@textlint/ast-node-types` together to `15.7.1` because partial updates split the AST type surface.
- Set `@types/node` to exact `22.19.19` because this package declares Node 22 support and must type-check against the supported runtime major.
- Set `engines.node` to `>=22.13.0` because ESLint 10 supports Node 22 starting at `22.13.0`.
- Kept `type-coverage` and `g3ts-eslint-plugin-style-policy` after verifying validation passes; both have stale peer ranges, but no maintained newer version exists.
- Added a narrow compatibility cast at the `textlint-util-to-string` adapter boundary because that dependency has not updated its type declaration for textlint 15.7 readonly AST children, while runtime behavior is read-only.

## Key Files For Context

- `package.json`
- `pnpm-lock.yaml`
- `src/shared/text/traverse.ts`
- `.plans/2026-05-21-140338-unified-dependency-update.md`

## Verification

- `pnpm install --frozen-lockfile`
- `pnpm run validate`
- `scripts/fixture3.sh doctor`
- `scripts/fixture3.sh check --feature textlint-rules`
- Fixture3 reported differences only because approved output stores absolute canonical repo paths and this verification ran from `/tmp/slopless-deps-unified`; comparing approved and received output with `filePath` removed showed no behavior drift.

## Next Steps

- Merge this replacement PR instead of Dependabot PRs #38, #40, and #41.
- Close the split textlint PRs after the replacement PR lands.
