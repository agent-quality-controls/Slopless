# Heuristic Engine Handoff

Date: 2026-05-12 15:26

## Goal

Give another agent enough context to build the next deterministic Rust heuristic engine for AI slop detection.

This handoff is only about native Rust heuristics. It intentionally excludes external style linters and preset integration.

## Problem To Solve

The current rule set catches many known phrases and several construction families. It still misses broader deterministic classes:

- empty stage-setting
- vacuous physical blocking
- filler narration
- bland metaphorical emphasis
- low-information sentence pairs
- generic advice punchlines that do not use explicit negation

Examples to target in future rules:

- `They looked there, then there.`
- `They just stood there.`
- `The yard was empty.`
- `It changes the scene. It does not build the skill.`
- `Problem-solving lands after the storm, not during it.`
- `Prevention lives in rehearsal, not in the lecture after somebody has already launched a shoe.`
- `It sounds small, and it changes everything.`
- `The rehearsal is the part that sticks.`

The target is deterministic span-level evidence, not a global score.

## Current Rust Rule Engine

The rule engine is crate-split by family.

Core contract:

- `apps/prosesmasher/crates/app/checks/core/runtime/src/check.rs`
- `apps/prosesmasher/crates/app/checks/core/runtime/src/runner.rs`

Every check implements:

```rust
pub trait Check {
    fn id(&self) -> &'static str;
    fn label(&self) -> &'static str;
    fn supported_locales(&self) -> Option<&'static [Locale]>;
    fn run(&self, doc: &Document, config: &CheckConfig, suite: &mut ExpectationSuite);
}
```

The runner:

- creates one `ExpectationSuite`
- skips checks whose `supported_locales` exclude the document locale
- calls `check.run(...)`
- returns a `SuiteValidationResult`

Checks record failures with:

```rust
suite.record_custom_values(
    "check-id",
    success_condition,
    json!({ "max": 0 }),
    json!(observed_count),
    &evidence,
)
```

Evidence is what downstream rewrite agents use. New checks must include useful span-level evidence.

## Document Model

Document model:

- `apps/prosesmasher/crates/domain/types/runtime/src/document.rs`

Important structs:

```rust
pub struct Document {
    pub locale: Locale,
    pub sections: Vec<Section>,
    pub metadata: DocumentMetadata,
}

pub struct Section {
    pub heading: Option<Heading>,
    pub blocks: Vec<Block>,
}

pub enum Block {
    Paragraph(Paragraph),
    List(ListBlock),
    BlockQuote(Vec<Self>),
    CodeBlock(String),
}

pub struct Paragraph {
    pub sentences: Vec<Sentence>,
    pub has_bold: bool,
    pub has_italic: bool,
    pub links: Vec<Link>,
}

pub struct Sentence {
    pub text: String,
    pub words: Vec<Word>,
}
```

Implications:

- Rules should inspect paragraphs and sentence windows, not raw markdown.
- `CodeBlock` should normally be ignored.
- `BlockQuote` is usually traversed recursively.
- `List` currently stores item strings only, so list-aware slop needs extra parser support if sentence-level evidence is required inside list items.
- Word counts should use `Sentence::word_count()`.

## Current Families

Catalog wiring:

- `apps/prosesmasher/crates/app/checks/catalog/runtime/src/lib.rs`

Heuristic families:

- `style-signals`
  - punctuation and mechanical style signals
  - examples: `em-dashes`, `smart-quotes`, `colon-dramatic`
- `cadence-patterns`
  - sentence rhythm and adjacent-sentence constructions
  - examples: `negation-reframe`, `fragment-stacking`, `triple-repeat`, `demonstrative-emphasis`
- `rhetorical-framing`
  - stock openers and closers
  - examples: `llm-openers`, `affirmation-closers`, `summative-closer`, `false-question`
- `persona-signals`
  - fake persona / fake expertise language
  - examples: `humble-bragger`, `jargon-faker`
- `llm-slop`
  - AI-specific and short-form slop families
  - examples: `llm-disclaimer`, `response-wrapper`, `generic-signposting`, `empty-emphasis`, `contrastive-aphorism`, `authority-padding`

