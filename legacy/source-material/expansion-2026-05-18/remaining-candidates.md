# Remaining Candidates

This is the active queue for `legacy/source-material/expansion-2026-05-18/`.

Implemented material from the latest AI-slop gap batch is archived in:

- `implemented/2026-05-18-ai-slop-gaps.md`

Raw captures and extraction reports stay in place as provenance. The list below is the working implementation review queue.

## Best Next Implementation Candidates

### 1. Assistant artifact and placeholder residue

Source files:

- `rule-libraries/derived/high-confidence-candidates.json`
- `rule-libraries/derived/fixture-corpus-ideas.md`
- `ai-slop/raw/slop-guard-rs/lib.rs`

Signals:

- `:contentReference[oaicite:N]{index=N}`
- `[oaicite:N]`
- `oai_citation`
- `sandbox:/mnt/data/`
- `utm_source=chatgpt.com`
- `utm_source=openai`
- `[INSERT TEXT]`
- `[PLACEHOLDER]`
- `[CITATION NEEDED]`
- `Lorem ipsum`

Recommended implementation:

- Existing family: `orthography` or `markdown-layout`.
- Better rule name: `artifact-placeholders`.
- Scan raw Markdown text and text nodes.
- Skip fenced code, inline code, blockquotes that explicitly document the artifact, and quoted examples where current quote detection applies.

Why next:

- It is deterministic.
- It has low false-positive risk.
- It catches generated residue that should almost never ship.
- It does not need a model, parser, or density gate.

Required no-hit controls:

- A documentation sentence that quotes `:contentReference[oaicite:3]{index=3}` as an example.
- A code block containing `[PLACEHOLDER]`.
- A typography or template guide explaining `Lorem ipsum`.

### 2. Markdown file artifacts

Source files:

- `rule-libraries/derived/high-confidence-candidates.json`
- `rule-libraries/derived/fixture-corpus-ideas.md`

Signals:

- `TODOCS`
- merge conflict markers such as `<<<<<<< HEAD`
- Markdown table rows with inconsistent cell counts
- heading text wrapped entirely in bold markup, such as `## **Overview**`

Recommended implementation:

- Existing family: `markdown-layout`.
- Rule split:
  - `markdown-layout:merge-conflict-markers`
  - `markdown-layout:placeholder-artifacts`
  - `markdown-layout:table-shape`
  - `markdown-layout:bold-heading`
- Keep bold list lead-ins out of the first batch because they are common house style in technical docs.

Why next:

- It is deterministic.
- The family already exists as an empty folder.
- It expands Slopless beyond prose phrases into shipped Markdown defects.

Required no-hit controls:

- A blockquote explaining merge conflict markers.
- A valid Markdown table.
- A heading that uses bold text inside the body but is not itself a fully bold heading.

### 3. Formal transition opener density

Source files:

- `rule-libraries/derived/high-confidence-candidates.json`
- `ai-slop/derived/high-confidence-deterministic-candidates.json`
- `ai-slop/raw/aismells/llms-full.txt`

Signals:

- `Additionally,`
- `Furthermore,`
- `Moreover,`
- `In addition,`
- `Notably,`
- `Consequently,`
- `Therefore,`
- `Thus,`
- `Ultimately,`

Recommended implementation:

- Existing family: `syntactic-patterns/lead-ins`.
- Better rule name: `formal-transition-density`.
- Count sentence openers per paragraph and adjacent sentence window.
- Report only repeated density, not a single opener.

Why next:

- It catches a real LLM rhythm problem.
- It can be implemented using existing sentence extraction.
- It has clear false-positive control through density.

Required no-hit controls:

- One valid `However,` or `Therefore,` in an argument paragraph.
- Legal, academic, or technical prose with one formal transition.
- A blockquote with repeated transitions.

### 4. Uncited authority frames

Source files:

- `ai-slop/derived/high-confidence-deterministic-candidates.json`
- `academic-nlp/derived/wikipedia-quality-labels.json`
- `academic-nlp/derived/vagueness-specificity-candidates.json`

Signals:

- `studies show`
- `studies have shown`
- `research suggests`
- `research demonstrates`
- `experts agree`
- `experts suggest`
- `it is widely believed`
- `many believe`
- `some critics argue`
- `some argue`

Recommended implementation:

- Existing family: `syntactic-patterns/authority`.
- Extend `authority-padding` or create `uncited-authority`.
- Report when the authority frame has no nearby citation marker, URL, named source, year, or concrete study name.

