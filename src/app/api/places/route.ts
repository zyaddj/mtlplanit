import { NextResponse } from 'next/server'

interface GooglePlace {
  place_id: string
  name: string
  types: string[]
  price_level?: number
  photos?: Array<{ photo_reference: string }>
  rating?: number
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export async function POST(req: Request) {
  try {
    const { locations, budget, categories, isMystery } = await req.json()
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!API_KEY) {
      throw new Error('Google Places API key not configured')
    }

    const BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    
    // Construct location-based query
    let query = ''
    if (locations?.length) {
      query = locations.map((location: string) => 
        `activities OR attractions in ${location} Montreal`
      ).join(' OR ')
    } else {
      query = 'popular activities OR attractions in Montreal'
    }

    // Add budget qualifier if specified
    if (budget) {
      const priceKeyword = budget <= 25 ? 'cheap OR budget OR free' 
        : budget <= 50 ? 'moderate OR mid-range' 
        : 'luxury OR expensive'
      query += ` ${priceKeyword}`
    }

    // Add category filter if specified
    if (!isMystery && categories?.length) {
      query += ` AND (${categories.join(' OR ')})`
    }

    const params = new URLSearchParams({
      query,
      key: API_KEY,
      type: 'tourist_attraction|point_of_interest|establishment',
      radius: '50000',
      language: 'en',
      region: 'ca'
    })

    const response = await fetch(`${BASE_URL}?${params}`)
    const data = await response.json()

    if (!response.ok) {
      console.error('Google API Error:', data.error_message)
      return NextResponse.json({ error: data.error_message }, { status: 400 })
    }

    if (!data.results?.length) {
      return NextResponse.json({ 
        results: [],
        message: "No activities found for your criteria. Try adjusting your filters."
      })
    }

    const places = data.results.map((place: GooglePlace) => ({
      id: place.place_id,
      title: place.name,
      category: place.types[0].replace(/_/g, ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      price: place.price_level ? `${'$'.repeat(place.price_level)}` : 'Free',
      image: place.photos?.[0]?.photo_reference 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}` 
        : `https://source.unsplash.com/random/800x600/?montreal,${place.types[0]}`,
      rating: place.rating || 4.0,
      description: `Explore ${place.name}, located in ${place.formatted_address}`,
      location: place.formatted_address,
      googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    }))

    // Filter results to match selected locations
    const filteredPlaces = locations?.length 
      ? places.filter(place => 
          locations.some(location => 
            place.location.toLowerCase().includes(location.toLowerCase())
          )
        )
      : places

    // For mystery button, return a random result
    if (isMystery) {
      const validPlaces = filteredPlaces.length ? filteredPlaces : places
      const randomIndex = Math.floor(Math.random() * validPlaces.length)
      return NextResponse.json({ 
        results: [validPlaces[randomIndex]] 
      })
    }

    // For specific search, return all filtered results
    return NextResponse.json({ 
      results: filteredPlaces.length ? filteredPlaces : places 
    })
  } catch (error) {
    console.error('Places API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch places',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 