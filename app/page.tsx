"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PageIntro, SiteFooter, SiteHeader } from "./site-chrome";
import { assetPath } from "./asset-path";

const AGENT_ID = "agent_5601m0fmedq1eneatyp2m305thfr";

const reflexes = [
  ["/icons/nuclear/shield-check.png", "Rentrez", "Entrez dans le bâtiment le plus proche et restez à l’intérieur."],
  ["/icons/nuclear/gear.png", "Fermez", "Fermez portes et fenêtres. Coupez la ventilation si cela peut être fait sans danger."],
  ["/icons/nuclear/bell.png", "Écoutez", "Suivez BE-Alert, la radio, la télévision et les canaux officiels."],
];

const scenarios = [
  ["/icons/nuclear/toxic-cloud.png", "Nuage toxique / fuite de gaz"],
  ["/icons/nuclear/explosion.png", "Explosion industrielle"],
  ["/icons/nuclear/fire.png", "Incendie industriel"],
  ["/icons/nuclear/pollution.png", "Pollution environnementale"],
  ["/icons/nuclear/evacuation.png", "Évacuation préventive"],
  ["/icons/nuclear/unknown.png", "Situation indéterminée"],
];

const sources = [
  ["Centre de Crise National", "Préparation et mesures de protection", "https://www.risquenucleaire.be/fr"],
  ["AFCN", "Urgences nucléaires et événements INES", "https://afcn.fgov.be/fr/que-devez-vous-faire-en-cas-de-situation-durgence"],
  ["BE-Alert", "Canal officiel d’alerte de la population", "https://www.be-alert.be/fr"],
  ["Commission européenne · EURDEP", "Données radiologiques européennes", "https://remap.jrc.ec.europa.eu/"],
];

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [callState, setCallState] = useState<"idle" | "connecting" | "connected" | "error">("idle");
  const conversation = useRef<{ endSession: () => Promise<void> } | null>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-visible", "true")), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    const heroImage = document.querySelector<HTMLElement>(".hero-background");
    const onScroll = () => heroImage?.style.setProperty("--hero-y", `${Math.min(window.scrollY, 900) * 0.08}px`);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  async function startCall() {
    setPanelOpen(true);
    setCallState("connecting");
    try {
      const { Conversation } = await import("@elevenlabs/client");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      conversation.current = await Conversation.startSession({ agentId: AGENT_ID, onConnect: () => setCallState("connected"), onDisconnect: () => setCallState("idle"), onError: () => setCallState("error") });
    } catch { setCallState("error"); }
  }

  async function endCall() {
    await conversation.current?.endSession();
    conversation.current = null;
    setCallState("idle");
    setPanelOpen(false);
  }

  return <main>
    <div className="safety-strip">Prototype d’information — en danger immédiat, appelez le <strong>112</strong></div>
    <div className="home-stage">
      <SiteHeader active="home" onTest={startCall} transparent />
      <section className="home-hero" id="top">
        <picture><source media="(max-width: 700px)" srcSet={assetPath("/nuclear-hero-mobile.png")} /><img className="hero-background" src={assetPath("/nuclear-hero-desktop.png")} alt="Illustration low-poly d’un site nucléaire générique" /></picture>
        <div className="hero-overlay" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <h1 data-reveal><span>VOICEBOT</span><strong>INCIDENT<br />NUCLÉAIRE</strong></h1>
            <h2>UNE VOIX FIABLE POUR VOUS INFORMER ET VOUS GUIDER</h2>
            <p>Notre assistant vocal restitue des consignes officielles en français, néerlandais et allemand, sans rumeur, sans diagnostic et sans invention.</p>
            <div className="hero-arguments">
              <article><img src={assetPath("/icons/nuclear/audio.png")} alt="" /><span>Information<br />contrôlée</span></article>
              <article><img src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><span>Consignes<br />officielles</span></article>
              <article><img src={assetPath("/icons/nuclear/people.png")} alt="" /><span>Trois langues<br />accessibles</span></article>
            </div>
            <div className="hero-actions" id="tester"><button className="button button-primary button-large" onClick={startCall}><img src={assetPath("/icons/nuclear/phone.png")} alt="" />Tester le Voicebot</button><a className="text-link" href="#consignes">Comment ça fonctionne</a></div>
          </div>
        </div>
        <div className="hero-trust shell"><img src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><span>Ce test ne contacte pas les secours. En danger immédiat : 112.</span></div>
      </section>
    </div>

    <section className="band band-sand" id="consignes">
      <div className="shell"><PageIntro kicker="Le réflexe officiel" title={<>Rentrez. Fermez. Écoutez.</>}><p>La mise à l’abri est la mesure générale prioritaire. Les autorités déterminent ensuite les mesures adaptées à la situation réelle.</p></PageIntro>
        <div className="three-card-grid stack-mobile">{reflexes.map(([icon, title, text]) => <article className="content-card" data-reveal key={title}><img className="card-icon" src={assetPath(icon)} alt="" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="official-note" data-reveal><img src={assetPath("/icons/nuclear/warning.png")} alt="" /><div><h3>Comprimés d’iode : jamais de votre propre initiative.</h3><p>Ils protègent uniquement la thyroïde contre l’iode radioactif. Ils ne remplacent pas la mise à l’abri et se prennent seulement sur instruction explicite des autorités.</p></div><a href="https://www.risquenucleaire.be/fr/comprimes-diode" target="_blank" rel="noreferrer">Consulter la source officielle</a></aside>
      </div>
    </section>

    <section className="band band-cool">
      <div className="shell"><PageIntro kicker="Scénarios du Voicebot" title={<>Un vocabulaire visuel cohérent.</>}><p>Ces catégories structurent le dialogue. Elles ne constituent ni un diagnostic de l’événement ni une alerte actuelle.</p></PageIntro>
        <div className="scenario-grid stack-mobile">{scenarios.map(([icon, label]) => <article className="scenario-card" data-reveal key={label}><img src={assetPath(icon)} alt="" /><h3>{label}</h3></article>)}</div>
        <div className="center-link"><Link className="text-link" href="/architecture">Voir la technologie et les couches de contrôle</Link></div>
      </div>
    </section>

    <section className="band band-dark">
      <div className="shell"><PageIntro kicker="Mémoire & préparation" title={<>Les incidents passés expliqués sans confusion.</>}><p>L’histoire aide à comprendre le service. Elle ne devient jamais une alerte actuelle.</p></PageIntro>
        <div className="incident-preview stack-mobile"><article data-reveal><time>2006</time><h3>Sterigenics · Fleurus</h3><p>Accident d’irradiation d’un travailleur, classé INES 4.</p></article><article data-reveal><time>2008</time><h3>IRE · Fleurus</h3><p>Rejet anormal d’iode radioactif, classé INES 3.</p></article><article data-reveal><time>1986 · 2011</time><h3>Tchernobyl · Fukushima</h3><p>Deux accidents majeurs documentés par l’AFCN et l’AIEA.</p></article></div>
        <div className="center-link"><Link className="text-link light" href="/incidents">Consulter la chronologie officielle</Link></div>
      </div>
    </section>

    <section className="band band-cream">
      <div className="shell"><PageIntro kicker="Sources officielles" title={<>Les sources avant les réponses.</>}><p>Aucune FAQ inventée : chaque réponse de sécurité doit remonter à une autorité identifiée et à une publication officielle.</p></PageIntro>
        <div className="source-preview">{sources.map(([name, desc, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" data-reveal><img src={assetPath("/icons/nuclear/document.png")} alt="" /><div><h3>{name}</h3><p>{desc}</p></div></a>)}</div>
        <div className="center-link"><Link className="text-link" href="/sources">Voir le référentiel complet</Link></div>
      </div>
    </section>

    <section className="page-cta"><div className="shell"><div><h2>Écoutez le Voicebot, maintenant.</h2><p>Vérifiez sa voix, ses limites et la manière dont il restitue les consignes officielles.</p></div><button className="button button-primary button-large" onClick={startCall}><img src={assetPath("/icons/nuclear/phone.png")} alt="" />Tester le Voicebot</button></div></section>
    <SiteFooter />

    {panelOpen && <div className="call-panel" role="dialog" aria-modal="true" aria-label="Test du Voicebot"><button className="panel-backdrop" onClick={endCall} aria-label="Fermer" /><div className="panel-card"><button className="panel-close" onClick={endCall}>Fermer</button><img className="panel-logo" src={assetPath("/nuclear-logo.png")} alt="" /><p className="kicker accent">VOICEBOT INCIDENT NUCLÉAIRE</p><h2>{callState === "connecting" ? "Connexion…" : callState === "connected" ? "Je vous écoute" : callState === "error" ? "Connexion indisponible" : "Prêt"}</h2><p>{callState === "error" ? "Vérifiez l’autorisation du microphone puis réessayez." : "Parlez naturellement. Vous pouvez interrompre le bot."}</p>{callState === "error" ? <button className="button button-primary" onClick={startCall}>Réessayer</button> : <button className="button button-secondary" onClick={endCall}>Terminer le test</button>}<small>Ce test n’est pas une centrale d’urgence.</small></div></div>}
  </main>;
}
