import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const requiredFiles = [
  "README.md",
  "LICENSE",
  "package.json",
  "bin/organization-memory-starter.mjs"
];

const requiredText = [
  ["README.md", "AIエージェントを「毎回新人に戻るチャット」ではなく"],
  ["README.md", "Agent Memories"],
  ["README.md", "MIRAI Memory is the private memory concept"],
  ["README.md", "This package is a starter kit for folder structure"],
  ["package.json", "\"name\": \"miraigent-organization-memory-starter\""],
  ["package.json", "\"miraigent-organization-memory-starter\": \"bin/organization-memory-starter.mjs\""],
  ["bin/organization-memory-starter.mjs", "workspace-shared/MANIFEST.md"],
  ["bin/organization-memory-starter.mjs", "Do not store secrets"]
];

const forbiddenText = [
  "@miraigent/organization-memory-starter",
  "api_key=",
  "password=",
  "secret_access_key",
  "BEGIN PRIVATE KEY",
  "BEGIN OPENSSH PRIVATE KEY",
  "cookie:"
];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

for (const [file, text] of requiredText) {
  const content = readFileSync(file, "utf8");
  if (!content.includes(text)) {
    throw new Error(`Expected ${file} to include: ${text}`);
  }
}

for (const file of listTextFiles(".")) {
  if (file === "scripts/check.mjs") {
    continue;
  }

  const content = readFileSync(file, "utf8").toLowerCase();
  for (const text of forbiddenText) {
    if (content.includes(text.toLowerCase())) {
      throw new Error(`Forbidden sensitive-looking text in ${file}: ${text}`);
    }
  }
}

console.log("Repository check passed.");

function listTextFiles(directory) {
  const files = [];
  for (const name of readdirSync(directory)) {
    if (name === ".git" || name === "node_modules" || name === ".tmp-smoke") {
      continue;
    }
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...listTextFiles(path));
      continue;
    }
    if (/\.(md|json|mjs|txt|gitignore)$/.test(path) || path === "LICENSE") {
      files.push(path);
    }
  }
  return files;
}
