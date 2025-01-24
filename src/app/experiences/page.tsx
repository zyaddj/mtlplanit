"use client"

import { useState } from "react"
import { ActivityCard } from "@/components/activity-card"
import { CategoryFilter } from "@/components/category-filter"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { popularActivities } from "@/data/activities"
import type { Activity } from "@/data/activities"

const experiences = [
  {
    title: "Jazz Festival VIP Experience",
    category: "Music",
    price: "$90",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.9,
    description: "Get exclusive access to Montreal's renowned Jazz Festival with VIP passes.",
    location: "Place des Arts, Montreal",
  },
  {
    title: "Old Montreal Food Tour",
    category: "Culinary",
    price: "$75",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.8,
    description: "Savor the flavors of Old Montreal with this guided culinary adventure.",
    location: "Old Montreal, Montreal",
  },
  {
    title: "Mount Royal Sunset Hike",
    category: "Outdoor",
    price: "Free",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.7,
    description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
    location: "Mount Royal Park, Montreal",
  },
  {
    title: "Botanical Garden Tour",
    category: "Nature",
    price: "$20",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    rating: 4.6,
    description: "Explore the beautiful Montreal Botanical Garden with a guided tour.",
    location: "Montreal Botanical Garden, Montreal",
  },
  {
    title: "Notre-Dame Basilica Light Show",
    category: "Arts & Culture",
    price: "$30",
    image:
      "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.8,
    description: "Witness the stunning AURA light show at the historic Notre-Dame Basilica.",
    location: "Notre-Dame Basilica, Montreal",
  },
  {
    title: "St. Lawrence River Cruise",
    category: "Sightseeing",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    rating: 4.5,
    description: "Enjoy a scenic cruise along the St. Lawrence River and see Montreal from the water.",
    location: "Old Port of Montreal, Montreal",
  },
]

export default function ExperiencesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredActivities, setFilteredActivities] = useState(popularActivities)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = popularActivities.filter(activity => 
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredActivities(filtered)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-8">
          <h1 className="text-4xl font-bold text-center text-gradient">All Experiences</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Search experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                {...activity}
                isFavorite={false}
                onToggleFavorite={() => {}}
              />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <p className="text-center text-gray-400">No experiences found. Try a different search term.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

