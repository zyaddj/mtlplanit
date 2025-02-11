"use client";
import { FilteredResults } from "@/components/filtered-results";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { fetchActivity } from "@/lib/yelp-events";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function FilterResults() {
  const searchParams = useSearchParams();
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchActivity(searchParams.toString())
      .then((data) => setFilteredActivities(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <>
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

export default function FilterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-8">
          <h1 className="text-4xl font-bold text-center text-gradient">Filtered Activities</h1>
          <Suspense fallback={<div>Loading...</div>}>
            <FilterResults />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
