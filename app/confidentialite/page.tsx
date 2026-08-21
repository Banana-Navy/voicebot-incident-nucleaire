import { SiteFooter, SiteHeader } from "../site-chrome";

export default function Privacy() {
  return <main>
    <SiteHeader />
    <section className="subpage-hero shell"><p className="kicker accent">Data &amp; transparency</p><h1>Privacy</h1><div className="lead"><p>What the prototype uses during a voice test and the limits that apply before production use.</p></div></section>
    <section className="legal-content shell">
      <article><h2>Microphone</h2><p>The browser requests permission before activating the microphone. You may stop the test at any time. A microphone is not required to read the website.</p></article>
      <article><h2>Demonstration conversation</h2><p>The English opening identifies the service and states that immediate danger requires 112. In the test environment, audio and transcripts may be retained to evaluate quality and safety. The current configuration provides for a thirty-day retention period before any production decision.</p></article>
      <article><h2>Information you should not provide</h2><p>The general information service does not need your name, complete address, national identification number or medical record. If anyone is in danger, close the test and call 112.</p></article>
      <article><h2>Purpose</h2><p>Test data is used only to evaluate the voicebot’s behaviour, identify failures and document versions. It must not be used to diagnose a condition or build a medical profile.</p></article>
      <article><h2>Contact</h2><p>For questions: <a href="mailto:marc@banana-navy.com">marc@banana-navy.com</a>.</p></article>
    </section>
    <SiteFooter />
  </main>;
}
