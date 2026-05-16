// Lightweight logger for pierrondi-site (no pino dependency)
const isDev = process.env.NODE_ENV !== 'production'

type LogFn = (msg: string, data?: Record<string, unknown>) => void

function makeLog(level: string): LogFn {
  return (msg, data) => {
    if (!isDev && level === 'debug') return
    const prefix = `[${level.toUpperCase()}]`
    data ? console.log(prefix, msg, data) : console.log(prefix, msg)
  }
}

export const logger = {
  debug: makeLog('debug'),
  info: makeLog('info'),
  warn: makeLog('warn'),
  error: makeLog('error'),
  child: (_bindings: Record<string, unknown>) => logger,
}

export type Logger = typeof logger

export function childLogger(_bindings: Record<string, unknown>): Logger {
  return logger
}
