type RateLimitEntry = {
  count: number
  resetAt: number
}

class MemoryRateLimit {
  private store = new Map<string, RateLimitEntry>()

  constructor(
    private maxRequests: number,
    private windowMs: number,
  ) {}

  private now() {
    return Date.now()
  }

  private cleanup() {
    const now = this.now()
    for (const [key, entry] of this.store) {
      if (entry.resetAt <= now) {
        this.store.delete(key)
      }
    }
  }

  check(key: string): { allowed: boolean; retryAfter: number } {
    this.cleanup()

    const now = this.now()
    const entry = this.store.get(key)

    if (!entry || entry.resetAt <= now) {
      this.store.set(key, {
        count: 1,
        resetAt: now + this.windowMs,
      })
      return { allowed: true, retryAfter: 0 }
    }

    if (entry.count >= this.maxRequests) {
      return {
        allowed: false,
        retryAfter: Math.ceil((entry.resetAt - now) / 1000),
      }
    }

    entry.count += 1
    return { allowed: true, retryAfter: 0 }
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function createRateLimit(maxRequests: number, windowMs: number) {
  return new MemoryRateLimit(maxRequests, windowMs)
}