Do not merge all slop into one file. Ownership boundaries matter.

## Existing Shared Helpers

LLM slop helper file:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/support.rs`

Useful helpers:

```rust
collect_sentence_evidence(doc, matcher)
collect_adjacent_sentence_evidence(doc, matcher)
normalize(sentence)
strip_leading_prefixes(text, prefixes)
contains_any(text, patterns)
starts_with_any(text, patterns)
strip_quoted_segments(text)
sentence_evidence(section_index, paragraph_index, sentence_index, pairs)
```

Current limitations:

- Similar token helpers are duplicated across rule files.
- `cadence-patterns` has its own `normalize_text`.
- `negation-reframe` has grown too large and contains many construction helpers inline.
- There is no shared construction engine yet.

## Existing Rule Examples

### Empty Emphasis

File:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/slop_09_empty_emphasis.rs`

Purpose:

- Catch short deictic filler lines.

Positive examples:

- `That last part matters.`
- `This part matters.`
- `That one change helped a lot.`
- `This is telling you something.`
- `That is still real change.`
- `That is how the pattern weakens.`
- `What helps is not brilliant.`
- `That is discipline.`

Negative examples:

- `That contract term matters.`
- `That last part matters because the contract changes the failure mode completely.`
- `This is how the circuit weakens under repeated over-voltage conditions.`
- quoted discussion of bad phrases

Design:

- Normalize.
- Strip leading `and`, `but`, `so`, `because`.
- Strip quoted segments.
- Token-match exact short shapes.
- Avoid longer explanatory sentences.

### Generic Signposting

File:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/slop_03_generic_signposting.rs`

Purpose:

- Catch stock meta framing and abstract evaluation lines.

Positive examples:

- `The useful move is ...`
- `The useful question is ...`
- `The answer is simple.`
- `A simple sequence works well.`
- `The result worth caring about ...`
- `The bigger win is ...`
- `The point is to ...`
- `What matters most is ...`
- `What helps is ...`

Design:

- Some exact phrase families.
- Some construction-level token matching.
- Strong meta frames fail even with one hit.
- Weaker signposts allow one per document.

### Boilerplate Framing

File:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/slop_04_boilerplate_framing.rs`

Purpose:

- Catch list/setup scaffolding.

Positive examples:

- `Some examples include ...`
- `Some common factors include ...`
- `There are common reasons ...`
- `The following sections explore ...`
- `When it comes to ...`

Important prior decision:

- Do not flag `the following factors` by itself.
- It only fails when combined with list/setup verbs or preview structure.

### Negation Reframe

File:

- `apps/prosesmasher/crates/app/checks/cadence-patterns/runtime/src/heur_05_negation_reframe.rs`

Purpose:

- Catch corrective, sloganized contrast pairs.

Positive examples:

- `This isn't defiance. It's developmental.`
- `The goal is not zero tears. The goal is learning, over and over, that you leave and come back.`
- `You do not need to sell school as magical. You need to make it familiar and survivable.`
- `They are not looking for a TED talk in that moment. They are looking for proof that an adult is calm enough to stay.`
- `Calm adults do not erase meltdowns. They shorten the road back from them.`
- `Volatile kids do not need speeches about self-control. They need repetition, modeling, and a family language for what to do when the heat rises.`
- `The useful alternatives are not softer punishments. They are different moves.`
- `That does not make the hitting okay. It does explain the pattern.`
- `Hitting back teaches fear and confusion. It does not teach regulation.`

Negative examples:

- action narration: `I could not fix the banana.`
- technical explanation without same-root reframe
- normal behavior followup: `Children don't stop at the corner. They turn left instead.`

Current design:

- inline `X, not Y`
- adjacent sentence pairs
- interrupted triplets where a short sentence interrupts the reframe
- many construction helpers:
  - repeated abstract frame
  - repeated need/want corrective
  - human-subject corrective
  - same-subject copular corrective
  - agentive action verb corrective
  - pronoun verb mirror corrective
  - noun phrase action verb to `it` corrective

