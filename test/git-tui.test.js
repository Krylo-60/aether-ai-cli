import { test, before, after } from "node:test";
import assert from "node:assert";
import { tmpdir } from "node:os";

// Stub only setRawMode globally for handleGitTUI to prevent crashes in non-TTY environments
const origSetRawMode = process.stdin.setRawMode;
process.stdin.setRawMode = () => {};

const originalCwd = process.cwd();
const nonGitDir = tmpdir();

// We import handleGitTUI
const { handleGitTUI } = await import("../src/chat.js");

test("Git TUI Suite", async (t) => {
  after(() => {
    // Restore Cwd and stdin setRawMode stub
    process.chdir(originalCwd);
    process.stdin.setRawMode = origSetRawMode;
    if (typeof process.stdin.unref === "function") {
      process.stdin.unref();
    }
  });

  await t.test("handleGitTUI fails gracefully outside git repository", async () => {
    let logged = [];
    const origLog = console.log;
    console.log = (m) => logged.push(m);

    // Force git commands to fail by pointing GIT_DIR to a non-existent directory
    const oldGitDir = process.env.GIT_DIR;
    process.env.GIT_DIR = "C:\\non_existent_directory_xxx";

    try {
      await handleGitTUI({});
      const hasErrorMsg = logged.some(l => l && l.includes("Not a git repository"));
      assert.ok(hasErrorMsg);
    } catch (err) {
      console.error("SUBTEST 1 ERROR:", err);
      throw err;
    } finally {
      console.log = origLog;
      if (oldGitDir === undefined) {
        delete process.env.GIT_DIR;
      } else {
        process.env.GIT_DIR = oldGitDir;
      }
    }
  });

  await t.test("handleGitTUI renders commit graph and parsed files status correctly", async () => {
    let logged = [];
    const origLog = console.log;
    console.log = (m) => logged.push(m);

    const origWrite = process.stdout.write;
    let written = [];
    process.stdout.write = (chunk) => {
      written.push(chunk);
      return true;
    };

    const ctx = {
      rl: { pause: () => {}, resume: () => {} }
    };

    try {
      const initialCount = process.stdin.listeners("data").length;
      const p = handleGitTUI(ctx);

      // Poll until handleGitTUI registers its data listener on stdin (increases listener count)
      while (process.stdin.listeners("data").length <= initialCount) {
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      // Trigger ESC/Q keypress on stdin to quit the TUI loop immediately
      process.stdin.emit("data", "q");

      await p;

      const fullOutput = written.join("");
      assert.ok(fullOutput.includes("🌿 AETHER INTERACTIVE GIT TUI"));
      assert.ok(fullOutput.includes("Commit Graph & History:"));
      assert.ok(fullOutput.includes("Modified Files:"));
      assert.ok(fullOutput.includes("Hotkeys:"));
    } catch (err) {
      console.error("SUBTEST 2 ERROR:", err);
      throw err;
    } finally {
      console.log = origLog;
      process.stdout.write = origWrite;
    }
  });
});
