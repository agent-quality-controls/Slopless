#!/usr/bin/env python3

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    package_version = json.loads((ROOT / "package.json").read_text())["version"]
    cli_version = subprocess.check_output(
        ["node", str(ROOT / "dist" / "cli.js"), "--version"],
        text=True,
    ).strip()

    if cli_version != package_version:
        print("FAIL cli-version")
        print(f"- package.json version: {package_version}")
        print(f"- slopless --version: {cli_version}")
        return 1

    print("PASS cli-version")
    return 0


if __name__ == "__main__":
    sys.exit(main())
