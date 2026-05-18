# Slop Source Analysis And Build Selection

## Goal

Analyze the extracted source material under `legacy/source-material/expansion-2026-05-18/` and decide what Slopless should build next.

This plan is for analysis only. Do not implement rules, do not edit fixtures, and do not accept fixture output while executing this plan.

The desired output is a decision record that classifies every extracted candidate into one of four states:

- `build-now`: implement as deterministic Slopless rules and fixtures.
- `fixture-only`: use as case/corpus material, but do not build a new rule yet.
- `source-only`: keep as reference material or future mining data.
- `reject`: do not use because it is too noisy, duplicated, inaccessible, incompatible with product scope, or not mechanically actionable.

## Input Files

Primary source reports:

- `legacy/source-material/expansion-2026-05-18/academic-nlp/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/rule-libraries/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/ai-slop/extraction-report.md`
- `legacy/source-material/expansion-2026-05-18/writing-corpora/extraction-report.md`

Derived candidate files:

- `datasets/labeled/academic-nlp/derived/*.json`
- `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/*.json`
- `datasets/labeled/prose-linter-lexicons/expansion-2026-05-18/derived/*.md`
- `datasets/labeled/ai-slop/expansion-2026-05-18/derived/*.json`
- `datasets/labeled/ai-slop/expansion-2026-05-18/derived/*.md`
- `datasets/labeled/writing-corpora/expansion-2026-05-18/derived/*.json`
- `datasets/labeled/writing-corpora/expansion-2026-05-18/derived/*.md`

Current implementation references:

- `src/rules/**`
- `src/registries/**`
- `behavior/fixtures/textlint-rules/cases/**`
- `behavior/fixtures/textlint-rules/corpus/**`
- `legacy/source-material/reviewed/implemented/incorporation-record.md`

## Output Files

Create these files during execution:

- `legacy/source-material/expansion-2026-05-18/analysis-selection/selection-report.md`
- `legacy/source-material/expansion-2026-05-18/analysis-selection/candidate-ledger.json`
- `legacy/source-material/expansion-2026-05-18/analysis-selection/build-now.md`
- `legacy/source-material/expansion-2026-05-18/analysis-selection/fixture-only.md`
- `legacy/source-material/expansion-2026-05-18/analysis-selection/source-only.md`
- `legacy/source-material/expansion-2026-05-18/analysis-selection/rejected.md`

Do not create implementation manifests until this analysis is complete.

## Candidate Model

Every candidate row in `candidate-ledger.json` must include:

- `id`: stable kebab-case ID.
- `source_track`: `academic-nlp`, `rule-libraries`, `ai-slop`, or `writing-corpora`.
- `source_name`: exact source name.
- `source_path`: local extracted file path.
- `candidate_type`: one of `lexicon`, `template`, `density`, `sequence`, `metric`, `corpus`, `fixture`, `taxonomy`, `benchmark`.
- `proposed_family`: existing Slopless family or proposed new family.
- `proposed_rule`: existing rule or proposed new rule.
- `signal`: what the candidate detects in plain language.
- `examples`: short examples from source or derived notes.
- `implementation_shape`: how it would be implemented deterministically.
- `dependencies`: any parser, token, sentence, range, or metadata needs.
- `fixture_plan`: hit and no-hit fixture requirements.
- `corpus_plan`: how it would appear in flowing corpus.
- `overlap`: existing Slopless rule or data overlap.
- `false_positive_risks`: concrete risk cases.
- `decision`: `build-now`, `fixture-only`, `source-only`, or `reject`.
- `decision_reason`: specific reason.
- `confidence`: `high`, `medium`, or `low`.

## Evaluation Criteria

### Build Now

A candidate can be `build-now` only if all are true:

- It can be implemented deterministically with the current textlint architecture.
- It has a bounded matching surface.
- It has clear hit examples.
- It has obvious no-hit examples.
- It is not already covered by an existing Slopless rule.
- It can be tested in cases and then embedded in corpus.
- It does not require a model, POS tagger, dependency parser, or external runtime unless that dependency is separately approved.

### Fixture Only

A candidate should be `fixture-only` if:

- It is a real writing-quality issue.
- It improves the corpus or case coverage.
- It is not yet safe enough for a deterministic rule.
- It helps test an existing rule's false-positive behavior.

### Source Only

A candidate should be `source-only` if:

- It is useful background or benchmark material.
- It is too broad for a rule.
- It needs comparative mining before it becomes actionable.
- It is a large dataset that should not be copied into fixtures directly.
- It is an implementation method rather than a concrete rule candidate.

### Reject

A candidate should be `reject` if:

- It is duplicated by current Slopless rules and data.
- It is unsupported folklore with no clear actionable signal.
- It is grammar correction rather than slop detection.
- It is policy-sensitive and outside Slopless scope.
- It needs a parser/model the project does not have.
- It would produce obvious false positives in ordinary prose.

## Analysis Steps

### 1. Build Current Coverage Map

Read current rules and fixture files.

Produce a private working map of:

- rule IDs
- families
- data files
- existing candidate sources already incorporated
- existing case coverage
- corpus coverage

Purpose: prevent duplicated candidates from being marked `build-now`.

### 2. Normalize Candidate Inputs

Read every derived JSON and Markdown candidate file.

