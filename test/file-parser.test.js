import { test, before, after } from "node:test";
import assert from "node:assert";
import { join } from "node:path";
import { writeFile, mkdir, rm } from "node:fs/promises";
import { parseFile, formatContext } from "../src/file-parser.js";

const tempDir = join(process.cwd(), "temp-test-files");

test("File Parser & Context Suite", async (t) => {
  before(async () => {
    await mkdir(tempDir, { recursive: true });
  });

  after(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  await t.test("parseFile parses a standard .txt file successfully", async () => {
    const filePath = join(tempDir, "test.txt");
    const content = "Hello World Krims Code AI";
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(filePath);
    assert.strictEqual(parsed.name, "test.txt");
    assert.strictEqual(parsed.content, content);
    assert.strictEqual(parsed.extension, ".txt");
    assert.strictEqual(parsed.size, Buffer.byteLength(content));
  });

  await t.test("parseFile parses a code .js file successfully", async () => {
    const filePath = join(tempDir, "test.js");
    const content = "const x = 42;\nconsole.log(x);";
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(filePath);
    assert.strictEqual(parsed.name, "test.js");
    assert.strictEqual(parsed.content, content);
    assert.strictEqual(parsed.extension, ".js");
  });

  await t.test("parseFile parses a .json file successfully", async () => {
    const filePath = join(tempDir, "test.json");
    const content = '{\n  "cyberpunk": "active"\n}';
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(filePath);
    assert.strictEqual(parsed.name, "test.json");
    assert.strictEqual(parsed.content, content.trim());
    assert.strictEqual(parsed.extension, ".json");
  });

  await t.test("parseFile parses a .csv file successfully", async () => {
    const filePath = join(tempDir, "test.csv");
    const content = "id,name\n1,KRIMS CODE\n2,krylo";
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(filePath);
    assert.strictEqual(parsed.name, "test.csv");
    assert.strictEqual(parsed.content, content);
    assert.strictEqual(parsed.extension, ".csv");
  });

  await t.test("parseFile truncates content exceeding 30,000 characters", async () => {
    const filePath = join(tempDir, "large.txt");
    const longContent = "A".repeat(35000);
    await writeFile(filePath, longContent, "utf-8");

    const parsed = await parseFile(filePath);
    assert.strictEqual(parsed.name, "large.txt");
    
    const expectedPrefix = "A".repeat(30000);
    const expectedTruncationSuffix = "\n\n[... truncated at 30,000 characters]";
    assert.strictEqual(parsed.content, expectedPrefix + expectedTruncationSuffix);
  });

  await t.test("parseFile throws error on unsupported extension", async () => {
    const filePath = join(tempDir, "test.xyz");
    await writeFile(filePath, "some content", "utf-8");

    await assert.rejects(
      parseFile(filePath),
      /Unsupported file type: "\.xyz"/
    );
  });

  await t.test("parseFile throws error when file does not exist", async () => {
    const nonExistentPath = join(tempDir, "does-not-exist.txt");
    await assert.rejects(
      parseFile(nonExistentPath),
      /File not found:/
    );
  });

  await t.test("parseFile throws error on directory path without supported extension", async () => {
    await assert.rejects(
      parseFile(tempDir),
      /Unsupported file type:/
    );
  });

  await t.test("parseFile throws error on directory path with supported extension", async () => {
    const dirWithExt = join(tempDir, "test-dir.js");
    await mkdir(dirWithExt, { recursive: true });
    await assert.rejects(
      parseFile(dirWithExt),
      /Not a file:/
    );
  });

  await t.test("formatContext returns formatted template string", () => {
    const fileData = {
      name: "test.txt",
      content: "Hello from inside the file.",
      size: 27,
      extension: ".txt",
    };

    const formatted = formatContext(fileData);
    const expectedLines = [
      "[Context File: test.txt (27B, .txt)]",
      "---",
      "Hello from inside the file.",
      "---",
      "[End of test.txt]",
    ];
    assert.strictEqual(formatted, expectedLines.join("\n"));
  });

  await t.test("formatContext formats KB/MB file sizes correctly", () => {
    const dataKb = { name: "kb.txt", content: "", size: 1536, extension: ".txt" };
    assert.ok(formatContext(dataKb).includes("(1.5KB, .txt)"));

    const dataMb = { name: "mb.txt", content: "", size: 1048576 * 2.5, extension: ".txt" };
    assert.ok(formatContext(dataMb).includes("(2.5MB, .txt)"));
  });

  await t.test("parseFile parses a file with a specific line range (e.g. :2-4) successfully", async () => {
    const filePath = join(tempDir, "range.txt");
    const content = "line 1\nline 2\nline 3\nline 4\nline 5";
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(`${filePath}:2-4`);
    assert.strictEqual(parsed.name, "range.txt:2-4");
    assert.strictEqual(parsed.content, "line 2\nline 3\nline 4");
    assert.strictEqual(parsed.extension, ".txt");
    assert.strictEqual(parsed.size, Buffer.byteLength("line 2\nline 3\nline 4"));
  });

  await t.test("parseFile parses a file with a single line index (e.g. :3) successfully", async () => {
    const filePath = join(tempDir, "single.txt");
    const content = "line 1\nline 2\nline 3\nline 4";
    await writeFile(filePath, content, "utf-8");

    const parsed = await parseFile(`${filePath}:3`);
    assert.strictEqual(parsed.name, "single.txt:3-3");
    assert.strictEqual(parsed.content, "line 3");
    assert.strictEqual(parsed.extension, ".txt");
    assert.strictEqual(parsed.size, Buffer.byteLength("line 3"));
  });
});
