import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { createRateLimit } from '@/lib/rate-limit'

const subscribeRateLimit = createRateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  limit: 3 // 3 attempts per hour
})

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await subscribeRateLimit(
      req.headers.get("x-forwarded-for") || "anonymous"
    )
    if (rateLimitResult) return rateLimitResult

    const { email } = await req.json()
    
    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Path to store emails
    const filePath = path.join(process.cwd(), 'emails.json')

    // Read existing emails
    let emails = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8')
      emails = JSON.parse(fileContent)
    }

    // Add new email if it doesn't exist
    if (!emails.includes(email)) {
      emails.push(email)
      fs.writeFileSync(filePath, JSON.stringify(emails, null, 2))
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'emails.json')
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ emails: [] })
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const emails = JSON.parse(fileContent)

    return NextResponse.json({ emails })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 