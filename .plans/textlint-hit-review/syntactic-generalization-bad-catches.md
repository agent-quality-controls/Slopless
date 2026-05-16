# Generalization Bad Catches

Rejected findings from full-fixture corpus diffs.

## 2026-05-13 Rejected Broadening

These shapes were tested and removed because they caught valid medical and psychology nuance.

- Broad modal `can`.
- Broad qualifier `often`.
- Reporting phrase `tends to` / `tend to`.
- Variability phrase `for some people`.
- Vague target `situations`.

Examples rejected:

- `fixtures/explainers/gpt_5_4_mini/how-chronic-stress-affects-the-body.md`: Stress can raise heart rate and blood pressure in the moment.
- `fixtures/explainers/gpt_5_4_mini/how-chronic-stress-affects-the-body.md`: Deep breathing, meditation, yoga, tai chi, and massage can help some people downshift.
- `fixtures/gpt_5_2_chat/social_anxiety_in_daily_life/article.md`: But for some people, social situations reliably trigger a level of anxiety...
- `fixtures/gpt_5_4_mini/why_people_wake_up_tired/article.md`: This is why some people can sleep eight hours...

## 2026-05-13 Rejected Pass 3

- Removed qualifier `apparently` because it caught literal apparent-state claims rather than hedge stacks.
- Removed universalizing verb `need` because it caught factual quantified health claims.

Examples rejected:

- `fixtures/gpt_5_4/why_people_wake_up_tired/article.md`: A person may snore loudly, gasp, wake with a dry mouth, or feel exhausted despite apparently sleeping enough.
- `fixtures/gpt_5_2_chat/why_people_wake_up_tired/article.md`: Most adults need at least 7 hours of sleep per night, and many do best closer to 8 or 9.
