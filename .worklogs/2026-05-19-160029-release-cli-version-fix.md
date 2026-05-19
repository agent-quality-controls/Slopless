# Summary

Fixed the released CLI version drift found during local install verification. `slopless --version` now reads `package.json` instead of a stale hardcoded constant, and validation now fails if the CLI version differs from the package version.

# Decisions made

- Used `package.json` as the single source of truth for the CLI version.
- Added `scripts/verify-cli-version.py` and wired it into `npm run validate` and `scripts/verify-all.sh`.
- Bumped the package to `0.2.10` because `0.2.9` was already published and cannot be overwritten.

# Key files for context

- `src/cli.ts`
- `package.json`
- `package-lock.json`
- `scripts/verify-cli-version.py`
- `scripts/verify-all.sh`

# Verification

- `npm run validate`
- `scripts/verify-all.sh`

# Next steps

- Push the branch, merge through CI, publish `slopless@0.2.10`, and install that version globally.
