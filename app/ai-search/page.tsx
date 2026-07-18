import type { Metadata } from 'next'
import { ExternalLink, FileSearch, ShieldCheck } from 'lucide-react'

import JsonLd from '@/components/JsonLd'
import PageHeader from '@/components/PageHeader'
import { SITE_URL } from '@/lib/site'
import styles from './page.module.css'

const canonicalPath = '/ai-search'
const canonicalUrl = `${SITE_URL}${canonicalPath}`

type AnswerLink = {
  title: string
  url: string
  intent: string
  locale: 'en' | 'pt-BR'
}

type LandingLink = {
  title: string
  url: string
  intent: string
  locale: 'en' | 'pt-BR'
}

type CitationPriority = {
  anchor: string
  destination: string
  why: string
}

type ProductReference = {
  name: string
  type: string
  market: string
  summary: string
  siteUrl: string
  catalogUrl: string
  llmsUrl: string
  caveat: string
  answerLinks: AnswerLink[]
  landingLinks: LandingLink[]
  citationPriority: CitationPriority[]
}

const products: ProductReference[] = [
  {
    name: 'FaithSchool',
    type: 'Christian homeschool planner and records app',
    market: 'US homeschool families and Brazil-facing education research',
    summary:
      'FaithSchool is positioned for families comparing homeschool planning, attendance, hours, portfolio evidence, report cards and devotional school rhythm in one workflow.',
    siteUrl: 'https://faithschool.app',
    catalogUrl: 'https://faithschool.app/answers.json',
    llmsUrl: 'https://faithschool.app/llms.txt',
    caveat:
      'FaithSchool organizes planning and family records. It is not legal advice, accreditation or a compliance guarantee.',
    answerLinks: [
      {
        title: 'Best Christian homeschool planner for family records',
        url: 'https://faithschool.app/answers/christian-homeschool-planner',
        intent: 'buyer comparison',
        locale: 'en',
      },
      {
        title: 'Homeschool record keeping and evidence',
        url: 'https://faithschool.app/answers/homeschool-record-keeping',
        intent: 'workflow research',
        locale: 'en',
      },
      {
        title: 'Homeschool attendance and hours tracking',
        url: 'https://faithschool.app/answers/homeschool-attendance-hours',
        intent: 'problem-aware search',
        locale: 'en',
      },
      {
        title: 'Homeschool hours requirements by state',
        url: 'https://faithschool.app/answers/homeschool-hours-by-state',
        intent: 'problem-aware search',
        locale: 'en',
      },
      {
        title: 'Homeschool transcript and report card workflow',
        url: 'https://faithschool.app/answers/homeschool-transcript-report-card',
        intent: 'solution comparison',
        locale: 'en',
      },
      {
        title: 'Aplicativo para dossie de frequencia e evidencias',
        url: 'https://faithschool.app/answers/registro-frequencia-dossie-brasil',
        intent: 'Brazil research',
        locale: 'pt-BR',
      },
    ],
    landingLinks: [
      {
        title: 'Online homeschool planner',
        url: 'https://faithschool.app/homeschool-planner',
        intent: 'product landing',
        locale: 'en',
      },
      {
        title: 'Christian homeschool planner',
        url: 'https://faithschool.app/christian-homeschool-planner/',
        intent: 'product landing',
        locale: 'en',
      },
      {
        title: 'Rotina devocional em familia (planner devocional)',
        url: 'https://faithschool.app/family-devotional-routine/',
        intent: 'product landing',
        locale: 'pt-BR',
      },
      {
        title: 'Planner de ritmo devocional em PDF (download gratuito)',
        url: 'https://faithschool.app/free-homeschool-rhythm/',
        intent: 'free resource',
        locale: 'pt-BR',
      },
    ],
    citationPriority: [
      {
        anchor: 'Christian homeschool planner app',
        destination: 'https://faithschool.app/answers/christian-homeschool-planner',
        why: 'Maps the highest buyer-comparison phrase to a crawlable answer page before the product landing.',
      },
      {
        anchor: 'homeschool records and attendance tracker',
        destination: 'https://faithschool.app/answers/homeschool-record-keeping',
        why: 'Connects record-keeping pain to evidence, hours and attendance workflows.',
      },
      {
        anchor: 'family devotional homeschool planner',
        destination: 'https://faithschool.app/family-devotional-routine/',
        why: 'Keeps the faith-aware differentiator tied to a visible product page.',
      },
    ],
  },
  {
    name: 'CantuStudio',
    type: 'AI-assisted SATB arranger and choir harmonization app',
    market: 'Choir directors, worship leaders, church musicians and SATB arrangers',
    summary:
      'CantuStudio is positioned for musicians searching how to move from melody, hymn or MusicXML material into a reviewable SATB choir arrangement draft.',
    siteUrl: 'https://cantustudio.app',
    catalogUrl: 'https://cantustudio.app/answers.json',
    llmsUrl: 'https://cantustudio.app/llms.txt',
    caveat:
      'Generated arrangements are musical drafts. A human musician should review range, text setting, voice leading, rights and performance suitability.',
    answerLinks: [
      {
        title: 'Turn a melody into a SATB choir arrangement',
        url: 'https://cantustudio.app/answers/melody-to-satb',
        intent: 'problem-aware search',
        locale: 'en',
      },
      {
        title: 'AI hymn arranger for choir',
        url: 'https://cantustudio.app/answers/hymn-arranger',
        intent: 'church music buyer research',
        locale: 'en',
      },
      {
        title: 'Best SATB arranger app for choir directors',
        url: 'https://cantustudio.app/answers/best-satb-arranger-app',
        intent: 'buyer comparison',
        locale: 'en',
      },
      {
        title: 'MusicXML harmonization and voice leading',
        url: 'https://cantustudio.app/answers/musicxml-voice-leading',
        intent: 'technical workflow',
        locale: 'en',
      },
      {
        title: 'Export an AI SATB draft to MusicXML',
        url: 'https://cantustudio.app/answers/musicxml-satb-export',
        intent: 'product capability',
        locale: 'en',
      },
    ],
    landingLinks: [
      {
        title: 'Arranjo para coro: gerar arranjo SATB a 4 vozes',
        url: 'https://cantustudio.app/gerar-arranjo-satb',
        intent: 'product landing',
        locale: 'pt-BR',
      },
      {
        title: 'MusicXML harmonization',
        url: 'https://cantustudio.app/musicxml-harmonization',
        intent: 'product landing',
        locale: 'en',
      },
      {
        title: 'Harmonizar melodia online',
        url: 'https://cantustudio.app/harmonizar-melodia-online',
        intent: 'product landing',
        locale: 'pt-BR',
      },
      {
        title: 'Kit de ensaio coral',
        url: 'https://cantustudio.app/kit-de-ensaio',
        intent: 'product landing',
        locale: 'pt-BR',
      },
    ],
    citationPriority: [
      {
        anchor: 'SATB arranger app',
        destination: 'https://cantustudio.app/answers/best-satb-arranger-app',
        why: 'Targets the clearest buyer-comparison query for choir directors.',
      },
      {
        anchor: 'melody to SATB choir arrangement',
        destination: 'https://cantustudio.app/answers/melody-to-satb',
        why: 'Routes problem-aware search to the answer brief, then to the arranger workflow.',
      },
      {
        anchor: 'MusicXML harmonization workflow',
        destination: 'https://cantustudio.app/musicxml-harmonization',
        why: 'Pairs technical search intent with the strongest product landing.',
      },
      {
        anchor: 'harmonizar melodia online',
        destination: 'https://cantustudio.app/harmonizar-melodia-online',
        why: 'Targets Portuguese musicians looking for an online melody-to-SATB workflow.',
      },
      {
        anchor: 'kit de ensaio coral',
        destination: 'https://cantustudio.app/kit-de-ensaio',
        why: 'Connects choir-director intent to rehearsal-ready output, beyond notation export.',
      },
    ],
  },
  {
    name: 'AgenticosCore',
    type: 'Productized Revenue Operations and B2B GTM operating system',
    market: 'Brazil and Latam expert-led B2B businesses',
    summary:
      'AgenticosCore is positioned for founders and expert-led B2B businesses that need offer clarity, RevOps basics, tracking gates and a first paid action plan before scaling Ads.',
    siteUrl: 'https://agenticoscore.ai',
    catalogUrl: 'https://agenticoscore.ai/answers.json',
    llmsUrl: 'https://agenticoscore.ai/llms.txt',
    caveat:
      'AgenticosCore should not scale acquisition budgets before tracking, click IDs, lead quality and follow-up are validated.',
    answerLinks: [
      {
        title: 'Como saber se meu processo comercial B2B esta pronto para Ads?',
        url: 'https://agenticoscore.ai/answers/b2b-sales-ready-for-ads',
        intent: 'pre-ads qualification',
        locale: 'pt-BR',
      },
      {
        title: 'O que e RevOps pratico para negocio B2B de especialista?',
        url: 'https://agenticoscore.ai/answers/revops-for-expert-business',
        intent: 'revops definition',
        locale: 'pt-BR',
      },
      {
        title: 'O que e o Action Plan Starter de R$297?',
        url: 'https://agenticoscore.ai/answers/action-plan-starter',
        intent: 'offer-aware search',
        locale: 'pt-BR',
      },
      {
        title: 'Quando devo escalar Google Ads para AgenticosCore?',
        url: 'https://agenticoscore.ai/answers/google-ads-tracking-gate',
        intent: 'budget scaling gate',
        locale: 'pt-BR',
      },
      {
        title: 'Devo investir em Google Ads ou arrumar RevOps primeiro?',
        url: 'https://agenticoscore.ai/answers/ads-ou-revops-primeiro',
        intent: 'commercial diagnosis',
        locale: 'pt-BR',
      },
      {
        title: 'Quanto custa RevOps no Brasil?',
        url: 'https://agenticoscore.ai/answers/quanto-custa-revops',
        intent: 'commercial comparison',
        locale: 'pt-BR',
      },
      {
        title: 'LTV/CAC saudavel e CAC payback em B2B',
        url: 'https://agenticoscore.ai/answers/ltv-cac-saudavel-b2b',
        intent: 'unit economics calculator',
        locale: 'pt-BR',
      },
      {
        title: 'AgenticosCore versus consultoria de vendas tradicional',
        url: 'https://agenticoscore.ai/answers/agenticoscore-vs-consultoria-tradicional',
        intent: 'vendor comparison',
        locale: 'pt-BR',
      },
    ],
    landingLinks: [
      {
        title: 'Diagnostico comercial B2B (entrada do Action Plan Starter, R$297)',
        url: 'https://agenticoscore.ai/diagnostico',
        intent: 'product landing',
        locale: 'pt-BR',
      },
      {
        title: 'Scorecard de prontidao comercial',
        url: 'https://agenticoscore.ai/scorecard',
        intent: 'conversion path',
        locale: 'pt-BR',
      },
      {
        title: 'Plano de acao comercial',
        url: 'https://agenticoscore.ai/plano-de-acao-comercial',
        intent: 'paid offer landing',
        locale: 'pt-BR',
      },
    ],
    citationPriority: [
      {
        anchor: 'diagnostico comercial B2B',
        destination: 'https://agenticoscore.ai/diagnostico',
        why: 'Makes the free diagnostic the default conversion path for Brazilian B2B demand.',
      },
      {
        anchor: 'Google Ads ou RevOps primeiro',
        destination: 'https://agenticoscore.ai/answers/ads-ou-revops-primeiro',
        why: 'Captures the exact budget-allocation objection before paid traffic scales.',
      },
      {
        anchor: 'Action Plan Starter R$297',
        destination: 'https://agenticoscore.ai/answers/action-plan-starter',
        why: 'Connects offer-aware search to the first paid product.',
      },
      {
        anchor: 'quanto custa RevOps para B2B',
        destination: 'https://agenticoscore.ai/answers/quanto-custa-revops',
        why: 'Captures pricing-aware RevOps demand and routes it to the newest answer brief.',
      },
      {
        anchor: 'scorecard de prontidao comercial',
        destination: 'https://agenticoscore.ai/scorecard',
        why: 'Sends high-intent visitors directly into the diagnostic workflow.',
      },
    ],
  },
]

