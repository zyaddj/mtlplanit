import { PrismaClient } from '@prisma/client'
import { searchPlaces, getPlaceDetails } from '../src/lib/google-places'

const prisma = new PrismaClient()

const PLACE_TYPES = [
  'amusement_park',
  'aquarium',
  'art_gallery',
  'bowling_alley',
  'casino',
  'museum',
  'night_club',
  'park',
  'restaurant',
  'shopping_mall',
  'spa',
  'tourist_attraction',
  'zoo'
] as const

async function fetchAllPlaces() {
  for (const type of PLACE_TYPES) {
    let pageToken: string | undefined
    
    do {
      const results = await searchPlaces(type, pageToken)
      
      for (const place of results.results) {
        const details = await getPlaceDetails(place.place_id)
        
        // Store in database
        await prisma.activity.create({
          data: {
            googlePlaceId: place.place_id,
            name: place.name,
            description: '', // You might want to generate this with AI
            category: type,
            address: place.vicinity,
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            rating: place.rating || 0,
            priceLevel: place.price_level || 0,
            photoReferences: place.photos?.map((p: { photo_reference: string }) => p.photo_reference) || [],
            openingHours: details.opening_hours?.weekday_text || [],
            website: details.website || '',
            phoneNumber: details.formatted_phone_number || '',
            reviews: details.reviews || []
          }
        })
        
        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 200))
      }
      
      pageToken = results.next_page_token
    } while (pageToken)
  }
}

fetchAllPlaces()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 