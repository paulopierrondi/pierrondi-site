import type { Metadata } from 'next'
import FsoExperience from './FsoExperience'

const TITLE = 'ServiceNow Implementation Agents — AI-built FSO, end to end'
const DESCRIPTION =
  'A blueprint for using LLM coding agents (Claude Code / Codex) + the ServiceNow Fluent SDK and MCP to implement Financial Services Operations (FSO) end to end — an AI implementation team that authors the build while native Now Assist reasons at runtime, every change governed.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'ServiceNow',
    'Financial Services Operations',
    'FSO',
    'FSDM',
    'Fluent SDK',
    'ServiceNow MCP',
    'Claude Code',
    'OpenAI Codex',
    'AI Agents',
    'Now Assist for FSO',
    'AI Control Tower',
    'implementation acceleration',
    'CSDM',
    'Card Dispute',
    'Paulo Pierrondi',
  ],
  authors: [{ name: 'Paulo Pierrondi' }],
  creator: 'Paulo Pierrondi',
  publisher: 'pierrondi.dev',
  alternates: { canonical: 'https://www.pierrondi.dev/fso' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.pierrondi.dev/fso',
    siteName: 'pierrondi.dev',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'ServiceNow Implementation Agents — AI-built FSO' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'An AI implementation team that builds ServiceNow FSO end to end — coding agents author, native Now Assist reasons, every change governed.',
    images: ['/og'],
  },
}

export default function FsoPage() {
  return <FsoExperience />
}
