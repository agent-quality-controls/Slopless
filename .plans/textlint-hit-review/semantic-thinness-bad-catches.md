# Semantic Thinness Bad Catches

Rejected findings from the current semantic-thinness rule over all textlint behavior fixtures.

Total: 1

## Counts By Pattern

- `something-shifted`: 1

## Counts By Fixture Group

- `semantic-thinness`: 1

## Findings

### semantic-thinness

- `behavior/fixtures/textlint-rules/semantic-thinness/family.md:16` [something-shifted] Everything shifted after the new tax rule took effect.
  - Template: `{genericSubject} {changeVerb}.`
  - Signal: Catch vague change declarations that say something shifted, changed, moved, or crossed a line without naming the concrete change.
  - Reason: Concrete cause is named; this is the negative fixture case and should not be reported.
