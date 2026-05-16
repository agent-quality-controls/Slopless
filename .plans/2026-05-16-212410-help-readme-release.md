# Goal

Make `slopless --help` and the npm README explicit enough for first-time users.

The first lines should explain install and use. The rest should explain what Slopless is for, why it exists, what output means, how to run it in scripts and CI, and what it does not do.

# Approach

1. Add custom CLI help in `packages/textlint-rules/src/cli.ts`.
   - Handle `--help` and `-h` before delegating to textlint.
   - Keep output concise but complete.
   - Explain install, run, default target, JSON output, exit codes, purpose, and examples.
   - Keep `--format` rejected because output is JSON-only.
2. Rewrite `packages/textlint-rules/README.md`.
   - Start with install and run commands.
   - Then explain purpose, output contract, exit codes, npm scripts, CI usage, stdin use, checks, and limits.
3. Release patch version `0.2.1`.
   - Update package version and lockfile.
   - Validate.
   - Pack and test `npx slopless --help`.
   - Publish and verify registry install.

# Files To Modify

- `packages/textlint-rules/src/cli.ts`
- `packages/textlint-rules/README.md`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/package-lock.json`
- `.worklogs/<timestamp>-help-readme-release.md`
