import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Boxes, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/design-system/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/design-system/ui/card'
import { Badge } from '@/components/design-system/ui/badge'
import { Input } from '@/components/design-system/ui/input'
import { Switch } from '@/components/design-system/ui/switch'
import { Separator } from '@/components/design-system/ui/separator'

export const metadata: Metadata = {
  title: 'Library — Componentes reais',
  description: 'Biblioteca de componentes React prontos para uso no ecossistema Pierrondi.',
}

export default function DesignLibraryPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/design"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Design Vault
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Palette className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Component Library</h1>
          </div>
          <p className="text-body max-w-xl">
            Blocos React reutilizáveis construídos com Tailwind CSS e Framer Motion. 
            Prontos para copiar, remixar e usar em produtos e portfolios.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {[
            { label: 'Components', value: '17' },
            { label: 'Sections', value: '14' },
            { label: 'Dark Mode', value: 'Native' },
            { label: 'License', value: 'MIT' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-hairline bg-surface-card p-4">
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
              <div className="text-xs text-muted uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Component Grid */}
        <div className="space-y-16">
          {/* Buttons */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Buttons</h2>
            </div>
            <div className="rounded-xl border border-hairline bg-surface-card p-6">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="lime">Lime</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </section>

          {/* Badges */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Boxes className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Badges</h2>
            </div>
            <div className="rounded-xl border border-hairline bg-surface-card p-6">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="lime">Lime</Badge>
                <Badge variant="cyan">Cyan</Badge>
              </div>
            </div>
          </section>

          {/* Inputs */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Inputs & Controls</h2>
            </div>
            <div className="rounded-xl border border-hairline bg-surface-card p-6 space-y-4 max-w-md">
              <Input placeholder="Text input placeholder" />
              <Input placeholder="Disabled input" disabled />
              <div className="flex items-center gap-3">
                <Switch />
                <span className="text-sm text-body">Toggle switch</span>
              </div>
            </div>
          </section>

          {/* Card */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Boxes className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Card</h2>
            </div>
            <div className="max-w-sm">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-body">
                    This is the main content area of the card component, adapted for the Pierrondi visual system.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Separator */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <h2 className="text-lg font-semibold">Separator</h2>
            </div>
            <div className="rounded-xl border border-hairline bg-surface-card p-6 max-w-sm space-y-3">
              <div className="text-sm">Above the line</div>
              <Separator />
              <div className="text-sm">Below the line</div>
            </div>
          </section>

          {/* Source */}
          <section className="rounded-xl border border-hairline bg-surface-card p-6">
            <h2 className="text-lg font-semibold mb-2">Como usar</h2>
            <p className="text-body text-sm mb-4">
              Os componentes estão em <code className="text-primary">components/design-system/</code>. 
              Copie o arquivo direto para seu projeto — não precisa instalar pacote.
            </p>
            <div className="flex gap-3">
              <a
                href="https://21st.dev/community/components"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                21st.dev Community <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
