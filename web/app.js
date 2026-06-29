// AETHER CLI VERSION TIMELINE DATA & INTERACTIVE LOGIC

const RELEASES = [
  {
    version: "v1.5.2",
    date: "June 29, 2026",
    summary: "Autopilot safe command validation upgrades. Expanded whitelisting parameters for Python environments.",
    badges: ["NPM: 1.5.2", "PyPI: 1.5.2", "Autopilot"],
    highlights: [
      "Expanded Autopilot Safe Commands: Whitelisted python3 and py launcher commands.",
      "Instant execution: Commands like python3 --version, py --version, py -0p, and py -3.12 --version run automatically without asking for permission in autopilot modes.",
      "Includes unit verification tests for safety rules."
    ],
    features: [
      {
        title: "Safe Environment Checks",
        desc: "Resolves manual prompt lockouts when checking system Python runtimes during debug sessions."
      }
    ]
  },
  {
    version: "v1.5.1",
    date: "June 29, 2026",
    summary: "Local Krylo offline companion bot restoration with natural, supportive English responses.",
    badges: ["NPM: 1.5.1", "PyPI: 1.5.1", "Offline Fallback"],
    highlights: [
      "Restored local Krylo companion bot fallback when no API keys are configured or providers fail.",
      "English conversations: Re-coded offline fallback logic to speak in helpful English instead of cyberpunk jargon.",
      "Added greetings, command sheets, system diagnostics, and code-skeleton generators to the offline responder."
    ],
    features: [
      {
        title: "Natural English Fallback",
        desc: "Talks cleanly and acts as an offline helper when API limits are reached."
      }
    ]
  },
  {
    version: "v1.5.0",
    date: "June 26, 2026",
    summary: "Dynamic plugin registry decoupling and major git/workspace automation upgrades.",
    badges: ["NPM: 1.5.0", "PyPI: 1.5.0", "Registry Architecture"],
    highlights: [
      "Decoupled Dynamic Plugin Registry: Stripped switch loops; dynamically registers commands as ES modules from src/commands/.",
      "GitHub Workspace Sync (/github): Auto-stages files, generates semantic commit messages via AI, and pushes to remote.",
      "Teamwork Status Dashboard (/teamwork-preview): Shows unified status matrix dashboard of branches, diffs, PRs, and assignments."
    ],
    features: [
      {
        title: "Dynamic Plugin Registry",
        desc: "Fully scans src/commands/ dynamically on startup. Adding commands is as simple as creating a file."
      },
      {
        title: "/github Auto-Sync",
        desc: "Stages changes, runs AI diff analysis to write a conventional commit message, and pushes upstream."
      },
      {
        title: "/teamwork-preview",
        desc: "ASCII matrix dashboard consolidating branches, remote PRs, uncommitted modifications, and issues."
      }
    ]
  },
  {
    version: "v1.4.9",
    date: "June 20, 2026",
    summary: "Autonomous /goal solver mode with self-correcting execution loops.",
    badges: ["NPM: 1.4.9", "PyPI: 1.4.9", "Autonomous Engine"],
    highlights: [
      "Interactive /goal Command: Spawns an autonomous goal solver feedback loop.",
      "Loop reads, plans, writes, and executes commands iteratively until completion is flagged via [GOAL_ACHIEVED]."
    ],
    features: [
      {
        title: "Autonomous Solvers",
        desc: "Solves long-running tasks overnight by reviewing its own progress logs."
      }
    ]
  },
  {
    version: "v1.4.8",
    date: "June 15, 2026",
    summary: "Dynamic theme-aware syntax highlighting for code blocks in terminal outputs.",
    badges: ["NPM: 1.4.8", "PyPI: 1.4.8", "Visual Upgrade"],
    highlights: [
      "Dynamic Theme-Aware Code Syntax Highlighting: Implements rich syntax rendering for JS, Python, HTML, CSS, and Bash.",
      "Automatically matches highlights in code blocks to your active visual theme (Cyberpunk, Matrix, Synthwave, Crimson)."
    ],
    features: [
      {
        title: "Rich Syntax Highlights",
        desc: "Colorizes code blocks dynamically matching active user themes on standard ANSI terminals."
      }
    ]
  },
  {
    version: "v1.4.7",
    date: "June 10, 2026",
    summary: "Robust web search empty result handlers to prevent AI context corruption.",
    badges: ["NPM: 1.4.7", "PyPI: 1.4.7", "Search Reliability"],
    highlights: [
      "Graceful Web Search Empty Handlers: Injects 'No search results were found' warning back to AI context rather than a blank list.",
      "Prevents AI models from getting confused by empty search responses."
    ]
  },
  {
    version: "v1.4.6",
    date: "June 05, 2026",
    summary: "Context size optimizations using granular line range selection for workspace files.",
    badges: ["NPM: 1.4.6", "PyPI: 1.4.6", "Token Optimizer"],
    highlights: [
      "Granular File Line Range Selection: Adds syntax support for ranges when attaching file context (e.g. /attach file.js:10-50).",
      "Limits payload sizes, preventing prompt bloat and optimizing token costs by excluding irrelevant code blocks."
    ]
  },
  {
    version: "v1.4.3",
    date: "May 25, 2026",
    summary: "Rate limit and quota exhaustion recognition for active reasoning providers.",
    badges: ["NPM: 1.4.3", "PyPI: 1.4.3", "Failover Mesh"],
    highlights: [
      "Rate Limit / Quota Exceeded Recognition: Automatically parses failed node errors to detect rate-limit blocks (like Gemini 429).",
      "Prepends prominent '💡 [Rate Limit / Quota Exceeded]' highlight so users know why their request was throttled."
    ]
  },
  {
    version: "v1.4.0",
    date: "May 10, 2026",
    summary: "Microphone recording, voice commands, Whisper speech transcription, and Nerd Font styles.",
    badges: ["NPM: 1.4.0", "PyPI: 1.4.0", "Audio & UX"],
    highlights: [
      "Microphone Audio Input (/mic): Records voice command audio directly inside the terminal session.",
      "Zero-dependency Windows MCI recording via PowerShell wrapper.",
      "Whisper Transcription: Transcribes audio via Gemini base64 inlineData, Groq Whisper, or OpenAI Whisper.",
      "Nerd Fonts Integration: Option to switch standard emojis to Nerd Font glyphs (aether config set NERD_FONTS true)."
    ],
    features: [
      {
        title: "Voice commands (/mic)",
        desc: "Speak your queries directly. Renders transcription dynamically in your readline prompt buffer."
      },
      {
        title: "Nerd Font Glyphs",
        desc: "Renders beautiful developer indicators (gears, branch trees, mics) inside supported consoles."
      }
    ]
  },
  {
    version: "v1.3.5",
    date: "April 20, 2026",
    summary: "Observability upgrades with a local Web Telemetry Dashboard HUD.",
    badges: ["NPM: 1.3.5", "PyPI: 1.3.5", "Observability"],
    highlights: [
      "Visual Telemetry Dashboard HUD (/dashboard): Launches a cyberpunk dashboard server on port 4567.",
      "Displays real-time latencies, query success rates, token distributions, and active failover mesh statuses.",
      "Persistent stats: Preserves historical metrics in ~/.aether/telemetry.json."
    ],
    features: [
      {
        title: "Observability HUD",
        desc: "Visualizes your AI requests, latency trends, and active model distributions directly in your browser."
      }
    ]
  },
  {
    version: "v1.3.4",
    date: "April 15, 2026",
    summary: "AI-powered workspace keyword and semantic workspace search command.",
    badges: ["NPM: 1.3.4", "PyPI: 1.3.4", "Workspace Search"],
    highlights: [
      "AI-Powered Workspace Search (/search): Scans files for keyword matches showing snippets and line numbers.",
      "Supports /search --ai <query> to perform semantic indexing with the active AI model."
    ]
  },
  {
    version: "v1.3.0",
    date: "April 01, 2026",
    summary: "Advanced Codex and Claude Code developer slash command suite.",
    badges: ["NPM: 1.3.0", "PyPI: 1.3.0", "Command Suite"],
    highlights: [
      "Session Telemetry Tracker: Shows token metrics on every query and active /tokens command details.",
      "Developer command suite introduced:",
      " - /review: Analyze git changes and streams AI-powered code reviews.",
      " - /diagnose [cmd]: Run tests and auto-debug any failures.",
      " - /explain, /refactor, /bug, /doc, /translate: Codebase refactoring assistants."
    ],
    features: [
      {
        title: "Developer Command Suite",
        desc: "Includes /review, /diagnose, /explain, /refactor, /bug, and /doc commands directly out of the box."
      }
    ]
  }
];

