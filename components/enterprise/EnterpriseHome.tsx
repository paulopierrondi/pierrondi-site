import HeroSection from './HeroSection'
import BioSection from './BioSection'
import OperatingModelSection from './OperatingModelSection'
import SystemsSection from './SystemsSection'
import ThemesSection from './ThemesSection'
import ProofSection from './ProofSection'
import ContactSection from './ContactSection'
import { homeCopy, type HomeLang } from './copy'

interface EnterpriseHomeProps {
  lang: HomeLang
}

export default function EnterpriseHome({ lang }: EnterpriseHomeProps) {
  const t = homeCopy[lang]

  return (
    <main className="relative z-10">
      <HeroSection {...t.hero} />
      <BioSection {...t.bio} />
      <OperatingModelSection {...t.operatingModel} />
      <SystemsSection {...t.systems} />
      <ThemesSection {...t.themes} />
      <ProofSection {...t.proof} />
      <ContactSection {...t.contact} />
    </main>
  )
}
