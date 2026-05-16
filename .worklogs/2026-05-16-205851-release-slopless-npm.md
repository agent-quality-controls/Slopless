# Summary

Released the textlint rules as the public npm package `slopless@0.1.0`.

The package now exposes a textlint preset shape as its default export, so users can install `textlint` plus `slopless` and enable `preset-slopless`.

# Decisions Made

- Renamed the package from `@prosesmasher/textlint-rules` to `slopless` because Slopless is the product and repo name.
- Kept textlint as the CLI instead of adding a wrapper CLI.
- Put `textlint` in `peerDependencies` and `devDependencies`; the user project owns the CLI install.
- Kept individual rule exports for advanced use, but documented the preset path as the normal user path.

# Key Files For Context

- `.plans/2026-05-16-205520-release-slopless-npm.md`
- `packages/textlint-rules/package.json`
- `packages/textlint-rules/package-lock.json`
- `packages/textlint-rules/src/index.ts`
- `packages/textlint-rules/README.md`
- `packages/textlint-rules/cspell.config.json`

# Verification

- `npm run validate` in `packages/textlint-rules`.
- `npm pack --json`: produced `slopless-0.1.0.tgz`, 82.5 kB package size, 418.5 kB unpacked size.
- Fresh temp project installed `textlint@15.6.1` and the packed tarball, configured `preset-slopless`, and produced `slopless/<rule>` findings.
- `npm publish --dry-run --access public`.
- `npm publish --access public`: published `slopless@0.1.0`.
- `npm view slopless name version description --json`: confirmed registry metadata.
- Fresh temp project installed `textlint@15.6.1 slopless@0.1.0` from npm and produced `slopless/<rule>` findings.

# Next Steps

- Add release automation if repeated npm releases become frequent.
