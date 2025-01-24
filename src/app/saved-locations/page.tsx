"use client"

import { ActivityCard } from "@/components/activity-card"
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
import Link from 'next/link'

export default function SavedLocations() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-white flex items-center justify-center">
        <MapPin className="mr-2 h-8 w-8 text-purple-400" />
        Saved Locations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActivityCard
          title="Mount Royal Park"
          category="Nature"
          price="Free"
          image="/placeholder.svg?height=200&width=300"
          rating={4.8}
          description="A beautiful urban park with panoramic views of Montreal"
          location="Mount Royal, Montreal"
          googleMapsUrl="https://goo.gl/maps/mountroyal"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
        <ActivityCard
          title="Old Port"
          category="Sightseeing"
          price="Varies"
          image="/placeholder.svg?height=200&width=300"
          rating={4.6}
          description="Historic waterfront area with shops, restaurants, and activities"
          location="Old Port, Montreal"
          googleMapsUrl="https://goo.gl/maps/oldport"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
        <ActivityCard
          title="Botanical Garden"
          category="Nature"
          price="$20"
          image="/placeholder.svg?height=200&width=300"
          rating={4.7}
          description="Beautiful gardens featuring diverse plant collections and themed areas"
          location="4101 Sherbrooke St E, Montreal"
          googleMapsUrl="https://goo.gl/maps/botanical"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
        <ActivityCard
          title="Jean-Talon Market"
          category="Food & Shopping"
          price="Free Entry"
          image="/placeholder.svg?height=200&width=300"
          rating={4.5}
          description="Vibrant open-air market with local produce and specialty foods"
          location="7070 Henri Julien Ave, Montreal"
          googleMapsUrl="https://goo.gl/maps/jeantalon"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
        <ActivityCard
          title="Notre-Dame Basilica"
          category="Architecture"
          price="$10"
          image="/placeholder.svg?height=200&width=300"
          rating={4.9}
          description="Gothic Revival church with stunning interior architecture"
          location="110 Notre-Dame St W, Montreal"
          googleMapsUrl="https://goo.gl/maps/notredame"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
        <ActivityCard
          title="La Ronde Amusement Park"
          category="Entertainment"
          price="$50"
          image="/placeholder.svg?height=200&width=300"
          rating={4.2}
          description="Six Flags amusement park with thrilling rides and attractions"
          location="22 Chemin Macdonald, Montreal"
          googleMapsUrl="https://goo.gl/maps/laronde"
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </div>
      <div className="text-center">
        <Link href="/" passHref>
          <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

