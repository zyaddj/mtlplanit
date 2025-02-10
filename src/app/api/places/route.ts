import { NextResponse } from "next/server";

interface GooglePlace {
  place_id: string;
  name: string;
  types: string[];
  price_level?: number;
  photos?: Array<{ photo_reference: string }>;
  rating?: number;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export async function POST(req: Request) {
  try {
    const { locations, budget } = await req.json();
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!API_KEY) {
      throw new Error("Google Places API key not configured");
    }

    // Return mock data for now to ensure functionality
    return NextResponse.json({
      results: [
        {
          id: "mount-royal-hike",
          title: "Mount Royal Sunset Hike",
          category: "Active",
          price: "Free",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
          rating: 4.7,
          description:
            "Experience breathtaking views of Montreal from atop Mount Royal at sunset. Perfect for nature lovers and photographers alike. The hike offers stunning panoramic views of the city skyline.",
          location: "Mount Royal Park, Montreal, QC",
          googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
        },
        {
          id: "old-port-food",
          title: "Old Port Food Tour",
          category: "Food & Drink",
          price: "$75",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
          rating: 4.8,
          description:
            "Embark on a culinary journey through Montreal's historic Old Port. Sample local delicacies, learn about the area's rich history, and discover hidden gems in this charming neighborhood.",
          location: "Old Port of Montreal, Montreal, QC",
          googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
        },
      ],
    });
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch places",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
