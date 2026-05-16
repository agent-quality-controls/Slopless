# Goal

Design `goldencheck`: a small reusable CLI for fixture-based golden output checks.

The tool should replace repo-specific ad hoc replay scripts where the same pattern repeats:

```text
fixtures -> project command -> normalized received output -> approved output -> diff -> approve reviewed change
```

# Name

Use `goldencheck`.

Reason:

- `golden` maps to the established "golden file" / snapshot testing approach.
- `check` says the tool verifies current output against recorded output.
- It is readable as a command: `goldencheck check`, `goldencheck diff`, `goldencheck approve`.

# Core Model

The tool does not know what a fixture means.

The project gives it:

- fixture globs
- command to run
- acceptable exit codes
- optional normalizer command
- where to store approved output and received output
- output identity keys for semantic diffing

The tool owns:

- deterministic fixture discovery
- command execution
- run metadata
- fixture hash
- manifest hash
- normalizer hash
- approved output storage
- received output storage
- normalized comparison
- diff reporting
- approve gating

# Non-Goals

- Do not implement project-specific assertions.
- Do not discover fixtures without a manifest.
- Do not require Rust projects.
- Do not depend on `insta`.
- Do not parse every possible output format in V1.
- Do not build a UI.
- Do not replace test runners.

# Manifest

Default path:

```text
goldencheck.yaml
```

Example:

```yaml
version: 1

suites:
  textlint-rules:
    fixtures:
      - "behavior/fixtures/textlint-rules/*/family.md"

    command:
      argv:
        - "scripts/behavior-replay.sh"
        - "{fixtures}"
      ok_exit_codes: [0, 1]

    output:
      format: "json"
      normalizer:
        argv:
          - "scripts/normalize-textlint-output.js"

    storage:
      approved_dir: "behavior/golden/textlint-rules"
      received_dir: ".goldencheck/textlint-rules"
      diff_dir: ".goldencheck/textlint-rules"

    identity:
      fixture_id: "path"
      record_keys:
        - "filePath"
        - "messages[].ruleId"
        - "messages[].message"
        - "messages[].line"
        - "messages[].column"
```

V1 can treat `record_keys` as advisory and start with normalized JSON structural diff. Semantic keyed diff can be V1.1 if needed.

# Commands

## `goldencheck check`

Runs one suite, stores received output, compares it to approved output, and exits according to the comparison result.

```bash
goldencheck check --suite textlint-rules
goldencheck check --suite textlint-rules --manifest goldencheck.yaml
```

Output:

```text
suite: textlint-rules
received_run_id: 2026-05-13T15-09-29Z-8e4a1c
received_run_commit: 910cf29
fixtures: 9
status: matched
```

Stores:

```text
.goldencheck/textlint-rules/
  received.raw.json
  received.normalized.json
  received.meta.json
  diff.json
  diff.txt
```

Exit codes:

- `0`: approved and received match
- `1`: approved and received differ
- `2`: tool/config/runtime error

## `goldencheck diff`

Shows the last diff from `check`.

```bash
goldencheck diff --suite textlint-rules
goldencheck diff --suite textlint-rules --refresh
```

Rules:

- Without `--refresh`, it does not run the project command.
- With `--refresh`, it runs `check` first and then prints the diff.

Output:

```text
suite: textlint-rules
approved_run_commit: 910cf29
received_run_commit: dirty
fixtures: 9
added: 2
removed: 0
changed: 1
```

Stores:

```text
.goldencheck/textlint-rules/diff.json
.goldencheck/textlint-rules/diff.txt
```

## `goldencheck approve`

Publishes received output as the new approved output.

```bash
goldencheck approve --suite textlint-rules --change behavior/changes/2026-05-13-cliches.yaml
```

Rules:

- If there is no diff, `--change` is optional.
- If there is a diff, `--change` is required.
- V1 records the change path in metadata.
- V1 does not need full change classification yet.

Stores:

```text
behavior/golden/textlint-rules/
  approved.normalized.json
  approved.meta.json
```

## `goldencheck status`

Reports suite state.

