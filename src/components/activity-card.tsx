"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, Send, Heart } from "lucide-react"
import Image from "next/image"
import { Activity } from "@/data/activities"
import { useAuth } from '@/contexts/AuthContext'
import { SignInDialog } from "@/components/auth/sign-in"
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useFavorites } from "@/contexts/FavoritesContext"

interface ActivityCardProps {
  id: string
  title: string
  category: string
  price: string
  image: string
  rating: number
  description: string
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
  googleMapsUrl: string
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function ActivityCard({
  id,
  title,
  category,
  price,
  image,
  rating,
  description,
  location,
  coordinates,
  googleMapsUrl,
  isFavorite,
  onToggleFavorite,
}: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const { user } = useAuth()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<string[]>([])
  const { favorites, toggleFavorite } = useFavorites()
  const [showFeedback, setShowFeedback] = useState(false)

  const openGoogleMaps = () => {
    window.open(googleMapsUrl, "_blank")
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment("")
    }
  }

  const handleSuccessfulSignIn = async () => {
    setShowAuthPrompt(false)
    await toggleFavorite(id)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (user?.isAnonymous || !user) {
      setShowAuthPrompt(true)
      return
    }

    await toggleFavorite(id)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2000)
  }

  return (
    <>
      <div className="bg-white/10 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="rounded-md mb-4"
        />
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-white">{title} 🌟</h3>
          <button onClick={handleFavoriteClick} className="text-red-500 hover:text-red-600">
            <Heart className={`w-6 h-6 ${favorites.includes(id) ? 'fill-current' : ''}`} />
          </button>
        </div>
        <p className="text-gray-300 mb-2">{category}</p>
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 w-5 h-5 mr-1" />
          <span className="text-white">{rating.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium"
          >
            View Details 📜
          </Button>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 transition-colors"
          >
            Open Maps 🗺️
          </a>
        </div>
      </div>

      {/* Auth Prompt Dialog */}
      <Dialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt}>
        <DialogContent className="sm:max-w-[425px] dialog-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Sign In Required
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-300">
            Please sign in to add activities to your favorites.
          </p>
          <div className="flex justify-center gap-4">
            <SignInDialog onSignInSuccess={handleSuccessfulSignIn} />
            <Button
              variant="outline"
              onClick={() => setShowAuthPrompt(false)}
              className="btn-header"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-gradient-to-b from-gray-900/95 to-black/95 border border-gray-800/50 shadow-xl backdrop-blur-sm p-6 rounded-xl">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {title} ✨
            </DialogTitle>
            
            {/* Price & Rating Banner */}
            <div className="flex justify-center gap-6 text-sm">
              <Badge className="px-3 py-1 bg-green-500/20 text-green-400 border-green-500/30">
                {price}
              </Badge>
              <Badge className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Star className="w-4 h-4 mr-1 inline" />
                {rating.toFixed(1)}
              </Badge>
            </div>
          </DialogHeader>

          {/* Main Content */}
          <div className="mt-6 space-y-6">
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-800/50">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Description & Location */}
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-gray-300">
                {description}
              </p>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="text-sm">{location}</p>
              </div>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {category}
              </Badge>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
              >
                Try Another 🎲
              </Button>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-emerald-500/20">
                  Open Maps 🗺️
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

