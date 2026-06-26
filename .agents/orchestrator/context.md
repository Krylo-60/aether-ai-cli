# Project Context: Aether AI CLI

## Parent Information
- Caller ID: `bd693966-1f67-4297-acb4-81502cb5d5ad` (main agent / sentinel)

## Configuration Details
- Workspace root: `C:\Users\naina\.gemini\antigravity\scratch\aether-ai-cli`
- Working directory: `C:\Users\naina\.gemini\antigravity\scratch\aether-ai-cli\.agents\orchestrator`

## Core Modules Analysis
- `src/cli.js`: Sets up Commander commands (`chat`, `ask`, `config`, `providers`, `models`, `modes`, `status`, `setup`). Handles cli entry point, help screens, and calling main functions.
- `src/chat.js`: The interactive chat session, CLI command interpreter (slash commands like `/help`, `/mode`, `/attach`, `/files`, `/clear`, `/export`, `/status`, `/providers`, `/copy`, `/exit`).
- `src/config.js`: Interactive setup writing to `~/.aether/config.json`, fallback to env variables. Masks keys.
- `src/file-parser.js`: Parses local file types (`.txt`, `.md`, `.json`, `.csv`, etc.) and formats them into a context string to prepend.
- `src/ai/router.js`: Fallback/routing mesh. Node 0 is Local Math. Nodes 1..N are active API providers. If all fails, Node 0 is local Krylo companion responses.
- `src/ai/fallback.js`: Regex math parser and sandbox evaluation; Krylo companion chatbot responses.
- `src/ai/providers.js`: Map of providers (Groq, Together, Cerebras, OpenAI, Mistral, Fireworks, OpenRouter, DeepSeek, Perplexity, xAI, Google, Anthropic, Cohere).

## Key Tasks & Gaps to Implement
1. **Git Initialization**: Ensure local git repo initialized, files tracked, initial commit made.
2. **CI/CD Workflow**: Create `.github/workflows/ci.yml` running lint/tests.
3. **Programmatic Test Suite**: Node test runner tests in `test/` for:
   - Config loading (env precedence vs file).
   - Context parsing of files (types, limits, errors).
   - Multi-mode routing (routing, failovers, fallbacks).
   - Offline math fallback logic (valid math expressions, invalid/non-math, results).
4. **UX Premium Polish**: Ensure cyberpunk banner, spinner, colors, and response layouts are absolutely beautiful, responsive, and outperforming competitors.