Known issue:

- The file is effective but too large. It should be broken into shared construction primitives.

### Contrastive Aphorism

File:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/slop_10_contrastive_aphorism.rs`

Purpose:

- Catch short aphoristic contrast lines that are not necessarily adjacent negation reframes.

Positive examples:

- `Kids get kind in reps, not revelations.`
- `Bring a pattern, not a vibe.`
- `Mostly by treating social skills like scripts, not virtues.`
- `Watch for a pattern, not one bad week.`
- `I would give one anchor, not a buffet.`
- `I would expect repetition, not elegance.`
- `Daily life is enough for this. Daily life is the curriculum.`
- `That is the part most families miss.`
- `The rehearsal is the part that sticks.`
- `It sounds small, and it changes everything.`

Current design:

- token-pattern matcher with `TokenPart`
- curated subject, verb, and abstract noun families
- adjacent-sentence curriculum pair

## Existing Tests

Every check should have:

- runtime file
- assertion helper file
- synthetic tests

Example files:

- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/slop_09_empty_emphasis_tests/synthetic.rs`
- `apps/prosesmasher/crates/app/checks/llm-slop/assertions/src/slop_09_empty_emphasis.rs`
- `apps/prosesmasher/crates/app/checks/cadence-patterns/runtime/src/heur_05_negation_reframe_tests/synthetic.rs`
- `apps/prosesmasher/crates/app/checks/cadence-patterns/assertions/src/heur_05_negation_reframe.rs`

Shared test support:

- `apps/prosesmasher/crates/app/checks/test-support/src/builders.rs`
- `apps/prosesmasher/crates/app/checks/test-support/src/result_helpers.rs`

Synthetic tests must include:

- adversarial positives
- adversarial negatives
- quoted bad phrase cases
- code block cases when relevant
- non-English skip when relevant
- config disabled case when relevant

Fixture sidecars:

- `fixtures/*.expected.general-en.json`
- `fixtures/medicaloutline/*.expected.general-en.json`

Sidecar shape:

```json
[
  {
    "rule": "llm-disclaimer",
    "evidenceContains": [
      "as a language model"
    ]
  }
]
```

When rewriting fixture expected results:

- First record the current failures.
- Then compare new output.
- Old expected failures must not disappear unless the rule was intentionally removed or narrowed.
- New failures are acceptable only if the caught text is actually bad under the preset being tested.

## Proposed Heuristic Engine Shape

Build a small internal construction engine in Rust.

Do not build a generic parser. Build constrained construction primitives.

Candidate module:

- `apps/prosesmasher/crates/app/checks/pattern-engine/runtime`

or, if smaller:

- `apps/prosesmasher/crates/app/checks/cadence-patterns/runtime/src/constructions.rs`
- `apps/prosesmasher/crates/app/checks/llm-slop/runtime/src/constructions.rs`

Prefer a shared crate only if at least two families use it immediately.

### Primitive 1: Normalized Sentence

Create a reusable normalized sentence view:

```rust
struct NormalizedSentence<'a> {
    original: &'a str,
    normalized: String,
    tokens: Vec<String>,
    word_count: usize,
}
```

Responsibilities:

- lowercase
- normalize smart quotes
- remove terminal punctuation for token matching
- preserve apostrophes
- strip quoted segments when requested
- strip leading discourse prefixes when requested

Do not hand-roll this separately in every rule.

### Primitive 2: Token Pattern

Move the `TokenPart` idea out of `contrastive-aphorism`.

Needed parts:

- exact token
- one-of family
- article
- any single token
- any token sequence with max length
- optional token
- subject capture
- repeated capture

Example use:

```rust
Pattern::new([
  Exact("the"),
  OneOf(ABSTRACT_EVALUATION_NOUNS),
  Exact("is"),
  AnySeq { max: 6 },
])
```

Keep it simple. Do not add regex.

### Primitive 3: Sentence Window

Create reusable iteration over:

- single sentence
- adjacent pair
- triplet with short interrupt
- paragraph-level windows

