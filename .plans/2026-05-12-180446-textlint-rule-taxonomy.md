# Textlint Rule Taxonomy

Date: 2026-05-12 18:04

## Goal

Define a taxonomy that is clear enough for adding new rules without arguing about vibes.

The previous taxonomy was wrong because it grouped rules by inferred writing vice:

- `scaffolding`
- `rhetorical-cadence`
- `persona-performance`
- `mechanics`
- `content-policy`

Those names overlap. A phrase like `debugging your morning routine` can be called persona, jargon, metaphor, or scaffolding depending on mood. That is not a stable ownership boundary.

## Core Decision

Group rules by the observable text layer they inspect.

Use an ordered placement test. A rule belongs to the first matching family.

## Placement Test

1. If the rule reads Markdown nodes or document shape, put it in `markdown-layout`.
2. If the rule reads characters, punctuation, casing, or typography, put it in `orthography`.
3. If the rule reads document-level counts or readability scores, put it in `metrics`.
4. If the rule checks required or recommended vocabulary from a customer/project contract, put it in `term-policy`.
5. If the rule checks single words, lemmas, inflections, or word-level modifiers, put it in `words`.
6. If the rule checks multi-word phrases or near-fixed collocations, put it in `phrases`.
7. If the rule checks a grammar template with slots, clause relations, sentence relations, or repeated sentence skeletons, put it in `syntactic-patterns`.
8. If the rule needs meaning-level judgment about low-information prose, vague predicates, empty scenes, hollow movement, or bad metaphors, put it in `semantic-thinness`.

This is intentionally dumb. It follows the input needed by the rule, not the moral diagnosis of the prose.

## Family: `markdown-layout`

Owns Markdown and document shape.

Current rules:

- `heading-hierarchy`
- `heading-counts`
- `bold-density`
- `code-fences`

Examples:

- skipped heading levels
- too many H2s
- too little bold text
- code blocks where prose is expected

Rule boundary:

- If a rule needs Markdown structure, it goes here.
- This is style and formatting, not content.
- This family is not AI slop detection.

## Family: `orthography`

Owns visible character-level style.

Current rules:

- `em-dashes`
- `smart-quotes`
- `sentence-case`
- `exclamation-density`
- `fake-timestamps`
- `colon-dramatic`

Examples:

- closed em dash
- curly quotes
- Title Case heading
- too many exclamation marks
- `5:47 PM`
- dramatic colon punctuation

Rule boundary:

- If the rule can be decided from characters, punctuation, capitalization, or local typography, it goes here.
- `colon-dramatic` belongs here only if it stays a punctuation-shape rule.
- If `colon-dramatic` starts checking sentence meaning, move it to `syntactic-patterns`.

## Family: `metrics`

Owns counts, ratios, and formula scores.

Current rules:

- `word-count`
- `paragraph-length`
- `word-repetition`
- `flesch-kincaid`
- `gunning-fog`
- `coleman-liau`
- `avg-sentence-length`

Examples:

- document too short
- paragraph too long
- repeated word density
- readability score too high
- average sentence length too high

Rule boundary:

- If the rule mostly produces a number and compares it to a threshold, it goes here.
- This is style pressure, not content policy.

## Family: `term-policy`

Owns project-specific vocabulary requirements.

Current rules:

- `required-terms`
- `recommended-terms`

Examples:

- article must mention `ownership`
- article should include at least 3 terms from a configured pool

Rule boundary:

- If the terms come from the user's contract for this document, put it here.
- If the terms are generally bad prose, put them in `words` or `phrases`.

## Family: `words`

Owns single-word and lemma-level style.

Current rules:

- `prohibited-words`
- `hedge-stacking`
- `simplicity`

Imported rule data:

- Proselint skunked terms
- Proselint uncomparables
- Proselint `very`

Examples:

- `utilize`
- `very unique`
- too many hedges in one sentence

Rule boundary:

