import { readFile } from 'node:fs/promises';

if (!process.argv.includes('--confirm-create')) throw new Error('Ajoutez --confirm-create pour autoriser la création distante.');
const apiKey=process.env.ELEVENLABS_API_KEY;
if(!apiKey) throw new Error('ELEVENLABS_API_KEY est absent.');
const headers={'xi-api-key':apiKey,'content-type':'application/json'};
const referenceId='agent_3401kvqnemkfev98yj4xq64tg1xn';
const refResponse=await fetch(`https://api.elevenlabs.io/v1/convai/agents/${referenceId}`,{headers});
if(!refResponse.ok) throw new Error(`Agent de référence inaccessible (${refResponse.status}).`);
const reference=await refResponse.json();
const prompt=await readFile(new URL('../agent/system-prompt.md',import.meta.url),'utf8');
const config=structuredClone(reference.conversation_config);
config.agent.first_message='Bonjour et bienvenue. Goedendag en welkom. Guten Tag und herzlich willkommen. Pour continuer, vous préférez le français, Nederlands oder Deutsch ?';
config.agent.language='fr';
config.agent.disable_first_message_interruptions=false;
config.agent.prompt.prompt=prompt;
config.agent.prompt.llm='claude-sonnet-4-5';
config.agent.prompt.temperature=0;
config.agent.prompt.max_tokens=180;
config.agent.prompt.tools=[];
config.agent.prompt.tool_ids=[];
config.agent.prompt.mcp_server_ids=[];
config.agent.prompt.native_mcp_server_ids=[];
config.agent.prompt.knowledge_base=[];
config.agent.prompt.rag={...(config.agent.prompt.rag??{}),enabled:false,optional_rag_enabled:false};
const built=config.agent.prompt.built_in_tools??{};
config.agent.prompt.built_in_tools={...Object.fromEntries(Object.keys(built).map(k=>[k,null])),language_detection:built.language_detection,end_call:built.end_call};
if(config.agent.prompt.built_in_tools.language_detection){
  config.agent.prompt.built_in_tools.language_detection.description='Dès que le français, le néerlandais ou l’allemand est identifiable, appelle silencieusement cet outil avant tout texte et active respectivement fr, nl ou de. En danger, l’outil reste silencieux puis le premier texte prononcé indique le 112. Pour toute autre langue, ne change pas de langue et demande uniquement : Français, Nederlands oder Deutsch ?';
  config.agent.prompt.built_in_tools.language_detection.pre_tool_speech='off';
}
if(config.agent.prompt.built_in_tools.end_call){config.agent.prompt.built_in_tools.end_call.pre_tool_speech='off';}
const voices={fr:{id:'IpTJxgMFj1wbxpha4zxm',model:'eleven_multilingual_v2'},nl:{id:'Yv0oyZ3obP9foTH7emqG',model:'eleven_flash_v2_5'},de:{id:'FTNCalFNG5bRnkkaP5Ug',model:'eleven_flash_v2_5'}};
config.language_presets={};
for(const [lang,v] of Object.entries(voices)){
  config.language_presets[lang]={overrides:{agent:{language:lang,first_message:config.agent.first_message},tts:{model_id:v.model,voice_id:v.id,stability:.56,similarity_boost:.8,speed:.92}}};
}
config.tts={...config.tts,model_id:voices.fr.model,voice_id:voices.fr.id,speed:.90,stability:.52,similarity_boost:.8,expressive_mode:false};
config.asr.keywords=['nucléaire','radiologique','radioactivité','iode','comprimés d’iode','mise à l’abri','AFCN','BE-Alert','cent douze','Tihange','Doel','Fleurus','Mol','Dessel','nucleair','radioactief','jodium','schuilen','nuklear','radioaktiv','Jodtabletten','français','Nederlands','Vlaams','Deutsch'];
const platform=structuredClone(reference.platform_settings);
platform.archived=false; platform.workspace_overrides={}; platform.data_collection={}; platform.analysis_items={}; delete platform.webhook;
platform.privacy={...platform.privacy,record_voice:true,retention_days:30,delete_audio:false,delete_transcript_and_pii:false,zero_retention_mode:false};
const payload={name:'Incidents nucléaires — Information Belgique',tags:['nuclear','radiological','belgium','trilingual','prototype'],conversation_config:config,platform_settings:platform};
const response=await fetch('https://api.elevenlabs.io/v1/convai/agents/create',{method:'POST',headers,body:JSON.stringify(payload)});
const result=await response.json(); if(!response.ok) throw new Error(`Création refusée (${response.status}): ${JSON.stringify(result)}`);
console.log(JSON.stringify({agent_id:result.agent_id,name:payload.name,languages:Object.keys(config.language_presets),phone_number_attached:false},null,2));
