import Link from "next/link";

const measures = [
  ["01", "Rentrez", "Entrez dans le bâtiment le plus proche et restez à l’intérieur."],
  ["02", "Fermez", "Fermez portes et fenêtres, et coupez la ventilation si cela est possible sans danger."],
  ["03", "Écoutez", "Suivez uniquement les instructions des autorités via BE-Alert, radio, télévision et canaux officiels."],
];

const capabilities = [
  ["Réponse immédiate", "Une consigne courte, stable et identique en français, néerlandais et allemand."],
  ["Aucune improvisation", "Les réponses proviennent d’une base approuvée. Une donnée actuelle non confirmée est refusée."],
  ["Relais en période de crise", "Le service absorbe les questions répétitives et réserve les lignes humaines aux cas complexes."],
  ["Traçabilité", "Version des sources, date de validation et réponse donnée peuvent être auditées."],
];

export default function Home() {
  return (
    <main>
      <header className="nav shell">
        <Link className="brand" href="/"><span className="brand-mark">N</span><span>Info Nucléaire<br/><small>Belgique</small></span></Link>
        <nav aria-label="Navigation principale"><Link href="/incidents">Incidents</Link><Link href="/sources">Sources</Link><Link href="/architecture">Architecture</Link></nav>
        <a className="nav-cta" href="#voicebot">Découvrir le voicebot</a>
      </header>

      <section className="hero shell">
        <div className="eyebrow"><span/> INFORMATION DE SÉCURITÉ PUBLIQUE</div>
        <h1>La bonne consigne.<br/><em>Au bon moment.</em></h1>
        <p className="hero-copy">Un voicebot multilingue conçu pour expliquer les consignes officielles belges lors d’une situation d’urgence nucléaire ou radiologique — sans rumeur, sans diagnostic, sans invention.</p>
        <div className="hero-actions"><a className="button primary" href="#consignes">Voir les consignes</a><Link className="button secondary" href="/sources">Consulter les sources →</Link></div>
        <div className="status-line"><span className="pulse"/> Prototype documentaire — aucune alerte en temps réel n’est affirmée par ce site</div>
        <div className="orbit" aria-hidden="true"><div className="orbit-core">112<small>danger immédiat</small></div><i/><i/><i/></div>
      </section>

      <section className="alert-strip"><div className="shell"><strong>Danger immédiat, personne blessée ou exposition suspectée ?</strong><span>Appelez le 112. Le voicebot n’alerte pas les secours et ne remplace jamais les autorités.</span></div></section>

      <section id="consignes" className="section shell">
        <div className="section-head"><div><p className="kicker">LE RÉFLEXE OFFICIEL</p><h2>En cas d’alerte :<br/>mettez-vous à l’abri.</h2></div><p>La mise à l’abri est présentée par les autorités belges comme l’action de protection la plus efficace. Les mesures exactes dépendent toujours de leurs instructions.</p></div>
        <div className="measure-grid">{measures.map(([n,t,d]) => <article className="measure" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
        <aside className="iodine"><div className="iodine-icon">I</div><div><h3>Comprimés d’iode : jamais de votre propre initiative</h3><p>Ils protègent uniquement la thyroïde contre l’iode radioactif. Ils ne remplacent pas la mise à l’abri et ne doivent être pris que sur instruction explicite des autorités.</p></div><a href="https://www.risquenucleaire.be/fr/comprimes-diode" target="_blank" rel="noreferrer">Référence officielle ↗</a></aside>
      </section>

      <section id="voicebot" className="dark-section"><div className="shell">
        <div className="section-head light"><div><p className="kicker">POURQUOI UN VOICEBOT ?</p><h2>Une ligne claire<br/>quand l’information déborde.</h2></div><p>Le bot ne décide pas. Il restitue une information validée, demande la langue de l’appelant et oriente immédiatement vers le 112 lorsqu’un danger est signalé.</p></div>
        <div className="cap-grid">{capabilities.map(([t,d],i) => <article key={t}><b>0{i+1}</b><h3>{t}</h3><p>{d}</p></article>)}</div>
        <div className="language-card"><div><span>FR</span><span>NL</span><span>DE</span></div><p>Accueil chaleureux dans les trois langues nationales, puis voix native après le choix de langue.</p><strong>Une seule vérité opérationnelle, trois formulations idiomatiques.</strong></div>
      </div></section>

      <section className="section shell history-preview"><div className="section-head"><div><p className="kicker">MÉMOIRE & PRÉPARATION</p><h2>Comprendre les incidents passés.</h2></div><p>Les événements historiques servent à expliquer les mécanismes et l’utilité du dispositif. Ils ne sont jamais présentés comme des incidents en cours.</p></div>
        <div className="timeline"><article><time>2006</time><h3>Sterigenics, Fleurus</h3><p>Accident d’irradiation d’un travailleur, classé INES 4 par l’AFCN.</p></article><article><time>2008</time><h3>IRE, Fleurus</h3><p>Rejet anormal d’iode radioactif, classé INES 3 par l’AFCN.</p></article><article><time>1986 / 2011</time><h3>Tchernobyl & Fukushima</h3><p>Deux accidents majeurs documentés par l’AFCN et l’AIEA.</p></article></div>
        <Link className="text-link" href="/incidents">Voir la chronologie documentée →</Link>
      </section>

      <footer><div className="shell"><div className="brand"><span className="brand-mark">N</span><span>Info Nucléaire<br/><small>Prototype d’intérêt public</small></span></div><p>Ce service n’est ni l’AFCN, ni le Centre de Crise, ni une centrale d’urgence.</p><div><Link href="/sources">Sources officielles</Link><Link href="/architecture">Architecture</Link></div></div></footer>
    </main>
  );
}
