import { NextResponse } from 'next/server'

const BASE_API = "https://api.yelp.com/v3/events";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params

    // Mock data for now
    const activity = {
      id: "mount-royal-hike",
      title: "Mount Royal Sunset Hike",
      category: "Active",
      price: "Free",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      rating: 4.7,
      description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
      location: "Mount Royal Park, Montreal, QC",
      googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
    }

    return NextResponse.json(activity)
  } catch (error) {
    console.error('Error fetching activity:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    )
  }
}