Each match should return:

- section index
- paragraph index
- sentence index
- original sentence text
- optional next sentence
- pattern kind
- matched text

### Primitive 4: Construction Families

Create construction helpers for current and future slop:

- same-subject copular contrast
- same-subject action contrast
- abstract frame contrast
- deictic empty emphasis
- abstract evaluation frame
- contrastive aphorism
- stage-setting filler
- low-information physical narration

Each construction should define:

- allowed subject families
- allowed verb families
- allowed abstract noun families
- max word count
- sentence position constraints
- whether reverse order is allowed
- whether quoted text is ignored

### Primitive 5: Evidence Builder

Create one builder so evidence is stable:

```json
{
  "section_index": 0,
  "paragraph_index": 1,
  "sentence_index": 2,
  "pattern_kind": "deictic-real-change",
  "matched_text": "That is still real change.",
  "sentence": "That is still real change."
}
```

For adjacent pairs:

```json
{
  "section_index": 0,
  "paragraph_index": 1,
  "sentence_index": 2,
  "pattern_kind": "same-subject-negation-reframe",
  "matched_text": "not x -> y",
  "sentence": "...",
  "next_sentence": "..."
}
```

## Proposed New Heuristic Families

### 1. Empty Stage Setting

Purpose:

- Catch short scene-setting lines that add no concrete action or causal information.

Candidate examples:

- `The yard was empty.`
- `The room was quiet.`
- `The house felt still.`
- `The silence sat between them.`

Adversarial negatives:

- `The yard was empty because the evacuation order had cleared the neighborhood.`
- `The room was quiet enough for the audio recording to capture the fan noise.`
- `The house felt still after the compressor shut off.`

Matcher shape:

- determiner + concrete place noun + copula + thin adjective
- max 6 words
- no causal clause
- no concrete modifier after the adjective

Risk:

- In fiction, short stage-setting can be good.
- This belongs in harsh, not general.

### 2. Low-Information Physical Blocking

Purpose:

- Catch bland action beats that exist only to move a body around the scene.

Candidate examples:

- `They just stood there.`
- `She looked around.`
- `He turned and looked back.`
- `They looked from one face to another.`

Adversarial negatives:

- `She looked around for the missing inhaler.`
- `He turned and looked back when the alarm sounded.`
- `They stood there until the vibration sensor stopped moving.`

Matcher shape:

- human pronoun or human noun subject
- thin physical verb family:
  - `look`, `stand`, `sit`, `turn`, `walk`, `stare`
- weak adverbs:
  - `just`, `simply`, `quietly`
- no object with specific information
- no causal or purpose clause
- short sentence only

Risk:

- Fiction uses physical blocking legitimately.
- This belongs in harsh or a fiction-rewrite mode, not general.

### 3. Empty Scene Transition

Purpose:

- Catch generic transition lines that declare motion/change without information.

Candidate examples:

- `It changed the scene.`
- `Everything shifted.`
- `The moment passed.`
- `The room changed after that.`

Adversarial negatives:

- `The scene changed when the camera cut to the exterior courtyard.`
- `Everything shifted after the new tax rule took effect.`

Matcher shape:

- deictic or abstract subject:
  - `it`, `everything`, `the moment`, `the scene`, `the room`
- vague change verb:
  - `changed`, `shifted`, `passed`
- max 6 words
- no concrete cause or result

### 4. Hollow Significance Line

Purpose:

- Extend `empty-emphasis` beyond deictic forms.

Candidate examples:

- `The rehearsal is the part that sticks.`
- `It sounds small, and it changes everything.`
- `That one change helped a lot.`
- `The result worth caring about is ...`

Current coverage:

- `empty-emphasis` covers some.
- `contrastive-aphorism` covers some.
- `generic-signposting` covers some.

Recommended refactor:

- keep existing rule IDs stable
- move matching primitives into shared construction helpers
- do not create a new duplicate rule unless the current family boundary is wrong

### 5. Metaphorized Abstract Claim

Purpose:

- Catch slogan-like abstract metaphors with no concrete referent.

Candidate examples:

