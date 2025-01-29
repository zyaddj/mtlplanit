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

export const popularActivities: Activity[] = [
  {
    id: "mount-royal-hike",
    title: "Mount Royal Sunset Hike",
    category: "Active",
    price: "Free",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
    location: "Mount Royal Park, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
  },
  {
    id: "old-port-food",
    title: "Old Port Food Tour",
    category: "Food & Drink",
    price: "$75",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    description: "Savor the flavors of Old Montreal with this guided culinary adventure.",
    location: "Old Port of Montreal, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
  }
]
