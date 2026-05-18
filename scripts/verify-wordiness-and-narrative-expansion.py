#!/usr/bin/env python3
from __future__ import annotations

import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / ".plans/2026-05-18-164928-wordiness-and-narrative-expansion.md.manifest.toml"


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def rows(data: dict[str, Any], key: str) -> list[dict[str, Any]]:
    value = data.get(key, [])
    if not isinstance(value, list):
        raise TypeError(f"manifest key {key} must be a list")
    return [item for item in value if isinstance(item, dict)]


def require_file(errors: list[str], path: str) -> str:
    full_path = ROOT / path
    if not full_path.is_file():
        errors.append(f"missing file: {path}")
        return ""
    return read_text(full_path)


def require_text(errors: list[str], path: str, required: list[Any]) -> None:
    text = require_file(errors, path)
    for needle in required:
        if str(needle) not in text:
            errors.append(f"{path} missing text: {needle}")


def verify_required_groups(errors: list[str], data: dict[str, Any]) -> None:
    for key in [
        "bookkeeping_contains",
        "code_contains",
        "data_contains",
        "fixture_contains"
    ]:
        for row in rows(data, key):
            require_text(errors, str(row["path"]), row.get("values", []))


def main() -> int:
    data = tomllib.loads(read_text(MANIFEST))
    errors: list[str] = []

    verify_required_groups(errors, data)

    if errors:
        print("FAIL wordiness-and-narrative-expansion")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS wordiness-and-narrative-expansion")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
