import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/#person`,
      '@type': 'Person',
      name: 'Paulo Pierrondi',
      givenName: 'Paulo',
      familyName: 'Pierrondi',
      url: SITE_URL,
      image: `${SITE_URL}/og`,
      email: 'pierrondi@gmail.com',
      jobTitle: 'Enterprise Account Director & AI/Automation Architect',
      description:
        'Arquiteto de IA e automação, full-stack builder e Enterprise Account Director (Technical Account Executive) na ServiceNow. Constrói sistemas multi-agente, plataformas de automação, apps e frameworks — SADA, AgentOps, LLM inference, dados e workflows corporativos.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
        addressRegion: 'SP',
        addressLocality: 'São Paulo',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'ServiceNow',
        url: 'https://www.servicenow.com/',
      },
      knowsAbout: [
        'ServiceNow',
        'Now Assist',
        'AI Agents',
        'AgentOps',
        'LLM inference',
        'LLMOps',
        'CSDM',
        'CMDB',
        'Enterprise AI governance',
        'Workflow automation',
      ],
      sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
    },
    {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: 'pierrondi.dev',
      url: SITE_URL,
      logo: `${SITE_URL}/pierrondi-logo-1024.png`,
      email: 'pierrondi@gmail.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'business inquiries',
        email: 'pierrondi@gmail.com',
        availableLanguage: ['pt-BR', 'en'],
      },
      founder: { '@id': `${SITE_URL}/#person` },
      owns: [
        {
          '@type': 'SoftwareApplication',
          name: 'FaithSchool',
          url: 'https://faithschool.app',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web, iOS',
          sameAs: ['https://faithschool.app/answers.json', 'https://faithschool.app/llms.txt'],
        },
        {
          '@type': 'SoftwareApplication',
          name: 'CantuStudio',
          url: 'https://cantustudio.app',
          applicationCategory: 'MultimediaApplication',
          operatingSystem: 'Web',
          sameAs: ['https://cantustudio.app/answers.json', 'https://cantustudio.app/llms.txt'],
        },
        {
          '@type': 'SoftwareApplication',
          name: 'AgenticosCore',
          url: 'https://agenticoscore.ai',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          sameAs: ['https://agenticoscore.ai/answers.json', 'https://agenticoscore.ai/llms.txt'],
        },
      ],
      sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
    },
    {
      '@id': `${SITE_URL}/#website`,
      '@type': 'WebSite',
      name: 'pierrondi.dev',
      url: SITE_URL,
      inLanguage: ['pt-BR', 'en-US'],
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: { '@id': `${SITE_URL}/#person` },
      potentialAction: {
        '@type': 'ContactAction',
        target: `${SITE_URL}/#contact`,
        name: 'Contato por email',
      },
    },
  ],
}

export default function SiteJsonLd() {
  return <JsonLd data={siteSchema} />
}
