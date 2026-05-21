# Goal

Separate Slopless public package/tooling from internal developer-only material.

# Approach

1. Create `developer-helpers/` with a README that states it is not part of the public npm package or main tool.
2. Move internal Python and analytics material under `developer-helpers/`:
   - `analytics/`
   - `datasets/`
   - `legacy/`
   - Python verifier scripts from `scripts/`
3. Keep public shell scripts that are needed by the tool and fixtures in `scripts/`.
4. Replace the public Python CLI-version check with a Node script:
   - `scripts/verify-cli-version.mjs`
5. Update `package.json` validation to call only public Node/TypeScript/npm checks.
6. Update developer-only verifier paths to work from `developer-helpers/scripts/`.
7. Exclude `developer-helpers/` from public checks:
   - ESLint
   - CSpell
   - Prettier
   - Type coverage by omission
   - npm package files by existing `files` allowlist
8. Update GitHub language metadata so developer helper material does not dominate repository language statistics.

# Key Decisions

- Keep developer helper material committed for now, but mark it as outside the public Slopless tool.
- Do not run developer helper Python scripts from `pnpm run validate`.
- Keep fixture3 behavior checks available through shell scripts, but treat Python manifest verifiers as developer helper checks.

# Files To Modify

- `package.json`
- `scripts/verify-cli-version.mjs`
- `scripts/verify-cli-version.py`
- `scripts/verify-*.py`
- `scripts/normalize-textlint-golden-output.py`
- `scripts/verify-all.sh`
- `analytics/**`
- `datasets/**`
- `legacy/**`
- `developer-helpers/**`
- `eslint.config.js`
- `cspell.config.json`
- `.prettierignore`
- `.gitattributes`
- `.github/AGENTS.md`
- `.worklogs/<timestamp>-developer-helpers-boundary.md`
