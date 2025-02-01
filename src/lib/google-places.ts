export async function fetchGooglePlaces(filters: {
  locations?: string[]
  budget?: number
  categories?: string[]
  isMystery?: boolean
}) {
  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch places')
    }

    // Return empty array if no results
    if (!data.results?.length) {
      return []
    }

    return data.results
  } catch (error) {
    console.error('Error fetching places:', error)
    throw error
  }
} 