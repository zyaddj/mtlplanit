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
import { useLanguage } from "@/contexts/LanguageContext"

export default function Home() {
  const { t } = useLanguage()
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
            <section className="text-center space-y-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center -ml-4"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe_Express_-_file__1_-removebg-preview-KvoQDS38GTuBFzQ3hBAEWX81TmuwR9.png"
                  alt="Planit Logo"
                  width={300}
                  height={100}
                  className="w-auto h-20"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tight text-white"
              >
                <span className="text-gradient">{t('slogan.chase')}. </span>
                <span className="text-gradient">{t('slogan.catch')}. </span>
                <span className="text-gradient">{t('slogan.rest')}.</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-white text-center text-xl"
              >
                {t('discover')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <div className="hover-lift-md">
                  <MysteryButton>Find Me Something Fun!</MysteryButton>
                </div>
                <span className="text-xl text-gray-400 my-2">{t('or')}</span>
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
                  {t('comingSoon')}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-gray-300"
                >
                  {t('planOnGo')}
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
                    <p className="text-green-400">{t('thanks')}</p>
                  ) : (
                    <>
                      <Input
                        type="email"
                        placeholder={t('enterEmail')}
                        className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button type="submit" className="w-full btn-gradient">
                        {t('notifyMe')}
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
                        <div className="text-xs">{t('downloadApp')}</div>
                        <div className="text-sm font-semibold">{t('appStore')}</div>
                      </div>
                    </div>
                  </Button>
                  <Button 
                    className="btn-header"
                  >
                    <div className="flex items-center gap-3">
                      <Play className="h-5 w-5" />
                      <div className="text-left">
                        <div className="text-xs">{t('getItOn')}</div>
                        <div className="text-sm font-semibold">{t('playStore')}</div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="text-center space-y-12 py-12">
              <h2 className="text-3xl font-bold">{t('trustedBy')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">500+</p>
                  <p className="text-gray-300">{t('activities')}</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">50k+</p>
                  <p className="text-gray-300">{t('happyUsers')}</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">100+</p>
                  <p className="text-gray-300">{t('locations')}</p>
                </div>
                <div className="space-y-2 hover-lift">
                  <p className="text-4xl font-bold text-gradient">4.9</p>
                  <p className="text-gray-300">{t('averageRating')}</p>
                </div>
              </div>
            </section>

            {/* Our Mission Section */}
            <section className="text-center space-y-8 py-16">
              <h2 className="text-4xl font-bold text-gradient mb-8">{t('ourMission')}</h2>
              <div className="max-w-3xl mx-auto space-y-5 text-white">
                <p className="text-base">{t('missionText1')}</p>
                <p className="text-base">{t('missionText2')}</p>
                <p className="text-base">{t('missionText3')}</p>
                <p className="text-base font-medium text-gradient">{t('missionText4')}</p>
                <p className="text-base font-bold">{t('tagline')}</p>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center space-y-8 bg-gradient-to-r from-blue-800/70 to-blue-600/70 rounded-xl p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold">{t('readyToExplore')}</h2>
              <p className="text-lg max-w-xl mx-auto">
                {t('joinThousands')}
              </p>
              <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button className="bg-gradient-to-r from-white to-white/90 text-blue-700 hover:from-white hover:to-white/95 transition-all">
                  {t('notifyMe')}
                </Button>
              </form>
            </section>
          </div>
        </main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