Extract each distinct candidate into a temporary list:

- phrase list
- slot pattern
- syntactic sequence
- density idea
- metric idea
- corpus source
- benchmark/evaluation source
- fixture-only example

Do not decide yet. This step only normalizes.

### 3. Deduplicate Against Slopless

For each candidate, compare against:

- current rule source files
- rule data JSON files
- cases hits/no-hits
- corpus fixtures
- `legacy/source-material/reviewed/implemented/incorporation-record.md`

Mark overlap explicitly.

Strong examples:

- `delve`, `tapestry`, and stock LLM vocabulary probably overlap existing `llm-vocabulary`.
- `response wrapper` phrases probably overlap `response-wrapper` and `llm-disclaimer`.
- wordiness and redundancy lists may overlap `wordiness`, `redundancy`, `simplicity`, and `corporate-speak`.

### 4. Score Determinism

For every candidate, score whether it can be implemented without guessing:

- `exact`: exact phrase or word-boundary lexicon.
- `bounded-template`: finite slot/template rule.
- `density`: repeated signals in a paragraph/document.
- `metric`: count or threshold from existing text units.
- `requires-parser`: requires POS, dependency parse, entity detection, or discourse parse.
- `requires-model`: requires classifier or embedding model.

Only `exact`, `bounded-template`, `density`, and simple `metric` can become `build-now`.

### 5. Score False-Positive Risk

For every candidate, write concrete false-positive examples.

Do not use generic phrases like "could be noisy". Name the actual contexts:

- scientific caution
- legal disclaimers
- Wikipedia tone labels
- product documentation
- quoted reviews
- fiction narration
- technical repetition
- learner-English grammar
- accessibility or inclusive-language policy

High false-positive candidates cannot be `build-now` unless the implementation shape includes a guard or density threshold.

### 6. Group Into Implementation Themes

Group viable candidates by product area, not by source:

- `vague-quantifiers`
- `vague-attribution`
- `puffery/evaluative-claims`
- `low-informativeness`
- `discourse-marker-density`
- `light-verb-wordiness`
- `AI-fiction-formulas`
- `assistant-artifact-expansion`
- `markdown/list artifacts`
- `revision-pair corpus`
- `benchmark/source-only corpora`

For each theme, decide whether it maps to an existing family or needs a new family.

Prefer existing families unless a new family clarifies behavior:

- `phrases` for lexicon and exact phrase policy.
- `syntactic-patterns` for sentence or sequence templates.
- `semantic-thinness` for empty abstract/evaluative claims.
- `narrative-slop` for fiction-specific density and rhythm issues.
- `words` for word-level hedge, weasel, or vocabulary patterns.
- `metrics` for document/paragraph density.

### 7. Choose Build-Now Set

Select a first implementation batch that is small enough to review strictly.

Preferred first batch criteria:

- high-confidence signal
- low-to-medium false-positive risk
- direct fixture examples
- minimal new architecture
- useful corpus expansion

Likely first candidates to evaluate:

- vague quantifiers without nearby numbers
- vague attribution frames
- puffery/evaluative claim clusters
- discourse marker density
- light-verb wordiness
- assistant artifact leakage
- AI-fiction formula density

Do not include grammar-correction corpora in the first build batch unless the output is fixture-only.

### 8. Design Fixture Strategy

For every `build-now` candidate, define:

- case hits
- case no-hits
- corpus paragraph topic
- whether the rule reports one-to-one or density-based
- expected false-positive stress cases

Use this rule:

- Cases are minimal Markdown lines.
- Corpus embeds all case findings in readable prose.
- Corpus may contain extra findings.
- No golden output is accepted until all hit/no-hit review is complete.

### 9. Produce Final Decision Files

Write:

- `candidate-ledger.json`: every candidate with decision and reason.
- `build-now.md`: selected implementation batch grouped by rule/family.
- `fixture-only.md`: candidates to add as stress corpus or no-hit/hit fixtures.
- `source-only.md`: benchmark/corpus/reference sources to keep.
- `rejected.md`: rejected candidates with concrete reason.
- `selection-report.md`: concise narrative summary and recommended next manifest.

## Required Review Passes

### Internal Consistency Review

Check:

- every derived source file was read
- every extraction report source is represented in the ledger
- every `build-now` item has fixture and corpus plans
- every high-risk item has concrete false-positive examples
- every rejected item has a specific reason

### Architecture Review

Check:

- no candidate requires new architecture without saying so
- density rules remain reporting-policy decisions, not detection hacks
- existing families are reused where correct
- no new taxonomy term is introduced without need

### Product Review

Check:

- selected candidates improve Slopless as a library for detecting AI and human slop
- selected candidates are not just grammar correction
- selected candidates do not turn Slopless into an AI-authorship detector
- selected candidates can be explained to users clearly

## Non-Goals

- Do not implement rules.
- Do not edit fixtures.
- Do not accept fixture output.
- Do not add dependencies.
- Do not download huge gated corpora.
- Do not create a model-training plan.
- Do not move source material again.

## Completion Criteria

This analysis is complete when:

- `candidate-ledger.json` covers all extracted source tracks.
- Every candidate has exactly one decision.
- `build-now.md` contains the next proposed implementation batch.
- `selection-report.md` explains why those candidates beat the rejected/deferred alternatives.
- No product files changed.
