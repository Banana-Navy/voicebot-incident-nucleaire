import { PageCta, SiteFooter, SiteHeader } from "../site-chrome";
import { assetPath } from "../asset-path";

const sources = [
  ["Belgium", "Belgian National Crisis Center", "Release of nuclear substances — preparedness, protection and crisis communication", "https://crisiscenter.be/en/risks-belgium/technological-risks/release-nuclear-substances"],
  ["Belgium", "Belgian National Crisis Center", "Seeking shelter during an emergency", "https://crisiscenter.be/en/what-can-you-do/right-reflex/seeking-shelter"],
  ["Belgium", "Belgian National Crisis Center", "Official emergency-information channels", "https://crisiscenter.be/en/what-can-you-do/stay-informed/get-informed-emergency-situation"],
  ["Belgium", "FANC", "Stable iodine: purpose, limits and use only when instructed", "https://afcn.fgov.be/fr/situations-durgence/que-faire-en-cas-de-situation-durgence/comprimes-diode"],
  ["Belgium", "FANC", "INES events in Belgium during the last twelve months", "https://afcn.fgov.be/fr/situations-durgence/echelle-ines/evenements-classes-sur-lechelle-ines-en-belgique-durant-les-12"],
  ["Belgium", "BE-Alert", "Official public-alert channel", "https://www.be-alert.be/en"],
  ["Europe", "European Commission — EURDEP", "European radiological data-exchange platform", "https://remap.jrc.ec.europa.eu/"],
  ["Europe", "European Commission", "Radiological and nuclear emergency preparedness and response", "https://energy.ec.europa.eu/topics/nuclear-energy/radiological-and-nuclear-emergency-preparedness-and-response_en"],
  ["International", "IAEA", "International Nuclear and Radiological Event Scale (INES)", "https://www.iaea.org/resources/databases/international-nuclear-and-radiological-event-scale"],
  ["International", "IAEA", "Unified System for Information Exchange in Incidents and Emergencies", "https://www.iaea.org/resources/databases/unified-system-for-information-exchange-in-incidents-and-emergencies"],
];

export default function Sources() {
  return <main>
    <SiteHeader active="sources" />
    <section className="subpage-hero shell"><p className="kicker accent">Official sources</p><h1>Our reference sources</h1><div className="lead"><p>The voicebot’s content is not improvised. Its corpus is built from official Belgian, European and international guidance.</p><p>A permanent source explains a general principle. A current situation requires a fresh, applicable and approved publication.</p></div></section>
    <section className="band band-sand"><div className="shell"><div className="source-list">{sources.map(([zone, name, description, url]) => <a className="source-item" href={url} target="_blank" rel="noreferrer" key={url}><img src={assetPath("/icons/nuclear/document.png")} alt="" /><div><p className="kicker">{zone}</p><h2>{name}</h2><p>{description}</p><small>{url}</small></div></a>)}</div><aside className="method-card"><h2>Publication rule</h2><p>Without a validity window, a healthy source and human approval, the voicebot states that verified current official information is unavailable. It never turns a historical incident into a current alert.</p></aside></div></section>
    <PageCta />
    <SiteFooter />
  </main>;
}
