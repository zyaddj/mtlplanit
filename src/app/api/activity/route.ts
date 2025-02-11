import { NextResponse } from "next/server";

const BASE_API = "https://api.yelp.com/v3/events";

export async function GET(request: Request) {
  try {
    // Get the search parameters from the URL
    const { searchParams } = new URL(request.url);
    
    // Build the Yelp API URL with the search parameters
    const url = `${BASE_API}/search?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.YELP_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch activities from Yelp" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Activity API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
