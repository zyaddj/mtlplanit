"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sparkles, Star } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ActivityCard } from "@/components/activity-card"
import { useLanguage } from "@/contexts/LanguageContext"
import { Badge } from "@/components/ui/badge"
import { MapPin, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { fetchGooglePlaces } from '@/lib/google-places'
import Image from "next/image"

// Mock data for activities with complete information
const allActivities = [
  {
    id: "mount-royal-hike",
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
    id: "old-port-food",
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
    id: "jazz-night",
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
    id: "botanical-garden",
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
    id: "biosphere",
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

const locations = [
  "Downtown",
  "Old Port",
  "Plateau",
  "Mile End",
  "Westmount",
  "Griffintown",
  "Little Italy",
  "Saint-Henri",
  "Côte-des-Neiges",
  "NDG",
  "Villeray",
  "Rosemont",
]

export function MysteryButton({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [budget, setBudget] = useState(50)
  const [customBudget, setCustomBudget] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [randomActivity, setRandomActivity] = useState<(typeof allActivities)[0] | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCustomBudgetChange = (value: string) => {
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setBudget(Math.min(numValue, 100))
      setCustomBudget(value)
    } else if (value === "") {
      setCustomBudget("")
    }
  }

  const handleLocationChange = (value: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(value)) {
        return prev.filter(loc => loc !== value)
      }
      return [...prev, value]
    })
  }

  const handleFindActivity = async () => {
    setLoading(true)
    try {
      const activities = await fetchGooglePlaces({
        locations: selectedLocations,
        budget: budget
      })

      if (activities && activities.length > 0) {
        const randomIndex = Math.floor(Math.random() * activities.length)
        setRandomActivity(activities[randomIndex])
        setStep(2)
      } else {
        // Handle no results
        console.error('No activities found')
      }
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = () => {
    setStep(1)
    setBudget(50)
    setCustomBudget("")
    setRandomActivity(null)
    setSelectedLocations([])
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) resetAndClose()
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
      <DialogContent 
        className="sm:max-w-[425px] dialog-background max-h-[90vh]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {step === 2 ? "Here's Your Mystery Activity!" : "Find Me Something Fun"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === 1 && (
            <>
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
                    className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-blue-500 [&_[role=slider]]:shadow-md [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-blue-600 [&_.bg-primary]:to-blue-400"
                  />
                  <div className="flex justify-between items-center text-gray-300">
                    <span className="text-sm">$0</span>
                    <span className="text-sm">$100</span>
                  </div>
                </div>
                <div className="text-center space-y-6">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
                    {budget === 100 ? "Over $100" : customBudget ? `$${customBudget}` : `$${budget.toFixed(2)}`}
                  </p>
                  <div className="mt-8">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-300 border-blue-500 hover:bg-blue-500/20"
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
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors"
                  >
                    {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform ${
                        showAdvancedFilters ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showAdvancedFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-gray-200">
                      Filter by Location(s)
                    </label>
                    <MultiSelect
                      options={locations}
                      selected={selectedLocations}
                      onChange={handleLocationChange}
                      placeholder="Select locations..."
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                className="w-full btn-gradient mt-4"
                onClick={handleFindActivity}
                disabled={loading}
              >
                {loading ? "Finding Activity..." : "Find My Mystery Activity!"}
              </Button>
            </>
          )}

          {step === 2 && randomActivity && (
            <div className="space-y-6 p-4">
              <div className="transform scale-100 origin-top">
                <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                  {/* Image Container */}
                  <div className="relative w-full aspect-video">
                    <Image
                      src={randomActivity.image}
                      alt={randomActivity.title}
                      fill
                      className="object-cover rounded-t-xl"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  </div>

                  {/* Content Container */}
                  <div className="p-6 space-y-4">
                    {/* Title and Rating */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {randomActivity.title} ✨
                      </h3>
                      <div className="flex items-center bg-black/40 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-white">
                          {randomActivity.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Category and Price */}
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 transition-colors">
                        {randomActivity.category}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-200 hover:bg-green-500/30 transition-colors">
                        {randomActivity.price}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">
                      {randomActivity.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{randomActivity.location}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <Button
                        onClick={handleFindActivity}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Try Another
                      </Button>
                      <Button
                        onClick={() => window.open(randomActivity.googleMapsUrl, '_blank')}
                        className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Open Maps
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Over Button */}
              <div className="flex justify-center">
                <Button
                  onClick={resetAndClose}
                  variant="outline"
                  className="mt-4 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Start Over
                </Button>
              </div>
            </div>
          )}
        </div>

        {showAdvancedFilters && (
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(false)}
              className="text-white hover:bg-white/10"
            >
              Done with Filters
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

