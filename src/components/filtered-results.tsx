import { ActivityCard } from "@/components/activity-card"

interface Activity {
  title: string
  category: string
  price: string
  image: string
  rating: number
  description?: string
  location?: string
}

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
        <ActivityCard key={index} {...activity} />
      ))}
    </div>
  )
}

