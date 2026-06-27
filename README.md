# Organization Memory Folder Starter

AIエージェントを「毎回新人に戻るチャット」ではなく、過去の約束・判断基準・失敗・運用ログを踏まえて動くチームメンバーに近づけるための、記憶フォルダー雛形です。

This package creates a small, file-based workspace for organization-owned AI agent memory. It is built for teams that want AI agents to keep useful working context without putting secrets, customer data, or private engine details into public memory.

## Why This Exists

AI agents can write, research, code, summarize, and operate tools. But if they do not keep the right working context, people still have to explain the same things again:

- what was promised
- which decisions are still valid
- what failed before
- which tone or brand rule matters
- where the current source of truth lives
- what must never be stored in memory

The answer is not "save everything." A useful AI memory folder separates shared rules, agent-specific memory, project records, daily logs, and secrets.

## Quick Start

```bash
npx -y miraigent-organization-memory-starter init my-ai-team-memory
cd my-ai-team-memory
find . -maxdepth 3 -type f | sort
```

The command creates:

```text
my-ai-team-memory/
├── README.md
├── .gitignore
├── workspace-shared/
│   ├── MANIFEST.md
│   ├── NORTH_STAR.md
│   ├── MOAT_OPS.md
│   ├── OPERATION.md
│   ├── memory/
│   │   └── YYYY-MM-DD.md
│   └── projects/
│       └── example-project/
│           ├── README.md
│           ├── DECISIONS.md
│           └── HANDOFF.md
└── workspace-agent-example/
    ├── AGENTS.md
    ├── BOOTSTRAP.md
    ├── SOUL.md
    ├── MEMORY.md
    ├── CURRENT.md
    ├── OPERATION.md
    ├── memory/
    │   └── YYYY-MM-DD.md
    └── projects/
        └── example-project/
            ├── TODO.md
            └── WORKLOG.md
```

## The Core Idea

Use shared memory for the facts every agent should see:

- organization rules
- mission and priorities
- operating status
- project source of truth
- handoff notes

Use agent memory for the context only one agent should carry:

- role and personality
- working preferences
- task state
- daily work logs
- lessons learned by that agent

Use project memory for the work itself:

- decisions
- current status
- drafts and artifacts
- handoff notes
- unresolved risks

## What To Store

Store memory that changes future behavior:

- Promise: what was agreed, by whom, and what completion means
- Decision: what was decided and why
- Failure: what went wrong and what to check next time
- Preference: tone, format, brand, and review expectations
- Operation log: what was done, where it is saved, and what remains

Use this small memory shape:

```text
Target:
Decision:
Reason:
Use next time:
Do not:
Source:
```

## What Not To Store

Do not put these in memory files or Git:

- API keys
- access tokens
- passwords
- cookies
- private keys
- customer personal data
- private legal or financial records
- unreviewed confidential company material

Use a secret manager, encrypted local secret files, or your platform's official secret storage. This starter only creates the folder structure and safety reminders.

## Suggested Startup Order

When an AI agent wakes up, have it read a small set of files in a stable order:

1. Tool-specific entry file: `AGENTS.md`, `CLAUDE.md`, or equivalent
2. Agent bootstrap: `BOOTSTRAP.md`
3. Agent identity and role: `SOUL.md`
4. Agent long-term memory: `MEMORY.md`
5. Current task state: `CURRENT.md` and `OPERATION.md`
6. Shared organization rules: `workspace-shared/MANIFEST.md`
7. Shared direction: `workspace-shared/NORTH_STAR.md`
8. Shared operations: `workspace-shared/MOAT_OPS.md`
9. Relevant project source files

The goal is not to read every log every time. The goal is to give the agent a reliable route back to the source of truth.

## Agent Memories Route

This starter keeps the memory folder user-owned and file-based. That is intentional.

Agent Memories is the public service concept for turning repeated AI operating lessons into reusable memory, templates, and safer workflows.

MIRAI Memory is the private memory concept behind that service direction. This repository does not include the MIRAI Memory engine, private working memory MCPs, customer data, or internal product implementation.

Learn more:

- Agent Memories: https://agentmemories.jp/
- Miraigent resources: https://miraigent.com/resources.html
- Miraigent free diagnosis: https://miraigent.com/diagnosis.html

## Commands

```bash
npx -y miraigent-organization-memory-starter --help
npx -y miraigent-organization-memory-starter init my-ai-team-memory
npx -y miraigent-organization-memory-starter init . --force
```

## Local Development

```bash
npm install
npm run check
npm test
```

## Boundary

This package is a starter kit for folder structure and public-safe templates. It is not:

- a database
- a vector store
- a hosted memory service
- a working memory MCP
- the MIRAI Memory engine

It gives teams a clean first folder so their AI agents can start from the same rules, remember useful work, and avoid storing dangerous data.
