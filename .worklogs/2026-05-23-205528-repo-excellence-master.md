# Add repo excellence master plan

Single canonical document covering what makes slopless's repo good vs great. Captures everything from the recent rounds of work: provenance, Scorecard, bundle-size kill, OpenSSF passing tier, plus the forward-looking inventory (silver tier baseline, distribution surfaces, the rules-only package split).

Lives at `.plans/2026-05-23-205345-repo-excellence-master.md`. Companion to the existing promotion master (Wave 1-5 directory submissions) and the OpenSSF passing-tier answers draft.

## Notable additions vs prior plans

- **OpenSSF Silver as baseline** (not gold). Two-person review and bus_factor structurally don't fit a single-maintainer project.
- **Rules-only package split** (`textlint-rule-preset-slopless`). New initiative: extract the rules into a separate package that peer-deps textlint, for users who already have textlint configured and don't want our CLI bundle. Sketches a pnpm-workspace migration.
- **Distribution surfaces** ranked by impact (Marketplace action > VSIX > Homebrew > mise > AUR > Nixpkgs).
- **Section 7 reading order** for future agents picking up repo work cold.
