# slopless repo excellence - master plan

## Purpose

Single canonical document covering everything that makes slopless's repo good vs great. Read this first if you're picking up repo-level work. Companion plans:

- `.plans/2026-05-23-152521-promotion-master.md` — directory/registry submissions (Wave 1-5). Mostly external. Independent of this doc.
- `.plans/2026-05-23-201834-openssf-best-practices-answers.md` — pre-drafted form text for the OpenSSF passing-tier self-assessment.

## What this is, and what it is not

This doc is the inventory of repo-level investments — how the code is structured, what files are present, what gates protect main, what packages we publish, what badges sit on the README. It is **not** a marketing/promotion doc; that's the promotion master.

## Quality bar

**Baseline = OpenSSF Best Practices Silver tier.** Passing tier is the easy 30-min form-fill and we're shipping it now. Silver is the next stop and is achievable with a few self-contained additions plus the second admin you mentioned adding. Gold requires two-person code review and bus_factor of 2+ developers actually contributing — out of scope while slopless is single-maintainer.

Above the baseline, repo excellence means: small bundle, clear distribution surfaces, sharp metadata, and the package shape matches how the ecosystem actually consumes it.

---

## Status legend

- ✅ DONE — shipped and live.
- 🟡 IN PROGRESS — opened, partially done, or waiting on another step.
- 🔴 TODO — not started.
- ⛔ DECIDED OUT — explicitly skipped with reason.

---

## Section 1: What's already shipped

| Item | Status | Reference |
|---|---|---|
| OIDC-based npm publishing (no NPM_TOKEN) | ✅ | `.github/workflows/release.yml`; 0.2.13 & 0.2.14 both attested |
| SLSA v1 provenance on every release | ✅ | verified via `npm audit signatures slopless` |
| OpenSSF Scorecard workflow | ✅ | `.github/workflows/scorecard.yml`, weekly + on push + on branch_protection_rule |
| Pre-commit hooks descriptor for the pre-commit ecosystem | ✅ | `.pre-commit-hooks.yaml` |
| Bundle size reduced 21x | ✅ | swapped `@lunarisapp/readability` for `text-readability`; 2.98 MB gzip → 143 KB gzip |
| package.json metadata complete | ✅ | keywords (incl. `textlint-rule`), author, publishConfig (provenance, access:public), tightened description |
| Source maps excluded from published tarball | ✅ | `files: ["!dist/**/*.map"]`; tarball 487 KB |
| README badges (npm/downloads/minzip/install/license/node + ci/scorecard/socket/snyk) | ✅ | two-row layout |
| README "What it catches" example block | ✅ | 9 findings across 7 rules on a synthetic LLM paragraph |
| GH repo settings: secret scanning + push protection + dependabot security on | ✅ | via `gh api -X PATCH` |
| GH repo description aligned with npm description | ✅ | |
| Delete-branch-on-merge enabled | ✅ | |
| CONTRIBUTING.md uses pnpm (not npm) | ✅ | also documents corepack pinning |
| g3ts package/npmrc families disabled in `guardrail3-ts.toml` | ✅ | structural mismatch with single-publishable-package layout; revisit if g3ts adds a profile |

---

## Section 2: OpenSSF Best Practices

### Passing tier (immediate)

Status: 🟡 — answers drafted at `.plans/2026-05-23-201834-openssf-best-practices-answers.md`. Manual form-fill at https://bestpractices.dev/projects/new. ~30 minutes of pasting. 40 Met / 0 Unmet / 11 N/A on the draft. Cleared on submission.

### Silver tier (baseline)

Status: 🔴. Achievable without changing how the project fundamentally works. Items below need to be added.

Most additions are **document-only** — content I can draft. Two are operational.

#### Operational

| Item | Owner | Notes |
|---|---|---|
| Invite second human admin to the repo | user | satisfies `access_continuity`. Once added, set them as a CODEOWNER. |
| Tag signing (GPG or SSH) | user (key) + agent (workflow) | satisfies `version_tags_signed`. Add `tag.gpgsign = true` (or SSH equivalent) to your local git config; for CI-cut tags, configure the release workflow to sign with a project key. |

#### Documents to author (agent can draft, user reviews)

