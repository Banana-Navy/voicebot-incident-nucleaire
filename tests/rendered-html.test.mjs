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

test("the reserved active tool is nuclear-scoped without changing its automation type", async () => {
  const files = ["agent/system-prompt.md", "scripts/create-elevenlabs-agent.mjs", "scripts/update-elevenlabs-agent.mjs", "config/elevenlabs-agent.json"];
  const text = (await Promise.all(files.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /name:\s*["']end_call["']/);
  assert.match(text, /Nuclear voicebot/);
  assert.match(text, /system_tool_type:\s*["']end_call["']/);
  assert.doesNotMatch(text, /Nuclear_end_call/);
  assert.doesNotMatch(text, /log_call_end/);
});

test("the verified voicebot demo number is consistently published", async () => {
  const files = ["app/page.tsx", "app/site-chrome.tsx", "app/architecture/page.tsx", "config/elevenlabs-agent.json", "README.md"];
  const text = (await Promise.all(files.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /\+32 71 49 61 80/);
  assert.match(text, /\+3271496180/);
  assert.match(text, /"phone_number_attached": true/);
  assert.doesNotMatch(text, /line not connected|has no attached telephone number/i);
});

test("voice delivery stays brisk, assertive and controlled", async () => {
  const files = ["agent/system-prompt.md", "scripts/create-elevenlabs-agent.mjs", "scripts/update-elevenlabs-agent.mjs", "config/elevenlabs-agent.json"];
  const text = (await Promise.all(files.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /speed:\s*1\.08/);
  assert.match(text, /"speed": 1\.08/);
  assert.match(text, /brisk, purposeful pace/i);
  assert.match(text, /authoritative, composed and alert/i);
  assert.match(text, /stability:\s*0\.44/);
  assert.match(text, /"stability": 0\.44/);
  assert.match(text, /Never sound soft, breathy, hesitant/i);
  assert.match(text, /8Ln42OXYupYsag45MAUy/);
});

test("the opening routes the caller without implying an official report was submitted", async () => {
  const files = ["agent/system-prompt.md", "scripts/create-elevenlabs-agent.mjs", "scripts/update-elevenlabs-agent.mjs"];
  const text = (await Promise.all(files.map((path) => readFile(new URL(`../${path}`, import.meta.url), "utf8")))).join("\n");
  assert.match(text, /Are you calling about something happening now, or do you want general guidance on what to do if an incident occurs\?/);
  assert.match(text, /cannot transmit an official incident report/i);
});
