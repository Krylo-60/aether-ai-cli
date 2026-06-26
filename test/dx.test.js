import { test } from "node:test";
import assert from "node:assert";
import { isValidConfigKey } from "../src/config.js";

test("Developer Experience (DX) Commands Suite", async (t) => {
  await t.test("isValidConfigKey whitelists DIAGNOSE_CMD correctly", () => {
    assert.strictEqual(isValidConfigKey("DIAGNOSE_CMD"), true);
    assert.strictEqual(isValidConfigKey("diagnose_cmd"), true);
  });
});
