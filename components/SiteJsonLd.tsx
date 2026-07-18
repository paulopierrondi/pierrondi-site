import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@id': `${SITE_URL}/#organization`,
      '@type': 'Organization',
      name: 'pierrondi.dev',
      alternateName: 'Paulo Pierrondi Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/og`,
      founder: { '@id': `${SITE_URL}/#person` },
      knowsAbout: [
        'Enterprise AI operating models',
        'ServiceNow',
        'AgentOps',
        'AI governance',
        'Workflow automation',
        'Digital product engineering',
      ],
    },
    {
      '@id': `${SITE_URL}/#person`,
      '@type': 'Person',
      name: 'Paulo Pierrondi',
      givenName: 'Paulo',
      familyName: 'Pierrondi',
      url: `${SITE_URL}/paulo`,
      image: `${SITE_URL}/assets/paulo-pierrondi-executive-neural.jpg`,
      email: 'pierrondi@gmail.com',
      jobTitle: 'Technical Account Executive',
      description:
        'Technical Account Executive na ServiceNow, arquiteto de IA e full-stack builder. Constrói sistemas multi-agente, plataformas de automação, apps e frameworks com governança e trilhas de evidência.',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BR',
      },
      worksFor: {
        '@id': 'https://www.servicenow.com/#organization',
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
        'Full-stack engineering',
        'Workflow automation',
      ],
      subjectOf: [
        { '@id': `${SITE_URL}/portfolio#collection` },
        { '@id': `${SITE_URL}/feitos/sada-servicenow#work` },
      ],
      sameAs: ['https://br.linkedin.com/in/paulopierrondi'],
    },
    {
      '@id': 'https://faithschool.app/#software',
      '@type': 'SoftwareApplication',
      name: 'FaithSchool',
      url: 'https://faithschool.app',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web, iOS, iPadOS',
      creator: { '@id': `${SITE_URL}/#person` },
      subjectOf: [
        { '@type': 'DataFeed', url: 'https://faithschool.app/answers.json' },
        { '@type': 'DigitalDocument', url: 'https://faithschool.app/llms.txt' },
      ],
    },
    {
      '@id': 'https://cantustudio.app/#software',
      '@type': 'SoftwareApplication',
      name: 'CantuStudio',
      url: 'https://cantustudio.app',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web, iOS, iPadOS',
      creator: { '@id': `${SITE_URL}/#person` },
      subjectOf: [
        { '@type': 'DataFeed', url: 'https://cantustudio.app/answers.json' },
        { '@type': 'DigitalDocument', url: 'https://cantustudio.app/llms.txt' },
      ],
    },
    {
      '@id': 'https://agenticoscore.ai/#software',
      '@type': 'SoftwareApplication',
      name: 'AgenticosCore',
      alternateName: ['Agentic OS Core', 'Agent OS Core'],
      url: 'https://agenticoscore.ai',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      creator: { '@id': `${SITE_URL}/#person` },
      subjectOf: [
        { '@type': 'DataFeed', url: 'https://agenticoscore.ai/answers.json' },
        { '@type': 'DigitalDocument', url: 'https://agenticoscore.ai/llms.txt' },
      ],
    },
    {
      '@id': `${SITE_URL}/feitos/sada-servicenow#work`,
      '@type': 'CreativeWork',
      name: 'SADA — ServiceNow AI-Driven Architecture',
      description: 'Framework independente desenvolvido por Paulo Pierrondi para conectar intenção, contexto, controle, ação e evidência em IA enterprise governada.',
      url: `${SITE_URL}/feitos/sada-servicenow`,
      creator: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@id': `${SITE_URL}/#website`,
      '@type': 'WebSite',
      name: 'pierrondi.dev',
      description: 'Portfólio profissional pessoal de Paulo Pierrondi.',
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
