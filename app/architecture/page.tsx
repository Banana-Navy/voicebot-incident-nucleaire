import { PageCta, PageIntro, SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../asset-path";

const flow = [
  ["1", "/icons/nuclear/phone.png", "Voice channel", "The web demonstration is received through WebRTC. A dedicated official telephone line must be connected before operational use.", "WebRTC · line not connected"],
  ["2", "/icons/nuclear/network.png", "Network protection", "Access, load and abnormal behaviour are controlled before the conversation begins.", "Admission · availability"],
  ["3", "/icons/nuclear/audio.png", "Audio analysis", "The signal is transcribed in English and checked for stable speech input.", "English only"],
  ["4", "/icons/nuclear/ai.png", "Domain understanding", "The engine classifies the caller's purpose inside the voicebot's authorised scope.", "ElevenLabs · strict rules"],
  ["5", "/icons/nuclear/routing.png", "Decision & routing", "The system distinguishes immediate danger, an observable report, an information request and unavailable current data.", "112 takes priority"],
  ["6", "/icons/nuclear/api.png", "Controlled knowledge", "Every current answer must come from approved, dated English content that applies to the stated area.", "Versioned official corpus"],
  ["7", "/icons/nuclear/audit.png", "Logging & traceability", "Versions, tests and technical decisions remain separate from operational instructions.", "Audit · restricted access"],
];

const protections = [
  { num: "01", icon: "/icons/nuclear/network-shield-hq.png", title: "Telephony & access", summary: "Protects the system entry point.", points: ["Incoming connection control", "Traffic and load management", "Abuse limitation", "Voice-channel isolation"] },
  { num: "02", icon: "/icons/nuclear/conversation-shield-hq.png", title: "Conversational safety", summary: "Operates in parallel with the engine.", points: ["Conversation restrictions", "Prompt-manipulation resistance", "Authorised-action control", "Out-of-scope handling"] },
  { num: "03", icon: "/icons/nuclear/document-rules-hq.png", title: "Knowledge & domain rules", summary: "Keeps the voicebot within a defined scope.", points: ["Validated sources as primary material", "Explicit limits on permitted statements", "Separation of historical and current data", "Human approval of safety instructions"] },
];

const parallel = [
  { icon: "/icons/nuclear/parallel-audio-hq.png", title: "Audio safety", summary: "Monitors the signal before a domain response is executed.", items: [["Analysis and normalisation", "Signal control and audio stability."], ["Speech and noise detection", "Distinguishes speech, silence and interference."], ["Anomaly detection", "Flags suspicious signals and atypical audio behaviour."]] },
  { icon: "/icons/nuclear/parallel-ai-hq.png", title: "Domain conversation engine", summary: "Understands the request and formulates an authorised English response.", items: [["Intent detection", "Incident report or information request."], ["Contextual response", "Official content and safety rules."], ["Explicit refusal", "No current instruction without validated data."]] },
  { icon: "/icons/nuclear/parallel-routing-hq.png", title: "Decision & routing", summary: "Applies safety priorities before any action.", items: [["Multi-criteria assessment", "Context, priority and level of risk."], ["Safe escalation", "Directs immediate danger to 112."], ["Traceability", "Logs versions and technical decisions."]] },
];

const technology = [
  ["/icons/nuclear/phone.png", "WebRTC voice interface"],
  ["/icons/nuclear/audio.png", "Real-time audio processing"],
  ["/icons/nuclear/ai.png", "ElevenLabs voice agent"],
  ["/icons/nuclear/document.png", "Controlled official corpus"],
  ["/icons/nuclear/shield-check.png", "Parallel safety rules"],
  ["/icons/nuclear/routing.png", "n8n orchestration to be connected"],
  ["/icons/nuclear/api.png", "Supabase to be connected"],
  ["/icons/nuclear/audit.png", "Logging and audit"],
  ["/icons/nuclear/gear.png", "Technical supervision"],
];

export default function Architecture() {
  return <main>
    <SiteHeader active="architecture" />
    <section className="page-hero"><div className="shell page-hero-grid"><div><p className="kicker accent">Architecture &amp; security</p><h1>One call.<br />Multiple control layers.</h1><div className="lead"><p>The voicebot combines a voice interface, signal analysis, a controlled conversation engine and deterministic rules.</p><p>Each stage <strong>checks the previous one</strong> before a response is authorised.</p></div></div><ControlDiagram /></div></section>

    <section className="band flow-band"><div className="shell"><PageIntro kicker="Operational flow" title={<>From call to decision in seven stages</>}><p>Each stage is a separate control point. No stage accepts the previous output without verification.</p></PageIntro><div className="flow-list">{flow.map(([n, icon, title, text, meta]) => <article className="flow-row" key={n}><b>{n}</b><img src={assetPath(icon)} alt="" /><div><h3>{title}</h3><p>{text}</p></div><small>{meta}</small></article>)}</div></div></section>

    <section className="band band-cream"><div className="shell"><PageIntro kicker="Three protection layers" title={<>Each layer protects a different point</>}><p>The layers do not replace one another: they cross-check one another. A failure at one level remains visible to the others.</p></PageIntro><div className="protection-grid stack-mobile">{protections.map((item) => <article className="protection-card" key={item.num}><b>{item.num}</b><img src={assetPath(item.icon)} alt="" /><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></div></section>

    <section className="band parallel-band"><div className="shell"><PageIntro kicker="The difference" title={<>Three layers work in parallel</>}><p>This architecture limits dependence on a single AI engine and adds independent safeguards.</p></PageIntro><div className="parallel-grid stack-mobile">{parallel.map((item) => <article className="parallel-card" key={item.title}><img src={assetPath(item.icon)} alt="" /><h3>{item.title}</h3><p>{item.summary}</p><dl>{item.items.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></article>)}</div></div></section>

    <section className="band band-sand"><div className="shell"><PageIntro kicker="Scope" title={<>What the voicebot does—and will not do</>}><p>These limits are not cautious wording. They are operating rules.</p></PageIntro><div className="scope-grid"><article className="scope-card"><img className="card-icon" src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><h3>The voicebot can</h3><ul><li>Deliver an approved official English instruction</li><li>Distinguish an observed report from an information request</li><li>State that 112 takes priority in immediate danger</li><li>Explain a documented historical incident</li><li>Say that verified current information is unavailable</li></ul></article><article className="scope-card"><img className="card-icon" src={assetPath("/icons/nuclear/warning.png")} alt="" /><h3>The voicebot must not</h3><ul><li>Diagnose a condition or calculate a dose</li><li>Invent a local recommendation</li><li>Order an evacuation or contact emergency services</li><li>Recommend iodine on its own initiative</li><li>Present a historical event as a current alert</li></ul></article></div></div></section>

    <section className="band band-cool"><div className="shell"><PageIntro kicker="Technology components" title={<>A modular, interoperable and auditable stack</>}><p>The list deliberately distinguishes what runs in the prototype from the connections still required for an operational service.</p></PageIntro><ul className="tech-grid">{technology.map(([icon, label]) => <li key={label}><img src={assetPath(icon)} alt="" /><span>{label}</span></li>)}</ul></div></section>

    <PageCta />
    <SiteFooter />
  </main>;
}

function ControlDiagram() {
  return <div className="control-diagram"><img className="control-diagram-image" src={assetPath("/architecture-security.png")} alt="Three-layer secure architecture connected to telephony, audio analysis, dialogue and safety control" /></div>;
}
