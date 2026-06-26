import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { separator, clearStreamedText, StreamFilter, stripCodeFences, getActiveTheme, setTheme, getThemesList } from "../src/ui/theme.js";
import { createSpinner } from "../src/ui/spinner.js";
import { routePrompt } from "../src/ai/router.js";
import { getModeByName, MODES } from "../src/modes.js";

const originalFetch = globalThis.fetch;

test("Cyberpunk UX and Streaming Suite", async (t) => {
  let fetchCalls = [];

  beforeEach(() => {
    fetchCalls = [];
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  await t.test("createSpinner should return custom frames and 80ms interval", () => {
    const spinner = createSpinner("Loading");
    assert.strictEqual(spinner.color, "cyan");
    assert.deepEqual(spinner.spinner, {
      interval: 80,
      frames: ["▖", "▘", "▝", "▗"]
    });
  });

  await t.test("separator should adjust length dynamically based on terminal width", () => {
    const originalColumns = process.stdout.columns;
    
    // Mock columns
    Object.defineProperty(process.stdout, "columns", {
      value: 100,
      configurable: true,
    });

    const sep = separator("─");
    // Should be process.stdout.columns - 4 = 96
    assert.strictEqual(sep.length, separator("─", 96).length);

    // Reset columns definition
    if (originalColumns === undefined) {
      delete process.stdout.columns;
    } else {
      Object.defineProperty(process.stdout, "columns", {
        value: originalColumns,
        configurable: true,
      });
    }
  });

  await t.test("routePrompt calls callOpenAICompatible and streams tokens", async () => {
    globalThis.fetch = async (url, options) => {
      fetchCalls.push({ url, options });
      
      const encoder = new TextEncoder();
      const chunks = [
        'data: {"choices":[{"delta":{"content":"Hello"}}]}\n',
        'data: {"choices":[{"delta":{"content":" Cyberpunk"}}]}\n',
        'data: {"choices":[{"delta":{"content":" World"}}]}\n',
        'data: [DONE]\n'
      ];

      const mockStream = new ReadableStream({
        start(controller) {
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk));
          }
          controller.close();
        }
      });

      return {
        ok: true,
        body: mockStream,
        json: async () => ({
          choices: [{ message: { content: "Hello Cyberpunk World" } }],
        }),
      };
    };

    const config = {
      GROQ_API_KEY: "groq-stream-key",
    };

    let receivedTokens = [];
    const onToken = (token) => {
      receivedTokens.push(token);
    };

    const result = await routePrompt("Hello", "System prompt", config, onToken);

    assert.strictEqual(result.provider, "groq");
    assert.strictEqual(result.text, "Hello Cyberpunk World");
    assert.deepEqual(receivedTokens, ["Hello", " Cyberpunk", " World"]);
    assert.strictEqual(fetchCalls.length, 1);
    
    // Verify options body has stream: true
    const sentBody = JSON.parse(fetchCalls[0].options.body);
    assert.strictEqual(sentBody.stream, true);
  });

  await t.test("Theme switching functions manage state correctly", () => {
    // 1. Initial active theme should be cyberpunk
    assert.strictEqual(getActiveTheme(), "cyberpunk");

    // 2. Switch to matrix
    const success = setTheme("matrix");
    assert.strictEqual(success, true);
    assert.strictEqual(getActiveTheme(), "matrix");

    // 3. Switch to invalid theme should return false and not change theme
    const fail = setTheme("nonexistent-theme");
    assert.strictEqual(fail, false);
    assert.strictEqual(getActiveTheme(), "matrix");

    // 4. Get all themes list
    const list = getThemesList();
    assert.ok(list.includes("cyberpunk"));
    assert.ok(list.includes("matrix"));
    assert.ok(list.includes("synthwave"));
    assert.ok(list.includes("crimson"));

    // Reset back to cyberpunk
    setTheme("cyberpunk");
  });

  await t.test("Reasoning modes should be loaded correctly including codex and cloude-code", () => {
    const synthesis = getModeByName("synthesis");
    assert.strictEqual(synthesis.name, "synthesis");

    const codex = getModeByName("codex");
    assert.strictEqual(codex.name, "codex");
    assert.ok(codex.systemPrompt.includes("OpenAI Codex mode"));

    const cloudeCode = getModeByName("cloude-code");
    assert.strictEqual(cloudeCode.name, "cloude-code");
    assert.ok(cloudeCode.systemPrompt.includes("Claude Code mode"));

    const claudeCode = getModeByName("claude-code");
    assert.strictEqual(claudeCode.name, "cloude-code");

    const caseCheck = getModeByName("  CoDeX  ");
    assert.strictEqual(caseCheck.name, "codex");

    const unknown = getModeByName("nonexistent-mode");
    assert.strictEqual(unknown, null);
  });

  await t.test("StreamFilter should suppress file blocks but output other text", () => {
    let output = "";
    const filter = new StreamFilter((chunk) => {
      output += chunk;
    });

    filter.write("Hello ");
    filter.write("world! [WRITE_");
    filter.write("FILE: test.txt]");
    filter.write("This content is hidden\n");
    filter.write("[END_WRITE] After block");
    filter.flush();

    assert.ok(output.includes("Hello world!"));
    assert.ok(output.includes("After block"));
    assert.ok(output.includes("File creation request: test.txt"));
    assert.ok(!output.includes("This content is hidden"));
  });

  await t.test("stripCodeFences should clean code blocks with backticks", () => {
    const jsBlock = "```javascript\nconsole.log('hi');\n```";
    assert.strictEqual(stripCodeFences(jsBlock), "console.log('hi');");

    const htmlBlock = "```html\n<div>hello</div>\n```";
    assert.strictEqual(stripCodeFences(htmlBlock), "<div>hello</div>");

    const noFenceBlock = "console.log('hi');";
    assert.strictEqual(stripCodeFences(noFenceBlock), "console.log('hi');");
  });
});
