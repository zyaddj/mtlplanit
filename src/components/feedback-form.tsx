"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MessageCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addDoc(collection(db, "feedback"), {
        feedback,
        email: email || user?.email || "anonymous",
        name: name || "Anonymous",
        userId: user?.uid || "anonymous",
        createdAt: serverTimestamp(),
      })

      setSubmitted(true)
      setFeedback("")
      setEmail("")
      setName("")

      // Close dialog after 2 seconds
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
      }, 2000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 md:h-16 md:w-16 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 p-0"
          aria-label="Leave Feedback"
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] dialog-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {submitted ? "Thank You!" : "Share Your Feedback"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-6 text-gray-200">
            <p>Your feedback has been submitted successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Name (optional)
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Your name"
              />
            </div>

            {!user && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Email (optional)
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="your@email.com"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Your Feedback
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[100px] bg-white/5 border-white/10 text-white"
                placeholder="Tell us what you think..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
} 