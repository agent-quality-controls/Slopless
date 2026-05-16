# Readability Metrics Textlint Diff

Source command: `textlint --no-textlintrc --rulesdir packages/textlint-rules/dist/families/metrics --format json <fixtures>`.

## Counts

- `avg-sentence-length`: Rust 34, textlint 34
- `coleman-liau`: Rust 79, textlint 91
- `flesch-kincaid`: Rust 127, textlint 130
- `gunning-fog`: Rust 106, textlint 111

## File Count Deltas

- `flesch-kincaid` in `fixtures/explainers/gpt_5_4_mini/does-social-media-harm-attention-span.md`: Rust 0, textlint 1
- `flesch-kincaid` in `fixtures/explainers/gpt_5_4_mini/why-people-procrastinate.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_2_chat/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_2_chat/how_burnout_develops_at_work/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_2_chat/social_anxiety_in_daily_life/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_4/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_4/why_friendships_fade/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_4_mini/adult_procrastination_causes_and_fixes/article.md`: Rust 0, textlint 1
- `gunning-fog` in `fixtures/gpt_5_4_mini/adult_procrastination_causes_and_fixes/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/gpt_5_4_mini/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `gunning-fog` in `fixtures/gpt_5_4_mini/how_burnout_develops_at_work/article.md`: Rust 0, textlint 1
- `gunning-fog` in `fixtures/gpt_5_4_mini/screen_time_and_child_attention/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/haiku/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `gunning-fog` in `fixtures/haiku/why_people_lose_motivation_after_big_goals/article.md`: Rust 0, textlint 1
- `flesch-kincaid` in `fixtures/instagram/gpt_5_4_mini/why-people-feel-anxious-in-ordinary-social-situations.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/opus_4_6/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/opus_4_6/why_friendships_fade/article.md`: Rust 0, textlint 1
- `gunning-fog` in `fixtures/opus_4_6/why_friendships_fade/article.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/sonnet_4_6/adult_procrastination_causes_and_fixes/prompt.md`: Rust 0, textlint 1
- `coleman-liau` in `fixtures/sonnet_4_6/why_people_lose_motivation_after_big_goals/article.md`: Rust 0, textlint 1

## Result

- Rust-only readability failures: 0
- Textlint-only readability failures: 20
- The textlint thresholds are calibrated to preserve every Rust readability failure while using the maintained package scorer.
