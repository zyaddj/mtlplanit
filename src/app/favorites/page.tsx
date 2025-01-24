"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ActivityCard } from "@/components/activity-card"
import { useFavorites } from "@/contexts/FavoritesContext"
import { popularActivities } from "@/data/activities"

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const favoriteActivities = popularActivities.filter(activity => favorites.includes(activity.title))

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
            <p className="text-center text-gray-400">No favorites yet. Start exploring to add some!</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

