// Shared catalog for /apps/[slug] (canonical landing) and /apps/[slug]/[doc] (legal).
// Add a new app entry here once and both routes pick it up.

export interface AppEntry {
  name: string
  category: string
  contactSubject: string
  tagline?: string
  description?: string
  appStoreUrl?: string
  privacyMode?: 'standard' | 'localOnly' | 'aiPhotoTryOn'
}

export const APPS = {
  faithschool: {
    name: 'FaithSchool',
    category: 'Christian homeschool planning and family records app',
    contactSubject: 'FaithSchool Support',
  },
  provadoria: {
    name: 'ProvadorIA',
    category: 'AI-assisted outfit preview and style planning app',
    contactSubject: 'ProvadorIA Support',
    tagline: 'Virtual try-on with AI photo processing consent.',
    description:
      'ProvadorIA lets you preview clothing with AI before buying. Upload your photo, a clothing photo and an optional description; the ProvadorIA API and Google Gemini generate a simulated try-on result for that request.',
    privacyMode: 'aiPhotoTryOn',
  },
  voudeque: {
    name: 'VouDeQue',
    category: 'AI-assisted outfit challenge and wardrobe idea app',
    contactSubject: 'VouDeQue Support',
  },
  investcoach: {
    name: 'InvestCoach.AI',
    category: 'Financial planning and education app',
    contactSubject: 'InvestCoach Support',
  },
  mytone: {
    name: 'MyTone Studio',
    category: 'AI-assisted ringtone creation app',
    contactSubject: 'MyTone Support',
  },
  'bandle-br': {
    name: 'Bandle BR',
    category: 'Daily Brazilian music quiz app',
    contactSubject: 'Bandle BR Support',
  },
  'parabens-ia-br': {
    name: 'Parabens IA BR',
    category: 'Personalized birthday message and video app',
    contactSubject: 'Parabens IA BR Support',
  },
  adivinha: {
    name: 'Adivinha!',
    category: 'Music quiz app',
    contactSubject: 'Adivinha Support',
  },
  privytext: {
    name: 'PrivyText AI',
    category: '100% on-device private text analysis app',
    contactSubject: 'PrivyText AI Support',
    tagline: 'Private text analysis that never leaves your iPhone.',
    description:
      'PrivyText AI runs entirely on your device. No accounts, no servers, no telemetry on the text you analyze — your notes, chats and snippets stay local by design.',
  },
  // Alias: asc.toml for privytext-ios uses /apps/privytext-ai as its canonical URL.
  // Keep both slugs working so existing App Store metadata does not 404.
  'privytext-ai': {
    name: 'PrivyText AI',
    category: '100% on-device private text analysis app',
    contactSubject: 'PrivyText AI Support',
    tagline: 'Private text analysis that never leaves your iPhone.',
    description:
      'PrivyText AI runs entirely on your device. No accounts, no servers, no telemetry on the text you analyze — your notes, chats and snippets stay local by design.',
  },
  'easylearn-003': {
    name: 'EasyLearn',
    category: 'On-device flashcards and self-quiz study habit app',
    contactSubject: 'EasyLearn Support',
    tagline: 'EasyLearn turns studying into a habit.',
    description:
      'EasyLearn is a local-first study companion: flashcards, self-quizzes and a daily streak that keeps you reviewing without a backend or account.',
  },
  'novalife-001': {
    name: 'NovaLife',
    category: 'Daily wellness and routine companion app',
    contactSubject: 'NovaLife Support',
    tagline: 'NovaLife is your daily wellness companion.',
    description:
      'NovaLife is a calm, local-first wellness companion: track moods, energy, sleep and small daily wins. Data stays on your device.',
  },
  'lifttool-002': {
    name: 'LiftTool',
    category: 'Simple on-device task and routine organizer app',
    contactSubject: 'LiftTool Support',
    tagline: 'LiftTool organizes your tasks with simplicity.',
    description:
      'LiftTool is a minimal task organizer for people who want fewer dashboards and more done. Local-first, no account, no clutter.',
  },
  'flexlife-004': {
    name: 'FlexLife',
    category: 'On-device routine and habit balance app',
    contactSubject: 'FlexLife Support',
    tagline: 'FlexLife balances your routine.',
    description:
      'FlexLife helps you balance work, rest and recovery with a simple weekly view. Runs entirely on your iPhone with no account required.',
  },
  'supercode-005': {
    name: 'SuperCode',
    category: 'On-device developer notebook and snippet app',
    contactSubject: 'SuperCode Support',
    tagline: 'SuperCode is the notebook for developers.',
    description:
      'SuperCode is a fast, local-first notebook for snippets, commands and short scratch notes. Built for developers who want their notes on-device, searchable and private.',
  },
  scanvault: {
    name: 'ScanVault',
    category: 'Private on-device receipt and document scanner app',
    contactSubject: 'ScanVault Support',
    tagline: 'A private scanner cofre for your receipts and documents.',
    description:
      'ScanVault uses Apple VisionKit to scan receipts and documents directly on your iPhone or iPad. Files stay in your local cofre — no cloud upload, no account required to use the core scanner.',
    appStoreUrl: 'https://apps.apple.com/app/id6772389375',
  },
  habitdot: {
    name: 'HabitDot',
    category: 'Minimalist on-device daily habit tracker app',
    contactSubject: 'HabitDot Support',
    tagline: 'One dot a day. A quieter way to build habits.',
    description:
      'HabitDot is a minimalist daily habit tracker. Tap a dot, see your streak, keep going. Data stays on your device — no account, no sync, no noise.',
    appStoreUrl: 'https://apps.apple.com/app/id6772399435',
  },
  pawproof: {
    name: 'PawProof Pet Sitter',
    category: 'Local-first pet handoff and sitter checklist app',
    contactSubject: 'PawProof Support',
    tagline: 'Hand off your pet without losing the routine.',
    description:
      'PawProof Pet Sitter keeps the feeding, walk and medication routine on the same iPhone the sitter holds. No account, no upload — share the proof when you are back.',
    appStoreUrl: 'https://apps.apple.com/app/id6772389962',
  },
  snapread: {
    name: 'SnapRead AI Leitor',
    category: 'On-device OCR document reading app',
    contactSubject: 'SnapRead AI Leitor Support',
    tagline: 'Read printed text with your camera, on-device.',
    description:
      'SnapRead AI Leitor turns printed pages, signs and screenshots into clean readable text using your iPhone camera. OCR runs on-device — your captures never leave the phone.',
    appStoreUrl: 'https://apps.apple.com/app/id6772517083',
  },
  // Alias: original Kimi-created asc.toml referenced /apps/snapread-ai before the global-name suffix.
  'snapread-ai': {
    name: 'SnapRead AI Leitor',
    category: 'On-device OCR document reading app',
    contactSubject: 'SnapRead AI Leitor Support',
    tagline: 'Read printed text with your camera, on-device.',
    description:
      'SnapRead AI Leitor turns printed pages, signs and screenshots into clean readable text using your iPhone camera. OCR runs on-device — your captures never leave the phone.',
    appStoreUrl: 'https://apps.apple.com/app/id6772517083',
  },
  brewmate: {
    name: 'BrewMate Cafe',
    category: 'On-device coffee brewing companion app',
    contactSubject: 'BrewMate Cafe Support',
    tagline: 'Brew better coffee, one ratio at a time.',
    description:
      'BrewMate Cafe is a quiet brewing companion: pour-over recipes, timers and dose ratios that stay on your iPhone. No account, no sync, just better coffee.',
    appStoreUrl: 'https://apps.apple.com/app/id6772517662',
  },
  packsmart: {
    name: 'PackSmart Viagem',
    category: 'On-device travel packing checklist app',
    contactSubject: 'PackSmart Viagem Support',
    tagline: 'Pack faster. Forget nothing.',
    description:
      'PackSmart Viagem turns trip type, weather and length into a clean packing checklist. Lists stay on your phone — no login, no cloud, no clutter.',
    appStoreUrl: 'https://apps.apple.com/app/id6772517823',
  },
  repcount: {
    name: 'RepCount Treino',
    category: 'On-device strength training rep counter app',
    contactSubject: 'RepCount Treino Support',
    tagline: 'Count reps. Track sets. Stay focused.',
    description:
      'RepCount Treino is a minimal strength training companion: log sets, count reps and watch your progression. All data stays on your iPhone — no account required.',
    appStoreUrl: 'https://apps.apple.com/app/id6772518296',
  },
  'chroma-ai': {
    name: 'Chroma AI Paleta',
    category: 'On-device color palette generator app',
    contactSubject: 'Chroma AI Paleta Support',
    tagline: 'Build palettes from photos, on-device.',
    description:
      'Chroma AI Paleta extracts harmonious color palettes from your photos using on-device vision. Save, share and reuse palettes without ever uploading an image.',
    appStoreUrl: 'https://apps.apple.com/app/id6772518398',
  },
  siteproof: {
    name: 'SiteProof Obras',
    category: 'On-device construction punch-list app',
    contactSubject: 'SiteProof Obras Support',
    tagline: 'Punch lists that travel with the job, not the cloud.',
    description:
      'SiteProof Obras is a construction punch-list app: add items, tag rooms, share the owner handoff. Boards stay on the iPhone running the job — no account, no backend.',
    appStoreUrl: 'https://apps.apple.com/app/id6772519142',
  },
  codestash: {
    name: 'CodeStash Snippets',
    category: 'On-device developer code snippet vault app',
    contactSubject: 'CodeStash Snippets Support',
    tagline: 'A private vault for your code snippets, on your iPhone.',
    description:
      'CodeStash Snippets stores your most useful code snippets offline: instant search, language tags, Markdown export via the native share sheet. No GitHub, no Gist, no login — everything stays on your iPhone.',
  },
  diarydot: {
    name: 'DiaryDot Diário',
    category: 'Private on-device personal journal app',
    contactSubject: 'DiaryDot Diário Support',
    tagline: 'Your private personal journal, only on your iPhone.',
    description:
      'DiaryDot Diário is a private journal with daily entries, mood, energy 1-10 and tags. Optional FaceID lock. No accounts, no cloud, no auto-backup — your thoughts stay yours.',
  },
  linguagil: {
    name: 'Linguagil Flashcards',
    category: 'On-device spaced-repetition language flashcards app',
    contactSubject: 'Linguagil Flashcards Support',
    tagline: 'Language flashcards with on-device spaced repetition.',
    description:
      'Linguagil Flashcards is a privacy-first language study app with local spaced repetition, per-language streaks and decks across EN/PT/FR/DE/JA/ES and more. No tracking, no cloud — your decks stay on your iPhone.',
  },
  sommelier: {
    name: 'Sommelier Pessoal',
    category: 'Private on-device wine tasting journal app',
    contactSubject: 'Sommelier Pessoal Support',
    tagline: 'Your private wine journal, on your iPhone.',
    description:
      'Sommelier Pessoal is a private wine journal: log country, grape, rating, price and occasion for every bottle. Tags by style, region or moment. No accounts, no cloud, no analytics — your notes stay on your iPhone only.',
  },
  'caso-relampago-ai': {
    name: 'Caso Relampago AI',
    category: 'Offline mystery game with an on-device AI-style director',
    contactSubject: 'Caso Relampago AI Support',
    tagline: 'Fast mystery cases. Ask, infer, solve.',
    description:
      'Caso Relampago AI is a short-session mystery game for iPhone. Read the case, ask limited questions, use hints carefully and solve before the round ends. The game director runs on-device with deterministic local logic — no account, no internet and no data collection.',
    appStoreUrl: 'https://apps.apple.com/app/id6772540994',
    privacyMode: 'localOnly',
  },
  'mesa-de-guerra': {
    name: 'Mesa de Guerra',
    category: 'Offline strategic card wargame with on-device adaptive AI personas',
    contactSubject: 'Mesa de Guerra Support',
    tagline: '5 turnos. 3 frentes. IA com persona.',
    description:
      'Mesa de Guerra is a short-session strategic card wargame for iPhone. Choose an AI persona and difficulty, then play up to two cards per turn across three fronts. The adaptive AI runs entirely on-device with deterministic local logic — no account, no internet, no data collection. Win by controlling more fronts after five turns.',
    privacyMode: 'localOnly',
  },
  'ammosort-siege': {
    name: 'AmmoSort Siege',
    category: 'Offline tactical supply sorting puzzle game',
    contactSubject: 'AmmoSort Siege Support',
    tagline: 'Sort crates. Load bunkers. Hold the line.',
    description:
      'AmmoSort Siege is a short-session tactical sorting puzzle for iPhone. Move crates between bunkers, group supplies by type and finish each wave before pressure builds. The game runs fully on-device with no account, no ads SDK and no gameplay data collection.',
    privacyMode: 'localOnly',
  },
  // Alias: external/App Store references use the short /apps/ammosort slug and its
  // /support and /privacy doc paths. Production logs showed real 404s on those URLs
  // while the canonical entry lives under ammosort-siege. Keep both slugs working so
  // existing metadata and inbound links do not 404 (same pattern as privytext-ai/snapread-ai).
  ammosort: {
    name: 'AmmoSort Siege',
    category: 'Offline tactical supply sorting puzzle game',
    contactSubject: 'AmmoSort Siege Support',
    tagline: 'Sort crates. Load bunkers. Hold the line.',
    description:
      'AmmoSort Siege is a short-session tactical sorting puzzle for iPhone. Move crates between bunkers, group supplies by type and finish each wave before pressure builds. The game runs fully on-device with no account, no ads SDK and no gameplay data collection.',
    privacyMode: 'localOnly',
  },
} satisfies Record<string, AppEntry>

export type AppSlug = keyof typeof APPS

export function isAppSlug(slug: string): slug is AppSlug {
  return slug in APPS
}

export function getApp(slug: AppSlug): AppEntry {
  return APPS[slug]
}