- If the rule can be decided from one word, one lemma, one modifier, or a per-sentence count of word classes, put it here.
- Do not put multi-word phrases here.
- A phrase containing a bad word may still be here only if the phrase structure does not matter.
- Current Rust `prohibited-terms` should become `prohibited-words` for single-token entries.

## Family: `phrases`

Owns multi-word phrases, cliches, stock diction, and bad collocations.

Current rules:

- `llm-vocabulary`
- `jargon-faker`
- `humble-bragger`
- `prohibited-phrases`

Imported rule data:

- Proselint cliches
- Proselint corporate-speak
- maybe Proselint RAS syndrome

Examples:

- `in my experience`
- `debugging your morning routine`
- `game changer`
- `at the end of the day`
- `as an AI language model`
- `here is a draft`

Rule boundary:

- If the rule is basically matching a phrase, n-gram, idiom, cliche, or collocation, put it here.
- The phrase may allow casing, punctuation, plural, or small wording variants.
- If the rule needs open slots with a grammatical relationship, put it in `syntactic-patterns`.
- Current Rust `prohibited-terms` should become `prohibited-phrases` for multi-token entries.

## Family: `syntactic-patterns`

Owns grammar templates, clause relations, sentence relations, and adjacent-sentence patterns.

Current rules:

- `negation-reframe`
- `contrastive-aphorism`
- `fragment-stacking`
- `triple-repeat`
- `demonstrative-emphasis`
- `empty-emphasis`
- `affirmation-closers`
- `summative-closer`
- `false-question`
- `blame-reframe`
- `llm-openers`
- `generic-signposting`
- `boilerplate-framing`
- `boilerplate-conclusion`
- `lesson-framing`
- `observer-guidance`
- `authority-padding`
- `softening-language`
- `universalizing-claims`

Examples:

- `The goal is not X. The goal is Y.`
- `X, not Y.`
- `You do not need X. You need Y.`
- `The point is to X.`
- `The useful question is X.`
- `That is still real change.`
- `And isn't that what we all want?`

Rule boundary:

- If the rule has open slots like `X`, `Y`, pronoun sets, verb sets, or sentence-order relationships, put it here.
- Fixed phrases do not go here.
- This family intentionally merges the old `scaffolding`, `rhetorical-cadence`, and construction-shaped `persona-performance` buckets.
- Those old names described why the prose is bad. This family describes the grammar shape the rule reads.
- Subdirectories may exist for implementation convenience, but ownership stays here.

Suggested syntactic-pattern subfamilies:

- `llm-artifacts`: literal LLM/chatbot wrapper constructions.
- `lead-ins`: empty setup and signposting constructions.
- `contrast`: negation and not-X-but-Y constructions.
- `closers`: summative, affirmation, and false-question closers.
- `repetition`: repeated sentence skeletons and fragment stacks.
- `authority`: research/experience padding constructions.
- `generalization`: broad claims and softening constructions.

Subfamilies are not top-level ownership families.

Every rule stays independently toggleable. Every family and subfamily can be enabled or disabled by preset.

Config should support family, subfamily, and rule control:

- enable `syntactic-patterns/contrast`
- disable `syntactic-patterns/contrast/negation-reframe`

## Family: `semantic-thinness`

Owns meaning-level emptiness.

Future rules:

- `empty-stage-setting`
- `physical-blocking`
- `empty-scene-transition`
- `metaphorized-abstract-claim`
- `empty-significance`

Examples:

- `The yard was empty.`
- `They just stood there.`
- `Everything shifted.`
- `It changed everything.`
- `Prevention lives in rehearsal.`

Rule boundary:

- The rule must detect low-information meaning, not just a disliked phrase or sentence shape.
- The rule must inspect at least one semantic property: vague predicate, empty subject/object, absent concrete referent, abstract metaphor, generic motion, or low-information scene state.
- Do not put leftovers here.
- This family may need NLP features: dependency parse, subject/verb/object roles, named entity absence, concrete noun density, vague predicate lists, and semantic role patterns.
- This should be harsh-only until tested heavily.

