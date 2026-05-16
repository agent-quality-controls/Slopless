# Goal

Release the current textlint rules as the `slopless` npm package.

Users should be able to install `textlint` and `slopless`, add `preset-slopless` to `.textlintrc.json`, and run textlint through npm scripts.

# Approach

1. Update `packages/textlint-rules/package.json`.
   - Rename the package to `slopless`.
   - Remove `private`.
   - Set publish metadata, files, repository, license, and package description.
   - Keep runtime dependencies only for code used by rules.
   - Put `textlint` in peer/dev dependency position because users run textlint as the CLI.
2. Update `packages/textlint-rules/src/index.ts`.
   - Export the textlint preset shape as default: `rules` and `rulesConfig`.
   - Keep named exports for rule maps and presets.
3. Add npm-facing README content.
   - Show install, `.textlintrc.json`, npm script, and CI formatter examples.
4. Verify locally.
   - Build and validate the package.
   - Pack the npm tarball.
   - Install the tarball into a temporary project with textlint.
   - Run textlint using `preset-slopless`.
5. Publish.
   - Confirm npm auth.
   - Publish with public access.
6. Commit and push.
   - Include a worklog with verification and published version.

# Key Decisions

- Use package name `slopless`, not `prosesmasher`.
- Use textlint as the CLI instead of adding a new CLI.
- Use config key `preset-slopless` because textlint treats `preset-*` rule keys as preset packages and can resolve that key to the `slopless` package.
- Keep advanced individual rule exports, but make the default user path the preset.

# Files To Modify

- `packages/textlint-rules/package.json`
- `packages/textlint-rules/package-lock.json`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/README.md`
- `.worklogs/<timestamp>-release-slopless-npm.md`
