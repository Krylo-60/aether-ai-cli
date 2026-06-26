import { test, before, after } from "node:test";
import assert from "node:assert";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join, relative } from "node:path";
import { workspaceSearch, crawlDirectory } from "../src/ai/search.js";

const testDir = join(process.cwd(), "temp-test-home-search");

test("Workspace Search Engine Suite", async (t) => {
  before(async () => {
    await mkdir(testDir, { recursive: true });
    // Write test files
    await writeFile(join(testDir, "file1.txt"), "hello world\nthis is a search test\nbye");
    await writeFile(join(testDir, "file2.js"), "function test() {\n  console.log('hello search');\n}");
    await writeFile(join(testDir, "file3.png"), "binary data matches nothing");
    
    const subDir = join(testDir, "subdir");
    await mkdir(subDir, { recursive: true });
    await writeFile(join(subDir, "file4.txt"), "nested matches here under search term");
  });

  after(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  await t.test("crawlDirectory finds all text files and excludes binaries/ignored folders", () => {
    const files = crawlDirectory(testDir, testDir);
    const relativePaths = files.map((f) => relative(testDir, f).replace(/\\/g, "/"));
    
    assert.ok(relativePaths.includes("file1.txt"));
    assert.ok(relativePaths.includes("file2.js"));
    assert.ok(relativePaths.includes("subdir/file4.txt"));
    // Should exclude png
    assert.strictEqual(relativePaths.includes("file3.png"), false);
  });

  await t.test("workspaceSearch returns matching files, lines, and content", () => {
    const results = workspaceSearch("search", testDir);
    // Should match in file1.txt, file2.js, and subdir/file4.txt
    assert.strictEqual(results.length, 3);
    
    const file1Match = results.find((r) => r.relativePath.replace(/\\/g, "/") === "file1.txt");
    assert.ok(file1Match);
    assert.strictEqual(file1Match.lineNumber, 2);
    assert.strictEqual(file1Match.lineContent, "this is a search test");

    const jsMatch = results.find((r) => r.relativePath.replace(/\\/g, "/") === "file2.js");
    assert.ok(jsMatch);
    assert.strictEqual(jsMatch.lineNumber, 2);
    assert.strictEqual(jsMatch.lineContent, "console.log('hello search');");
  });
});
