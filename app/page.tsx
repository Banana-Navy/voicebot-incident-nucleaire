"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const AGENT_ID = "agent_5601m0fmedq1eneatyp2m305thfr";

const features = [
  ["01", "Information contrôlée", "Le bot répond depuis une base approuvée et datée. Une donnée actuelle non confirmée est refusée."],
  ["02", "Trois langues natives", "Français, Nederlands et Deutsch avec une voix dédiée après un accueil commun."],
  ["03", "Priorité au 112", "Un danger immédiat, une blessure ou une exposition suspectée interrompent le parcours d’information."],
  ["04", "Disponible sans jargon", "Des phrases courtes, une consigne à la fois et aucune interprétation de carte radiologique."],
  ["05", "Traçable", "Chaque instruction opérationnelle porte sa source, sa validité, sa zone et son approbation humaine."],
];

const officialSteps = [
  ["01", "Rentrez", "Entrez dans le bâtiment le plus proche et restez à l’intérieur."],
  ["02", "Fermez", "Fermez portes et fenêtres. Coupez la ventilation si cela peut être fait sans danger."],
  ["03", "Écoutez", "Suivez BE-Alert, la radio, la télévision et les canaux officiels."],
];

const sources = [
  ["Centre de Crise National", "Préparation et mesures de protection", "https://www.risquenucleaire.be/fr"],
  ["AFCN", "Situations d’urgence et événements INES", "https://afcn.fgov.be/fr/que-devez-vous-faire-en-cas-de-situation-durgence"],
  ["BE-Alert", "Canal officiel d’alerte de la population", "https://www.be-alert.be/fr"],
  ["Commission européenne · EURDEP", "Données radiologiques européennes", "https://remap.jrc.ec.europa.eu/"],
  ["AIEA", "Échelle INES et échanges d’urgence", "https://www.iaea.org/resources/databases/international-nuclear-and-radiological-event-scale"],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [callState, setCallState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const conversation = useRef<{ endSession: () => Promise<void> } | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    reveals.forEach((node, index) => { node.style.setProperty("--delay", `${Math.min(index % 5, 4) * 75}ms`); observer.observe(node); });

    const hero = document.querySelector<HTMLElement>(".hero-art");
    const clouds = document.querySelector<HTMLElement>(".hero-clouds");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight * 1.2);
        hero?.style.setProperty("--parallax-y", `${y * 0.11}px`);
        clouds?.style.setProperty("--cloud-y", `${y * -0.07}px`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  async function startCall() {
    setPanelOpen(true); setCallState("connecting");
    try {
      const { Conversation } = await import("@elevenlabs/client");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const session = await Conversation.startSession({ agentId: AGENT_ID, onConnect: () => setCallState("connected"), onDisconnect: () => setCallState("idle"), onError: () => setCallState("error") });
      conversation.current = session;
    } catch { setCallState("error"); }
  }

  async function endCall() { await conversation.current?.endSession(); conversation.current = null; setCallState("idle"); setPanelOpen(false); }

  return <main>
    <div className="prototype-bar">Prototype d’information — en danger immédiat, appelez le <strong>112</strong></div>
    <header className="site-header">
      <a className="brand" href="#top"><span className="brand-symbol"><i/><i/><i/></span><span><b>VOICEBOT</b><em>INCIDENT NUCLÉAIRE</em></span></a>
      <nav className={menuOpen ? "open" : ""} aria-label="Navigation principale">
        <a href="#top">Accueil</a><a href="#fonctionnalites">Fonctionnalités</a><a href="#consignes">Consignes</a><a href="#architecture">Architecture</a><a href="#sources">Sources</a>
      </nav>
      <button className="call-button header-call" onClick={startCall}><span>●</span> Tester le bot</button>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu"><i/><i/></button>
    </header>

    <section id="top" className="hero">
      <picture><source media="(max-width: 700px)" srcSet="/nuclear-hero-mobile.png"/><img className="hero-art" src="/nuclear-hero-desktop.png" alt="Illustration low-poly d’un site nucléaire générique, sans incident en cours"/></picture>
      <div className="hero-clouds" aria-hidden="true"/>
      <div className="hero-shade"/>
      <div className="hero-content">
        <p className="eyebrow">INFORMATION NUCLÉAIRE · BELGIQUE</p>
        <h1>UNE VOIX FIABLE<br/>POUR VOUS GUIDER<br/><span>EN CAS D’INCIDENT</span></h1>
        <p className="hero-lead">Un assistant vocal trilingue qui restitue les consignes officielles, sans rumeur, sans diagnostic et sans invention.</p>
        <div className="hero-chips"><span><b>◖◗</b>Information contrôlée</span><span><b>✓</b>Consignes officielles</span><span><b>FR</b>Accessible en trois langues</span></div>
        <div className="hero-actions"><button className="call-button" onClick={startCall}>Tester le voicebot <b>→</b></button><a href="#consignes">Voir les consignes <b>↓</b></a></div>
      </div>
      <div className="scroll-note">Faire défiler <span>↓</span></div>
    </section>

    <section id="fonctionnalites" className="section shell">
      <Heading eyebrow="LE SERVICE" title={<>Une ligne claire quand<br/>l’information déborde.</>} text="Le voicebot ne décide pas à la place des autorités. Il rend une information validée immédiatement compréhensible, dans la langue de l’appelant."/>
      <div className="feature-bento bento-stack">
        {features.map(([n,t,d],i) => <article key={n} className={`bento-card feature-${i+1}`} data-reveal><div className="bento-number">{n}</div><div className="bento-pictogram" aria-hidden="true">{["◎","言","112","◌","✓"][i]}</div><h3>{t}</h3><p>{d}</p></article>)}
      </div>
    </section>

    <section id="consignes" className="section safety-section">
      <div className="shell"><Heading eyebrow="LE RÉFLEXE OFFICIEL" title={<>Rentrez. Fermez.<br/>Écoutez.</>} text="La mise à l’abri est la mesure générale prioritaire. Les autorités déterminent ensuite les mesures adaptées à la situation réelle." light/>
        <div className="steps-bento bento-stack">{officialSteps.map(([n,t,d]) => <article key={n} className="bento-card" data-reveal><b>{n}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
        <aside className="iodine-card" data-reveal><div className="iodine-mark">I</div><div><p className="eyebrow">COMPRIMÉS D’IODE</p><h3>Jamais de votre propre initiative.</h3><p>Ils protègent uniquement la thyroïde contre l’iode radioactif. Ils ne remplacent pas la mise à l’abri et se prennent seulement sur instruction explicite des autorités.</p></div><a href="https://www.risquenucleaire.be/fr/comprimes-diode" target="_blank" rel="noreferrer">Consulter la source ↗</a></aside>
      </div>
    </section>

    <section id="architecture" className="section shell">
      <Heading eyebrow="COMMENT ÇA FONCTIONNE" title={<>Le modèle parle.<br/>La donnée décide.</>} text="Une chaîne conçue pour empêcher une réponse générative de devenir une instruction opérationnelle sans validation."/>
      <div className="architecture-bento bento-stack">
        <article className="bento-card arch-main" data-reveal><p className="eyebrow">PARCOURS D’UN APPEL</p><div className="flow"><span>APPEL</span><i>→</i><span>LANGUE</span><i>→</i><span>INTENTION</span><i>→</i><span>SOURCE</span><i>→</i><span>RÉPONSE</span></div><h3>La sécurité reste prioritaire à chaque étape.</h3></article>
        <article className="bento-card" data-reveal><div className="bento-pictogram">AI</div><h3>Agent vocal</h3><p>Dialogue, voix natives et règles de sécurité.</p></article>
        <article className="bento-card" data-reveal><div className="bento-pictogram">DB</div><h3>Supabase</h3><p>Consignes versionnées, portée, validité et audit.</p></article>
        <article className="bento-card" data-reveal><div className="bento-pictogram">↻</div><h3>n8n</h3><p>Collecte, contrôles et validation humaine avant publication.</p></article>
      </div>
      <Link className="inline-link" href="/architecture">Voir l’architecture détaillée →</Link>
    </section>

    <section className="section incidents-section"><div className="shell"><Heading eyebrow="MÉMOIRE & PRÉPARATION" title={<>Les incidents passés<br/>expliqués sans confusion.</>} text="L’histoire permet de comprendre l’utilité du service. Elle ne devient jamais une alerte actuelle." light/>
      <div className="incident-bento bento-stack"><article className="bento-card" data-reveal><time>2006</time><h3>Sterigenics · Fleurus</h3><p>Accident d’irradiation d’un travailleur · INES quatre.</p></article><article className="bento-card" data-reveal><time>2008</time><h3>IRE · Fleurus</h3><p>Rejet anormal d’iode radioactif · INES trois.</p></article><article className="bento-card" data-reveal><time>1986 · 2011</time><h3>Tchernobyl · Fukushima</h3><p>Deux accidents majeurs documentés par l’AFCN et l’AIEA.</p></article></div>
      <Link className="inline-link light-link" href="/incidents">Voir la chronologie officielle →</Link>
    </div></section>

    <section id="sources" className="section shell sources-section"><Heading eyebrow="PAS DE FAQ · DES PREUVES" title={<>Les sources officielles,<br/>directement accessibles.</>} text="Chaque organisme est relié à sa publication d’origine. La page Sources détaille le référentiel complet et la règle de validation."/>
      <div className="source-bento bento-stack">{sources.map(([name,desc,url],i)=><a className="bento-card" data-reveal href={url} target="_blank" rel="noreferrer" key={url}><span>0{i+1}</span><div><h3>{name}</h3><p>{desc}</p></div><b>↗</b></a>)}</div>
      <Link className="inline-link" href="/sources">Voir toutes les sources et la méthode →</Link>
    </section>

    <section className="final-cta"><div className="shell" data-reveal><p className="eyebrow">PROTOTYPE TRILINGUE</p><h2>Écoutez la ligne<br/>avant d’en avoir besoin.</h2><button className="call-button" onClick={startCall}>Tester le voicebot <b>→</b></button><p>Ce test ne contacte pas les secours. En danger immédiat : 112.</p></div></section>
    <footer><div className="shell"><a className="brand" href="#top"><span className="brand-symbol"><i/><i/><i/></span><span><b>VOICEBOT</b><em>INCIDENT NUCLÉAIRE</em></span></a><p>Prototype d’information publique · Belgique</p><div><Link href="/sources">Sources</Link><Link href="/incidents">Incidents</Link><Link href="/architecture">Architecture</Link></div></div></footer>

    {panelOpen && <div className="call-panel" role="dialog" aria-modal="true" aria-label="Test du voicebot"><button className="panel-backdrop" onClick={endCall} aria-label="Fermer"/><div className="panel-card"><button className="panel-close" onClick={endCall}>×</button><div className={`voice-orb ${callState}`}>{callState === "connected" ? "≈" : "●"}</div><p className="eyebrow">VOICEBOT INCIDENT NUCLÉAIRE</p><h2>{callState === "connecting" ? "Connexion…" : callState === "connected" ? "Je vous écoute" : callState === "error" ? "Connexion indisponible" : "Prêt"}</h2><p>{callState === "error" ? "Vérifiez l’autorisation du microphone puis réessayez." : "Parlez naturellement. Vous pouvez interrompre le bot."}</p>{callState === "error" ? <button className="call-button" onClick={startCall}>Réessayer</button> : <button className="end-button" onClick={endCall}>Terminer le test</button>}<small>Ce test n’est pas une centrale d’urgence.</small></div></div>}
  </main>;
}

function Heading({eyebrow,title,text,light=false}:{eyebrow:string,title:React.ReactNode,text:string,light?:boolean}){return <div className={`section-heading ${light?"light":""}`} data-reveal><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>{text}</p></div>}
