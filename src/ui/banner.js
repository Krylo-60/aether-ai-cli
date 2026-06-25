// ═══════════════════════════════════════════════════════════
// AETHER AI CLI — ASCII Art Welcome Banner
// ═══════════════════════════════════════════════════════════

import chalk from "chalk";
import { colors, separator, bullet } from "./theme.js";

/**
 * Displays the cyberpunk-styled Aether ASCII art banner.
 * @param {string} [currentMode='titan'] - The currently active mode name
 */
export function showBanner(currentMode = "titan") {
  const c1 = colors.accent;
  const c2 = colors.accent2;
  const c3 = colors.accent3;
  const dim = colors.dim;

  const art = [
    "",
    c1("  ╔═══════════════════════════════════════════════════════════╗"),
    c1("  ║") + c2("     █████╗ ███████╗████████╗██╗  ██╗███████╗██████╗    ") + c1("║"),
    c1("  ║") + c2("    ██╔══██╗██╔════╝╚══██╔══╝██║  ██║██╔════╝██╔══██╗   ") + c1("║"),
    c1("  ║") + c1("    ███████║█████╗     ██║   ████████║█████╗  ██████╔╝   ") + c1("║"),
    c1("  ║") + c3("    ██╔══██║██╔══╝     ██║   ██╔══██║██╔══╝  ██╔══██╗   ") + c1("║"),
    c1("  ║") + c3("    ██║  ██║███████╗   ██║   ██║  ██║███████╗██║  ██║   ") + c1("║"),
    c1("  ║") + dim("    ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ") + c1("║"),
    c1("  ╚═══════════════════════════════════════════════════════════╝"),
    "",
    c1("  ⚡ ") + colors.text.bold("Aether Core AI v110") + colors.dim(" — Fusion Command Station"),
    c2("  ◈  ") + colors.muted(`Active Mode: `) + modeLabel(currentMode),
    "",
    separator("─"),
    "",
    bullet("Type your prompt and press " + colors.accent("Enter") + " to query."),
    bullet("Use " + colors.accent("/help") + " for all commands."),
    bullet("Use " + colors.accent("/mode <name>") + " to switch reasoning mode."),
    bullet("Use " + colors.accent("/attach <file>") + " to add file context."),
    bullet("Use " + colors.accent("/exit") + " or " + colors.accent("Ctrl+C") + " to quit."),
    "",
    separator("─"),
    "",
  ];

  console.log(art.join("\n"));
}

/**
 * Gets a styled label for the given mode.
 * @param {string} mode - Mode name
 * @returns {string} Styled mode label
 */
function modeLabel(mode) {
  const labels = {
    synthesis: colors.accent3.bold("Synthesis v2.5"),
    research:  colors.accent2.bold("Research v104"),
    architect: colors.magenta.bold("Architect v55"),
    titan:     colors.accent.bold("Titan Fusion v110"),
  };
  return labels[mode?.toLowerCase()] || labels.titan;
}