// Initialize application state
let activeVersion = RELEASES[0].version;

// Render version timeline sidebar
function renderTimeline(list) {
  const container = document.getElementById("version-timeline");
  container.innerHTML = "";
  
  if (list.length === 0) {
    container.innerHTML = `<li class="timeline-empty">No versions match search</li>`;
    return;
  }

  list.forEach(rel => {
    const li = document.createElement("li");
    li.className = `timeline-item ${rel.version === activeVersion ? 'active' : ''}`;
    li.onclick = () => selectVersion(rel.version);
    
    li.innerHTML = `
      <span class="timeline-node"></span>
      <div class="timeline-content">
        <span class="timeline-version">${rel.version}</span>
        <span class="timeline-date">${rel.date}</span>
      </div>
    `;
    container.appendChild(li);
  });
}

// Select a version and render its detail card
function selectVersion(ver) {
  activeVersion = ver;
  
  // Re-render timeline to update active class
  filterVersions();
  
  const rel = RELEASES.find(r => r.version === ver);
  const detailCard = document.getElementById("release-detail-card");
  
  if (!rel) return;

  // Render Badges
  const badgesHtml = rel.badges.map(b => {
    let typeClass = "badge-github";
    if (b.toLowerCase().includes("npm")) typeClass = "badge-npm";
    if (b.toLowerCase().includes("pypi")) typeClass = "badge-pypi";
    return `<span class="release-badge ${typeClass}">${b}</span>`;
  }).join("");

  // Render Highlights list
  const highlightsHtml = rel.highlights.map(h => {
    return `<li class="highlight-item">${h}</li>`;
  }).join("");

  // Render Features showcase
  let featuresHtml = "";
  if (rel.features && rel.features.length > 0) {
    featuresHtml = `
      <div class="feature-showcase-title highlights-title">KEY MODULES INTRODUCED</div>
      <div class="feature-showcase-grid">
        ${rel.features.map(f => `
          <div class="feature-showcase-card">
            <span class="feature-title text-cyan">${f.title}</span>
            <p class="feature-desc">${f.desc}</p>
          </div>
        `).join("")}
      </div>
    `;
  }

  detailCard.innerHTML = `
    <div class="detail-header">
      <div class="detail-title-area">
        <span class="detail-version">${rel.version}</span>
        <span class="detail-date">RELEASED ON: ${rel.date}</span>
      </div>
      <div class="badges-row">
        ${badgesHtml}
      </div>
    </div>
    
    <p class="detail-summary">${rel.summary}</p>
    
    <div class="detail-highlights">
      <span class="highlights-title">RELEASE NOTES & HIGHLIGHTS</span>
      <ul class="highlights-list">
        ${highlightsHtml}
      </ul>
    </div>

    ${featuresHtml}
  `;
}

// Filter versions based on search input
function filterVersions() {
  const query = document.getElementById("version-search").value.toLowerCase();
  
  const filtered = RELEASES.filter(rel => {
    return (
      rel.version.toLowerCase().includes(query) ||
      rel.summary.toLowerCase().includes(query) ||
      rel.highlights.some(h => h.toLowerCase().includes(query)) ||
      (rel.features && rel.features.some(f => f.title.toLowerCase().includes(query) || f.desc.toLowerCase().includes(query)))
    );
  });
  
  renderTimeline(filtered);
}

// Helper to copy installation commands to clipboard
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = "<span>COPIED!</span>";
    btn.style.background = "var(--google-green)";
    btn.style.color = "var(--bg-deep)";
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.style.color = "";
    }, 2000);
  });
}

// Bootstrap dashboard counts
document.getElementById("stat-total-releases").textContent = RELEASES.length;
document.getElementById("stat-latest-version").textContent = RELEASES[0].version;

// Initial load
renderTimeline(RELEASES);
selectVersion(RELEASES[0].version);
