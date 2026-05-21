#!/usr/bin/env python3
from __future__ import annotations

import fnmatch
import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / ".plans/2026-05-21-130146-developer-helpers-boundary.md.manifest.toml"


def rows(data: dict[str, Any], key: str) -> list[dict[str, Any]]:
    value = data.get(key, [])
    if not isinstance(value, list):
        raise TypeError(f"manifest key {key} must be a list")
    return [item for item in value if isinstance(item, dict)]


def read_text(relative: str) -> str:
    return (ROOT / relative).read_text(encoding="utf-8")


def main() -> int:
    data = tomllib.loads(MANIFEST.read_text(encoding="utf-8"))
    errors: list[str] = []

    for row in rows(data, "required_path"):
        relative = str(row["path"])
        kind = str(row["kind"])
        path = ROOT / relative
        if kind == "dir" and not path.is_dir():
            errors.append(f"missing directory: {relative}")
        if kind == "file" and not path.is_file():
            errors.append(f"missing file: {relative}")

    for row in rows(data, "forbidden_path"):
        relative = str(row["path"])
        if (ROOT / relative).exists():
            errors.append(f"forbidden path exists: {relative}")

    for row in rows(data, "forbidden_glob"):
        relative = str(row["path"])
        pattern = str(row["pattern"])
        matches = sorted(path.name for path in (ROOT / relative).glob(pattern))
        if matches:
            errors.append(f"forbidden files in {relative}: {', '.join(matches)}")

    for row in rows(data, "required_text"):
        relative = str(row["path"])
        value = str(row["value"])
        if value not in read_text(relative):
            errors.append(f"{relative} missing text: {value}")

    for row in rows(data, "forbidden_text"):
        relative = str(row["path"])
        value = str(row["value"])
        text = read_text(relative)
        if value in text:
            errors.append(f"{relative} contains forbidden text: {value}")

    helper_files = sorted(
        path.relative_to(ROOT).as_posix()
        for path in (ROOT / "developer-helpers").rglob("*")
        if path.is_file()
    )
    if not any(fnmatch.fnmatch(path, "developer-helpers/scripts/*.py") for path in helper_files):
        errors.append("developer helper Python scripts were not moved under developer-helpers/scripts")

    if errors:
        print("FAIL developer-helpers-boundary")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS developer-helpers-boundary")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
