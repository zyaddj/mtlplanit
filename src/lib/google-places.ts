import axios from 'axios'

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
const MONTREAL_LOCATION = '45.5017,-73.5673' // Montreal's coordinates

type PlaceType = 
  | 'amusement_park'
  | 'aquarium'
  | 'art_gallery'
  | 'bowling_alley'
  | 'casino'
  | 'museum'
  | 'night_club'
  | 'park'
  | 'restaurant'
  | 'shopping_mall'
  | 'spa'
  | 'tourist_attraction'
  | 'zoo'

interface PlaceResult {
  place_id: string
  name: string
  types: string[]
  vicinity: string
  rating?: number
  user_ratings_total?: number
  photos?: Array<{
    photo_reference: string
  }>
  price_level?: number
  opening_hours?: {
    open_now: boolean
  }
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export async function searchPlaces(type: PlaceType, pageToken?: string) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        key: GOOGLE_PLACES_API_KEY,
        location: MONTREAL_LOCATION,
        radius: '20000', // 20km radius
        type,
        pagetoken: pageToken,
        language: 'en'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error fetching places:', error)
    throw error
  }
}

export async function getPlaceDetails(placeId: string) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        key: GOOGLE_PLACES_API_KEY,
        place_id: placeId,
        fields: 'name,formatted_address,formatted_phone_number,website,opening_hours,photos,reviews,price_level,rating',
        language: 'en'
      }
    })

    return response.data.result
  } catch (error) {
    console.error('Error fetching place details:', error)
    throw error
  }
} 