"use client"

import { useState, useCallback } from "react"
import { ActivityCard } from "@/components/activity-card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChooseSpecificButton } from "@/components/choose-specific-button"
import { MysteryButton } from "@/components/mystery-button"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronRight, Apple, Play } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { popularActivities } from "@/data/activities"
import type { Activity } from "@/data/activities"

export default function Home() {
  const [visibleActivities, setVisibleActivities] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const loadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleActivities((prev) => Math.min(prev + 4, popularActivities.length))
    setIsLoading(false)
  }

  const toggleFavorite = useCallback((activityId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(activityId)
        ? prevFavorites.filter((id) => id !== activityId)
        : [...prevFavorites, activityId],
    )
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <AnimatePresence>
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 space-y-48">
            {/* Hero Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-18%20194851-6eaRU6sjPukX7KjokZY5KBpNMeNG4r.png"
                  alt="Planit Logo"
                  width={400}
                  height={133}
                  className="w-auto h-24"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white"
              >
                <span className="text-gradient">Chase</span> the fun, <span className="text-gradient">catch</span> the memories
              </motion.div>
              <div className="h-32"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white text-center text-xl"
              >
                Discover Montreal's activities and plan your next adventure
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <div className="hover-lift-md">
                  <MysteryButton />
                </div>
                <span className="text-xl text-gray-400 my-2">or</span>
                <div className="hover-lift-md">
                  <ChooseSpecificButton>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Choose Something Specific
                  </ChooseSpecificButton>
                </div>
              </motion.div>
            </section>

            {/* App Store Section */}
            <section className="space-y-8">
              <div className="text-center space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-white"
                >
                  Coming Soon to Mobile
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-300"
                >
                  Plan your adventures on the go. Get notified when we launch.
                </motion.p>

                {/* Email Collection Form */}
                <motion.form 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="max-w-md mx-auto space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      const response = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email }),
                      })
                      
                      if (response.ok) {
                        setSubmitted(true)
                        setEmail("")
                      }
                    } catch (error) {
                      console.error('Error:', error)
                    }
                  }}
                >
                  {submitted ? (
                    <p className="text-green-400">Thanks for subscribing! We'll keep you updated.</p>
                  ) : (
                    <>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full btn-gradient">
                        Notify Me
                      </Button>
                    </>
                  )}
                </motion.form>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                  <Button 
                    className="btn-header"
                  >
                    <div className="flex items-center gap-3">
                      <Apple className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </div>
                  </Button>
                  <Button 
                    className="btn-header"
                  >
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs">Get it on</div>
                        <div className="text-sm font-semibold">Play Store</div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="text-center space-y-12 py-12">
              <h2 className="text-3xl font-bold">Trusted by Montreal's Adventure Seekers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">500+</p>
                  <p className="text-gray-300">Activities</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">50k+</p>
                  <p className="text-gray-300">Happy Users</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">100+</p>
                  <p className="text-gray-300">Locations</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">4.9</p>
                  <p className="text-gray-300">Average Rating</p>
                </div>
              </div>
            </section>

            {/* Our Mission Section */}
            <section className="text-center space-y-8 py-16">
              <h2 className="text-4xl font-bold text-gradient mb-8">Our Mission</h2>
              <div className="max-w-3xl mx-auto space-y-5 text-white">
                <p className="text-base">
                  We've all been there, the day off you've been waiting for slips by in a heartbeat due to indecision. You spend half of it debating with friends about where to go, only to end up doing... nothing. Before you know it, the day is gone, and you're left wondering where all the time went.
                </p>
                <p className="text-base">
                  At <span className="text-gradient font-semibold">PlanIT</span>, we get it. Life moves fast, and it's easy to overestimate how much time you actually have to make plans. Too often, amazing opportunities are missed simply because planning felt like too much work. That's why we're here, to make sure those precious free moments don't go to waste.
                </p>
                <p className="text-base">
                  With <span className="text-gradient font-semibold">PlanIT</span>, finding your next adventure is as easy as a few clicks. Whether it's uncovering a hidden gem in your city, matching the perfect activity to your vibe, or hitting the "Mystery Button" to challenge your inner spontaneity. We take the stress out of planning so you can focus on what really matters—living.
                </p>
                <p className="text-base font-medium text-gradient">
                  Because time is the one thing you can't get back. Let's make it count—exploring, laughing, and creating memories that stick with you long after the day is over.
                </p>
                <p className="text-base font-bold">
                  PlanIT: Make the most of now.
                </p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-8 bg-gradient-to-r from-purple-800/70 to-pink-700/70 rounded-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">Ready to Explore Montreal?</h2>
              <p className="text-lg max-w-xl mx-auto">
                Join thousands of adventure seekers and start planning your perfect Montreal experience today.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-800 hover:bg-purple-100 transition-colors mt-4">
                  Sign up now
                </Button>
              </Link>
            </section>
          </div>
        </main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

