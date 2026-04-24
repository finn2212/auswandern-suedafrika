// Central registry of topics that have a full pillar page at /themen/<slug>.
// Pages / components use this to route topic-cards to the right place and to
// conditionally show pillar-specific UI.

export interface Pillar {
  slug: string
  image: string
}

const AVAILABLE_PILLARS: Pillar[] = [
  { slug: 'visa',                image: '/images/blog/welches-visum-suedafrika.webp' },
  { slug: 'job',                 image: '/images/blog/als-deutscher-in-suedafrika-arbeiten.webp' },
  { slug: 'auto',                image: '/images/blog/auto-kaufen-suedafrika.webp' },
  { slug: 'immobilien',          image: '/images/blog/wo-in-suedafrika-wohnen.webp' },
  { slug: 'anschluesse',         image: '/images/blog/erste-14-tage-suedafrika.webp' },
  { slug: 'sicherheit',          image: '/images/blog/wie-sicher-ist-suedafrika.webp' },
  { slug: 'steuern',             image: '/images/blog/steuerliche-abmeldung-deutschland.webp' },
  { slug: 'krankenversicherung', image: '/images/blog/discovery-vs-momentum-medical-aid.webp' },
  { slug: 'umzug',               image: '/images/blog/container-nach-kapstadt-kosten.webp' },
  { slug: 'banking',             image: '/images/blog/banking-fuer-deutsche-in-suedafrika.webp' },
  { slug: 'allgemein',           image: '/images/blog/warum-wir-ausgewandert-sind.webp' },
]

export function usePillars() {
  const pillars = AVAILABLE_PILLARS
  const pillarSlugs = new Set(pillars.map(p => p.slug))
  const hasPillar = (slug: string) => pillarSlugs.has(slug)
  return { pillars, hasPillar }
}
