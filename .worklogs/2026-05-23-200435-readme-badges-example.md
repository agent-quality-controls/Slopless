# README: badges + "What it catches" example

## Summary

Adds the badges that were held back until provenance + bundle size landed, and a "What it catches" section showing input → output on a representative AI-sloppy paragraph.

## Badges added

Top row (package): npm, downloads, bundlephobia minzip, packagephobia install size, license, node.
Second row (CI + supply chain): ci, OpenSSF Scorecard, Socket, Snyk Advisor.

Bundle and install badges are safe now that 0.2.14 dropped the @lunarisapp/readability chain (21 MB → 180 KB on disk; 2.98 MB → 143 KB gzip).

## "What it catches" section

Picks a short paragraph that triggers nine findings across seven rules (`generic-signposting`, `prohibited-phrases`, `llm-vocabulary`, `prohibited-words`, `negation-reframe`, `flesch-kincaid`). Compact bracketed list, not full JSON — the README explains JSON is the default output and links to the Rules wiki for the full inventory.

## Not in this PR

- OpenSSF Best Practices self-assessment registration at bestpractices.dev. Manual form; tracked as separate follow-up.
- Socket package claim. Browser action that adds notification access; doesn't change badge rendering.
