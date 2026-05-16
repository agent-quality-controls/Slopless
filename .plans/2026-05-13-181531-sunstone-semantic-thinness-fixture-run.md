# Goal

Copy Arden and Cassia chapter prose into local textlint behavior fixtures and run the active `semantic-thinness` rule over them.

# Approach

1. Create `behavior/fixtures/textlint-rules/sunstone-arden-cassia/`.
2. Copy the 10 source chapter markdown files from Book 1 and Book 2 Morgiana into that fixture folder with stable names.
3. Add a local `.textlintrc.json` that enables only `semantic-thinness`.
4. Run textlint against the copied fixtures using the built semantic-thinness rulesdir.
5. Summarize exact findings by file, line, pattern id, and source text.

# Files To Modify

- `behavior/fixtures/textlint-rules/sunstone-arden-cassia/.textlintrc.json`
- `behavior/fixtures/textlint-rules/sunstone-arden-cassia/*.md`

# Verification

- `npm run build` in `packages/textlint-rules`
- textlint JSON output over the copied fixture files