Why next:

- It maps directly to existing `authority-padding`.
- It catches empty authority, not just style.
- It can be narrow if we require missing local evidence.

Risks:

- Citation detection can be brittle.
- Valid summaries can use these phrases when evidence is nearby.

Required no-hit controls:

- `Research suggests` followed by a named study and year.
- `Studies have shown` followed by a Markdown citation link.
- A quoted example of bad authority language.

### 5. Puffery and evaluative claim frames

Source files:

- `academic-nlp/derived/subjectivity-and-puffery-candidates.json`
- `academic-nlp/derived/wikipedia-quality-labels.json`

Signals:

- `renowned`
- `famous`
- `esteemed`
- `unprecedented`
- `greatest`
- `best version`
- `masterpiece`
- `excellent infrastructure`
- `very special achievement`

Recommended implementation:

- Existing family: `semantic-thinness` or `phrases`.
- Do not ban terms globally.
- Use bounded frames:
  - superlative plus generic noun without evidence
  - prestige adjective plus title/person/object
  - `unprecedented` plus generic event/change/move
- Prefer a density or missing-evidence gate.

Why next:

- It uses labeled source material.
- It fits the "empty evaluative group summary" problem.
- It is safer as templates than as a word list.

Risks:

- Review prose and historical writing can use evaluative words legitimately.
- Product pages intentionally use promotional language.

Required no-hit controls:

- A cited review quote using `renowned`.
- A historical sentence where `unprecedented` is concrete and dated.
- A benchmark result with a numeric best score.

### 6. Repeated sentence starts

Source files:

- `rule-libraries/derived/high-confidence-candidates.json`
- `writing-corpora/derived/rule-and-fixture-candidates.json`

Signals:

- adjacent sentences start with the same first token
- adjacent sentences start with the same first two tokens
- low sentence-start variety in a paragraph

Recommended implementation:

- Existing family: `syntactic-patterns/repetition`.
- Better rule name: `repeated-sentence-starts`.
- Report adjacent repetition only after a threshold, such as three adjacent starts with the same two-token prefix.
- Reuse current sentence extraction.

Why next:

- It catches a rhythm issue that current `triple-repeat` only partially covers.
- It is deterministic.
- It complements action-density and flat-cadence rules.

Risks:

- Rhetorical anaphora can be intentional.
- Children's prose can use repeated starts deliberately.

Required no-hit controls:

- A quoted speech with deliberate rhetorical repetition.
- A list-like paragraph with repeated labels that should be handled by Markdown structure, not prose rhythm.

## Useful But Not First

### Mechanical bold list lead-ins

Signals:

- `- **Performance:** ...`
- `- ✅ **Done:** ...`

Reason not first:

- Many technical docs intentionally use this as definition-list style.
- It needs a profile or document-type decision.

### Passive voice with by-agent

Signals:

- `was finalized by the team`
- `was caused by a typo`

Reason not first:

- A narrow by-agent version is implementable, but it is not specifically slop.
- Scientific, incident, legal, and technical prose use passive voice legitimately.
- This should be warning-level or profile-specific if implemented.

### Vague quantifiers

Signals:

- `some`
- `many`
- `a few`
- `a lot of`

Reason not first:

- Single quantifiers are too broad.
- Useful implementation needs nearby missing number, date, measurement, or concrete noun checks.
- This is more architecture than one bounded rule.

### Broad AI vocabulary

Signals:

- `delve`
- `tapestry`
- `robust`
- `seamless`
- `nuanced`
- `comprehensive`
- `vital`

Reason not first:

- High false-positive risk as standalone word rules.
- Useful only as density features combined with generic claims, no numbers, and formal transition overuse.

### Grammar and simplification corpora

Sources:

- BEA-2019
- CLC FCE
- NUCLE
- JFLEG
- ASSET
- WikiSplit

Reason not first:

- These are grammar, learner-English, simplification, or fluency resources.
- They are useful for no-hit fixtures and metrics calibration, not default Slopless rules.

## Current Recommendation

Implement in this order:

1. `artifact-placeholders`
2. `markdown-layout` artifact rules
3. `formal-transition-density`
4. `uncited-authority`
5. `puffery/evaluative claim frames`
6. `repeated-sentence-starts`

The first two are low-risk artifact rules. The next four are prose-quality rules and need stricter fixture review.
