# Unified Dependency Update

## Goal

Update current Dependabot requests as one coherent dependency set:

- keep the runtime support floor unified at Node 22
- use Node 22 type declarations
- accept ESLint 10 and TypeScript 6
- update the textlint dependency family together so AST and rule types do not split

## Approach

1. Update `package.json`.
   - Set `engines.node` to `>=22.13.0`, matching ESLint 10's Node 22 support floor.
   - Set `@types/node` to the latest Node 22 line.
   - Set `eslint` to `10.4.0`.
   - Set `typescript` to `6.0.3`.
   - Set `textlint`, `@textlint/types`, and `@textlint/ast-node-types` to `15.7.1`.
   - Keep the other passing dev-dependency updates from Dependabot PR #38.

2. Regenerate `pnpm-lock.yaml` with pnpm.

3. Fix any TypeScript or lint failures caused by readonly textlint AST types.
   - Fix at adapter/shared AST type boundaries, not by casting away type errors globally.

4. Verify.
   - `pnpm install --frozen-lockfile`
   - `pnpm run validate`
   - fixture3 suite check if available without path instability

5. Commit with worklog, push branch, and create a PR.

## Key Decisions

- Do not merge `@textlint/types` or `@textlint/ast-node-types` separately. Textlint 15.7 changed AST readonly typing, so partial upgrades create incompatible duplicated AST type surfaces.
- Do not use `@types/node@25` while declaring Node 22 support. Type checking must use the oldest supported runtime major.
- Raise the Node floor from `>=22.0.0` to `>=22.13.0` because ESLint 10 explicitly supports Node 22 only from `22.13.0`.

## Files To Modify

- `package.json`
- `pnpm-lock.yaml`
- TypeScript files only if verification proves they need source changes
- `.worklogs/*`
