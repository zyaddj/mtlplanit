export type Activity = {
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
    title: "Mount Royal Sunset Hike",
    category: "Active",
    price: "Free",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    rating: 4.7,
    description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
    location: "Mount Royal Park, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
  },
  {
    title: "Old Port Food Tour",
    category: "Food & Drink",
    price: "$75",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    rating: 4.8,
    description: "Savor the flavors of Old Montreal with this guided culinary adventure.",
    location: "Old Port of Montreal, Montreal, QC",
    googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
  }
]
