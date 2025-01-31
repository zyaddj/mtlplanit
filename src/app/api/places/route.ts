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
    const { locations, budget } = await req.json()
    const API_KEY = 'AIzaSyA5UUxdCUVVwKqzk98rQwkHc8-NqOAsWdc'; // Replace with your actual API key

    if (!API_KEY) {
      throw new Error('Google Places API key not configured')
    }

    console.log('API Key:', API_KEY); // Log the API key for debugging

    const BASE_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    let query = 'activities in Montreal'
    
    if (locations?.length) {
      query += ` ${locations.join(' OR ')}`
    }

    const params = new URLSearchParams({
      query,
      key: API_KEY,
      radius: '50000',
      language: 'en',
      region: 'ca'
    })

    const requestUrl = `${BASE_URL}?${params}`;
    console.log('Making request to:', requestUrl); // Log the request URL

    const response = await fetch(requestUrl)
    const data = await response.json()

    if (!response.ok) {
      console.error('Google API Error:', data.error_message); // Log the error message
      return NextResponse.json({ error: data.error_message }, { status: 400 });
    }

    if (!data.results?.length) {
      return NextResponse.json({ error: 'No places found' }, { status: 404 })
    }

    const places = data.results.map((place: GooglePlace) => ({
      id: place.place_id,
      title: place.name,
      category: place.types[0].replace(/_/g, ' ').split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      price: place.price_level ? `${'$'.repeat(place.price_level)}` : 'Free',
      image: place.photos?.[0]?.photo_reference 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}` 
        : '/placeholder.jpg',
      rating: place.rating || 0,
      description: `Explore ${place.name}, located in ${place.formatted_address}`,
      location: place.formatted_address,
      googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    }))

    return NextResponse.json({ results: places })
  } catch (error) {
    console.error('Places API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch places',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 