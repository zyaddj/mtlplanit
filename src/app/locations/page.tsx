"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const locations = [
  {
    name: "Old Port",
    image: "https://images.unsplash.com/photo-1519178614-68673b201f36?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
  {
    name: "Mount Royal",
    image:
      "https://images.unsplash.com/photo-1578948856697-db91d246b7b1?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
  {
    name: "Plateau Mont-Royal",
    image:
      "https://images.unsplash.com/photo-1578950435899-d1c1bf932b2f?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
  {
    name: "Downtown",
    image:
      "https://images.unsplash.com/photo-1541876176131-3f5e84a7331a?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
  {
    name: "Mile End",
    image:
      "https://images.unsplash.com/photo-1578950435899-d1c1bf932b2f?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
  {
    name: "Little Italy",
    image:
      "https://images.unsplash.com/photo-1578950435899-d1c1bf932b2f?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3",
  },
]

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState(locations)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = locations.filter((location) => location.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredLocations(filtered)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-12">
          <motion.h1
            className="text-4xl font-bold text-center text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Montreal's Neighborhoods
          </motion.h1>

          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </form>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {filteredLocations.map((location, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50 transition-all hover-lift"
              >
                <div className="relative h-48">
                  <Image src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                    {location.name}
                  </h2>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {filteredLocations.length === 0 && (
            <p className="text-center text-gray-400">No locations found. Try a different search term.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