```bash
goldencheck status
goldencheck status --suite textlint-rules
```

Shows:

- approved exists or missing
- approved run commit
- approved recorded time
- fixture hash status
- manifest hash status
- normalizer hash status
- latest received run
- diff count
- pending change file if attached

## `goldencheck init`

Writes a small example manifest and directory skeleton.

```bash
goldencheck init
```

# Metadata

Every generated output has metadata:

```json
{
  "suite": "textlint-rules",
  "kind": "received",
  "run_id": "2026-05-13T15-09-29Z-8e4a1c",
  "run_commit": "910cf29",
  "working_tree": "dirty",
  "recorded_at": "2026-05-13T15:09:29Z",
  "fixture_hash": "sha256:...",
  "manifest_hash": "sha256:...",
  "normalizer_hash": "sha256:...",
  "tool_version": "0.1.0",
  "output_schema_version": "1"
}
```

Use `run_commit`, not `accepted_commit` or `candidate_commit`.

Reason: the tool knows which commit generated an output. The role is expressed by `kind`: `approved` or `received`.

# Fail-Closed Rules

Diff must fail with a tool error when:

- approved output is missing
- fixture hash changed and no fixture-change mode is provided
- manifest hash changed and no manifest-change mode is provided
- normalizer hash changed and no normalizer-change mode is provided
- command exits with a code outside `ok_exit_codes`
- normalizer exits non-zero

V1 can expose explicit override flags:

```bash
goldencheck diff --suite textlint-rules --allow-fixture-change
goldencheck diff --suite textlint-rules --allow-manifest-change
goldencheck diff --suite textlint-rules --allow-normalizer-change
```

# Storage

Baseline files are small enough to store in git for current `prosesmasher` behavior fixtures.

For large projects, the manifest should allow artifact storage later, but V1 stores files locally.

Suggested layout:

```text
behavior/
  fixtures/
  golden/
  changes/
  schemas/
.goldencheck/
  runs/
  diffs/
```

# Architecture

Implement as a Rust CLI with small internal modules:

```text
goldencheck/
  Cargo.toml
  src/
    main.rs
    args.rs
    manifest.rs
    fixture.rs
    command.rs
    normalize.rs
    metadata.rs
    storage.rs
    diff.rs
    approve.rs
    git.rs
    error.rs
```

Dependencies:

- `clap` for CLI args
- `serde`, `serde_json`, `serde_yaml` for config/output
- `globset` or `globwalk` for fixture discovery
- `sha2` for hashes
- `chrono` or `time` for timestamps
- `similar` for readable text diffs if needed
- `thiserror` for errors

Avoid:

- plugins
- async runtime
- embedded scripting language
- database
- service mode

# First Integration Target

Use `prosesmasher` textlint fixtures as the first real integration:

```yaml
suites:
  textlint-rules:
    fixtures:
      - "behavior/fixtures/textlint-rules/*/family.md"
    command:
      argv: ["scripts/behavior-replay.sh", "{fixtures}"]
      ok_exit_codes: [0, 1]
    output:
      format: "json"
    storage:
      approved_dir: "behavior/golden/textlint-rules"
      received_dir: ".goldencheck/textlint-rules"
      diff_dir: ".goldencheck/textlint-rules"
```

Current scripts can remain during migration. `goldencheck` should first reproduce `scripts/behavior-verify.sh` behavior, then add metadata and approve gating.

# V1 Definition Of Done

- `goldencheck check --suite textlint-rules` writes received output and returns `0` when received matches approved.
- `goldencheck check --suite textlint-rules` returns `1` and writes a diff when received differs from approved.
- `goldencheck diff --suite textlint-rules` prints the latest diff without rerunning unless `--refresh` is passed.
- `goldencheck approve --suite textlint-rules` publishes a no-diff received output as approved.
- `goldencheck approve --suite textlint-rules --change <path>` publishes a changed received output as approved.
- Metadata includes `run_commit`, `working_tree`, fixture hash, manifest hash, normalizer hash, and tool version.
- Existing ad hoc scripts can be replaced or wrapped by goldencheck after parity is proven.
