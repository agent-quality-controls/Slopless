# Summary

Rearranged textlint behavior fixtures into one fixture3 suite with `cases` and `corpus`.

Focused case material is now grouped by family into `hits.md` and `no-hits.md`. The new approved output is seeded as empty JSON until the fixture bootstrap issue is fixed.

# Decisions Made

- Used `cases/<family>/hits.md` for reviewed desired-hit material.
- Used `cases/<family>/no-hits.md` for reviewed desired no-hit material.
- Kept `corpus/` as the place for realistic prose fixtures that can produce mixed-family findings.
- Removed the old generated case-map, TOML specs, edge-case reports, and split golden suites because fixture3 golden output is now the only expected-result surface.
- Kept only the term-policy `.textlintrc.json` because it supplies rule parameters.
- Migrated all 241 generated TOML cases into family `hits.md` or `no-hits.md` files.
- Migrated every non-heading line from the old family fixtures into the new family case files.
- Moved 70 old prose corpus files into the new `corpus/` directory with byte-identical contents.

# Key Files For Context

- `.plans/2026-05-16-185236-fixture-cases-corpus-layout.md`
- `fixture3.yaml`
- `scripts/behavior-replay.sh`
- `behavior/fixtures/textlint-rules/cases/`
- `behavior/fixtures/textlint-rules/corpus/`
- `behavior/golden/textlint-rules/approved.normalized.json`

# Verification

- `npm run validate` in `packages/textlint-rules`
- `fixture3 doctor`
- `fixture3 explain --suite textlint-rules`
- `fixture3 check --suite textlint-rules`
- Generated-case audit: 241 checked, 0 missing.
- Family-fixture audit: 0 missing non-heading lines across all old family fixtures.
- Corpus migration audit: 70 checked, 0 missing, 0 changed.

# Next Steps

- Review `.fixture3/textlint-rules/diff.txt` and approve once the fixture bootstrap bug is fixed.
- Decide whether no-hit case files should mean no findings from any rule or only no finding from the family that owns the case file.
