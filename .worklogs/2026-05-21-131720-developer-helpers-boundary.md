Summary:
Moved internal analytics, source datasets, legacy research material, and Python verifiers under `developer-helpers/` so they are clearly outside the public Slopless tool surface. Replaced the public CLI version verifier with a Node script and updated validation/configuration to ignore developer helper material.

Decisions made:
- Kept helper material committed, but marked it as developer-only with `developer-helpers/README.md` and `.gitattributes`.
- Kept `scripts/` for public shell and Node commands only.
- Updated historical manifests used by helper verifiers to point at the new developer-helper paths.
- Restored the existing `empty placeholding beat` finding label so fixture3 approved output remains stable.

Key files for context:
- `developer-helpers/README.md`
- `scripts/verify-cli-version.mjs`
- `developer-helpers/scripts/verify-developer-helpers-boundary.py`
- `.plans/2026-05-21-130146-developer-helpers-boundary.md`
- `.plans/2026-05-21-130146-developer-helpers-boundary.md.manifest.toml`
- `package.json`
- `cspell.config.json`
- `eslint.config.js`
- `.gitattributes`

Next steps:
- PR 43 should rerun CI from `development`.
- The remaining dirty G3TS experiment files should be handled separately if they are still wanted.
