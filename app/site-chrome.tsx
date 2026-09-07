"use client";

import Link from "next/link";
import { useState } from "react";
import { assetPath } from "./asset-path";

type HeaderProps = {
  active?: "home" | "architecture" | "incidents" | "sources";
  transparent?: boolean;
};

export const VOICEBOT_PHONE_E164 = "+3271496180";
export const VOICEBOT_PHONE_DISPLAY = "+32 71 49 61 80";

const links = [
  { href: "/", label: "Home", key: "home" },
  { href: "/#guidance", label: "How it works", key: null },
  { href: "/architecture", label: "Technology", key: "architecture" },
  { href: "/incidents", label: "Incidents", key: "incidents" },
  { href: "/sources", label: "Sources", key: "sources" },
] as const;

export function SiteHeader({ active, transparent = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${transparent ? "is-transparent" : ""}`}>
      <div className="shell header-inner">
        <Link className="site-brand" href="/" aria-label="Nuclear Incident Voicebot, home">
          <img src={assetPath("/nuclear-logo.png")} alt="" />
          <span><b>VOICEBOT</b><em>NUCLEAR INCIDENT</em></span>
        </Link>
        <nav className={open ? "is-open" : ""} aria-label="Main navigation">
          {links.map((link) => <Link key={link.href} className={link.key && active === link.key ? "active" : ""} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <a className="button button-primary header-action" href={`tel:${VOICEBOT_PHONE_E164}`} aria-label={`Call the voicebot on ${VOICEBOT_PHONE_DISPLAY}`}><img src={assetPath("/icons/nuclear/phone.png")} alt="" />Call the voicebot</a>
        <button className="menu-button" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
    </header>
  );
}

const commitments = [
  ["/icons/nuclear/clock.png", "Available 24/7"],
  ["/icons/nuclear/shield-check.png", "Anti-hallucination controls"],
  ["/icons/nuclear/people.png", "Security and GDPR"],
  ["/icons/nuclear/document.png", "Controlled data systems"],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <img src={assetPath("/brand/banana-navy-logo.png")} alt="Banana Navy" />
          <div><h2>Trusted voice agents<br />&amp; agentic systems</h2><p>We design secure hybrid voicebots that combine conversational intelligence with reliable control systems.</p></div>
        </div>
        <div>
          <h2 className="kicker muted">Our commitments</h2>
          <ul className="commitment-grid">{commitments.map(([icon, label]) => <li key={label}><span><img src={assetPath(icon)} alt="" /></span><b>{label}</b></li>)}</ul>
        </div>
        <div className="footer-contact">
          <h2 className="kicker muted">Contact</h2>
          <address><strong>Nuclear voicebot demo line</strong><a className="footer-voicebot-phone" href={`tel:${VOICEBOT_PHONE_E164}`}>{VOICEBOT_PHONE_DISPLAY}</a><strong>Marc-Antoine Cajot</strong><a href="tel:+32495277044">+32 495 277 044</a><a href="mailto:marc@banana-navy.com">marc@banana-navy.com</a><a href="https://www.banana-navy.ai" target="_blank" rel="noreferrer">www.banana-navy.ai</a><span>Rue Antoine de Saint-Exupéry 2<br />6041 Charleroi, Belgium</span></address>
        </div>
      </div>
      <div className="shell partner-band">
        <div><p className="kicker muted">Programme &amp; partner institutions</p><div className="partner-logos"><img src={assetPath("/brand/badge-defence.png")} alt="Belgian Defence" /><img src={assetPath("/brand/badge-crest-royal.png")} alt="Royal crest" /><img src={assetPath("/brand/badge-strike-it.png")} alt="STRIKE IT" /><img src={assetPath("/brand/badge-cyberforce.png")} alt="Cyber Force" /></div></div>
        <div><p>Banana Navy has been selected and is supported by the Belgian Defence through the STRIKE IT programme for the development of secure and reliable voicebot technology.</p></div>
      </div>
      <div className="shell legal-line"><span>© 2026 Banana Navy</span><span>This prototype does not replace FANC, 1771 or 112.</span><div><Link href="/mentions-legales">Legal notice</Link><Link href="/confidentialite">Privacy</Link><Link href="/sources">Official sources</Link></div></div>
    </footer>
  );
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: React.ReactNode; children: React.ReactNode }) {
  return <div className="section-intro"><p className="kicker accent">{kicker}</p><h2>{title}</h2><div className="lead">{children}</div></div>;
}

export function PageCta() {
  return <section className="page-cta"><div className="shell"><div><h2>Call the voicebot now.</h2><p>Use the dedicated demo line to hear its voice, its limits and its answers based on official guidance.</p></div><div className="page-cta-actions"><a className="button button-primary button-with-number" href={`tel:${VOICEBOT_PHONE_E164}`}><img src={assetPath("/icons/nuclear/phone.png")} alt="" /><span>Call the voicebot<small>{VOICEBOT_PHONE_DISPLAY}</small></span></a><Link className="text-link light" href="/#test">Test in browser</Link></div></div></section>;
}
