#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const today = new Date().toISOString().slice(0, 10);

const files = new Map([
  [".gitignore", gitignoreTemplate()],
  ["README.md", rootReadmeTemplate()],
  ["workspace-shared/MANIFEST.md", sharedManifestTemplate()],
  ["workspace-shared/NORTH_STAR.md", northStarTemplate()],
  ["workspace-shared/MOAT_OPS.md", moatOpsTemplate()],
  ["workspace-shared/OPERATION.md", operationTemplate("Organization operation log")],
  [`workspace-shared/memory/${today}.md`, dailyMemoryTemplate("Shared organization memory")],
  ["workspace-shared/projects/example-project/README.md", projectReadmeTemplate()],
  ["workspace-shared/projects/example-project/DECISIONS.md", decisionsTemplate()],
  ["workspace-shared/projects/example-project/HANDOFF.md", handoffTemplate()],
  ["workspace-agent-example/AGENTS.md", agentsTemplate()],
  ["workspace-agent-example/BOOTSTRAP.md", bootstrapTemplate()],
  ["workspace-agent-example/SOUL.md", soulTemplate()],
  ["workspace-agent-example/MEMORY.md", memoryTemplate()],
  ["workspace-agent-example/CURRENT.md", currentTemplate()],
  ["workspace-agent-example/OPERATION.md", operationTemplate("Agent operation log")],
  [`workspace-agent-example/memory/${today}.md`, dailyMemoryTemplate("Agent daily memory")],
  ["workspace-agent-example/projects/example-project/TODO.md", todoTemplate()],
  ["workspace-agent-example/projects/example-project/WORKLOG.md", worklogTemplate()]
]);

main();

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h") || args.length === 0) {
    printHelp();
    return;
  }

  const command = args[0];
  if (command !== "init") {
    fail(`Unknown command: ${command}`);
  }

  const targetArg = args.find((arg, index) => index > 0 && !arg.startsWith("-")) ?? "organization-memory";
  const force = args.includes("--force");
  const targetDir = resolve(process.cwd(), targetArg);

  if (existsSync(targetDir) && !force) {
    fail(`Target already exists: ${targetDir}\nUse --force to add missing files without overwriting existing files.`);
  }

  mkdirSync(targetDir, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const [relativePath, content] of files) {
    const fullPath = join(targetDir, relativePath);
    mkdirSync(join(fullPath, ".."), { recursive: true });

    if (existsSync(fullPath)) {
      skipped += 1;
      continue;
    }

    writeFileSync(fullPath, content, "utf8");
    created += 1;
  }

  console.log(`Organization memory starter created at: ${targetDir}`);
  console.log(`Created files: ${created}`);
  console.log(`Skipped existing files: ${skipped}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Read README.md");
  console.log("2. Edit workspace-shared/NORTH_STAR.md");
  console.log("3. Edit workspace-agent-example/SOUL.md");
  console.log("4. Keep secrets out of this folder and Git");
}

function printHelp() {
  console.log(`Organization Memory Folder Starter

Usage:
  organization-memory-starter init <target-dir> [--force]

Examples:
  npx -y miraigent-organization-memory-starter init my-ai-team-memory
  npx -y miraigent-organization-memory-starter init . --force

This creates a public-safe folder structure for shared and agent-specific AI memory.
`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function gitignoreTemplate() {
  return `# Secrets and credentials
.env
.env.*
*.pem
*.key
*token*
*cookie*
credentials*
secrets/
.secrets/

# Runtime noise
node_modules/
.DS_Store
dist/
tmp/
*.log

# Keep memory files intentional.
# Review before committing anything under memory/.
`;
}

function rootReadmeTemplate() {
  return `# Organization Memory Workspace

This folder separates shared organization memory from agent-specific working memory.

Start here:

1. \`workspace-shared/MANIFEST.md\` - rules and safety boundaries
2. \`workspace-shared/NORTH_STAR.md\` - mission and priorities
3. \`workspace-shared/MOAT_OPS.md\` - owners, KPIs, and operating rhythm
4. \`workspace-agent-example/AGENTS.md\` - agent startup instructions
5. \`workspace-agent-example/CURRENT.md\` - current agent state

Do not store secrets, cookies, API keys, passwords, private keys, or customer personal data in this repository.
`;
}

