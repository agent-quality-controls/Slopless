# Apply the pnpm action-setup version fix

## Summary

The previous commit (`5fb5668`) added the worklog describing the fix but the workflow file edits were not in the commit — staging was cleared by the blocked-commit hook earlier in the session. This commit contains the actual `ci.yml` and `release.yml` edits referenced by that worklog.

## Change

Remove `with: { version: 11.2.2 }` from both `pnpm/action-setup@v4` blocks. `packageManager` in `package.json` (with corepack integrity hash) is now the sole source of truth.
