"use client"

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function EmailsPage() {
  const [emails, setEmails] = useState<string[]>([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('/api/subscribe')
        const data = await response.json()
        if (data.emails) {
          setEmails(data.emails)
        }
      } catch (error) {
        console.error('Error fetching emails:', error)
      }
    }

    if (session) {
      fetchEmails()
    }
  }, [session])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gradient">Collected Emails</h1>
            <Button 
              onClick={() => signOut()}
              className="btn-header"
            >
              Sign Out
            </Button>
          </div>
          <div className="bg-black/20 rounded-lg p-6">
            {emails.length > 0 ? (
              <ul className="space-y-2">
                {emails.map((email, index) => (
                  <li key={index} className="text-white">
                    {email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No emails collected yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 