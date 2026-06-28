# Original User Request

## Initial Request — 2026-06-28T14:37:55-04:00

Refactor the aether-ai-cli command registry to support decoupled dynamic plugin discovery, and implement /github (Git/GitHub workspace orchestration) and /teamwork-preview (terminal matrix status dashboard) commands as isolated modules.

Working directory: c:\Users\naina\.gemini\antigravity\scratch\aether-ai-cli
Integrity mode: development

## Requirements

### R1. Dynamic Command Plugin Registry
- Decouple all slash commands from the monolithic switch block in chat.js.
- Automatically search, import, and register command plugins from a dedicated directory (e.g., src/commands/) at runtime.
- Keep the core CLI entry point lightweight and fast.

### R2. /github` Command
- Automatically stage modifications, query git diff, generate semantic conventional commits using AI analysis, and sync local branches upstream.
- Track project issues and coordinate with GitHub remotes.
- Gracefully handle git conflicts, credential timeouts, or network failures. Output clear visual diagnostic warnings instead of stack traces.

### R3. /teamwork-preview` Command
- Aggregate local workspace changes (git status, active branch, modified file lists) and remote repo status.
- Render a highly scannable grid dashboard in the console.
- Visual theme: Slate gray for timestamps/secondary metadata, vibrant cyan for primary headings/metrics, and neon blue for borders/success states.

### R4. Performance & Modularity
- Ensure command execution is fast using asynchronous execution (Promise.all) for filesystem/API operations.
- Avoid introducing synchronous blocking code in plugins.

## Acceptance Criteria

### Plugin Architecture & Registry
- [ ] Command autocomplete list dynamically includes /github and /teamwork-preview.
- [ ] Core chat.js file is refactored to remove the hardcoded switch statements for these commands, delegating instead to the dynamic plugin loader.

### Command Execution & UX
- [ ] Running /github stages modifications and generates an AI conventional commit message.
- [ ] Running /teamwork-preview outputs a clean visual grid using theme-compliant colors (cyan, blue, slate gray) without plain text blocks.
- [ ] If Git encounters a conflict or credentials are missing, both commands capture the failure and output formatted user diagnostics instead of uncaught process crashes.

### Performance & Verification
- [ ] Dynamic command registry and both plugins have associated unit tests under test/.
- [ ] Running node --test completes successfully with 100% of tests passing.
