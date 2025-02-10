import { NextResponse } from "next/server";

const BASE_API = "https://api.yelp.com/v3/events";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${BASE_API}/${params.id}`, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.YELP_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
