# Datasets

This folder contains labeled or label-like source data for future training, evaluation, calibration, and corpus analysis.

Fixture3 fixtures are not datasets. Fixtures stay under `behavior/fixtures` and `behavior/golden` because they test Slopless behavior. If a dataset item becomes an app behavior contract, derive or copy the specific case into fixtures.

## Layout

- `labeled/academic-slop`: tortured-phrase and academic slop data.
- `labeled/academic-nlp`: subjectivity, puffery, specificity, vagueness, discourse connective, idiom, and syntax samples.
- `labeled/ai-slop`: AI-vs-human lexical signals, LLM cliche lists, and AI slop candidate lists.
- `labeled/plain-english`: plain-English avoid-word and replacement material.
- `labeled/prose-linter-lexicons`: upstream prose-linter lexicons and extracted rule material.
- `labeled/style-guides`: Vale style-guide rule datasets.
- `labeled/writing-corpora`: writing corpus examples and extracted candidate material.

## Use

- Use this data for model experiments, scoring experiments, fixture generation, and future source mining.
- Do not wire these files directly into runtime rules.
- Runtime rule data belongs in `src/rules/**/data`.
- Behavior tests belong in `behavior/fixtures`.
