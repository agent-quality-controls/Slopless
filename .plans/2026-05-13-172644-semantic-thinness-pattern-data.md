# Goal

Add a local semantic-thinness pattern inventory under `packages/textlint-rules`.

This pass adds pattern data only. It does not add active textlint rules or preset wiring.

# Approach

Create one JSON file per template family:

```text
packages/textlint-rules/src/families/semantic-thinness/patterns/
```

Each file should contain:

- `id`
- `class`
- `purpose`
- `templates`
- `slots`
- `rejectIf`
- `positiveExamples`
- `negativeExamples`
- `notes`

The slot data belongs with the pattern that owns it. Do not create a shared semantic slots file yet.

# Files To Modify

- `packages/textlint-rules/cspell.config.json`
- `packages/textlint-rules/src/families/semantic-thinness/patterns/README.md`
- `packages/textlint-rules/src/families/semantic-thinness/patterns/*.json`

# Decisions

- Use JSON files, not TypeScript constants, because this is rule data and should be easy to inspect and later generate fixtures from.
- Keep each pattern separate to avoid a single opaque semantic-thinness blob.
- Keep slots local to each pattern until real matcher implementation proves which slots should be shared.
- Do not wire exports or registries yet. The user asked for patterns and slots, not active rules.

# Verification

- JSON files parse with `jq`.
- `npm run validate` in `packages/textlint-rules`.
