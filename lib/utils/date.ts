export const TZ_SP = 'America/Sao_Paulo'

const PRESETS = {
  shortDateTime: { dateStyle: 'short', timeStyle: 'short', timeZone: TZ_SP },
  blogShort: { day: '2-digit', month: 'short', year: 'numeric' },
  blogLong: { day: '2-digit', month: 'long', year: 'numeric' },
  numericFull: {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ_SP,
  },
  dayMonthTime: {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TZ_SP,
  },
} as const satisfies Record<string, Intl.DateTimeFormatOptions>

export type DatePreset = keyof typeof PRESETS

export type DateInput = Date | string | number | null | undefined

export interface FormatDateOptions {
  preset?: DatePreset
  options?: Intl.DateTimeFormatOptions
  fallback?: string
  locale?: string
}

export function formatDate(input: DateInput, opts: FormatDateOptions = {}): string {
  const fallback = opts.fallback ?? ''
  if (input === null || input === undefined) return fallback
  const date = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(date.getTime())) return fallback
  const options = opts.options ?? PRESETS[opts.preset ?? 'shortDateTime']
  return new Intl.DateTimeFormat(opts.locale ?? 'pt-BR', options).format(date)
}
