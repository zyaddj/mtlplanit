"use client";
import { FilteredResults } from "@/components/filtered-results";
import { fetchActivity } from "@/lib/yelp-events";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function FilterActivities() {
  const searchParams = useSearchParams();
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Convert searchParams into a stable string
  const queryString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    if (!queryString) return; // Prevent unnecessary API calls

    setIsLoading(true);
    setError("");

    fetchActivity(queryString)
      .then((data) => setFilteredActivities(data))
      .catch((err) => setError(err.message || "Failed to fetch activities"))
      .finally(() => setIsLoading(false));
  }, [queryString]);

  return (
    <>
      {error && <p className="text-center text-red-500">{error}</p>}

      {isLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="flex gap-2">
            <Loader2 className="animate-spin" /> Loading...
          </div>
        </div>
      ) : (
        <FilteredResults activities={filteredActivities} />
      )}
    </>
  );
}