- `Prevention lives in rehearsal, not in the lecture.`
- `Problem-solving lands after the storm, not during it.`
- `Daily life is the curriculum.`
- `The answer is a steadier rhythm.`

Matcher shape:

- abstract subject family:
  - `prevention`, `problem-solving`, `daily life`, `the answer`, `the work`
- metaphor verb family:
  - `lives`, `lands`, `sits`, `starts`, `belongs`
- abstract object/prepositional phrase family
- optional `not` contrast
- short-to-medium sentence

Risk:

- This is also how some good essays sound.
- Harsh only.

## Implementation Plan

### Step 1: Add a construction helper where it is actually used

Do not create a broad framework before a rule uses it.

Start with either:

- extracting token matching from `contrastive-aphorism`
- extracting normalized sentence + evidence builders from `llm-slop/support.rs`

Done means:

- one existing rule uses the helper
- tests still pass
- no behavior change

### Step 2: Refactor one existing rule without behavior changes

Best first target:

- `slop_10_contrastive_aphorism.rs`

Reason:

- It already has `TokenPart`.
- It is smaller than `negation-reframe`.
- It is close to the target construction model.

Done means:

- all existing `contrastive-aphorism` tests pass
- fixture diff has no lost expected failures

### Step 3: Add one harsh-only new check

Best first new rule:

- `empty-stage-setting`

Reason:

- It is a different slop class from current negation/meta rules.
- It can be tested with tight positives and adversarial negatives.

Suggested family:

- new `scene-filler` module under `llm-slop`
- split into a separate crate only if it reaches 5 rules

Initial positives:

- `The yard was empty.`
- `The room was quiet.`
- `They just stood there.`
- `Everything shifted.`

Initial negatives:

- `The yard was empty because the evacuation order had cleared the neighborhood.`
- `The room was quiet enough for the audio recording to capture the fan noise.`
- `They stood there until the vibration sensor stopped moving.`
- `Everything shifted after the new tax rule took effect.`

Do not enable in `general`.

### Step 4: Add fixture comparison tooling if missing

The implementation should not rely on eyeballing only.

Needed workflow:

1. Run current `prosesmasher` on all fixtures.
2. Store current failures or compare to sidecars.
3. Apply rule changes.
4. Run again.
5. Print:
   - lost failures
   - new failures
   - new failures grouped by rule
   - evidence snippets
6. Manually review every new failure before accepting.

### Step 5: Keep family boundaries clean

Suggested ownership:

- `cadence-patterns`
  - sentence rhythm, repetition, adjacent sentence constructions
  - negation-reframe stays here
- `llm-slop`
  - AI-specific hollow writing, response wrappers, empty emphasis, boilerplate, scene filler
- `rhetorical-framing`
  - stock openers and closers
- `style-signals`
  - punctuation and typography

If a new family reaches 5 rules, split it into its own crate.

## Verification Commands

Run targeted tests first:

```bash
cargo test --manifest-path apps/prosesmasher/Cargo.toml -p prosesmasher-app-checks-llm-slop-runtime
cargo test --manifest-path apps/prosesmasher/Cargo.toml -p prosesmasher-app-checks-cadence-patterns-runtime
```

Run broader check tests:

```bash
cargo test --manifest-path apps/prosesmasher/Cargo.toml -p prosesmasher-app-checks-catalog-runtime
cargo test --manifest-path apps/prosesmasher/Cargo.toml -p prosesmasher-adapters-inbound-cli-runtime
```

Run CLI on fixtures:

```bash
cargo run --manifest-path apps/prosesmasher/Cargo.toml -p prosesmasher -- check fixtures --preset general-en --format json
```

## Definition Of Done For New Heuristics

A new heuristic is done only when:

- synthetic positive tests fail for the right rule
- synthetic negative tests pass
- quoted examples pass
- code blocks pass
- non-English behavior is correct
- config `enabled: false` disables the check
- fixture diff has no accidental lost expected failures
- every new fixture hit is reviewed as desirable for the target preset
- output evidence contains enough text for rewrite agents to act