## Package And Source Layout

Preferred package name:

- `@prosesmasher/textlint-rules`

Reason:

- textlint plugins are processors for file formats.
- prose checks are textlint rules.
- the package boundary is the whole prosesmasher rule library.
- presets are config maps exported by the package.
- rules are implemented once and reused by every preset.
- do not create one package per preset.

Preferred source layout:

```text
src/families/markdown-layout/
src/families/orthography/
src/families/metrics/
src/families/term-policy/
src/families/words/
src/families/phrases/
src/families/syntactic-patterns/
src/families/syntactic-patterns/llm-artifacts/
src/families/syntactic-patterns/lead-ins/
src/families/syntactic-patterns/contrast/
src/families/syntactic-patterns/closers/
src/families/syntactic-patterns/repetition/
src/families/syntactic-patterns/authority/
src/families/syntactic-patterns/generalization/
src/families/semantic-thinness/
src/presets/everything.ts
src/shared/text/
src/shared/matchers/
src/utils/
```

Rule placement inside families:

- each rule is one file by default
- example: `src/families/syntactic-patterns/contrast/negation-reframe.ts`
- family index files export rule groups
- package index exports rules and presets

Shared matching code:

- shared matching code lives outside families
- shared code owns mechanics, not policy
- families own rule decisions, messages, severities, defaults, and evidence fields
- phrase rules, syntactic rules, and semantic rules may all import shared matching code
- no family imports another family

Shared source layout:

```text
src/shared/text/normalize.ts
src/shared/text/quotes.ts
src/shared/text/tokens.ts
src/shared/text/traverse.ts
src/shared/matchers/phrases.ts
src/shared/matchers/syntactic-templates.ts
src/shared/matchers/semantic-primitives.ts
```

Shared matcher ownership:

- `phrases.ts`: normalized multi-token span matching, phrase list compilation, quote skipping.
- `syntactic-templates.ts`: slot templates, adjacent sentence pairs, opener/closer matching, repeated skeleton matching.
- `semantic-primitives.ts`: concrete noun checks, vague predicate checks, generic subject/object checks, empty scene-state checks.

Regex policy:

- Do not use regex for prose rule matching.
- Match words and phrases over token arrays.
- Match punctuation and orthography over character scans.
- Match syntactic patterns over sentence objects and token slots.
- Use textlint AST and sentence-splitter output as structure.
- If phrase data becomes large enough that window scanning is slow, build a token trie in `src/shared/matchers/phrases.ts`.
- Do not add regex helper packages.

Semantic rules must not reuse phrase rules.

Semantic rules may reuse phrase matching primitives only for local evidence extraction.

Example:

- Good: `semantic-thinness/empty-stage-setting.ts` imports `normalizeSentence` and `hasVaguePredicate`.
- Good: `semantic-thinness/metaphorized-abstract-claim.ts` imports `tokenizeSentence` and `matchAbstractNounPredicate`.
- Bad: `semantic-thinness/empty-stage-setting.ts` imports `phrases/cliches.ts`.

Large Rule Data:

- Store large editable lists as JSON files.
- Do not store large phrase inventories as TypeScript constants.
- TypeScript rule files load, validate, normalize, compile, and report data.
- JSON data files contain only the fields the rule needs.

Example:

```text
src/families/phrases/cliches.ts
src/families/phrases/data/cliches.json
```

`cliches.json` shape:

```json
[
  "at the end of the day",
  "move the needle",
  "game changer"
]
```

Do not add category metadata to `cliches.json`.

Reason:

- the rule has one behavior
- the output needs the rule ID and matched phrase
- category metadata creates a second taxonomy inside the data file

## Dependency Decisions

Runtime dependency gate:

