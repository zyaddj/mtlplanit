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
        />
        <ActivityCard
          title="Old Port"
          category="Sightseeing"
          price="Varies"
          image="/placeholder.svg?height=200&width=300"
          rating={4.6}
        />
        <ActivityCard
          title="Botanical Garden"
          category="Nature"
          price="$20"
          image="/placeholder.svg?height=200&width=300"
          rating={4.7}
        />
        <ActivityCard
          title="Jean-Talon Market"
          category="Food & Shopping"
          price="Free Entry"
          image="/placeholder.svg?height=200&width=300"
          rating={4.5}
        />
        <ActivityCard
          title="Notre-Dame Basilica"
          category="Architecture"
          price="$10"
          image="/placeholder.svg?height=200&width=300"
          rating={4.9}
        />
        <ActivityCard
          title="La Ronde Amusement Park"
          category="Entertainment"
          price="$50"
          image="/placeholder.svg?height=200&width=300"
          rating={4.2}
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

