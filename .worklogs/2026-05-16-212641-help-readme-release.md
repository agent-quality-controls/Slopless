# Summary

Released `slopless@0.2.1` with explicit CLI help and a fuller npm README.

The help and README now start with install and run commands, then explain purpose, defaults, JSON output, exit codes, CI use, stdin use, supported options, unsupported formatter options, checks, and limits.

# Decisions Made

- Added first-party `--help` / `-h` handling in `src/cli.ts` instead of forwarding to textlint.
- Added `--version` / `-v` handling for the npm package version.
- Kept output JSON-only and continued rejecting `--format` / `-f`.
- Rewrote the README around the zero-config `npx slopless` path, with direct textlint use kept as advanced usage.

# Key Files For Context

- `.plans/2026-05-16-212410-help-readme-release.md`
- `packages/textlint-rules/src/cli.ts`
- `packages/textlint-rules/README.md`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/package-lock.json`

# Verification

- `npm run validate` in `packages/textlint-rules`.
- `node dist/cli.js --help` prints install, run, defaults, purpose, limits, and JSON-only format policy.
- `node dist/cli.js --version` prints `0.2.1`.
- Packed tarball install in a fresh temp project with only `slopless`; `npx slopless --help` includes install and purpose sections.
- Packed tarball install in a fresh temp project produced parseable JSON and `slopless/<rule>` findings.
- `npm publish --dry-run --access public`.
- `npm publish --access public`: published `slopless@0.2.1`.
- `npm view slopless version dist-tags.latest --json`: latest is `0.2.1`.
- Registry install in a fresh temp project with only `slopless@0.2.1`; `npx slopless --help` includes install and purpose sections and `npx slopless sample.md` emits parseable JSON.

# Next Steps

- None.
