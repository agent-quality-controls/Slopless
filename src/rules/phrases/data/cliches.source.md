# Cliches Source

- Source package: `no-cliches@0.3.0`
- Source package license: MIT
- Source package URL: `https://github.com/duereg/no-cliches`
- npm tarball checked: `https://registry.npmjs.org/no-cliches/-/no-cliches-0.3.0.tgz`
- Imported file: `cliches.js`
- Import date: 2026-05-13
- Enrichment source: Vale `proselint/proselint/Cliches.yml`
- Enrichment source URL: `https://github.com/errata-ai/proselint`
- Enrichment import date: 2026-05-17

The JSON list in `cliches.json` is the source list plus the Vale proselint cliche list, trimmed, deduplicated, sorted, and filtered for unsafe broad entries.

Converted entries:

- `whet (?:the|your) appetite` -> `whet the appetite`, `whet your appetite` because Slopless phrase data is literal phrase data, not regex data.

Removed entries:

- `pain in the` - matches literal medical prose such as "pain in the neck".
