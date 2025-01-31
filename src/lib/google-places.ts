export async function fetchGooglePlaces(filters: {
  locations?: string[]
  budget?: number
}) {
  const response = await fetch('/api/places', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to fetch places')
  }

  const data = await response.json()
  return data.results
} 