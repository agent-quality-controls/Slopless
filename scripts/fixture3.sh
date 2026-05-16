#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if command -v fixture3 >/dev/null 2>&1; then
  exec fixture3 "$@"
fi

while IFS= read -r candidate; do
  if [ -x "$candidate" ]; then
    exec "$candidate" "$@"
  fi
done < <(find "$ROOT/.." -maxdepth 4 -type f -name fixture3 -perm -111 2>/dev/null | sort -r)

echo "fixture3 not found" >&2
exit 127
