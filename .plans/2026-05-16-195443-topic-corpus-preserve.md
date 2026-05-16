# Goal

Replace the scattered corpus files with a smaller topic-first corpus.

The new corpus should duplicate the reviewed case lines in readable topic files. Each corpus file gets a sibling `.preserve.json` file that lists exact lines that must remain unchanged.

# Approach

1. Read every nonblank line from `behavior/fixtures/textlint-rules/cases/<family>/<hits|no-hits>.md`.
2. Assign each case line to a topic corpus file.
3. Generate topic corpus Markdown files with the exact case lines preserved.
4. Generate sibling `.preserve.json` files with source family, source case file, expected bucket, and exact text.
5. Delete old scattered corpus files.
6. Add a verifier script that checks:
   - every preserve entry is present in its Markdown file
   - every case line appears in at least one preserve file
   - preserve JSON is valid
7. Run verifier, fixture3, package validation, commit, and push.

# Topic Files

- `corpus/editorial-style.md`
- `corpus/engineering-review.md`
- `corpus/health-and-parenting.md`
- `corpus/narrative-scenes.md`
- `corpus/metrics-and-markdown.md`

# Key Decisions

- Corpus is organized by topic, not by rule family.
- Cases remain the clean rule ledger.
- Corpus shows the same lines in readable flow.
- `.preserve.json` is allowed because it does not run through textlint and does not pollute prose.
- The first pass may read like a training dossier, but it must be coherent enough to send to an LLM for later rewriting.
