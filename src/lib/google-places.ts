export async function fetchGooglePlaces(filters: {
  locations?: string[]
  budget?: number
}) {
  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch places')
    }

    if (!data.results?.length) {
      // Return mock data if no results found
      return [
        {
          id: "mount-royal-hike",
          title: "Mount Royal Sunset Hike",
          category: "Active",
          price: "Free",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
          rating: 4.7,
          description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
          location: "Mount Royal Park, Montreal, QC",
          googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
        },
        // Add 2-3 more fallback activities here
      ]
    }

    return data.results
  } catch (error) {
    console.error('Error fetching places:', error)
    throw error
  }
} 