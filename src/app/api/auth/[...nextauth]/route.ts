import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { createRateLimit } from "@/lib/rate-limit"

const loginRateLimit = createRateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  limit: 5 // 5 attempts
})

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Apply rate limiting
        const rateLimitResult = await loginRateLimit(req.headers?.["x-forwarded-for"] || "anonymous")
        if (rateLimitResult) return null

        // This is a basic example. In production, use environment variables
        const validUsername = "admin"
        const validPassword = "planit123"

        if (credentials?.username === validUsername && 
            credentials?.password === validPassword) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@planit.com"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
})

export { handler as GET, handler as POST } 