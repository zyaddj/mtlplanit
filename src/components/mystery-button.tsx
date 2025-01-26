"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"
import { getRandomActivity } from "@/lib/places-api"
import { ActivityCard } from "./activity-card"
import { useLanguage } from "@/contexts/LanguageContext"

export function MysteryButton({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activity, setActivity] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const randomActivity = await getRandomActivity()
      setActivity(randomActivity)
      setIsOpen(true)
    } catch (error) {
      console.error('Error getting random activity:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        size="lg"
        onClick={handleClick}
        disabled={loading}
        className="btn-gradient text-base px-8 py-3 h-auto shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-pink-500 to-white hover:from-pink-600 hover:to-white/90 text-purple-900 font-semibold"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {loading ? "Finding..." : (children || t('mysteryButton'))}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] dialog-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gradient">
              Here's Your Mystery Activity!
            </DialogTitle>
          </DialogHeader>
          {activity && (
            <ActivityCard
              {...activity}
              isFavorite={false}
              onToggleFavorite={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

