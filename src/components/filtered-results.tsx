"use client";

import { ActivityCard } from "@/components/activity-card";
import { IActivity } from "@/lib/yelp-events";
import { motion } from "framer-motion";

interface FilteredResultsProps {
  activities: IActivity[];
}

export function FilteredResults({ activities }: FilteredResultsProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-400">No activities found matching your criteria.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          {...activity}
          isFavorite={false}
          onToggleFavorite={() => {}}
          // googleMapsUrl={activity.googleMapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(activity.location)}`}
        />
      ))}
    </motion.div>
  );
}
