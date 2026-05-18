# Slopless Agent Skill Help

## Summary

Added a bundled `slopless` agent skill and CLI commands for installing it into Codex or Claude Code project-local skill folders. Tightened README and CLI help around English-only scope, JSON-only output, `--help` first for agents, and `.slopless/findings/` as the raw findings storage convention.

## Decisions Made

- Kept one canonical skill body in `skills/slopless/SKILL.md` so Codex and Claude installs do not drift.
- Added separate `install-skill codex` and `install-skill claude` commands; no combined install command because dual-agent install is uncommon.
- Skipped Codex-specific `agents/openai.yaml` metadata because behavior does not require it and the current goal is one shared skill body.
- Kept Slopless output JSON-only. Agents choose filenames, timestamps, and any user-facing summary outside the CLI.
- Fixed the stale `g3ts validate` command to the current `g3ts validate workspace --path . --rules-only` shape after validation exposed the repo bug.

## Key Files For Context

- `src/cli.ts`
- `README.md`
- `package.json`
- `skills/slopless/SKILL.md`
- `.plans/2026-05-18-150129-slopless-agent-skill-help.md`

## Verification

- `npm run build`
- `npm run lint`
- `node dist/cli.js --version` returned `0.2.6`.
- `node dist/cli.js --help` shows English-only, JSON-only, agent storage, and skill install guidance.
- `npm pack --dry-run --json` includes `skills/slopless/SKILL.md`.
- Installed package into a temp project and verified `npx slopless install-skill codex` creates `.agents/skills/slopless/SKILL.md`.
- Installed package into a temp project and verified `npx slopless install-skill claude` creates `.claude/skills/slopless/SKILL.md`.
- Re-running install without `--force` exits `2` instead of overwriting.
- `npm run validate` passes.

## Next Steps

- Release a patch version after this lands if the package currently published as `0.2.6` lacks the skill installer.
