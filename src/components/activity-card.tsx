"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, MapPin, Send, Heart } from "lucide-react"
import Image from "next/image"
import { Activity } from "@/data/activities"
import { MapsButton } from "./maps-button"

export interface ActivityCardProps extends Activity {
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function ActivityCard({
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
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<string[]>([])

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

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-purple-950/20 border border-purple-800/30 hover:border-purple-700/50 transition-all hover-lift">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white hover:text-pink-500 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite()
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-pink-500" : ""}`} />
          </Button>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">{location}</span>
            </div>
            <MapsButton 
              address={location}
              name={title}
            />
          </div>
          <div className="flex justify-between gap-2 mt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs py-1 h-auto"
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-black/40 to-black/60 backdrop-blur-sm border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">{title}</DialogTitle>
          </DialogHeader>
          <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
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

