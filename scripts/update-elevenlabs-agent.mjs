import { readFile } from "node:fs/promises";

if (!process.argv.includes("--confirm-update")) {
  throw new Error("Add --confirm-update to authorise the remote agent update.");
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY is missing.");

const agentId = "agent_5601m0fmedq1eneatyp2m305thfr";
const headers = { "xi-api-key": apiKey, "content-type": "application/json" };
const firstMessage = "Hello, and welcome. You are speaking with the Belgian Nuclear and Radiological Incident Information Voicebot. I provide general information based on official sources. If anyone is in immediate danger, call 112 now. How can I help you today?";
const voice = { id: "onwK4e9ZLuTAKqWW03F9", model: "eleven_flash_v2" };

const currentResponse = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, { headers });
if (!currentResponse.ok) throw new Error(`Active agent is unavailable (${currentResponse.status}).`);

const current = await currentResponse.json();
const prompt = await readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8");
const config = structuredClone(current.conversation_config);
const endCallTool = (config.agent.prompt.tools ?? []).find((tool) => tool.type === "system" && tool.name === "end_call") ?? {
  type: "system",
  name: "end_call",
  description: "End the call only after the caller has finished and the agent has said: Thank you for calling.",
};

config.agent.first_message = firstMessage;
config.agent.language = "en";
config.agent.disable_first_message_interruptions = false;
config.agent.prompt.prompt = prompt;
config.agent.prompt.llm = "claude-sonnet-4-5";
config.agent.prompt.temperature = 0;
config.agent.prompt.max_tokens = 220;
config.agent.prompt.tools = [endCallTool];
config.agent.prompt.tool_ids = [];
config.agent.prompt.mcp_server_ids = [];
config.agent.prompt.native_mcp_server_ids = [];
config.agent.prompt.knowledge_base = [];
config.agent.prompt.rag = { ...(config.agent.prompt.rag ?? {}), enabled: false, optional_rag_enabled: false };
config.agent.prompt.built_in_tools = Object.fromEntries(Object.keys(config.agent.prompt.built_in_tools ?? {}).map((key) => [key, null]));
config.language_presets = {};
config.tts = { ...config.tts, model_id: voice.model, voice_id: voice.id, speed: 0.92, stability: 0.58, similarity_boost: 0.8, expressive_mode: false, supported_voices: [] };
config.asr.keywords = ["nuclear", "radiological", "radioactivity", "radiation", "iodine tablets", "shelter in place", "BE-Alert", "FANC", "Crisis Center", "112", "Tihange", "Doel", "Fleurus", "Mol", "Dessel", "contamination", "evacuation"];

const payload = {
  name: "Belgian Nuclear Incident Information — English",
  tags: ["nuclear", "radiological", "belgium", "english-only", "prototype"],
  conversation_config: config,
  version_description: "English-only operational rewrite with formal, informative and assertive safety guidance.",
};

const response = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, { method: "PATCH", headers, body: JSON.stringify(payload) });
const result = await response.json();
if (!response.ok) throw new Error(`Update was rejected (${response.status}): ${JSON.stringify(result)}`);

console.log(JSON.stringify({ agent_id: agentId, name: payload.name, language: "en", voice_id: voice.id, language_presets: 0 }, null, 2));
