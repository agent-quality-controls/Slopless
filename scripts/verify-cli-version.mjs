import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8")
);
const { stdout } = await execFileAsync("node", ["dist/cli.js", "--version"]);
const cliVersion = stdout.trim();

if (cliVersion !== packageJson.version) {
  console.log("FAIL cli-version");
  console.log(`- package.json version: ${packageJson.version}`);
  console.log(`- slopless --version: ${cliVersion}`);
  process.exit(1);
}

console.log("PASS cli-version");
