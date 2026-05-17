# Narrative Slop Not Implemented

## Source File Paths Used

- `data/source-material/llm-slop-lists/slop-forensics/slop_list_bigrams.json`
- `data/source-material/llm-slop-lists/slop-forensics/slop_list_trigrams.json`
- `data/source-material/llm-slop-lists/slop-forensics/results_by_domain/varied_prompts/slop_lists/slop_list_bigrams.json`
- `data/source-material/llm-slop-lists/slop-forensics/results_by_domain/varied_prompts/slop_lists/slop_list_trigrams.json`
- `data/source-material/llm-slop-lists/community-gists/chrisgherbert-chat-gpt-cliches.md`
- `behavior/fixtures/textlint-rules/corpus/narrative-scenes.md`

## Not Implemented

- `{character} took a deep breath`
- `{character} let out a breath`
- `{voice} was low`
- `{smile} played on {lips}`

## Slots

- `character`: pronoun or named character before the phrase, capped at 4 tokens
- `voice`: `his voice`, `her voice`, `their voice`, `my voice`, `the voice`
- `smile`: `a smile`, `the smile`
- `lips`: `his lips`, `her lips`, `their lips`

## Why Not Implemented

- Breathing, low voice, and smiles are ordinary physical actions.
- The implemented narrative rule skips sentences with concrete causes and uses only stock frames with stronger signal.
- These remaining frames need either density logic or stricter surrounding context before they are safe.

## Required Fixture Work Before Implementation

- Add medical, sports, performance, and literal-action no-hits.
- Add hits only when the sentence is stock emotional shorthand.
- Consider reporting only repeated use inside one passage.
