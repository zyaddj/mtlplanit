import requests
import json

# API Keys
GOOGLE_API_KEY = "AIzaSyA5UUxdCUVVwKqzk98rQwkHc8-NqOAsWdc"
EVENTBRITE_API_KEY = "RDANJE2NCZ6YIVWD3JAP"
YELP_API_KEY = "VzOwdhSAsIyFBsJLrrdOA3VB5AmmLCeGqEMqxi1VLmGvIALCXYOdqPsPHDjENqNeufZHKE0aosBN9xFoOXGxXgVJWEiFDDl1-9kgITHx4fDGzv7ETXYTMUrOdbGfZ3Yx"

# Montreal coordinates
LOCATION = "45.5017,-73.5673"
RADIUS = 30000  # 30 km to cover Greater Montreal


# Scrape Google Places
def scrape_google_places():
    print("Scraping Google Places...")
    types = ["tourist_attraction", "amusement_park", "museum", "stadium", "zoo", "art_gallery", "park"]
    activities = []

    for place_type in types:
        url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={LOCATION}&radius={RADIUS}&type={place_type}&key={GOOGLE_API_KEY}"
        response = requests.get(url).json()

        for place in response.get("results", []):
            activities.append({
                "name": place.get("name"),
                "description": ", ".join(place.get("types", [])),
                "location": place.get("vicinity"),
                "price": "N/A",
                "category": place_type.replace("_", " ").title(),
                "source": "Google Places",
                "link": f"https://www.google.com/maps/place/?q=place_id:{place.get('place_id')}"
            })

    return activities


# Scrape Eventbrite
def scrape_eventbrite():
    print("Scraping Eventbrite...")
    url = f"https://www.eventbriteapi.com/v3/events/search/?location.latitude=45.5017&location.longitude=-73.5673&location.within=30km&expand=venue&token={EVENTBRITE_API_KEY}"
    response = requests.get(url).json()

    events = []
    for event in response.get("events", []):
        events.append({
            "name": event.get("name", {}).get("text", "No Title"),
            "description": event.get("description", {}).get("text", "No Description"),
            "location": event.get("venue", {}).get("address", {}).get("localized_address_display", "No Address"),
            "price": "Varies",
            "category": "Event",
            "source": "Eventbrite",
            "link": event.get("url", "No URL")
        })

    return events


# Scrape Yelp
def scrape_yelp():
    print("Scraping Yelp...")
    # Implementation of scrape_yelp function
    pass


# Main function to scrape all activities
def scrape_all_activities():
    activities = scrape_google_places() + scrape_eventbrite() + scrape_yelp()
    return activities


# Save activities to file
def save_activities_to_file(activities, filename):
    with open(filename, 'w') as f:
        for activity in activities:
            f.write(json.dumps(activity) + "\n")


# Main execution
if __name__ == "__main__":
    activities = scrape_all_activities()
    save_activities_to_file(activities, "activities.json")

    print(f"Scraped {len(activities)} activities and saved to activities.json")


# ... rest of the file remains unchanged ...
