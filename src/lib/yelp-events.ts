export function generateActivityFilterQueryParameter(filters: {
  locations?: string[];
  activities?: string[];
  budget?: number;
}) {
  //   ?limit=50&sort_by=asc&sort_on=time_start&start_date=1738848446&categories=music&categories=sport&categories=nightlife&location=%22Downtown%22'
  const utcTimestamp = Math.floor(Date.now() / 1000);
  const activitiesParam = filters.activities ? filters.activities?.join("&categories=") : "";
  const locationsParam = Number(filters.locations?.length) > 0 ? `"${filters.locations?.join('", "')}"` : "";
  let urlQueryParams = `limit=50&sort_by=asc&sort_on=time_start&start_date=${utcTimestamp}`;
  urlQueryParams += activitiesParam && `&categories=${activitiesParam.toLowerCase()}`;
  urlQueryParams += locationsParam && `&location=${encodeURI(locationsParam)}`;

  return urlQueryParams;
}

export interface IActivity {
  id: string;
  name: string;
  image_url: string;
  cost: number;
  category: string;
  description: string;
  is_free: boolean;
  latitude: number;
  longitude: number;
  location: { display_address: string[] };
  time_start: string;
}

export async function fetchActivity(urlQueryParams: string, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`/api/activity?${urlQueryParams}`);
      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.error || "Failed to fetch activity");
        return [];
      }
      return data.events;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt < retries - 1) {
        await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
      } else {
        return [];
        // throw error; // Throw error after last attempt
      }
    }
  }
}

export async function fetchActivityById(id: string, retries = 3, delay = 1000) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`/api/activity/${id}`);
      const data = await response.json();

      if (!response.ok) {
        // throw new Error(data.error || "Failed to fetch activity");
        return [];
      }

      return data;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (attempt < retries - 1) {
        await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
      } else {
        return [];
        // throw error; // Throw error after last attempt
      }
    }
  }
}
