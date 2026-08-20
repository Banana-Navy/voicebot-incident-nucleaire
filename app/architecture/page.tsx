import { PageCta, PageIntro, SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../asset-path";

const flow = [
  ["1", "/icons/nuclear/phone.png", "Entrée télécom", "Réception du test par WebRTC. Une ligne officielle dédiée devra être raccordée avant mise en service.", "WebRTC · ligne à raccorder"],
  ["2", "/icons/nuclear/network.png", "Protection réseau", "Contrôle de l’accès, de la charge et des comportements anormaux avant la conversation.", "Admission · disponibilité"],
  ["3", "/icons/nuclear/audio.png", "Analyse audio", "Transcription du signal et détection de la langue choisie par l’appelant.", "Français · Nederlands · Deutsch"],
  ["4", "/icons/nuclear/ai.png", "Compréhension métier", "Le moteur identifie l’intention dans un périmètre limité par les règles du Voicebot.", "ElevenLabs · règles strictes"],
  ["5", "/icons/nuclear/routing.png", "Décision & routage", "Danger immédiat, information générale, hors périmètre ou absence de donnée officielle actuelle.", "Priorité 112"],
  ["6", "/icons/nuclear/api.png", "Connaissance contrôlée", "La réponse doit provenir d’un contenu officiel approuvé, daté et applicable à la zone concernée.", "Corpus officiel versionné"],
  ["7", "/icons/nuclear/audit.png", "Journalisation & traçabilité", "Versions, tests et décisions techniques restent séparés des consignes opérationnelles.", "Audit · accès limité"],
];

const protections = [
  { num: "01", icon: "/icons/nuclear/network-shield-hq.png", title: "Téléphonie & accès", summary: "Protège le point d’entrée du système.", points: ["Contrôle des connexions entrantes", "Gestion des flux et de la charge", "Limitation des abus", "Isolation du canal vocal"] },
  { num: "02", icon: "/icons/nuclear/conversation-shield-hq.png", title: "Sécurité conversationnelle", summary: "Fonctionne parallèlement au moteur.", points: ["Restrictions conversationnelles", "Protection contre le détournement", "Contrôle des actions autorisées", "Gestion du hors périmètre"] },
  { num: "03", icon: "/icons/nuclear/document-rules-hq.png", title: "Connaissance & règles métier", summary: "Le bot travaille dans un périmètre défini.", points: ["Sources validées comme matière première", "Limites explicites de ce qui peut être dit", "Séparation historique / temps réel", "Validation humaine des consignes"] },
];

const parallel = [
  { icon: "/icons/nuclear/audio.png", title: "Sécurité audio", summary: "Surveille le signal avant qu’une réponse métier soit exécutée.", items: [["Analyse et normalisation", "Contrôle du signal et stabilité audio."], ["Détection voix / bruit", "Différenciation entre parole, silence et perturbation."], ["Détection d’anomalies", "Signaux suspects et comportements audio atypiques."]] },
  { icon: "/icons/nuclear/ai.png", title: "Moteur conversationnel métier", summary: "Comprend et formule une réponse dans les règles autorisées.", items: [["Détection langue & intention", "FR, NL et DE pour ce prototype."], ["Réponse contextualisée", "Contenus officiels et règles de sécurité."], ["Refus explicite", "Aucune consigne actuelle sans donnée validée."]] },
  { icon: "/icons/nuclear/routing.png", title: "Décision & routage", summary: "Applique les priorités avant toute action.", items: [["Évaluation multi-critères", "Contexte, priorité et niveau de risque."], ["Escalade sûre", "Orientation vers le 112 si le danger est immédiat."], ["Traçabilité", "Journalisation des versions et des décisions techniques."]] },
];

const technology = [
  ["/icons/nuclear/phone.png", "Interface vocale WebRTC"],
  ["/icons/nuclear/audio.png", "Traitement audio temps réel"],
  ["/icons/nuclear/ai.png", "Agent vocal ElevenLabs"],
  ["/icons/nuclear/document.png", "Corpus officiel contrôlé"],
  ["/icons/nuclear/shield-check.png", "Règles de sécurité parallèles"],
  ["/icons/nuclear/routing.png", "Orchestration n8n à raccorder"],
  ["/icons/nuclear/api.png", "Supabase à raccorder"],
  ["/icons/nuclear/audit.png", "Journalisation et audit"],
  ["/icons/nuclear/gear.png", "Supervision technique"],
];

export default function Architecture() {
  return <main>
    <SiteHeader active="architecture" />
    <section className="page-hero"><div className="shell page-hero-grid"><div><p className="kicker accent">Architecture &amp; sécurité</p><h1>Un appel.<br />Plusieurs couches de contrôle.</h1><div className="lead"><p>Le Voicebot combine interface vocale, analyse du signal, moteur conversationnel contrôlé et règles déterministes.</p><p>Chaque étape <strong>vérifie la précédente</strong> avant qu’une réponse ne soit autorisée.</p></div></div><ControlDiagram /></div></section>

    <section className="band flow-band"><div className="shell"><PageIntro kicker="Flux opérationnel" title={<>De l’appel à la décision, en sept étapes</>}><p>Chaque étape est un point de contrôle distinct. Aucune ne fait confiance à la précédente sur parole.</p></PageIntro><div className="flow-list">{flow.map(([n, icon, title, text, meta]) => <article className="flow-row" key={n}><b>{n}</b><img src={assetPath(icon)} alt="" /><div><h3>{title}</h3><p>{text}</p></div><small>{meta}</small></article>)}</div></div></section>

    <section className="band band-cream"><div className="shell"><PageIntro kicker="Trois couches de protection" title={<>Chaque couche protège un endroit différent</>}><p>Elles ne se remplacent pas : elles se contrôlent. Une défaillance à un niveau reste visible aux autres.</p></PageIntro><div className="protection-grid stack-mobile">{protections.map((item) => <article className="protection-card" key={item.num}><b>{item.num}</b><img src={assetPath(item.icon)} alt="" /><h3>{item.title}</h3><p>{item.summary}</p><ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></div></section>

    <section className="band parallel-band"><div className="shell"><PageIntro kicker="La différence" title={<>Trois couches travaillent en parallèle</>}><p>Cette architecture limite la dépendance à un seul moteur d’intelligence artificielle et ajoute des garde-fous indépendants.</p></PageIntro><div className="parallel-grid stack-mobile">{parallel.map((item) => <article className="parallel-card" key={item.title}><img src={assetPath(item.icon)} alt="" /><h3>{item.title}</h3><p>{item.summary}</p><dl>{item.items.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></article>)}</div></div></section>

    <section className="band band-sand"><div className="shell"><PageIntro kicker="Périmètre" title={<>Ce que le bot fait, et ce qu’il ne fera pas</>}><p>Ces limites ne sont pas des précautions de langage : ce sont les règles du dispositif.</p></PageIntro><div className="scope-grid"><article className="scope-card"><img className="card-icon" src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><h3>Le bot peut</h3><ul><li>Restituer une consigne officielle approuvée</li><li>Répondre en français, néerlandais ou allemand</li><li>Rappeler la priorité du 112 en cas de danger immédiat</li><li>Expliquer un incident historique documenté</li><li>Dire qu’il ne dispose pas d’une information actuelle validée</li></ul></article><article className="scope-card"><img className="card-icon" src={assetPath("/icons/nuclear/warning.png")} alt="" /><h3>Le bot ne doit pas</h3><ul><li>Établir un diagnostic ou calculer une dose</li><li>Inventer une recommandation locale</li><li>Déclencher une évacuation ou les secours</li><li>Conseiller la prise d’iode de sa propre initiative</li><li>Présenter un fait historique comme une alerte actuelle</li></ul></article></div></div></section>

    <section className="band band-cool"><div className="shell"><PageIntro kicker="Briques technologiques" title={<>Une pile modulaire, interopérable et auditable</>}><p>La liste distingue volontairement ce qui fonctionne dans le prototype et les raccordements encore nécessaires avant un service opérationnel.</p></PageIntro><ul className="tech-grid">{technology.map(([icon, label]) => <li key={label}><img src={assetPath(icon)} alt="" /><span>{label}</span></li>)}</ul></div></section>

    <PageCta />
    <SiteFooter />
  </main>;
}

function ControlDiagram() {
  return <div className="control-diagram"><img className="control-diagram-image" src={assetPath("/architecture-security.png")} alt="Architecture sécurisée en trois couches reliée à la téléphonie, à l’analyse audio, au dialogue et au contrôle de sécurité" /></div>;
}