function sharedManifestTemplate() {
  return `# MANIFEST.md - Organization Rules

Purpose: define what the AI team may do, what it must not do, and where the source of truth lives.

## Highest Priority Rules

- Do not store secrets in Git or memory files.
- Do not publish, email, post, or change production settings without the required human approval.
- Check the source of truth before reporting status.
- Keep shared memory and agent-specific memory separate.
- Record decisions as decisions, not as vague chat history.

## Source Of Truth

- Organization direction: \`NORTH_STAR.md\`
- Operating rhythm: \`MOAT_OPS.md\`
- Current organization state: \`OPERATION.md\`
- Project truth: \`projects/<project-name>/\`
- Daily logs: \`memory/YYYY-MM-DD.md\`

## Memory Shape

\`\`\`text
Target:
Decision:
Reason:
Use next time:
Do not:
Source:
\`\`\`
`;
}

function northStarTemplate() {
  return `# NORTH_STAR.md - Mission And Priorities

## Mission

Write the mission in one sentence.

## Current Quarter Goals

- Goal 1:
- Goal 2:
- Goal 3:

## This Month's Focus

- Primary focus:
- Secondary focus:

## Decision Question

When work conflicts, ask: does this move the organization toward the current focus?
`;
}

function moatOpsTemplate() {
  return `# MOAT_OPS.md - Owners, KPIs, And Operating Rhythm

## Owners

- Brand:
- Data:
- Customer support:
- Operations:
- Quality:

## KPIs

- Lead indicator:
- Output indicator:
- Quality indicator:

## Daily Routine

1. Read the startup files.
2. Check current priorities.
3. Do one task that improves the moat.
4. Record what changed.
5. Report blockers early.
`;
}

function operationTemplate(title) {
  return `# ${title}

## Current State

- Status:
- Last updated:
- Owner:

## Open Tasks

- [ ] Task:

## Blockers

- None recorded.
`;
}

function dailyMemoryTemplate(title) {
  return `# ${title} - ${today}

## Notes

- 
`;
}

function projectReadmeTemplate() {
  return `# Example Project

## Purpose

Describe what this project is for.

## Source Of Truth

- Decisions: \`DECISIONS.md\`
- Handoff: \`HANDOFF.md\`
- Agent work logs: each agent workspace
`;
}

function decisionsTemplate() {
  return `# DECISIONS.md

## Decision Template

\`\`\`text
Date:
Decision:
Reason:
Owner:
Review date:
\`\`\`
`;
}

function handoffTemplate() {
  return `# HANDOFF.md

## Current Handoff

- What is done:
- What is not done:
- Where the files are:
- What to check before continuing:
`;
}

function agentsTemplate() {
  return `# AGENTS.md - Agent Startup

Before doing task work:

1. Read \`BOOTSTRAP.md\`.
2. Read \`SOUL.md\`.
3. Read \`CURRENT.md\`.
4. Read \`OPERATION.md\`.
5. Read \`../workspace-shared/MANIFEST.md\`.
6. Read \`../workspace-shared/NORTH_STAR.md\`.
7. Read \`../workspace-shared/MOAT_OPS.md\`.
8. Read the relevant project files.

Do not reveal secrets. Do not store secrets in memory. Ask before external actions unless your organization rules explicitly allow them.
`;
}

function bootstrapTemplate() {
  return `# BOOTSTRAP.md - Persistent Startup Checklist

## Startup

- Confirm who you are.
- Confirm who you are helping.
- Confirm the current task.
- Search memory only for relevant prior decisions, failures, and todos.
- Use the source of truth before answering status questions.

## Memory Rules

- Store only durable, future-useful context.
- Mark hypotheses as hypotheses.
- Remove or revise stale guidance.
- Keep shared, project, and agent memories separate.
`;
}

function soulTemplate() {
  return `# SOUL.md - Agent Role

## Role

Describe this agent's job.

## Tone

Describe the expected communication style.

## Authority Boundary

Describe what this agent can do without approval and what requires approval.
`;
}

function memoryTemplate() {
  return `# MEMORY.md - Long-Term Agent Memory

Use this for durable lessons, stable preferences, and repeated decisions.

Do not store secrets, cookies, passwords, access tokens, private keys, or customer personal data here.

## Durable Memories

- 
`;
}

function currentTemplate() {
  return `# CURRENT.md - Current Agent State

## Current Focus

- 

## Recently Checked

- 

## Next Action

- 
`;
}

function todoTemplate() {
  return `# TODO.md

- [ ] Confirm project scope.
- [ ] Record first decision.
- [ ] Create first handoff note.
`;
}

function worklogTemplate() {
  return `# WORKLOG.md

## ${today}

- Started project workspace.
`;
}
