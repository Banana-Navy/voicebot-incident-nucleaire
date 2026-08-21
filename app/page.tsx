"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PageIntro, SiteFooter, SiteHeader } from "./site-chrome";
import { assetPath } from "./asset-path";

const AGENT_ID = "agent_5601m0fmedq1eneatyp2m305thfr";

const reflexes = [
  ["/icons/nuclear/shield-check-hq.png", "Go indoors", "Enter the nearest suitable building and remain inside."],
  ["/icons/nuclear/gear-hq.png", "Close", "Close doors and windows. Switch off ventilation if this can be done safely."],
  ["/icons/nuclear/bell-hq.png", "Listen", "Follow BE-Alert, radio, television and official authority channels."],
];

const scenarios = [
  { icon: "/icons/nuclear/toxic-cloud-hq.png", label: "Visible smoke or release", description: "Smoke, vapour, a plume or another unusual phenomenon observed near a site" },
  { icon: "/icons/nuclear/explosion-hq.png", label: "Explosion or unusual noise", description: "A detonation, vibration, significant noise or another sudden event" },
  { icon: "/icons/nuclear/fire-hq.png", label: "Observed fire", description: "Flames, a developing fire or smoke associated with an installation" },
  { icon: "/icons/nuclear/pollution-hq.png", label: "Suspected release or contamination", description: "A liquid, residue, odour or another environmental anomaly" },
  { icon: "/icons/nuclear/evacuation-hq.png", label: "Need for shelter information", description: "Questions about evacuation, sheltering, travel or relatives" },
  { icon: "/icons/nuclear/unknown-hq.png", label: "I do not know what is happening", description: null },
];

