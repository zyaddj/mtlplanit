"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { SignInDialog } from "@/components/auth/sign-in";
import { useFavorites } from "@/contexts/FavoritesContext";
import Link from "next/link";

interface ActivityCardProps {
  id: string;
  name: string;
  category: string;
  cost: number;
  image_url: string;
  // rating: number;
  description: string;
  location: { display_address: string[] };
  is_free: boolean;
  latitude: number;
  longitude: number;
  time_start: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ActivityCard({
  id,
  name,
  category,
  cost,
  image_url,
  description,
  location,
  is_free,
  latitude,
  longitude,
  time_start,
  isFavorite,
  onToggleFavorite,
}: ActivityCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [showFeedback, setShowFeedback] = useState(false);

  // const openGoogleMaps = () => {
  //   const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  //   window.open(url, "_blank");
  // };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  const handleSuccessfulSignIn = async () => {
    setShowAuthPrompt(false);
    await toggleFavorite(id);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (user?.isAnonymous || !user) {
      setShowAuthPrompt(true);
      return;
    }

    await toggleFavorite(id);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <>
      <div className="flex flex-col justify-between bg-white/10 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div>
          <Image
            src={image_url ? image_url : "/no-image.jpg"}
            alt={name}
            width={300}
            height={200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className="w-full h-72 rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2 mt-4">
              <h3 className="text-xl font-bold text-white line-clamp-2">{name} 🌟</h3>
              <button onClick={handleFavoriteClick} className="text-red-500 hover:text-red-600">
                <Heart className={`w-6 h-6 ${favorites.includes(id) ? "fill-current" : ""}`} />
              </button>
            </div>
            <Badge>{category}</Badge>
            <div className="flex items-center mb-4 mt-2">
              <span className="text-white">{is_free ? "Free" : cost ? `$${cost}` : "Not Specify"}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link href={`/activities/${id}`}>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium">
                View Details 📜
              </Button>
            </Link>
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-colors"
            >
              Open Maps 🗺️
            </a>
          </div>
        </div>
      </div>

      {/* Auth Prompt Dialog */}
      <Dialog open={showAuthPrompt} onOpenChange={setShowAuthPrompt}>
        <DialogContent className="sm:max-w-[425px] dialog-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">Sign In Required</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-300">Please sign in to add activities to your favorites.</p>
          <div className="flex justify-center gap-4">
            <SignInDialog onSignInSuccess={handleSuccessfulSignIn} />
            <Button variant="outline" onClick={() => setShowAuthPrompt(false)} className="btn-header">
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-black/80 text-white rounded-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{name} 🌟</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Image src={image_url} alt={name} width={500} height={300} className="rounded-md" />
            <p className="text-lg">{description}</p>
            <p className="text-lg font-bold">Price: {cost}</p>
            <p className="text-lg">Location: {location.display_address.join(" ")}</p>
            <div className="flex justify-between items-center">
              <a
                // href={googleMapsUrl}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-500 transition-colors"
              >
                Open in Google Maps 🗺️
              </a>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-red-600 to-red-400 hover:from-red-700 hover:to-red-500 text-white font-medium"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
