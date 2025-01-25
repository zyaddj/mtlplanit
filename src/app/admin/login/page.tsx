"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        if (result.error === "Too many requests, please try again later.") {
          setError("Too many login attempts. Please try again later.")
        } else {
          setError("Invalid credentials")
        }
      } else {
        router.push("/admin/emails")
      }
    } catch (error) {
      setError("An error occurred")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gradient mb-8">Admin Login</h1>
          
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-200">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <Button type="submit" className="w-full btn-gradient">
              Log In
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
} 