const sources = [
  ["Belgian National Crisis Center", "Preparedness and protective measures", "https://crisiscenter.be/en/risks-belgium/technological-risks/release-nuclear-substances"],
  ["FANC", "Nuclear emergencies and INES events", "https://afcn.fgov.be/fr/situations-durgence"],
  ["BE-Alert", "Official public-alert channel", "https://www.be-alert.be/en"],
  ["European Commission · EURDEP", "European radiological monitoring data", "https://remap.jrc.ec.europa.eu/"],
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
    <div className="safety-strip">Information prototype — in immediate danger, call <strong>112</strong></div>
    <div className="home-stage">
      <SiteHeader active="home" onTest={startCall} transparent />
      <section className="home-hero" id="top">
        <picture><source media="(max-width: 700px)" srcSet={assetPath("/nuclear-hero-mobile.png")} /><img className="hero-background" src={assetPath("/nuclear-hero-desktop.png")} alt="Low-poly illustration of a generic nuclear site" /></picture>
        <div className="hero-overlay" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <h1 data-reveal><span>VOICEBOT</span><strong>NUCLEAR<br />INCIDENT</strong></h1>
            <h2>A RELIABLE VOICE TO INFORM AND GUIDE YOU</h2>
            <p>Our English-language voicebot provides official guidance without rumour, diagnosis or invention.</p>
            <div className="hero-arguments">
              <article><img src={assetPath("/icons/nuclear/audio.png")} alt="" /><span>Controlled<br />information</span></article>
              <article><img src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><span>Official<br />guidance</span></article>
              <article><img src={assetPath("/icons/nuclear/people.png")} alt="" /><span>English-only<br />service</span></article>
            </div>
            <div className="hero-actions" id="test"><button className="button button-primary button-large" onClick={startCall}><img src={assetPath("/icons/nuclear/phone.png")} alt="" />Test the voicebot</button><a className="text-link" href="#guidance">How it works</a></div>
          </div>
        </div>
        <div className="hero-trust shell"><img src={assetPath("/icons/nuclear/shield-check.png")} alt="" /><span>This test does not contact emergency services. In immediate danger: 112.</span></div>
      </section>
    </div>

    <section className="band band-sand" id="guidance">
      <div className="shell"><PageIntro kicker="The official response" title={<>Go indoors. Close. Listen.</>}><p>Sheltering is the priority general protective measure. The authorities then determine the measures required for the actual situation.</p></PageIntro>
        <div className="three-card-grid stack-mobile">{reflexes.map(([icon, title, text]) => <article className="content-card" data-reveal key={title}><img className="card-icon" src={assetPath(icon)} alt="" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        <aside className="official-note" data-reveal><img src={assetPath("/icons/nuclear/warning.png")} alt="" /><div><h3>Never take stable iodine tablets on your own initiative.</h3><p>They protect only the thyroid against radioactive iodine. They do not replace sheltering and must be taken only on explicit instruction from the authorities.</p></div><a href="https://crisiscenter.be/en/newsroom/iodine-tablets-not-necessary-context-current-situation" target="_blank" rel="noreferrer">Consult the official source</a></aside>
      </div>
    </section>

    <section className="band band-cool">
      <div className="shell"><PageIntro kicker="Situations covered" title={<>Describe what you observe.<br />The voicebot will guide you.</>}><p>These categories structure the conversation. They are neither a diagnosis of the event nor confirmation of a current alert.</p></PageIntro>
        <div className="scenario-grid stack-mobile">{scenarios.map(({ icon, label, description }) => <article className="scenario-card" data-reveal key={label}><img src={assetPath(icon)} alt="" /><h3>{label}</h3>{description && <p>{description}</p>}</article>)}</div>
        <div className="center-link"><Link className="text-link" href="/architecture">Explore the technology and control layers</Link></div>
      </div>
    </section>

    <section className="band band-dark">
      <div className="shell"><PageIntro kicker="History & preparedness" title={<>Past incidents explained without confusion.</>}><p>History helps people understand the service. It never becomes a current alert.</p></PageIntro>
        <div className="incident-preview stack-mobile"><article data-reveal><time>2006</time><h3>Sterigenics · Fleurus</h3><p>Worker irradiation accident classified at INES Level 4.</p></article><article data-reveal><time>2008</time><h3>IRE · Fleurus</h3><p>Abnormal release of radioactive iodine classified at INES Level 3.</p></article><article data-reveal><time>1986 · 2011</time><h3>Chornobyl · Fukushima</h3><p>Two major accidents documented by FANC and the IAEA.</p></article></div>
        <div className="center-link"><Link className="text-link light" href="/incidents">View the official timeline</Link></div>
      </div>
    </section>

    <section className="band band-cream">
      <div className="shell"><PageIntro kicker="Official sources" title={<>Sources before answers.</>}><p>No invented FAQ: every safety answer must trace back to an identified authority and an official publication.</p></PageIntro>
        <div className="source-preview">{sources.map(([name, desc, url]) => <a key={url} href={url} target="_blank" rel="noreferrer" data-reveal><img src={assetPath("/icons/nuclear/document.png")} alt="" /><div><h3>{name}</h3><p>{desc}</p></div></a>)}</div>
        <div className="center-link"><Link className="text-link" href="/sources">View the complete source register</Link></div>
      </div>
    </section>

    <section className="page-cta"><div className="shell"><div><h2>Listen to the voicebot now.</h2><p>Verify its voice, its limits and the way it delivers official guidance.</p></div><button className="button button-primary button-large" onClick={startCall}><img src={assetPath("/icons/nuclear/phone.png")} alt="" />Test the voicebot</button></div></section>
    <SiteFooter />

    {panelOpen && <div className="call-panel" role="dialog" aria-modal="true" aria-label="Voicebot test"><button className="panel-backdrop" onClick={endCall} aria-label="Close" /><div className="panel-card"><button className="panel-close" onClick={endCall}>Close</button><img className="panel-logo" src={assetPath("/nuclear-logo.png")} alt="" /><p className="kicker accent">NUCLEAR INCIDENT VOICEBOT</p><h2>{callState === "connecting" ? "Connecting…" : callState === "connected" ? "I am listening" : callState === "error" ? "Connection unavailable" : "Ready"}</h2><p>{callState === "error" ? "Check your microphone permission and try again." : "Speak naturally. You may interrupt the voicebot."}</p>{callState === "error" ? <button className="button button-primary" onClick={startCall}>Try again</button> : <button className="button button-secondary" onClick={endCall}>End the test</button>}<small>This test is not an emergency service.</small></div></div>}
  </main>;
}
