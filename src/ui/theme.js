// ═══════════════════════════════════════════════════════════
// AETHER AI CLI — Color Theme & Formatting Utilities
// ═══════════════════════════════════════════════════════════

import chalk from "chalk";

// ── Core Palette ──────────────────────────────────────────
export const colors = {
  accent:    chalk.hex("#00f0ff"),       // Neon cyan
  accent2:   chalk.hex("#bd93f9"),       // Neon purple/magenta
  accent3:   chalk.hex("#50fa7b"),       // Neon green
  danger:    chalk.hex("#ff5555"),       // Neon red
  warning:   chalk.hex("#ffb86c"),       // Neon orange/amber
  muted:     chalk.hex("#6272a4"),       // Comment/muted gray-blue
  text:      chalk.hex("#f8f8f2"),       // Crisp white-yellow
  dim:       chalk.hex("#44475a"),       // Dark border gray
  brand:     chalk.hex("#00f0ff").bold,  // Brand neon cyan
  success:   chalk.hex("#50fa7b").bold,  // Success green
  error:     chalk.hex("#ff5555").bold,  // Error red
  magenta:   chalk.hex("#ff79c6"),       // Cyberpunk magenta
  orange:    chalk.hex("#ffb86c"),       // Cyberpunk orange
};

// ── Labels ────────────────────────────────────────────────
export const label = {
  system:    chalk.bgHex("#0c1825").hex("#00f0ff").bold(" SYSTEM "),
  user:      chalk.bgHex("#0c1825").hex("#50fa7b").bold("   YOU  "),
  aether:    chalk.bgHex("#0c1825").hex("#00f0ff").bold(" AETHER "),
  error:     chalk.bgHex("#2a0a14").hex("#ff5555").bold("  ERROR "),
  info:      chalk.bgHex("#0c1825").hex("#bd93f9").bold("   INFO "),
  config:    chalk.bgHex("#0c1825").hex("#ffb86c").bold(" CONFIG "),
  math:      chalk.bgHex("#0c1825").hex("#50fa7b").bold("   MATH "),
  krylo:     chalk.bgHex("#0c1825").hex("#00f0ff").bold("  KRYLO "),
  mode:      chalk.bgHex("#0c1825").hex("#bd93f9").bold("   MODE "),
  mesh:      chalk.bgHex("#0c1825").hex("#00f0ff").bold("   MESH "),
  file:      chalk.bgHex("#0c1825").hex("#ffb86c").bold("   FILE "),
};

// ── Formatting Helpers ───────────────────────────────────
export function separator(char = "─", length) {
  const width = process.stdout.columns || 80;
  const targetLength = length !== undefined ? length : Math.max(10, width - 4);
  return colors.dim(char.repeat(targetLength));
}

export function heading(text) {
  return colors.brand(`\n  ${text}\n`) + separator();
}

export function keyValue(key, value) {
  return `  ${colors.muted(key + ":")} ${colors.text(value)}`;
}

export function bullet(text) {
  return `  ${colors.accent("›")} ${colors.text(text)}`;
}

export function modeBadge(mode) {
  const badges = {
    synthesis: chalk.bgHex("#1a3a2a").hex("#50fa7b").bold(" SYNTHESIS "),
    research:  chalk.bgHex("#1a2a3a").hex("#bd93f9").bold(" RESEARCH "),
    architect: chalk.bgHex("#2a1a3a").hex("#ff79c6").bold(" ARCHITECT "),
    titan:     chalk.bgHex("#1a2a3a").hex("#00f0ff").bold(" TITAN FUSION "),
  };
  return badges[mode?.toLowerCase()] || badges.titan;
}

/**
 * Backs up the cursor and clears terminal lines printed during real-time streaming
 * so they can be replaced by the final formatted response.
 * @param {string} text - The raw streamed text that was printed
 */
export function clearStreamedText(text) {
  if (!process.stdout.isTTY) return;
  const width = process.stdout.columns || 80;
  const lines = text.split("\n");
  let lineCount = 0;
  for (const line of lines) {
    lineCount += Math.max(1, Math.ceil(line.length / width));
  }
  if (lineCount > 0) {
    process.stdout.write(`\x1b[${lineCount}A\x1b[J`);
  }
}