| File | Criterion | Sketch |
|---|---|---|
| `ARCHITECTURE.md` (or wiki page) | `documentation_architecture` | rule registry layout, presets, adapters, CLI ↔ textlint ↔ rules flow, where fixtures live |
| Extend `SECURITY.md` with a threat model | `documentation_security` | inputs: untrusted Markdown via filesystem/stdin. trust boundary: read-only file access. assertions: no `eval`, no network, no subprocess spawning, no postinstall. |
| `ASSURANCE.md` (or section in SECURITY.md) | `assurance_case` | structured argument: claim ("slopless is safe to run against untrusted Markdown") → sub-claims (no eval, no network, no shell, fixture corpus catches regressions) → evidence (test suite, CodeQL, Scorecard) |
| `ROADMAP.md` (or wiki Roadmap page) | `documentation_roadmap` | link the promotion master plan as the near-term roadmap; mention rules-only package, GitHub Marketplace action, VSIX, etc. |
| Bus-factor declaration in repo metadata | `bus_factor` | once second admin is added and contributing, document who reviews what in CODEOWNERS + a short "Maintainers" section in CONTRIBUTING.md |

#### Likely already Met but worth confirming during form-fill

- `installation_common`, `installation_standard_variables`, `installation_development_quick` — pnpm + scripts cover this
- `external_dependencies` — Dependabot is on
- `regression_tests_added50` — fixture goldens accompany every behavior change; demonstrate with PR #48 (re-baselined 17 goldens)
- `automated_integration_testing` — fixture3 + CI
- `dependencies_monitored` — Dependabot security + version updates
- `signed_releases` — Sigstore provenance via npm
- `vulnerabilities_critical_fixed` — vacuously true; no findings

#### Decided out (defensible per criterion text)

- `dco` (Developer Certificate of Origin sign-off) — usually enforced via DCO bot. Adds friction; skip unless a reviewer flags it.
- `internationalization` — slopless is English-only by design. Mark as Met with that justification.
- `hardening_headers` — no web surface. N/A.

### Gold tier

Status: ⛔ DECIDED OUT (for now). Structural blockers:

- `two_person_review` (every commit reviewed by a human other than author) — fixable mechanically once second admin is contributing; but requires reciprocal review on every PR.
- `bus_factor` ≥ 2 actually-contributing developers in past year — depends on the second admin doing real work, not just being listed.
- `contributors_unassociated` — 50%+ from different orgs/unaffiliated. Single-org project today.

Revisit when slopless has actual co-maintainers contributing code, not just an admin slot.

---

## Section 3: Distribution surfaces (Tier 3 from earlier)

Each is its own repo/PR. Ranked by impact for slopless's audience.

| # | Surface | Where | Effort | Notes |
|---|---|---|---|---|
| 1 | GitHub Marketplace — composite action | new `seochecks-ai/slopless-action` repo, or `action.yml` at this repo root | ~2-4 hr | Every CI engineer searches Marketplace for prose/lint actions. Highest-leverage marketplace play per promotion plan. |
| 2 | VS Code Marketplace + Open VSX extension | new `seochecks-ai/slopless-vscode` repo | ~4-8 hr | ~200-400 LOC TS wrapping CLI for inline squiggles. Largest install base for Markdown editors. One VSIX, two stores. |
| 3 | Homebrew tap | new `seochecks-ai/homebrew-slopless` repo | ~30 min | `brew install seochecks-ai/slopless/slopless`. Zero review queue. Optionally PR to `homebrew-core` later (slower review). |
| 4 | mise registry PR | jdx/mise (PR) | ~10 min | 5-line toml, `backends = ["npm:slopless"]`. |
| 5 | AUR package | aur.archlinux.org (git push) | ~30 min | ~20-line PKGBUILD. No review. |
| 6 | Nixpkgs | NixOS/nixpkgs (PR) | ~1 hr | ~25-line `buildNpmPackage`. Slow PR queue, modest audience. |

---

## Section 4: Rules-only package split

**Motivation.** Slopless today bundles textlint and ships its own CLI so end users don't need a textlint install. That's the right call for the agent/CLI audience. But for **existing textlint users**, the bundle is hostile — they already have textlint configured and just want the rules. Forcing them to install a second copy of textlint via `slopless` is wasteful and pushes a non-trivial dependency tree into their `node_modules`.

The textlint ecosystem convention is to publish rules as `textlint-rule-*` packages (or presets as `textlint-rule-preset-*`) that peer-depend on textlint and are wired into the user's `.textlintrc` directly.

**Proposed split.**

| Package | Role | Audience |
|---|---|---|
| `slopless` (existing) | CLI bundle that vendors textlint + all rules + the agent skills installer | Standalone users, agent loops, "I don't want to learn textlint" people |
| `textlint-rule-preset-slopless` (new) | Pure rules + the `everything` preset, with `textlint` as a peerDependency | Existing textlint users adding slopless to their `.textlintrc` next to other textlint rules |

**Architecture.**

Cleanest approach: convert this repo into a pnpm workspace.

