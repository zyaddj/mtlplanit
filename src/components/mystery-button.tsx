"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sparkles } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ActivityCard } from "@/components/activity-card"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock data for activities with complete information
const allActivities = [
  {
    title: "Mount Royal Sunset Hike",
    category: "Active",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.7,
    description:
      "Experience breathtaking views of Montreal from atop Mount Royal at sunset. This moderate hike offers a perfect blend of nature and city views, culminating in a stunning panorama of the city skyline as the sun sets.",
    location: "Mount Royal Park, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
  },
  {
    title: "Old Port Food Tour",
    category: "Food & Drink",
    price: "$75",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.8,
    description:
      "Savor the flavors of Old Montreal with this guided culinary adventure. Sample local delicacies, learn about the area's rich history, and discover hidden gems in one of the city's most charming neighborhoods.",
    location: "Old Port of Montreal, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
  },
  {
    title: "Jazz Night at Upstairs Jazz Bar",
    category: "Live Music",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.6,
    description:
      "Experience Montreal's vibrant jazz scene at one of the city's most renowned venues. Enjoy live performances by local and international artists in an intimate setting with great acoustics and ambiance.",
    location: "1254 Mackay St, Montreal, QC H3G 2H4",
    googleMapsUrl: "https://goo.gl/maps/5QX7vZ7Z8Z9Z9Z9Z9",
  },
  {
    title: "Botanical Garden Tour",
    category: "Nature",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    rating: 4.6,
    description:
      "Explore the beautiful Montreal Botanical Garden with a guided tour. Discover a diverse collection of plant species from around the world, themed gardens, and the popular Insectarium. A perfect outing for nature lovers and photography enthusiasts.",
    location: "4101 Sherbrooke St E, Montreal, QC H1X 2B2",
    googleMapsUrl: "https://goo.gl/maps/7Z7Z7Z7Z7Z7Z7Z7Z7",
  },
  {
    title: "Biosphere Environmental Museum",
    category: "Museums",
    price: "$15",
    image:
      "https://images.unsplash.com/photo-1582711012153-0ef6ef75d08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.5,
    description:
      "Learn about environmental issues and sustainable solutions at this unique museum. Housed in the iconic geodesic dome from Expo 67, the Biosphere offers interactive exhibits and thought-provoking displays on climate change, biodiversity, and eco-technologies.",
    location: "160 Chemin Tour-de-l'Isle, Île Sainte-Hélène, Montreal, QC H3C 4G8",
    googleMapsUrl: "https://goo.gl/maps/8Z8Z8Z8Z8Z8Z8Z8Z8",
  },
]

export function MysteryButton({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState(50)
  const [customBudget, setCustomBudget] = useState("")
  const [randomActivity, setRandomActivity] = useState<(typeof allActivities)[0] | null>(null)

  const handleCustomBudgetChange = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setBudget(Math.min(numValue, 100))
      setCustomBudget(value)
    } else if (value === "") {
      setCustomBudget("")
    }
  }

  const findRandomActivity = () => {
    const filtered = allActivities.filter((activity) => {
      return activity.price === "Free" || Number.parseFloat(activity.price.replace("$", "")) <= budget
    })
    const randomIndex = Math.floor(Math.random() * filtered.length)
    setRandomActivity(filtered[randomIndex] || null)
    setStep(2)
  }

  const resetAndClose = () => {
    setStep(1)
    setBudget(50)
    setCustomBudget("")
    setRandomActivity(null)
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) resetAndClose()
        else setIsOpen(true)
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white/95
            font-semibold text-base px-8 py-3 h-auto 
            shadow-md hover:shadow-lg transition-all backdrop-blur-sm
            hover:from-blue-700 hover:to-blue-600"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {children || t('mysteryButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dialog-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {step === 1 ? "Set Your Budget" : "Your Mystery Activity"}
          </DialogTitle>
        </DialogHeader>
        {step === 1 ? (
          <div className="mt-4 space-y-6">
            <div className="space-y-2">
              <Slider
                value={[budget]}
                onValueChange={(value) => {
                  setBudget(value[0])
                  setCustomBudget(value[0].toFixed(2))
                }}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-purple-500 [&_[role=slider]]:shadow-md [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-purple-500 [&_.bg-primary]:to-pink-500"
              />
              <div className="flex justify-between items-center text-gray-300">
                <span className="text-sm">$0</span>
                <span className="text-sm">$100</span>
              </div>
            </div>
            <div className="text-center space-y-6">
              <p className="text-2xl font-bold text-white">
                {budget === 100 ? "Over $100" : customBudget ? `$${customBudget}` : `$${budget.toFixed(2)}`}
              </p>
              <div className="mt-8">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-300 border-purple-500 hover:bg-purple-500/20"
                    >
                      Set Custom Amount
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 bg-gray-800 border-purple-500/50">
                    <div className="space-y-2">
                      <label htmlFor="custom-budget" className="text-sm font-medium text-gray-300">
                        Enter custom budget:
                      </label>
                      <Input
                        id="custom-budget"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="Enter amount"
                        value={customBudget}
                        onChange={(e) => handleCustomBudgetChange(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <Button
              className="w-full btn-gradient"
              onClick={findRandomActivity}
            >
              Find My Mystery Activity!
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {randomActivity ? (
              <ActivityCard 
                {...randomActivity} 
                isFavorite={false}
                onToggleFavorite={() => {}}
              />
            ) : (
              <p className="text-center text-gray-300">
                No activities found within your budget. Try increasing your budget or try again.
              </p>
            )}
            <Button
              className="w-full btn-gradient"
              onClick={resetAndClose}
            >
              Start Over
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

