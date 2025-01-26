import axios from 'axios'

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
const MONTREAL_LOCATION = '45.5017,-73.5673'

interface PlaceFilters {
  type?: string
  minPrice?: number
  maxPrice?: number
  radius?: number
  keyword?: string
  openNow?: boolean
}

export async function discoverActivities(filters: PlaceFilters) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          key: MAPS_API_KEY,
          location: MONTREAL_LOCATION,
          radius: filters.radius || 5000,
          type: filters.type,
          minprice: filters.minPrice,
          maxprice: filters.maxPrice,
          keyword: filters.keyword,
          opennow: filters.openNow,
          language: 'en'
        }
      }
    )

    // Transform the response into our Activity format
    const activities = response.data.results.map((place: any) => ({
      title: place.name,
      category: place.types[0],
      price: place.price_level ? '$$'.repeat(place.price_level) : 'Free',
      image: place.photos?.[0]?.photo_reference 
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${MAPS_API_KEY}`
        : '/placeholder.svg',
      rating: place.rating || 0,
      description: place.vicinity,
      location: place.vicinity,
      googleMapsUrl: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`,
      placeId: place.place_id
    }))

    return activities
  } catch (error) {
    console.error('Error discovering activities:', error)
    throw error
  }
}

export async function getRandomActivity(filters: Partial<PlaceFilters> = {}) {
  const activities = await discoverActivities(filters)
  const randomIndex = Math.floor(Math.random() * activities.length)
  return activities[randomIndex]
}

export async function searchNearbyPlaces(
  category: string,
  location: { lat: number; lng: number },
  radius: number = 5000
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          key: MAPS_API_KEY,
          location: `${location.lat},${location.lng}`,
          radius,
          type: category,
          language: 'en'
        }
      }
    )
    return response.data.results
  } catch (error) {
    console.error('Error fetching nearby places:', error)
    throw error
  }
}

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          key: MAPS_API_KEY,
          place_id: placeId,
          fields: 'name,formatted_address,geometry,photos,rating,website,opening_hours,price_level'
        }
      }
    )
    return response.data.result
  } catch (error) {
    console.error('Error fetching place details:', error)
    throw error
  }
} 