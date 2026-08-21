import Link from "next/link";
import { SiteFooter, SiteHeader } from "../site-chrome";

export default function Legal() {
  return <main>
    <SiteHeader />
    <section className="subpage-hero shell"><p className="kicker accent">Legal information</p><h1>Legal notice</h1><div className="lead"><p>Information relating to the Nuclear Incident Voicebot prototype.</p></div></section>
    <section className="legal-content shell">
      <article><h2>Publisher and contact</h2><p><strong>Banana Navy</strong><br />Rue Antoine de Saint-Exupéry 2<br />6041 Charleroi, Belgium</p><p>Contact: Marc-Antoine Cajot<br /><a href="tel:+32495277044">+32 495 277 044</a><br /><a href="mailto:marc@banana-navy.com">marc@banana-navy.com</a><br /><a href="https://www.banana-navy.ai">www.banana-navy.ai</a></p></article>
      <article><h2>Nature of the service</h2><p>This website presents an English-language voice-information prototype. It does not represent FANC, the Belgian National Crisis Center, a nuclear operator or an emergency service. It does not replace 1771 or 112.</p></article>
      <article><h2>Responsibility</h2><p>General principles link to official publications. During a real event, always follow current instructions from the authorities. The service does not provide a diagnosis, a dose calculation, an evacuation order or an instruction to take stable iodine on its own initiative.</p></article>
      <article><h2>Intellectual property</h2><p>The prototype’s original text, interfaces and technical elements are protected. Third-party trade marks, publications and emblems remain the property of their respective owners.</p></article>
      <article><h2>Sources</h2><p>The reference register and direct links to the competent organisations are available on the <Link href="/sources">Official Sources page</Link>.</p></article>
    </section>
    <SiteFooter />
  </main>;
}
