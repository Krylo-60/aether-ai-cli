# Krims Code CLI v1.5.2 Highlights
- **Expanded Autopilot Safe Commands**:
  - Whitelisted `python3` and `py` launcher versions/readouts as safe commands.
  - Allowed commands like `python3 --version`, `py --version`, `py -0p`, and `py -3.12 --version` to run instantly without prompting for permission in autopilot modes.

# Krims Code CLI v1.5.1 Highlights
- **Krylo Offline Companion Restored**:
  - Restored the local Krylo companion bot fallback when no API keys are configured or all configured providers fail.
  - Re-implemented the fallback logic to converse in helpful, natural English instead of sci-fi gibberish/jargon.
  - Added greetings, cheat sheets, system diagnostics, and code-skeleton generators to the offline responder.

# Krims Code CLI v1.5.0 Highlights
- **Decoupled Dynamic Plugin Registry**:
  - Refactored the core chat loops and entry points to dynamically load commands as modular ES modules from a dedicated registry.
  - Added new `/github` and `/teamwork-preview` commands as isolated modules.
  - Retained clean visual design layout and implemented 102 passing tests with 100% test coverage.

# Krims Code CLI v1.4.9 Highlights
- **Interactive `/goal` Command**:
  - Implements the new `/goal <task>` interactive command.
  - Spawns an autonomous goal solver feedback loop that reads, plans, writes, and executes commands iteratively until completion is flagged via `[GOAL_ACHIEVED]`.

# Krims Code CLI v1.4.8 Highlights
- **Dynamic Theme-Aware Code Syntax Highlighting**:
  - Implements rich, theme-aware terminal code syntax highlighting for JavaScript, Python, HTML/XML, CSS, and Bash.
  - Automatically matches code blocks in AI answers to the active user visual theme (Cyberpunk, Matrix, Synthwave, or Crimson).

# Krims Code CLI v1.4.7 Highlights
- **Graceful Web Search Empty Handlers**:
  - Adds robust detection and processing for empty web search tool results.
  - Injects a clear `"No search results were found"` feedback block back to the AI context rather than a blank newline list, preventing models from thinking that the outputs were missing or corrupt.

# Krims Code CLI v1.4.6 Highlights
- **Granular File Line Range Selection (`/attach file:start-end`)**:
  - Adds syntax support for selecting line ranges when attaching file context (e.g., `/attach src/cli.js:10-50` or `/attach index.html:100`).
  - Limits context payload sizes, preventing prompt bloat and optimizing token costs by excluding irrelevant code blocks.

# Krims Code CLI v1.4.5 Highlights
- **Multi-Session Unit Test Race Condition Fix**:
  - Adds history folder isolation and a 50ms timestamp delay to unit tests to prevent flaky assertions on fast filesystems and CI runners.
  - Ensures clean test execution on Ubuntu/GitHub Actions without session sorting race conditions.

# Krims Code CLI v1.4.4 Highlights
- **Strict Solver Mocking Prohibition**:
  - Adds a new system-level constraint preventing AI models from simulating or formatting their own replies with internal prefixes like `🤖 [LOCAL MATH SOLVER]` or offline banners.
  - Ensures queries that fail local regex validation (such as queries containing exclamation marks `!`) are answered naturally by the AI provider without formatting confusion.

# Krims Code CLI v1.4.3 Highlights
- **Rate Limit / Quota Exceeded Recognition**:
  - Automatically parses failed node errors to detect rate-limit blocks (like Gemini 429 quota exhaustion).
  - Prepends a clear, prominent human-friendly `💡 [Rate Limit / Quota Exceeded]` summary highlight at the top of the error alert so users instantly know their quota was hit.

# Krims Code CLI v1.4.2 Highlights
- **Mesh Error Transparency**:
  - Implements dynamic offline fallback error alerts containing the exact error messages encountered by all failing provider nodes.
  - Ensures Krims Code only states "No active API keys configured" if no keys are setup at all, rather than outputting it incorrectly upon network or API limit node failures.

# Krims Code CLI v1.4.1 Highlights
- **Krylo Companion Bot Removal**:
  - Removes the fictional Krylo companion terminal response lines entirely from local failbacks and mesh failures.
  - Retains and isolates the fast local offline Math solver fallback.
  - Implements clean, professional offline/configuration error alerts when no API keys are active or fail to respond.

# Krims Code CLI v1.4.0 Highlights
- **Microphone Audio Input & Dynamic Nerd Font Glyphs (`/mic`)**:
  - Adds `/mic` voice command to record audio directly from your microphone inside the terminal session.
  - Implements native zero-dependency audio recording on Windows using the WinMM Multimedia Control Interface (MCI) via PowerShell.
  - Automatically transcribes speech using Google Gemini (base64 inlineData), Groq Whisper, or OpenAI Whisper.
  - Fixes readline interface raw mode pausing blockages to ensure Enter keypress resolves transcription correctly.
  - Introduces dynamic `getIcon` helper supporting high-definition vector icons in the terminal.
  - Adds optional `"NERD_FONTS"` configuration parameter (`krims-code config set NERD_FONTS true`) to automatically switch between standard emojis and Nerd Font glyphs (like FontAwesome microphones, folders, gears, and branch trees) based on your preferences.

# Krims Code CLI v1.3.11 Highlights
- **Microphone Audio Input Non-TTY Safety & Transcription (`/mic`)**:
  - Adds `/mic` voice command to record audio directly from your microphone inside the terminal session.
  - Implements native zero-dependency audio recording on Windows using the WinMM Multimedia Control Interface (MCI) via PowerShell.
  - Automatically transcribes speech using Google Gemini (base64 inlineData), Groq Whisper, or OpenAI Whisper.
  - Adds safeguards to prevent setRawMode crashes in non-TTY environments (like tests or piped runs).
  - Populates the active readline prompt buffer directly with the transcribed text so you can review, edit, and send it.

