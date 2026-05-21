Summary:
Updated the public release surface to state Node.js 22+ support.

Decisions made:
- Changed the README badge to a static `node 22+` badge so the repository shows the supported runtime before npm badge cache updates.
- Updated `package.json` engines to `>=22.0.0`.
- Updated contributing docs from Node 20+ to Node 22+.

Key files for context:
- `README.md`
- `package.json`
- `.github/CONTRIBUTING.md`

Next steps:
- Merge `development` to `main` before publishing.
- Publish from `main` so npm receives the Node 22+ engine metadata.
