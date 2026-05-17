# Cliche Templates Not Implemented

## Source File Paths Used

- `data/source-material/prose-linters/npm-packages/cliches-1.0.6/glossary.js`
- `data/source-material/prose-linters/npm-packages/no-cliches-0.3.6/cliches.js`
- `data/source-material/prose-linters/proselint/proselint/checks/cliches/misc.py`
- `data/source-material/prose-linters/proselint/proselint/checks/cliches/write-good`

## Not Implemented

- `{genderedPossessive} own shadow`
- `{genderedPossessive} sleeve`
- `{genderedPossessive} bite`
- `crying over {spilledWord} milk`

## Slots

- `genderedPossessive`: `his`, `her`
- `spilledWord`: `spilled`, `spilt`

## Why Not Implemented

- The implemented possessive cliche template covers only high-confidence idioms with fixture no-hits.
- These remaining templates need literal no-hits before activation because they can overlap with physical descriptions, clothing, bites, and literal spilled milk.
- Offensive, animal, and medical idioms remain excluded from this batch.

## Required Fixture Work Before Implementation

- Add one hit per expanded template.
- Add literal no-hits for shadows, sleeves, bites, and spilled milk.
- Add quoted-example no-hits.
