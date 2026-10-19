import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { classifyConversionClick, trackGa4Conversion } from '../lib/ga4-conversions.ts'
import { trackEvent } from '../lib/analytics.ts'

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

function installBrowser({ consent = 'all', pathname = '/contato' } = {}) {
  const events = []
  const store = new Map(consent ? [['cookie-consent', consent]] : [])
  globalThis.window = {
    location: new URL(`https://www.pierrondi.dev${pathname}`),
    localStorage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
    },
    gtag: (...args) => {
      events.push(args)
    },
  }
  globalThis.document = { referrer: '' }
  return events
}

test('engagement links emit cta_engajamento_click with the current page as source', () => {
  const cases = [
    ['/engajamento', '/feitos', '/feitos'],
    ['/engajamento/', '/', '/'],
    ['/en/engajamento', '/en', '/en'],
    ['/en/engajamento/', '/en/feitos', '/en/feitos'],
    ['/engajamento?ref=nav#modelo', '/atuacao', '/atuacao'],
    ['https://www.pierrondi.dev/engajamento', '/answers/como-medir-resultado-de-ia-operacional', '/answers/como-medir-resultado-de-ia-operacional'],
    ['https://pierrondi.dev/en/engajamento', '/en/answers/fractional-vs-consultancy-vs-agency', '/en/answers/fractional-vs-consultancy-vs-agency'],
    ['http://localhost:3000/engajamento', '/', '/'],
  ]

  for (const [href, page, source] of cases) {
    assert.deepEqual(classifyConversionClick(href, page), {
      event: 'cta_engajamento_click',
      params: { source },
    })
  }
})

test('whatsapp links emit whatsapp_click with the current page', () => {
  assert.deepEqual(classifyConversionClick('https://wa.me/5511996262975?text=ola', '/contato'), {
    event: 'whatsapp_click',
    params: { page: '/contato' },
  })
  assert.deepEqual(classifyConversionClick('https://www.wa.me/5511996262975', '/en'), {
    event: 'whatsapp_click',
    params: { page: '/en' },
  })
  assert.deepEqual(classifyConversionClick('//wa.me/5511996262975', 'https://www.pierrondi.dev/feitos'), {
    event: 'whatsapp_click',
    params: { page: '/feitos' },
  })
})

test('unrelated, off-site, and non-link targets are ignored', () => {
  const ignored = [
    '/sprint',
    '/engajamentos',
    '/blog/engajamento',
    '/contato',
    '#contact',
    'mailto:pierrondi@gmail.com',
    'https://api.whatsapp.com/send?phone=5511996262975',
    'https://evil.example/engajamento',
    'https://evil.example/redirect?to=https://wa.me/5511996262975',
    '//evil.example/engajamento',
  ]
  for (const href of ignored) {
    assert.equal(classifyConversionClick(href, '/'), null, href)
  }
})

test('gtag conversion events respect cookie-consent and the lead forms', () => {
  const granted = installBrowser({ consent: 'all', pathname: '/feitos' })
  trackGa4Conversion('cta_engajamento_click', { source: '/feitos' })
  trackGa4Conversion('whatsapp_click', { page: '/feitos' })
  assert.deepEqual(granted, [
    ['event', 'cta_engajamento_click', { source: '/feitos' }],
    ['event', 'whatsapp_click', { page: '/feitos' }],
  ])

  const leads = installBrowser({ consent: 'all', pathname: '/contato' })
  trackEvent('Contact_Form_Submitted', { form: 'contato_page' })
  trackEvent('Contact_Form_Submitted', { form: 'home_v2', language: 'pt' })
  assert.equal(leads[0][1], 'generate_lead')
  assert.equal(leads[0][2].form, 'contato_page')
  assert.equal(leads[1][1], 'generate_lead')
  assert.equal(leads[1][2].form, 'home_v2')

  const essential = installBrowser({ consent: 'essential', pathname: '/' })
  trackGa4Conversion('whatsapp_click', { page: '/contato' })
  trackEvent('Contact_Form_Submitted', { form: 'home_v2' })
  assert.deepEqual(essential, [])

  const missing = installBrowser({ consent: null })
  trackGa4Conversion('cta_engajamento_click', { source: '/' })
  assert.deepEqual(missing, [])

  const noGtag = installBrowser({ consent: 'all' })
  delete globalThis.window.gtag
  trackGa4Conversion('whatsapp_click', { page: '/' })
  assert.deepEqual(noGtag, [])

  const other = installBrowser({ consent: 'essential', pathname: '/obrigado' })
  trackEvent('ThankYou_Viewed', { nextStep: 'reply-or-whatsapp' })
  assert.equal(other[0][1], 'lead_confirmation_viewed')
})

test('shared document mounts one delegated listener and keeps the single root gtag config', async () => {
  const [layout, listener, ga, contato, home, sitemap] = await Promise.all([
    read('components/SiteRootDocument.tsx'),
    read('components/Ga4ConversionListener.tsx'),
    read('components/GoogleAnalytics.tsx'),
    read('app/contato/ContatoForm.tsx'),
    read('components/home-v2/sections/ContactSection.tsx'),
    read('app/sitemap.ts'),
  ])

  assert.match(layout, /<Ga4ConversionListener \/>/)
  assert.equal((layout.match(/gtag\('config',/g) ?? []).length, 1)
  assert.equal((layout.match(/googletagmanager\.com\/gtag\/js\?id=/g) ?? []).length, 1)
  assert.doesNotMatch(ga, /gtag\(\s*['"]config['"]/)
  assert.doesNotMatch(listener, /gtag\(\s*['"]config['"]/)
  assert.match(ga, /subscribeToAnalyticsConsent\(window,\s*window\.localStorage\)/)
  assert.match(listener, /document\.addEventListener\('click', onClick, true\)/)
  assert.match(listener, /classifyConversionClick\(href, window\.location\.pathname\)/)
  assert.match(contato, /trackEvent\('Contact_Form_Submitted', \{ form: 'contato_page' \}\)/)
  assert.match(home, /trackEvent\('Contact_Form_Submitted', \{ form: 'home_v2', language: lang \}\)/)
  assert.doesNotMatch(sitemap, /path:\s*'\/sprint'/)
  for (const source of [layout, listener, ga]) {
    assert.doesNotMatch(source, /@type': 'Product'/)
    assert.doesNotMatch(source, /@type': 'Offer'/)
  }
})
