import { PageCta, SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../asset-path";

const sources = [
  ["Belgique", "Centre de Crise National", "Risque nucléaire — préparation, protection et communication de crise", "https://www.risquenucleaire.be/fr"],
  ["Belgique", "AFCN", "Que faire en cas de situation d’urgence nucléaire ou radiologique ?", "https://afcn.fgov.be/fr/que-devez-vous-faire-en-cas-de-situation-durgence"],
  ["Belgique", "Risque Nucléaire", "Comprimés d’iode : utilité, limites et prise uniquement sur instruction", "https://www.risquenucleaire.be/fr/comprimes-diode"],
  ["Belgique", "AFCN", "Événements INES en Belgique durant les douze derniers mois", "https://afcn.fgov.be/fr/situations-durgence/echelle-ines/evenements-classes-sur-lechelle-ines-en-belgique-durant-les-12"],
  ["Belgique", "BE-Alert", "Canal officiel d’alerte de la population", "https://www.be-alert.be/fr"],
  ["Europe", "Commission européenne — EURDEP", "Plateforme européenne d’échange de données radiologiques", "https://remap.jrc.ec.europa.eu/"],
  ["Europe", "Commission européenne", "Préparation et réponse aux urgences radiologiques", "https://energy.ec.europa.eu/topics/nuclear-energy/radiological-and-nuclear-emergency-preparedness-and-response_en"],
  ["International", "AIEA", "Échelle internationale des événements nucléaires et radiologiques (INES)", "https://www.iaea.org/resources/databases/international-nuclear-and-radiological-event-scale"],
  ["International", "AIEA", "Informations officielles sur les urgences et incidents — USIE", "https://www.iaea.org/resources/databases/unified-system-for-information-exchange-in-incidents-and-emergencies"],
];

export default function Sources() {
  return <main>
    <SiteHeader active="sources" />
    <section className="subpage-hero shell"><p className="kicker accent">Sources officielles</p><h1>Nos sources de référence</h1><div className="lead"><p>Le contenu du Voicebot n’est pas improvisé. Le corpus est construit à partir de recommandations officielles belges, européennes et internationales.</p><p>Une source permanente explique un principe général. Une situation actuelle exige une publication fraîche, applicable et validée.</p></div></section>
    <section className="band band-sand"><div className="shell"><div className="source-list">{sources.map(([zone, name, description, url]) => <a className="source-item" href={url} target="_blank" rel="noreferrer" key={url}><img src={assetPath("/icons/nuclear/document.png")} alt="" /><div><p className="kicker">{zone}</p><h2>{name}</h2><p>{description}</p><small>{url}</small></div></a>)}</div><aside className="method-card"><h2>Règle de publication</h2><p>Sans horodatage, statut de santé de la source et approbation humaine, le bot dit qu’il ne dispose pas d’une information officielle actuelle. Il ne transforme jamais un incident historique en alerte en cours.</p></aside></div></section>
    <PageCta />
    <SiteFooter />
  </main>;
}
