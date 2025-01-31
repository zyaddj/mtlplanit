"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc 
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from "@/components/ui/button"
import { Trash2, Mail } from "lucide-react"

interface FeedbackItem {
  id: string
  feedback: string
  email: string
  name: string
  userId: string
  createdAt: {
    toDate: () => Date
  }
}

export default function FeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (!session) return

    // Create a query to get feedback ordered by creation time
    const q = query(
      collection(db, "feedback"),
      orderBy("createdAt", "desc")
    )

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: FeedbackItem[] = []
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as FeedbackItem)
      })
      setFeedbackItems(items)
    })

    return () => unsubscribe()
  }, [session])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await deleteDoc(doc(db, "feedback", id))
      } catch (error) {
        console.error("Error deleting feedback:", error)
      }
    }
  }

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`
  }

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
          <h1 className="text-3xl font-bold text-gradient mb-8">Feedback Dashboard</h1>
          
          <div className="space-y-6">
            {feedbackItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-black/20 rounded-lg p-6 space-y-4 border border-blue-900/20"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-white">{item.name}</p>
                    {item.email !== "anonymous" && (
                      <button
                        onClick={() => handleEmailClick(item.email)}
                        className="flex items-center text-sm text-blue-400 hover:text-blue-300"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        {item.email}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {item.createdAt?.toDate().toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-300">{item.feedback}</p>
              </div>
            ))}

            {feedbackItems.length === 0 && (
              <p className="text-center text-gray-400">No feedback received yet.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 