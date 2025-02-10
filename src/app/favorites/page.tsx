"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ActivityCard } from "@/components/activity-card"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useAuth } from "@/contexts/AuthContext"
import { popularActivities } from "@/data/activities"
import { SignInDialog } from "@/components/auth/sign-in"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { user } = useAuth()
  const favoriteActivities = popularActivities.filter(activity => favorites.includes(activity.name))

  if (user?.isAnonymous) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4 space-y-8 text-center">
            <h1 className="text-4xl font-bold text-gradient">Your Favorites</h1>
            <div className="max-w-md mx-auto space-y-6">
              <p className="text-gray-300">
                Sign in to save and view your favorite activities.
              </p>
              <SignInDialog />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-8">
          <h1 className="text-4xl font-bold text-center text-gradient">Your Favorites</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                {...activity}
                isFavorite={true}
                onToggleFavorite={() => {}}
              />
            ))}
          </div>

          {favoriteActivities.length === 0 && (
            <p className="text-center text-gray-400">
              No favorites yet. Start exploring to add some!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

