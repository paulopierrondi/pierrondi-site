import type { Metadata } from 'next'
import FsoExperience from './FsoExperience'

const TITLE = 'Automation-first ServiceNow implementation — FSO, IRM and AI Control Tower'
const DESCRIPTION =
  'A blueprint for using LLM coding agents, Fluent SDK, MCP, Action Fabric, IRM and AI Control Tower to implement Financial Services Operations end to end — automation-first, risk-governed, and evidence-ready.'

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
    'Action Fabric',
    'IRM',
    'Integrated Risk Management',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'FSO brings the work. IRM brings the permission. Action Fabric brings the hands. AI Control Tower governs the operating room.',
  },
}

export default function FsoPage() {
  return <FsoExperience />
}
