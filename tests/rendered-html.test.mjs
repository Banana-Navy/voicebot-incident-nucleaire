import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pages=["app/page.tsx","app/sources/page.tsx","app/incidents/page.tsx","app/architecture/page.tsx","agent/system-prompt.md"];
test("critical public safety wording is present",async()=>{
  const html=(await Promise.all(pages.map(p=>readFile(new URL(`../${p}`,import.meta.url),"utf8")))).join("\n");
  assert.match(html,/112/);
  assert.match(html,/jamais de votre propre initiative/i);
  assert.match(html,/AFCN/);
  assert.doesNotMatch(html,/incident en cours confirmé/i);
});
