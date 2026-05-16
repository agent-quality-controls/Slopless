# Metrics Flow Textlint Diff

Source command: `textlint --no-textlintrc --rulesdir packages/textlint-rules/dist/families/metrics --format json <fixtures>`.

## Counts

- `paragraph-length`: Rust 109, textlint 112
- `word-repetition`: Rust 27, textlint 27

## File Count Deltas

- `paragraph-length` in `fixtures/chatgpt_answer1.md`: Rust 0, textlint 1
- `paragraph-length` in `fixtures/gpt_5_2_chat/why_couples_stop_communicating/article.md`: Rust 7, textlint 8
- `paragraph-length` in `fixtures/opus_4_6/why_friendships_fade/article.md`: Rust 1, textlint 2

## Textlint Extra Context

- `paragraph-length` in `fixtures/chatgpt_answer1.md` line 1: [
- `paragraph-length` in `fixtures/gpt_5_2_chat/why_couples_stop_communicating/article.md` line 70: **2. Create protected time for real talk.**
- `paragraph-length` in `fixtures/opus_4_6/why_friendships_fade/article.md` line 21: **We are simply too busy.** Seventy-seven percent of Americans work more than forty hours a week. The average U.S. worker logs 1,799 hours per year, nearly two hundred more than the average across developed nations. As psychotherapist Dr. Sara Kuburic has observed, adult schedules become so hectic that finding time for a phone call, let alone a dinner, feels like solving a logistics puzzle.

These are accepted deltas for this migration. They are paragraph-length warnings on overlong or non-prose fixture paragraphs, not missing Rust catches.
