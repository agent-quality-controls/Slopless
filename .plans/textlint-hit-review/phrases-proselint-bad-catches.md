# Proselint Phrase Bad Catches

Reviewed against 202 non-MDX fixture outputs after adding:

- `corporate-speak`
- `skunked-terms`
- `uncomparables`

## Rejected

- `fixtures/gpt_5_4_mini/why_couples_stop_communicating/article.md:64` - link title `Acknowledging the Elephant in the Room...`
- `fixtures/gpt_5_4_mini/why_people_struggle_to_build_habits/article.md:3` - `with the least possible effort`

## Fixes Applied

- Phrase rules now skip textlint link nodes for these phrase-list rules.
- `least possible` is a runtime exception for `uncomparables`.
