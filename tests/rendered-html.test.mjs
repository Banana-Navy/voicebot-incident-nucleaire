import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const publicSafetyFiles = ["app/page.tsx", "app/sources/page.tsx", "app/incidents/page.tsx", "app/architecture/page.tsx", "agent/system-prompt.md", "knowledge/base-officielle.md"];
const englishOnlyFiles = ["app/page.tsx", "app/architecture/page.tsx", "agent/system-prompt.md", "knowledge/base-officielle.md", "scripts/create-elevenlabs-agent.mjs", "scripts/update-elevenlabs-agent.mjs"];

test("critical public safety wording is present", async () => {
  const text = (await Promise.all(publicSafetyFiles.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /call 112 now/i);
  assert.match(text, /never (recommend )?taking stable iodine tablets/i);
  assert.match(text, /official/i);
  assert.doesNotMatch(text, /confirmed current incident/i);
});

test("agent configuration is English only", async () => {
  const text = (await Promise.all(englishOnlyFiles.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /instruction_en/);
  assert.match(text, /language\s*=\s*["']en["']/);
  assert.doesNotMatch(text, /Bonjour|Goedendag|Nederlands|Deutsch|instruction_fr|instruction_nl|instruction_de/);
});
