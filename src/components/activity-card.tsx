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

export interface ActivityCardProps extends Activity {
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
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
      <div className="relative rounded-xl bg-blue-950/20 border border-blue-800/30 hover:border-blue-700/50 transition-all">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-5 w-5 transition-colors ${
                favorites.includes(id)
                  ? "fill-pink-500 text-pink-500 hover:fill-white hover:text-white" 
                  : "hover:fill-pink-500 hover:text-pink-500"
              }`}
            />
          </Button>
          {showFeedback && (
            <div className="absolute top-2 left-12 bg-black/70 text-white text-sm py-1 px-3 rounded-md z-10">
              {favorites.includes(id) ? 'Added to favorites!' : 'Removed from favorites'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <Badge className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm border-white/10 text-xs">{price}</Badge>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg text-white group-hover:text-purple-400 transition-colors line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white text-xs">
              {category}
            </Badge>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm text-gray-400">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white text-xs py-1 h-auto"
              onClick={() => setIsOpen(true)}
            >
              View Details
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white text-xs py-1 h-auto"
              onClick={openGoogleMaps}
            >
              Open on Maps
            </Button>
          </div>
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
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-white/5 text-white">
                {category}
              </Badge>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-lg text-white font-semibold">{rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-sm text-gray-300">{description}</p>
            <div className="flex items-center text-gray-300">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-sm">{location}</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-white">{price}</span>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Comments</h4>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {comments.map((c, index) => (
                  <div key={index} className="bg-white/10 p-2 rounded-md text-sm text-gray-300">
                    {c}
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                <Textarea
                  placeholder="Leave a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="flex-grow bg-white/5 border-white/10 text-white"
                />
                <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

