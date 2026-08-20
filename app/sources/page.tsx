import Link from "next/link";

const sources = [
  ["Belgique", "Centre de Crise National", "Risque nucléaire — préparation, protection et communication de crise", "https://www.risquenucleaire.be/fr"],
  ["Belgique", "AFCN", "Que faire en cas de situation d’urgence nucléaire ou radiologique ?", "https://afcn.fgov.be/fr/que-devez-vous-faire-en-cas-de-situation-durgence"],
  ["Belgique", "Risque Nucléaire", "Comprimés d’iode : utilité, limites et prise uniquement sur instruction", "https://www.risquenucleaire.be/fr/comprimes-diode"],
  ["Belgique", "AFCN", "Événements INES en Belgique durant les douze derniers mois", "https://afcn.be/fr/situations-durgence/echelle-ines/evenements-classes-sur-lechelle-ines-en-belgique-durant-les-12"],
  ["Belgique", "BE-Alert", "Canal officiel d’alerte de la population", "https://www.be-alert.be/fr"],
  ["Europe", "Commission européenne — EURDEP", "Plateforme européenne d’échange de données radiologiques", "https://remap.jrc.ec.europa.eu/"],
  ["Europe", "Commission européenne", "Préparation et réponse aux urgences radiologiques", "https://energy.ec.europa.eu/topics/nuclear-energy/radiological-and-nuclear-emergency-preparedness-and-response_en"],
  ["International", "AIEA", "Échelle internationale des événements nucléaires et radiologiques (INES)", "https://www.iaea.org/resources/databases/international-nuclear-and-radiological-event-scale"],
  ["International", "AIEA", "Informations officielles sur les urgences et incidents — USIE", "https://www.iaea.org/resources/databases/unified-system-for-information-exchange-in-incidents-and-emergencies"],
];

export default function Sources(){return <main><PageNav/><section className="subhero shell"><p className="kicker">RÉFÉRENTIEL CONTRÔLÉ</p><h1>Les sources avant les réponses.</h1><p>Le voicebot ne consulte ni réseaux sociaux ni médias pour produire une consigne. Toute réponse de sécurité doit être rattachée à une publication officielle identifiée, datée et validée.</p></section><section className="section shell"><div className="source-list">{sources.map(([zone,name,desc,url])=><a key={url} href={url} target="_blank" rel="noreferrer"><span>{zone}</span><div><h2>{name}</h2><p>{desc}</p><small>{url}</small></div><b>↗</b></a>)}</div><aside className="method"><h2>Règle de publication</h2><p>Une source permanente explique un principe général. Une source opérationnelle fraîche peut décrire une situation actuelle. Sans horodatage, statut de santé de la source et validation humaine, le bot dit qu’il ne dispose pas d’une information officielle actuelle.</p></aside></section></main>}

function PageNav(){return <header className="nav shell"><Link className="brand" href="/"><span className="brand-mark">N</span><span>Info Nucléaire<br/><small>Belgique</small></span></Link><nav><Link href="/incidents">Incidents</Link><Link className="active" href="/sources">Sources</Link><Link href="/architecture">Architecture</Link></nav><Link className="nav-cta" href="/">Accueil</Link></header>}
