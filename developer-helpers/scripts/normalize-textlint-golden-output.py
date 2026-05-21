#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


def message_key(message: dict[str, Any]) -> tuple[Any, ...]:
    span = message.get("range")
    if not isinstance(span, list):
        span = []
    start = span[0] if len(span) > 0 else None
    end = span[1] if len(span) > 1 else None
    return (
        message.get("line"),
        message.get("column"),
        start,
        end,
        message.get("ruleId"),
        message.get("message"),
    )


def file_key(result: dict[str, Any]) -> tuple[str, str]:
    path = str(result.get("filePath", ""))
    return (Path(path).name, path)


def main() -> int:
    data = json.loads(sys.stdin.read())
    if not isinstance(data, list):
        raise ValueError("textlint JSON output must be an array")

    for result in data:
        if isinstance(result, dict) and isinstance(result.get("messages"), list):
            result["messages"] = sorted(result["messages"], key=message_key)

    json.dump(sorted(data, key=file_key), sys.stdout, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
