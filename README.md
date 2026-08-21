# Belgian Nuclear Incident Information Voicebot

An English-only voicebot prototype and multi-page information site based on official Belgian, European and international nuclear and radiological emergency guidance.

## Contents

- public landing page, source register, historical incident timeline and architecture pages;
- ElevenLabs system prompt and controlled permanent knowledge;
- Supabase, n8n and MLab target architecture;
- restrictive-by-default SQL migrations;
- English-only remote-agent update tooling.

## Status

The public site and the ElevenLabs agent use the same agent identifier: `agent_5601m0fmedq1eneatyp2m305thfr`. The agent has no attached telephone number and remains a prototype. No production n8n workflow or linked production Supabase project is claimed. Human safety review and a real English conversation transcript remain required before production use.

## Commands

`npm run dev` — local development.

`npm run build` — production build.

`npm test` — build and critical-content controls.

`npm run update:agent -- --confirm-update` — apply the approved English-only configuration to the existing ElevenLabs agent.
