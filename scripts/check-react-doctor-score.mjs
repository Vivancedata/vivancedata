import { spawnSync } from "node:child_process";

const REQUIRED_SCORE = 100;
const commandArgs = ["-y", "react-doctor@latest", ".", "--score"];

const result = spawnSync("npx", commandArgs, {
  encoding: "utf-8",
});

if (result.error) {
  console.error("Failed to run React Doctor:", result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  process.exit(result.status ?? 1);
}

const rawOutput = `${result.stdout ?? ""}\n${result.stderr ?? ""}`.trim();
const match = rawOutput.match(/(\d+(?:\.\d+)?)/);

if (!match) {
  console.error("Unable to parse React Doctor score from output:");
  console.error(rawOutput || "<no output>");
  process.exit(1);
}

const score = Number(match[1]);

if (!Number.isFinite(score)) {
  console.error("React Doctor returned a non-numeric score:", match[1]);
  process.exit(1);
}

if (score !== REQUIRED_SCORE) {
  console.error(
    `React Doctor score is ${score}. Required score is ${REQUIRED_SCORE}.`
  );
  process.exit(1);
}

console.log(`React Doctor score check passed (${score}/${REQUIRED_SCORE}).`);
