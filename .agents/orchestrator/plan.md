# Project: Aether AI CLI Plan

## Architecture & Overview
Aether AI CLI (`aether`) is an all-in-one command-line AI assistant featuring interactive terminal chat, secure configuration management, file context parsing, multi-mode routing, and local offline mathematical/logic evaluation fallbacks.

The codebase is structured as:
- `src/cli.js`: Main CLI wrapper using `commander`.
- `src/chat.js`: Interactive chat loop implementation.
- `src/config.js`: Configuration manager reading from `~/.aether/config.json` and environment.
- `src/file-parser.js`: Parses text, code, json, csv and formats them.
- `src/modes.js`: Reasoning modes configuration.
- `src/ai/`:
  - `router.js`: Routing logic including local math evaluation, provider loop, and Krylo fallback.
  - `fallback.js`: Offline/math evaluation and Krylo chatbot response generator.
  - `providers.js`: Supported providers registry.
  - `universal.js`: API client implementations.

## Milestones
| # | Milestone Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 1 | Git & CI Setup | Initialize git, make initial commit, create `.github/workflows/ci.yml` | None | DONE |
| 2 | Programmatic Test Suite | Implement Node unit tests in `test/` verifying config loading, file parsing, routing, and math fallbacks | None | DONE |
| 3 | Premium UX Upgrades | Add cyberpunk custom spinner, dynamic width, syntax highlighting, autocomplete, and streaming | M2 | DONE |
| 4 | E2E Testing & Audit | Run all unit tests, execute E2E verification, run Forensic Auditor to verify integrity and layout | M1, M2, M3 | DONE |

## Verification Plan
1. **Milestone 1**: Verify git repo initialized, files added, clean git status, and `.github/workflows/ci.yml` exists. (DONE)
2. **Milestone 2**: Write unit tests. Verify unit tests run and pass using `npm test`.
3. **Milestone 3**: Verify spinner, dynamic width, syntax highlighting, and autocomplete logic manually/programmatically.
4. **Milestone 4**: Run the forensic auditor to verify integrity, no hardcoding, no dummy mocks. Confirm 100% of tests pass.
