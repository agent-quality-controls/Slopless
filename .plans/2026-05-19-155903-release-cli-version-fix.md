# Goal

Release a corrected local and npm version after the local install exposed that `slopless@0.2.9` installs package version `0.2.9` but `slopless --version` prints `0.2.8`.

# Approach

- Fix `src/cli.ts` so the CLI version comes from `package.json` at runtime instead of a duplicated constant.
- Add a verifier that fails when `dist/cli.js --version` differs from `package.json`.
- Wire that verifier into `npm run validate` and `scripts/verify-all.sh`.
- Bump the package to `0.2.10`, validate, commit, push, merge through CI, publish to npm, and install the new global package.

# Key decisions

- Do not republish `0.2.9`; npm published versions are immutable.
- Do not keep a hardcoded CLI version; the package metadata is the single source of truth.
- Keep the existing `resume` helper commit on the release branch because the user explicitly asked to commit it.

# Files to modify

- `src/cli.ts`
- `package.json`
- `package-lock.json`
- `scripts/verify-cli-version.py`
- `scripts/verify-all.sh`
- `.worklogs/*`