- default runtime dependency age limit: last release or package modification within 12 months
- packages older than 12 months need an explicit spike with measured value, alternatives, dependency tree, and security review
- packages older than 18 months are not runtime candidates
- stale packages may be used as source material only after license review and data extraction review
- regex-based matching packages are not runtime candidates
- dependency size is not a rejection reason by itself
- reject small dependencies when replacement is simpler than the dependency contract
- keep larger dependencies when they replace non-trivial, error-prone source mapping or parsing code

Use these runtime packages now:

- `textlint-rule-helper`: ignore code, links, and non-prose nodes consistently inside textlint rules.
- `textlint-util-to-string`: convert textlint AST nodes to plain text while preserving source offsets.
- `sentence-splitter`: split paragraph text into sentences.

Evaluate before adopting as runtime packages:

- none currently approved

Do not use these packages as first-line dependencies:

- `split-string-words`: stale and too central for word tokenization.
- `escape-string-regexp`: regex matching is not part of prosesmasher rule implementation.
- `natural`: too broad and pulls storage/network-adjacent dependencies that prose linting does not need.
- `retext-english` as the main document model: it creates a second AST beside textlint.
- `nlcst-search` as the main phrase matcher: it requires the retext/NLCST model and does not replace our rule evidence model.
- `retext-readability`: stale by the project dependency gate.
- `retext-simplify`: stale by the project dependency gate.
- `retext-equality`: stale by the project dependency gate.

Possible source-material packages, not runtime dependencies:

- `retext-readability`: inspect formulas and threshold behavior only.
- `retext-simplify`: inspect simplification data only.
- `retext-equality`: inspect inclusive-language data only.

Spike before adopting:

- `compromise`: candidate for semantic-thinness POS tags, noun phrases, and light grammar signals.
- `wink-nlp` plus `wink-eng-lite-web-model`: candidate for semantic-thinness NLP, but model size and runtime cost must be measured first.

Keep custom:

- word tokenization wrapper
- phrase evidence shape
- phrase-list validation
- syntactic template matching
- semantic-thinness primitives

## ESLint Enforcement

Ban regex in source code with ESLint.

Use `no-restricted-syntax` for regex literals and `RegExp` constructors:

```js
{
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[regex]",
        message: "Do not use regex for prose rule matching. Use tokens, AST nodes, character scans, or token tries."
      },
      {
        selector: "NewExpression[callee.name='RegExp']",
        message: "Do not construct regex for prose rule matching. Use shared token matchers."
      },
      {
        selector: "CallExpression[callee.name='RegExp']",
        message: "Do not construct regex for prose rule matching. Use shared token matchers."
      }
    ]
  }
}
```

Use `no-restricted-imports` for regex helper packages:

```js
{
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "escape-string-regexp",
            message: "Regex helpers are not allowed in prose rules."
          }
        ],
        patterns: [
          {
            group: ["*regex*", "*regexp*"],
            message: "Regex packages are not allowed in prose rules."
          }
        ]
      }
    ]
  }
}
```

Allowed exceptions:

- ESLint config files
- build scripts
- generated files
- third-party package internals

No exception is allowed inside `src/families/` or `src/shared/matchers/`.

## Preset Mapping

Start with one preset:

- `everything`

Preset behavior:

- enables every migrated rule
- keeps rule IDs visible in output
- allows rule-level disables
- allows family-level and subfamily-level disables

Preset implementation:

- `everything` is a config map, not a package.
- future presets are additional config maps in `src/presets/`.
- presets import shared rule definitions from `src/families/`.
- presets must not duplicate rule implementation.

## Migration Note

Do not port the current Rust crate names directly.

Port by this taxonomy, even if rule IDs remain stable for compatibility.

Do not create top-level families named:

- `LLM`
- `persona`
- `scaffolding`
- `rhetorical-cadence`
- `mechanics`
- `content-policy`

Those names are useful in rule messages, but not as ownership boundaries.
