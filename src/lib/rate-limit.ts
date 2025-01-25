import rateLimit from 'express-rate-limit'
import { NextResponse } from 'next/server'

export function createRateLimit(options: {
  interval: number  // in milliseconds
  limit: number
}) {
  const rateLimitStore = new Map<string, number[]>()

  return async function rateLimit(ip: string) {
    const now = Date.now()
    const windowStart = now - options.interval

    // Clean old entries
    for (const [key, timestamps] of rateLimitStore.entries()) {
      // Ensure we're working with numbers and compare each timestamp
      const validTimestamps = timestamps
        .map(ts => Number(ts))
        .filter(ts => !isNaN(ts) && ts >= windowStart)

      if (validTimestamps.length === 0) {
        rateLimitStore.delete(key)
      } else {
        rateLimitStore.set(key, validTimestamps)
      }
    }

    // Get existing timestamps for this IP
    const timestamps: number[] = rateLimitStore.get(ip) || []
    const recentTimestamps = timestamps
      .map(ts => Number(ts))
      .filter(ts => !isNaN(ts) && ts >= windowStart)

    if (recentTimestamps.length >= options.limit) {
      return NextResponse.json(
        { error: 'Too many requests, please try again later.' },
        { status: 429 }
      )
    }

    // Add current timestamp
    recentTimestamps.push(now)
    rateLimitStore.set(ip, recentTimestamps)
    return null
  }
} 