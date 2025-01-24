"use client"

import { motion } from "framer-motion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Palette, Music, UtensilsCrossed, MountainIcon as Mountains, Camera, GlassWater } from "lucide-react"

const categories = [
  { name: "Arts & Culture", icon: Palette },
  { name: "Music & Events", icon: Music },
  { name: "Food & Drink", icon: UtensilsCrossed },
  { name: "Outdoor", icon: Mountains },
  { name: "Sightseeing", icon: Camera },
  { name: "Nightlife", icon: GlassWater },
]

export function CategoryFilter() {
  return (
    <ScrollArea className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-4 p-2 justify-center"
      >
        {categories.map((category) => (
          <motion.div
            key={category.name}
            className="h-auto py-3 px-6 flex flex-row items-center gap-3 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-md cursor-pointer transition-all"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
              <category.icon className="h-6 w-6" />
            </motion.div>
            <span className="text-base font-medium">{category.name}</span>
          </motion.div>
        ))}
      </motion.div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

