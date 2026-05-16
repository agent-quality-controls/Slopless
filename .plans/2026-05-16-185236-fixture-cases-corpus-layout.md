# Goal

Rearrange textlint fixtures so the filesystem has one shape under the textlint fixture suite:

- `behavior/fixtures/textlint-rules/cases/<family>/hits.md`
- `behavior/fixtures/textlint-rules/cases/<family>/no-hits.md`
- `behavior/fixtures/textlint-rules/corpus/`

Fixture directories are for navigation only. All fixtures still run through one fixture3 runner and golden output remains the expected result.

# Approach

1. Move existing focused fixtures into `cases/<family>/hits.md` or `cases/<family>/no-hits.md`.
2. Treat old positive and known-miss focused cases as desired-hit material.
3. Treat old negative focused cases and no-signal controls as desired no-hit material.
4. Move realistic prose fixtures into `corpus/`.
5. Keep `.textlintrc.json` only where it supplies real rule parameters. Remove semantic-thinness-only config files if they only select a rule.
6. Update `fixture3.yaml` to run one `textlint-rules` suite over `cases/*/*.md` and `corpus/*.md`.
7. Update or retire scripts that still reference the old `corpus/` or `edge-cases/generated/` suite paths.
8. Seed the new approved output as empty JSON until the fixture bootstrap bug is fixed.

# Key Decisions

- No `edge-cases` directory. Focused examples are `cases`.
- `hits.md` means reviewed desired-hit material.
- `no-hits.md` means reviewed desired no-hit material.
- Keep one root `corpus` directory. Realistic prose often mixes families, so assigning it to one family is arbitrary.
- No case metadata as verification input. Fixture3 golden output is the expected result.
- Keep term-policy config because it supplies rule options. Remove configs that only select `semantic-thinness`.

# Files To Modify

- `fixture3.yaml`
- `scripts/behavior-replay.sh`
- `behavior/fixtures/textlint-rules/**`
- `behavior/golden/**`
- stale verifier/generator scripts if they are no longer valid
