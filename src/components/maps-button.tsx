"use client"

import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface MapsButtonProps {
  address: string
  name: string
}

export function MapsButton({ address, name }: MapsButtonProps) {
  const handleDirections = () => {
    // Encode the destination for the URL
    const destination = encodeURIComponent(`${name}, ${address}`)
    // Open Google Maps in a new tab
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
      '_blank'
    )
  }

  return (
    <Button 
      onClick={handleDirections}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
    >
      <MapPin className="h-4 w-4" />
      Get Directions
    </Button>
  )
} 