# Krims Code CLI v1.3.10 Highlights
- **Microphone Audio Input Fixes & Transcription (`/mic`)**:
  - Adds `/mic` voice command to record audio directly from your microphone inside the terminal session.
  - Implements native zero-dependency audio recording on Windows using the WinMM Multimedia Control Interface (MCI) via PowerShell.
  - Automatically transcribes speech using Google Gemini (base64 inlineData), Groq Whisper, or OpenAI Whisper.
  - Fixes readline interface raw mode pausing blockages to ensure Enter keypress resolves transcription correctly.
  - Populates the active readline prompt buffer directly with the transcribed text so you can review, edit, and send it.

# Krims Code CLI v1.3.9 Highlights
- **Microphone Audio Input & Transcription (`/mic`)**:
  - Adds `/mic` voice command to record audio directly from your microphone inside the terminal session.
  - Implements native zero-dependency audio recording on Windows using the WinMM Multimedia Control Interface (MCI) via PowerShell.
  - Automatically transcribes speech using Google Gemini (base64 inlineData), Groq Whisper, or OpenAI Whisper.
  - Populates the active readline prompt buffer directly with the transcribed text so you can review, edit, and send it.

# Krims Code CLI v1.3.8 Highlights
- **OpenCode TUI Welcome & Navigation**:
  - Implements a stunning, responsive OpenCode-style TUI System State dashboard.
  - Adds `/cd <path>` workspace directory navigation command with directory-only Tab autocomplete.
  - Automatically displays packaging environment info (`npm` vs `pip`).

# Krims Code CLI v1.3.7 Highlights
- **Readme Updates**:
  - Updates documentation to display interactive Git TUI, Autopilot debug loop, and Web Telemetry Dashboard companion commands.

# Krims Code CLI v1.3.6 Highlights
- **DX Fixes & Upgrades (Git TUI, Autopilot, Dashboard)**:
  - Fixes non-interactive Git TUI test hangs in git-initialized home directories.
  - Fixes visual HUD telemetry version rendering.
  - Updates project package-lock mappings.

# Krims Code CLI v1.3.5 Highlights
- **Visual Telemetry Dashboard HUD (`Krims Code dashboard` / `Krims Code telemetry`)**:
  - Adds a local zero-dependency Web Server hosting a cyberpunk observability dashboard HUD.
  - Displays real-time request latencies, query success rates, model token distributions, and active failover mesh topologies.
  - Persistent storage preserves historical metrics across CLI executions in `~/.krims-code/telemetry.json`.
  - Offline-compatible custom SVG chart engine allows telemetry visualization without an internet connection.

# Krims Code CLI v1.3.4 Highlights
- **AI-Powered Workspace Search & Code Indexer (`/search`)**:
  - Adds `/search <query>` slash command to scan all workspace text files for keyword matches, showing line numbers and code snippets.
  - Supports `/search --ai <query>` to run a semantic search using the active AI reasoning model.
  - Automatically ignores binaries, files exceeding 250KB, and build/dependency/git directories.

# Krims Code CLI v1.3.3 Highlights
- **Codex & Claude Code Slash Commands**: Added 7 new advanced developer experience (DX) commands:
  - `/review`: Analyze staged/unstaged git changes and stream an AI-powered code review.
  - `/diagnose [cmd]`: Run tests/builds and automatically debug any errors.
  - `/explain <file>`: Explains design flow and patterns in code.
  - `/refactor <file>`: Rewrites a target file to optimize it.
  - `/bug <file>`: Scans a file to detect logical edge case failures.
  - `/doc <file>`: Automatically writes documentation, inline comments, or JSDoc.
  - `/translate <file> <lang>`: AI-translates file code into another target language.

# Krims Code CLI v1.3.2 Highlights
- **Manual Updater `/update`**: Added a new slash command `/update` to manually check the registry and force-upgrade Krims Code CLI to the latest version immediately, bypassing the 24-hour cache throttle.

# Krims Code CLI v1.3.1 Highlights
- **Codex & Claude Code Fusion**: The powers of OpenAI Codex and Claude Code are now combined directly inside the default **Titan Fusion** (`titan`) mode.
- **Streamlined Modes**: Removed the individual `codex` and `cloude-code` modes to reduce clutter, automatically redirecting all lookups of these modes to Titan Fusion.

# Krims Code CLI v1.3.0 Highlights
- **Token Telemetry Tracker**: Real-time prompt and completion token statistics shown on every chat turn.
- **Session Telemetry `/tokens`**: A new slash command displaying detailed model-by-model session token breakdowns and total exchange stats.
- **Toggle Telemetry**: Enable or disable display using `krims-code config set SHOW_TOKENS false`.

# Krims Code CLI v1.1.9 Highlights
- **Node 18 Compatibility**: Resolves `ReadableStream` reference errors inside the Node 18 CI test runner.
- **Auto-Updater**: Checks for updates once every 24 hours on launch and updates the CLI automatically.
- **Release Highlights**: Prompts and renders version release notes on launch.
- **Customizable Control**: Toggle behavior using `krims-code config set AUTO_UPDATE false` and `krims-code config set SHOW_HIGHLIGHTS false`.
- **Autopilot Safety Levels**: Added autonomous capabilities controlled by `/autopilot` setting.
- **Chat History Selector**: View and switch past chat logs with `/history`.