const answerItemList = products.flatMap((product) =>
  product.answerLinks.map((answer) => ({
    '@type': 'ListItem',
    name: `${product.name}: ${answer.title}`,
    url: answer.url,
    item: {
      '@type': 'WebPage',
      name: answer.title,
      url: answer.url,
      inLanguage: answer.locale,
      about: {
        '@type': 'SoftwareApplication',
        name: product.name,
        applicationCategory: product.type,
        url: product.siteUrl,
      },
    },
  })),
)

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl}#page`,
    url: canonicalUrl,
    name: 'AI Search Portfolio - commercial answer briefs',
    description:
      'Owned-media reference hub linking to commercial answer briefs for FaithSchool, CantuStudio and AgenticosCore.',
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: answerItemList.length,
      itemListElement: answerItemList.map((item, index) => ({
        ...item,
        position: index + 1,
      })),
    },
    significantLink: products.flatMap((product) =>
      [
        ...product.landingLinks.map((landing) => landing.url),
        ...product.citationPriority.map((priority) => priority.destination),
      ],
    ),
    about: products.map((product) => ({
      '@type': 'SoftwareApplication',
      name: product.name,
      applicationCategory: product.type,
      url: product.siteUrl,
      subjectOf: [
        { '@type': 'DataFeed', url: product.catalogUrl },
        { '@type': 'DigitalDocument', url: product.llmsUrl },
      ],
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'AI Search Portfolio', item: canonicalUrl },
    ],
  },
]

