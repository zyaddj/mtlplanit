"use client"

import { useState, useCallback } from "react"
import { ActivityCard } from "@/components/activity-card"
import { CategoryFilter } from "@/components/category-filter"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChooseSpecificButton } from "@/components/choose-specific-button"
import { MysteryButton } from "@/components/mystery-button"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"
import { TypeAnimation } from "react-type-animation"
import { popularActivities } from "@/data/activities"
import type { Activity } from "@/data/activities"

export default function Home() {
  const [visibleActivities, setVisibleActivities] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

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
                className="text-4xl font-bold tracking-tight"
              >
                <TypeAnimation
                  sequence={[
                    "Chase the fun, catch the memories",
                    1000,
                    "Plan the adventure, live the story",
                    1000,
                    "Explore the city, create moments",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                  className="text-gradient"
                />
              </motion.div>
              <div className="h-32"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white text-center text-xl"
              >
                Discover Montreal's <span className="text-gradient">best</span> activities and{" "}
                <span className="text-gradient">plan</span> your next adventure
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

            {/* Popular Now Section */}
            <section className="space-y-8">
              <div className="text-center space-y-3">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold font-serif text-white"
                  style={{ fontSize: "calc(2rem * 0.7)" }}
                >
                  Popular picks <span className="text-orange-400">🔥</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-300"
                  style={{ fontSize: "calc(1.125rem * 0.7)" }}
                >
                  See what fellow Planit users are loving right now
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {popularActivities.slice(0, visibleActivities).map((activity: Activity, index: number) => (
                  <div key={index} className="hover-lift-sm">
                    <ActivityCard
                      {...activity}
                      isFavorite={favorites.includes(activity.title)}
                      onToggleFavorite={() => toggleFavorite(activity.title)}
                    />
                  </div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center pt-4 flex items-center justify-center gap-4"
              >
                <Link href="/experiences">
                  <Button size="lg" className="btn-gradient hover-lift-sm">
                    Explore all experiences
                  </Button>
                </Link>
                {visibleActivities < popularActivities.length && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={loadMore}
                    disabled={isLoading}
                    className="hover:bg-white/10 transition-colors rounded-full p-2"
                  >
                    <ChevronRight className={`h-6 w-6 ${isLoading ? "animate-spin" : "animate-bounce"}`} />
                  </Button>
                )}
              </motion.div>
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
              <div className="max-w-3xl mx-auto space-y-6 text-white">
                <p className="text-lg">
                  We've all been there—days off that slip through your fingers because you don't know what to do, or
                  endless back-and-forth debates with friends about where to go. Before you know it, your free time is
                  gone, and all you're left with is the regret of another wasted day.
                </p>
                <p className="text-lg">
                  At PlanIT, we're on a mission to change that. We understand how easy it is to overestimate how much
                  time you have left, putting off adventures and missing out on the moments that really matter. That's
                  why we've built a platform to take the indecision and hassle out of planning, so you can focus on
                  making the most of your time.
                </p>
                <p className="text-lg">
                  Whether it's uncovering hidden gems in your city, finding the perfect activity for your mood, or
                  hitting the "Mystery Button" for an instant adventure, PlanIT is here to help you say goodbye to
                  wasted days and hello to unforgettable memories.
                </p>
                <p className="text-xl font-semibold text-gradient">
                  Because time is precious, and the best way to honor it is to live it fully—exploring, laughing, and
                  creating moments you'll cherish forever.
                </p>
                <p className="text-lg font-bold">PlanIT: don't waste the time you have, plan the time you want.</p>
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

