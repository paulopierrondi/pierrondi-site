import Image from 'next/image'
import Link from 'next/link'
import KimiHomeHero from '@/components/KimiHomeHero'
import LangSync from '@/components/LangSync'
import HomeContactForm from './HomeContactForm'
import { feitos } from './feitos/feitos-data'
import { homeExperienceCopy, sourceLinks, type HomeLang } from './home-experience-copy'
import styles from './page.module.css'

const contactEmail = 'pierrondi@gmail.com'

function FooterDisclaimer({ text }: { text: string }) {
  const [beforeEmail, afterEmail] = text.split('<email>')

  return (
    <>
      {beforeEmail}
      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      {afterEmail}
    </>
  )
}

export default function HomeExperience({ lang }: { lang: HomeLang }) {
  const t = homeExperienceCopy[lang]

  return (
    <main className={styles.page} data-swarm-root>
      <LangSync lang={lang} />

      <nav className={styles.nav} aria-label={t.nav.aria}>
        <a href="#top" className={styles.brand} aria-label="Paulo Pierrondi">
          PIERRONDI
        </a>
        <div className={styles.navLinks}>
          <a href="#top">{t.nav.home}</a>
          <Link href={lang === 'pt' ? '/about' : '/en/about'}>{t.nav.about}</Link>
          <Link href="/design">{t.nav.design}</Link>
          <Link href="/feitos/sada-servicenow">{t.nav.sada}</Link>
          <Link href="/feitos/agentes-governados">{t.nav.agents}</Link>
          <Link href="/feitos/llm-inferencia">{t.nav.llm}</Link>
          <Link href="/feitos/plataformas-automacao-ia">{t.nav.automation}</Link>
          <a href="#contact">{t.nav.contact}</a>
          <a
            href="https://br.linkedin.com/in/paulopierrondi"
            target="_blank"
            rel="noreferrer"
            aria-label={t.nav.linkedinAria}
          >
            <span className={styles.navIcon} aria-hidden="true">
              in
            </span>
          </a>
        </div>
      </nav>

      <KimiHomeHero copy={t.hero} />

      <section id="thesis" className={styles.focusSection} aria-labelledby="thesis-title">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader} data-swarm-reveal>
            <p className={styles.eyebrow}>{t.sections.lens.eyebrow}</p>
            <h2 id="thesis-title">{t.sections.lens.title}</h2>
            <p className={styles.sectionCopy}>{t.sections.lens.copy}</p>
          </div>
          <div className={styles.focusGrid}>
            {t.focusAreas.map((area, index) => (
              <article key={area.number} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
                <span>{area.number}</span>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="operating" className={styles.operatingSection} aria-labelledby="operating-title">
        <div className={styles.sectionInner}>
          <div className={styles.operatingLayout}>
            <div data-swarm-reveal>
              <p className={styles.eyebrow}>{t.sections.operating.eyebrow}</p>
              <h2 id="operating-title">{t.sections.operating.title}</h2>
              <p>{t.sections.operating.copy}</p>
            </div>
            <div className={styles.operatingRail}>
              {t.operatingLayers.map((layer, index) => (
                <article key={layer.label} data-swarm-reveal data-reveal-delay={index + 1}>
                  <span>{layer.label}</span>
                  <div>
                    <h3>{layer.title}</h3>
                    <p>{layer.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="themes" className={styles.themeSection} aria-labelledby="themes-title">
        <div className={styles.sectionInner}>
          <div className={`${styles.sectionHeader} ${styles.themeHeader}`} data-swarm-reveal>
            <p className={styles.eyebrow}>{t.sections.themes.eyebrow}</p>
            <h2 id="themes-title">{t.sections.themes.title}</h2>
            <p className={styles.sectionCopy}>{t.sections.themes.copy}</p>
            <div className={styles.themeIdentity} data-swarm-reveal data-reveal-delay="2" aria-hidden="true">
              <div className={styles.themePortraitFrame}>
                <Image
                  src="/assets/paulo-pierrondi-executive-neural.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 980px) 220px, 300px"
                  className={styles.themePortraitImage}
                />
                <span className={styles.themePortraitScan} />
              </div>
              <div className={styles.themeIdentityCopy}>
                <strong>Paulo Pierrondi</strong>
                <span>{t.sections.themes.identity}</span>
              </div>
            </div>
          </div>
          <div className={styles.themeGrid}>
            {t.themes.map((theme, index) => (
              <article key={theme.label} data-swarm-reveal data-swarm-tilt data-reveal-delay={index + 1}>
                <b className={styles.themeCardIndex}>{String(index + 1).padStart(2, '0')}</b>
                <span>{theme.label}</span>
                <h3>{theme.title}</h3>
                <p>{theme.copy}</p>
              </article>
            ))}
          </div>

          <div id="feitos" className={styles.achievementsBlock} aria-labelledby="feitos-title">
            <div className={styles.achievementsHeader} data-swarm-reveal>
              <p className={styles.eyebrow}>{t.sections.achievements.eyebrow}</p>
              <h3 id="feitos-title">{t.sections.achievements.title}</h3>
              <p>{t.sections.achievements.copy}</p>
            </div>
            <div className={styles.achievementGrid}>
              {feitos.map((feito, index) => {
                const card = t.sections.achievements.cards[feito.slug] ?? {
                  label: feito.cardLabel,
                  title: feito.cardTitle,
                  copy: feito.cardCopy,
                }

                return (
                  <Link
                    key={feito.slug}
                    href={`/feitos/${feito.slug}`}
                    className={styles.achievementCard}
                    style={{ animationDelay: `${index * 90}ms` }}
                    data-swarm-reveal
                    data-swarm-tilt
                    data-reveal-delay={index + 1}
                  >
                    <span className={styles.achievementIndex}>0{index + 1}</span>
                    <span className={styles.achievementLabel}>{card.label}</span>
                    <h4>{card.title}</h4>
                    <p>{card.copy}</p>
                    <span className={styles.achievementCta}>{t.sections.achievements.cta}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sourcesSection} aria-labelledby="sources-title">
        <div className={styles.sectionInner}>
          <div className={styles.sourcesLayout}>
            <div data-swarm-reveal>
              <p className={styles.eyebrow}>{t.sections.sources.eyebrow}</p>
              <h2 id="sources-title">{t.sections.sources.title}</h2>
              <p>{t.sections.sources.copy}</p>
            </div>
            <div className={styles.sourceLinks}>
              {sourceLinks.map((source, index) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  data-swarm-reveal
                  data-reveal-delay={index + 1}
                >
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
        <div className={styles.contactNeuralField} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.contactLayout}>
            <div className={styles.contactPitch} data-swarm-reveal>
              <p className={styles.eyebrow}>{t.sections.contact.eyebrow}</p>
              <h2 id="contact-title">{t.sections.contact.title}</h2>
              <p>{t.sections.contact.copy}</p>
              <div className={styles.contactProof}>
                {t.sections.contact.proof.map((proof) => (
                  <span key={proof}>{proof}</span>
                ))}
              </div>
            </div>
            <HomeContactForm copy={t.form} />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{t.footer.site}</span>
        <span>
          <FooterDisclaimer text={t.footer.disclaimer} />
        </span>
      </footer>
    </main>
  )
}
