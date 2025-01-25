import rateLimit from 'express-rate-limit'
import { NextResponse } from 'next/server'

export function createRateLimit(options: {
  interval: number  // in milliseconds
  limit: number
}) {
  const rateLimitStore = new Map()

  return async function rateLimit(ip: string) {
    const now = Date.now()
    const windowStart = now - options.interval

    // Clean old entries
    for (const [key, timestamp] of rateLimitStore.entries()) {
      if (timestamp < windowStart) {
        rateLimitStore.delete(key)
      }
    }

    // Get existing timestamps for this IP
    const timestamps = rateLimitStore.get(ip) || []
    const recentTimestamps = timestamps.filter(ts => ts > windowStart)

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