"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ActivityCard } from "@/components/activity-card"
import { CategoryFilter } from "@/components/category-filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import { popularActivities } from "@/data/activities"

export default function ActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredActivities, setFilteredActivities] = useState(popularActivities)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = popularActivities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredActivities(filtered)
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
            Discover Montreal's Best Activities
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
                placeholder="Search activities..."
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <CategoryFilter />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {filteredActivities.map((activity, index) => (
              <ActivityCard key={index} {...activity} />
            ))}
          </motion.div>

          {filteredActivities.length === 0 && (
            <p className="text-center text-gray-400">No activities found. Try a different search term.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

