# Slop Source Expansion Extraction

## Goal

Build an exhaustive local research base for expanding Slopless beyond the current rule and fixture corpus.

The immediate end state is not new product rules. The immediate end state is a reviewed source inventory under `legacy/source-material/expansion-2026-05-18/` with raw source captures, extracted candidate rules, extracted example cases, known corpus/data availability, and false-positive notes.

## Current Baseline

- Product rules: 43 TypeScript rule files under `src/rules`.
- Case fixtures: 2,006 Markdown lines under `behavior/fixtures/textlint-rules/cases`.
- Flowing corpus: 6 Markdown files and 2,248 lines under `behavior/fixtures/textlint-rules/corpus`.
- Existing mined sources already moved to `legacy/source-material`.

The current weakness is not lack of rules. It is lack of external source breadth and lack of larger realistic corpus coverage.

## Output Layout

Each extraction agent owns exactly one folder:

- `legacy/source-material/expansion-2026-05-18/academic-nlp/`
- `legacy/source-material/expansion-2026-05-18/rule-libraries/`
- `legacy/source-material/expansion-2026-05-18/ai-slop/`
- `legacy/source-material/expansion-2026-05-18/writing-corpora/`

Each folder must contain:

- `extraction-report.md`
  - source names and URLs
  - what was downloaded or captured
  - what was not downloadable and why
  - rule ideas
  - specific candidate phrases, sentences, patterns, labels, or categories
  - corpus/data shape
  - false-positive risks
  - overlap with existing Slopless rules
- `raw/`
  - source files, README captures, rule files, metadata, sample data, or download notes
- `derived/`
  - normalized candidate lists and notes extracted from raw sources

## Extraction Tracks

### Academic NLP

Owns:

- WikiSQE
- Wiki Neutrality Corpus
- Detection of Puffery on English Wikipedia
- CoNLL-2010 Hedge Detection / BioScope
- VAQUUM
- MPQA Subjectivity Lexicon / OpinionFinder
- General Inquirer
- SQUINKY
- SpecificityTwitter
- TAACO
- TAALES
- TAASSC
- DiMLex-Eng
- GUM
- MAGPIE
- STREUSLE

Expected extraction:

- vague-word and vague-sentence labels
- peacock/puffery/evaluative language
- subjectivity and overstatement lexicons
- discourse connective inventories
- multiword expression and light-verb candidates
- informativeness and specificity features
- cohesion and repetition feature ideas

### Rule Libraries

Owns:

- `tbhb/vale-ai-tells`
- `ammil-industries/vale-signs-of-ai-writing`
- `@textlint-ja/textlint-rule-preset-ai-writing`
- LanguageTool English rules
- RedPen English validators
- `retext-simplify`
- `retext-intensify`
- `words/hedges`, `words/fillers`, `words/weasels`
- `alex` / `retext-equality`
- Red Hat Vale style guide
- Splunk Vale style guide
- GitHub Docs content linter
- `get-woke/woke`
- `textlint-rule-terminology`
- `@veldica/prose-linter`
- `agent-style`

Expected extraction:

- concrete rule files and examples
- phrase lists
- deterministic structures
- markdown-specific artifact checks
- simple-word and wordiness lists not already covered
- high-risk/noisy patterns to reject or isolate

### AI Slop

Owns:

- Antislop / auto-antislop / antislop-sampler
- SlopSquid
- LLM Slop Detector
- nanxstats/llm-cliches
- slop-guard-rs
- Stop Slop
- RAID
- MAGE
- HC3 / HC3 Plus
- M4GT-Bench
- Beemo
- low-rigor lists only as candidate generators: aismells, SynkrLAB, Your AI Slop Bores Me, SlopDetector taxonomy, ChatGPT cliche gists

Expected extraction:

- AI-style phrase lists
- fiction-specific trigrams
- structural formulas
- assistant leakage patterns
- benchmark/corpus download metadata
- high-risk broad vocabulary separated from high-confidence artifacts

### Writing Corpora

Owns:

- BEA-2019 W&I+LOCNESS
- CLC FCE Dataset
- NUCLE
- JFLEG
- cLang-8 / Lang-8
- EFCAMDAT
- Write & Improve Corpus 2024
- ELLIPSE Corpus
- PERSUADE 2.0
- DREsS
- ArgRewrite V.2
- USC First-Year English Corpus
- CROW
- LEAF
- ERRANT
- ASSET
- MinWikiSplit

Expected extraction:

- available download metadata
- labels and annotation categories
- bad/good sentence pairs or examples where available
- revision-pair mining opportunities
- grammar-only material that should not become default Slopless rules
- style-quality material that can become fixtures or rule ideas

## Rules For Extraction

- Do not implement product rules.
- Do not edit `src/`, `behavior/fixtures`, or existing golden output.
- Do not add source material outside the assigned folder.
- Prefer raw source files when small and directly useful.
- For large datasets, capture metadata, schemas, sample rows, download commands, and source URLs instead of downloading huge archives.
- Separate direct candidates from risky candidates.
- Every candidate must say how it could become:
  - a deterministic rule
  - a case fixture
  - a flowing corpus fixture
  - or only a rejected/source-only note

## Verification

This phase is complete only when:

- every assigned folder exists
- every folder has an `extraction-report.md`
- every report names all assigned sources
- every report distinguishes downloaded, sampled, unavailable, and rejected material
- no product code or fixture golden output changed
