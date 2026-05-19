#!/usr/bin/env python3
from __future__ import annotations

import tomllib
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / ".plans/2026-05-18-182750-summary-vague-subjective-expansion.md.manifest.toml"
CORPUS_DIR = ROOT / "behavior/fixtures/textlint-rules/corpus"


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


def require_values(errors: list[str], path: str, values: list[Any]) -> None:
    text = require_file(errors, path)
    for value in values:
        if str(value) not in text:
            errors.append(f"{path} missing text: {value}")


def corpus_texts() -> list[tuple[str, str]]:
    return [
        (path.relative_to(ROOT).as_posix(), read_text(path))
        for path in sorted(CORPUS_DIR.glob("*.md"))
    ]


def verify_code_contains(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "code_contains"):
        require_values(errors, str(row["path"]), row.get("values", []))


def verify_fixture_text(errors: list[str], data: dict[str, Any]) -> None:
    corpus = corpus_texts()
    for row in rows(data, "fixture_text"):
        path = str(row["path"])
        text = str(row["text"])
        require_values(errors, path, [text])

        if "/cases/" in path and not any(text in content for _, content in corpus):
            errors.append(f"fixture text missing from corpus: {text}")


def verify_bookkeeping(errors: list[str], data: dict[str, Any]) -> None:
    for row in rows(data, "bookkeeping"):
        path = str(row["path"])
        text = require_file(errors, path)
        required = str(row.get("required", ""))
        forbidden = str(row.get("forbidden", ""))

        if required and required not in text:
            errors.append(f"{path} missing required bookkeeping text: {required}")
        if forbidden and forbidden in text:
            errors.append(f"{path} still contains forbidden bookkeeping text: {forbidden}")


def main() -> int:
    data = tomllib.loads(read_text(MANIFEST))
    errors: list[str] = []

    verify_code_contains(errors, data)
    verify_fixture_text(errors, data)
    verify_bookkeeping(errors, data)

    if errors:
        print("FAIL summary-vague-subjective-expansion")
        for error in errors:
            print(f"- {error}")
        return 1

    print("PASS summary-vague-subjective-expansion")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
