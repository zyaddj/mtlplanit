export type Activity = {
  id: string
  title: string
  category: string
  price: string
  image: string
  rating: number
  description: string
  location: string
  googleMapsUrl: string
}

// Empty array instead of mock data
export const popularActivities: Activity[] = []
