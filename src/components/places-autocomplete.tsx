"use client"

import { useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"

interface PlacesAutocompleteProps {
  onPlaceSelected: (place: google.maps.places.PlaceResult) => void
  placeholder?: string
  className?: string
}

export function PlacesAutocomplete({ 
  onPlaceSelected, 
  placeholder = "Search for a place...",
  className = ""
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)

  useEffect(() => {
    if (!inputRef.current) return

    // Initialize Google Places Autocomplete
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "CA" },
      bounds: {
        north: 45.7059,
        south: 45.4139,
        east: -73.4795,
        west: -73.9485
      },
      strictBounds: true,
      fields: ["name", "geometry", "formatted_address", "place_id"]
    })

    // Add place_changed event listener
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace()
      if (place) {
        onPlaceSelected(place)
      }
    })

    return () => {
      // Cleanup
      google.maps.event.clearInstanceListeners(autocompleteRef.current!)
    }
  }, [onPlaceSelected])

  return (
    <Input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={className}
    />
  )
} 