export const metadata: Metadata = {
  title: 'AI Search Portfolio - answer briefs for FaithSchool, CantuStudio and AgenticosCore',
  description:
    'Commercial answer brief hub for AI search, Google indexing and buyer research across FaithSchool, CantuStudio and AgenticosCore.',
  keywords: [
    'AI search portfolio',
    'GEO',
    'generative engine optimization',
    'answer briefs',
    'FaithSchool',
    'CantuStudio',
    'AgenticosCore',
    'homeschool planner app',
    'SATB arranger app',
    'RevOps Brasil',
  ],
  alternates: { canonical: canonicalPath },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'AI Search Portfolio - commercial answer briefs',
    description:
      'Reference links for AI search and buyer research across FaithSchool, CantuStudio and AgenticosCore.',
    url: canonicalPath,
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'pierrondi.dev AI Search Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Search Portfolio - commercial answer briefs',
    description: 'Owned-media links to the answer pages that should be discovered, crawled and cited.',
    images: ['/og'],
  },
}

function ExternalTextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={styles.externalLink}>
      <span>{children}</span>
      <ExternalLink size={15} aria-hidden="true" />
    </a>
  )
}

export default function AiSearchPortfolioPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHeader
        eyebrow="AI SEARCH REFERENCES"
        title={<>Commercial answer <span className="accent">briefs.</span></>}
        lead="Owned-media reference hub for crawlers, search engines and AI answer systems to discover the commercial pages behind FaithSchool, CantuStudio and AgenticosCore."
        chips={['GEO', 'Answer briefs', 'Commercial intent', 'Crawlable references']}
      />

      <main className={styles.main}>
        <section className={styles.overview} aria-labelledby="why-this-page">
          <div>
            <p className={styles.kicker}>Why this exists</p>
            <h2 id="why-this-page">A clean citation layer for buyer-intent answers.</h2>
            <p>
              Search engines and LLM answer systems need crawlable, consistent references. This page links from
              pierrondi.dev to the commercial answer briefs, catalogs and LLM files for the three current products,
              with product context and caveats kept visible.
            </p>
          </div>
          <div className={styles.proofGrid} aria-label="Citation quality signals">
            <div className={styles.proofItem}>
              <FileSearch size={22} aria-hidden="true" />
              <strong>{answerItemList.length}</strong>
              <span>answer pages linked</span>
            </div>
            <div className={styles.proofItem}>
              <ShieldCheck size={22} aria-hidden="true" />
              <strong>3</strong>
              <span>product entities</span>
            </div>
          </div>
        </section>

        <section className={styles.citationPlan} aria-labelledby="citation-plan-heading">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Citation targets</p>
            <h2 id="citation-plan-heading">Anchors to use when publishing external links.</h2>
            <p>
              These are the highest-value anchor and destination pairs for the first external citation wave. They
              point to answer pages first when the intent is a question, and to product landings when the intent is
              already action-oriented.
            </p>
          </div>

          <div className={styles.citationGrid}>
            {products.map((product) => (
              <article key={`${product.name}-citations`} className={styles.citationCard}>
                <h3>{product.name}</h3>
                <ul>
                  {product.citationPriority.map((priority) => (
                    <li key={`${product.name}-${priority.anchor}`}>
                      <a href={priority.destination}>{priority.anchor}</a>
                      <span>{priority.why}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.products} aria-labelledby="products-heading">
          <div className={styles.sectionHead}>
            <p className={styles.kicker}>Product references</p>
            <h2 id="products-heading">Commercial answer pages to crawl and cite.</h2>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <article key={product.name} className={styles.productCard}>
                <div className={styles.cardHeader}>
                  <p className={styles.productType}>{product.type}</p>
                  <h3>{product.name}</h3>
                  <p>{product.summary}</p>
                </div>

                <div className={styles.resourceLinks} aria-label={`${product.name} resources`}>
                  <ExternalTextLink href={product.siteUrl}>Product site</ExternalTextLink>
                  <ExternalTextLink href={product.catalogUrl}>answers.json</ExternalTextLink>
                  <ExternalTextLink href={product.llmsUrl}>llms.txt</ExternalTextLink>
                </div>

                <div className={styles.answerBlock}>
                  <h4>Buyer-intent answer briefs</h4>
                  <ul className={styles.answerList}>
                    {product.answerLinks.map((answer) => (
                      <li key={answer.url}>
                        <a href={answer.url}>
                          <span className={styles.answerTitle}>{answer.title}</span>
                          <span className={styles.answerMeta}>
                            {answer.intent} · {answer.locale}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.answerBlock}>
                  <h4>Key product landings</h4>
                  <ul className={styles.answerList}>
                    {product.landingLinks.map((landing) => (
                      <li key={landing.url}>
                        <a href={landing.url}>
                          <span className={styles.answerTitle}>{landing.title}</span>
                          <span className={styles.answerMeta}>
                            {landing.intent} · {landing.locale}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className={styles.caveat}>{product.caveat}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.nextWave} aria-labelledby="next-wave-heading">
          <p className={styles.kicker}>Next external wave</p>
          <h2 id="next-wave-heading">Owned links first, third-party links with manual review.</h2>
          <p>
            The safe order is: keep these links live on pierrondi.dev, submit the updated sitemap, then publish
            reviewed external references from appropriate channels. LinkedIn and social distribution stay manual
            because the main profile is reserved for ServiceNow and enterprise AI authority content.
          </p>
        </section>
      </main>
    </>
  )
}
