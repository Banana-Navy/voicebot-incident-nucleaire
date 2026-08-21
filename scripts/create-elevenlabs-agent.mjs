import { readFile } from "node:fs/promises";

if (!process.argv.includes("--confirm-create")) {
  throw new Error("Add --confirm-create to authorise remote agent creation.");
}

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY is missing.");

const headers = { "xi-api-key": apiKey, "content-type": "application/json" };
const referenceId = "agent_5601m0fmedq1eneatyp2m305thfr";
const firstMessage = "Hello, and welcome. You are speaking with the Belgian Nuclear and Radiological Incident Information Voicebot. I provide general information based on official sources. If anyone is in immediate danger, call 112 now. How can I help you today?";
const voice = { id: "HKFOb9iktHA85uKXydRT", model: "eleven_v3_conversational" };

const refResponse = await fetch(`https://api.elevenlabs.io/v1/convai/agents/${referenceId}`, { headers });
if (!refResponse.ok) throw new Error(`Reference agent is unavailable (${refResponse.status}).`);

const reference = await refResponse.json();
const prompt = await readFile(new URL("../agent/system-prompt.md", import.meta.url), "utf8");
const config = structuredClone(reference.conversation_config);
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
config.tts = {
  ...config.tts,
  model_id: voice.model,
  voice_id: voice.id,
  speed: 1.03,
  stability: 0.5,
  similarity_boost: 0.8,
  expressive_mode: true,
  suggested_audio_tags: [
    { tag: "confident", description: "Use for clear official guidance and decisive instructions." },
    { tag: "engaging", description: "Use subtly for the welcome and general information; never sound theatrical." },
  ],
  supported_voices: [],
};
config.asr.keywords = ["nuclear", "radiological", "radioactivity", "radiation", "iodine tablets", "shelter in place", "BE-Alert", "FANC", "Crisis Center", "112", "Tihange", "Doel", "Fleurus", "Mol", "Dessel", "contamination", "evacuation"];

const platform = structuredClone(reference.platform_settings);
platform.archived = false;
platform.workspace_overrides = {};
platform.data_collection = {};
platform.analysis_items = {};
delete platform.webhook;
platform.privacy = { ...platform.privacy, record_voice: true, retention_days: 30, delete_audio: false, delete_transcript_and_pii: false, zero_retention_mode: false };

const payload = {
  name: "Belgian Nuclear Incident Information — English",
  tags: ["nuclear", "radiological", "belgium", "english-only", "prototype"],
  conversation_config: config,
  platform_settings: platform,
};

const response = await fetch("https://api.elevenlabs.io/v1/convai/agents/create", { method: "POST", headers, body: JSON.stringify(payload) });
const result = await response.json();
if (!response.ok) throw new Error(`Creation was rejected (${response.status}): ${JSON.stringify(result)}`);

console.log(JSON.stringify({ agent_id: result.agent_id, name: payload.name, language: "en", voice_id: voice.id, phone_number_attached: false }, null, 2));
