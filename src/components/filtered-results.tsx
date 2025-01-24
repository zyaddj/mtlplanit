"use client"

import { ActivityCard } from "@/components/activity-card"
import type { Activity } from "@/data/activities"

interface FilteredResultsProps {
  activities: Activity[]
}

export function FilteredResults({ activities }: FilteredResultsProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-400">No activities found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity, index) => (
        <ActivityCard 
          key={index} 
          {...activity} 
          isFavorite={false}
          onToggleFavorite={() => {}}
          googleMapsUrl={activity.googleMapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(activity.location)}`}
        />
      ))}
    </div>
  )
}

