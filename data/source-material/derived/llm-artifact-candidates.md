# LLM Artifacts Not Implemented

## Source File Paths Used

- `data/source-material/llm-slop-lists/slop-forensics/results_by_domain/varied_prompts/slop_lists/slop_list_phrases.jsonl`
- `data/source-material/llm-slop-lists/slop-forensics/results_by_domain/essays/slop_lists/slop_list_phrases.jsonl`
- `data/source-material/llm-slop-lists/community-gists/chrisgherbert-chat-gpt-cliches.md`
- `data/source-material/llm-slop-lists/community-gists/pvgomes-chatgpt-words.md`
- `data/source-material/llm-slop-lists/community-gists/miglen-gpt-instructions.md`

## Not Implemented

- `deeper into a specific aspect`
- `it's important to note`
- `it is important to note`
- `it's worth noting that`
- `it is worth noting`

## Why Not Implemented

- The implemented response-wrapper rule already covers narrow assistant scaffolding and follow-up frames.
- These remaining phrases are common in normal essays, documentation, and lectures.
- They need stricter sentence-position or assistant-response context before they are safe.

## Required Fixture Work Before Implementation

- Add no-hits where these phrases introduce a real technical caveat.
- Add hits only where the phrase is assistant-style scaffolding without content.
- Consider matching only paragraph openers, not arbitrary sentence spans.