```
slopless/                           (workspace root, private: true)
  pnpm-workspace.yaml               (already exists; add packages:)
  packages/
    rules/                          (textlint-rule-preset-slopless)
      package.json                  (peer-deps textlint)
      src/                          (all current src/rules + src/registries + src/presets + src/shared)
    cli/                            (slopless — the CLI bundle)
      package.json                  (depends on rules, depends on textlint)
      src/cli.ts
      src/adapters/
```

Both publish from the same release workflow on tag push or release event; each has its own `package.json` `version` (consider keeping them in lockstep at first, with `syncpack` enforcing).

The g3ts `package` and `npmrc` families we disabled earlier (designed for workspaces) would then start applying correctly — not just useful for the silver criteria, also stops the policy mismatch.

**Migration order.**

1. Set up the workspace skeleton; move existing `src/` into `packages/cli/src/`. Confirm build + fixtures still pass.
2. Extract the rule code path (`rules/`, `registries/`, `presets/`, `shared/`) into `packages/rules/src/`. `packages/cli/` imports from `packages/rules/` via the workspace `slopless-rules` name.
3. Add `textlint-rule-preset-slopless` (or `@slopless/rules`) `package.json`. Peer-deps `textlint`. Same `exports` map shape as today.
4. Update the release workflow to publish both packages on release. Tag version guard checks both manifests.
5. README documents both install paths: "use the CLI" vs "drop into your existing textlint config."

**Naming decision needed.**

- `textlint-rule-preset-slopless` — most discoverable; auto-indexes on textlint's wiki Collection-of-rule list.
- `@slopless/rules` — scoped, matches the brand. Loses the textlint wiki auto-index unless we also add `textlint-rule` to keywords.
- `slopless-rules` — neutral; same auto-index situation as scoped.

Recommend `textlint-rule-preset-slopless` for the discoverability win; the README can refer to it as "the rules-only package" and link both.

**Effort.** ~1 day for the workspace setup + rule extraction + dual-publish workflow + README updates. Fixtures shouldn't need to change since the rule code itself doesn't move semantically.

**Status.** 🔴 TODO. Worth scheduling after silver tier ships (helps complete the textlint-ecosystem-native distribution surface; gives existing textlint users a real path).

---

## Section 5: Cross-cutting polish (small items)

| Item | Status | Note |
|---|---|---|
| Re-enable consumer type declarations | 🔴 | reverted in #48 because `dist/rules/*.d.ts` broke `behavior-replay.sh`. Proper fix: `declarationDir: dist-types` + per-export `types` entries in `exports`. |
| CodeQL workflow file (vs default setup) | 🔴 | currently runs via GitHub default setup. Promoting to a workflow file lets us pin the query suite + customize. Low priority. |
| Custom OpenGraph image | 🟡 | `usesCustomOpenGraphImage: true` already — appears one's uploaded. Worth re-checking it's the brand version. |
| `.editorconfig` at repo root | 🔴 | many directories check; trivial. |
| FUNDING.yml in `.github/` | ⛔ | user declined; revisit if sponsor channel opens. |
| Move CONTRIBUTING + AGENTS files into the canonical wiki pages too | 🔴 | helps docs surface for non-GitHub readers. |
| README: link to npm `attestations` URL + `npm audit signatures` snippet | 🔴 | makes the provenance story visible to anyone reading the README. |
| Wave 1 awesome-list submissions (12 PRs from promotion plan) | 🔴 | repo is ready; bottlenecked on submission time, not repo state. |

---

## Section 6: Out of scope

- OpenSSF Gold tier — see Section 2.
- Bundlephobia/packagephobia badges further optimization — already in green zone after bundle kill.
- README rewrite — current README is sparse and direct; matches house style. Don't bloat.
- Adding tests for non-rule code (CLI argv parser, adapters) — could be improved but the current `validate` pipeline + fixtures cover behavior.
- Custom domain (slopless.dev or similar) — no value while audience is dev-CLI users; npmjs.com page is the discovery target.

---

## Section 7: Reading order for future agents

If a future agent picks up "make slopless's repo great":

1. Read this file (Section 1: current state, Section 2: silver-tier baseline).
2. Read `.plans/2026-05-23-152521-promotion-master.md` (external promotion work).
3. Read `.plans/2026-05-23-201834-openssf-best-practices-answers.md` (passing-tier draft).
4. Run `gh pr list --state merged --limit 20` to see recent shipped work.
5. Don't repeat the work in Section 1. Pick from Section 2 (silver), Section 3 (distribution), Section 4 (rules-only split), or Section 5 (polish) based on user priority.
