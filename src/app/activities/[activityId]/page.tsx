"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchActivityById, IActivity } from "@/lib/yelp-events";
import { Button } from "@/components/ui/button";
import { formateDateTime } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const ActivityPage = () => {
  const params = useParams();
  const [filteredActivities, setFilteredActivities] = useState<IActivity>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetchActivityById(String(params.activityId))
      .then((data) => setFilteredActivities(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [params]);

  if (error) {
    <p className="text-center">{error}</p>;
  }
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-screen-xl">
        <section className="flex flex-col gap-1 py-5 md:py-14">
          <Button size={"icon"} className="mt-6 mb-3 ml-3" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <motion.div
            className="flex flex-col justify-between gap-4 md:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isLoading ? (
              <div className="h-screen w-full flex justify-center items-center">
                <div className="flex gap-2">
                  <Loader2 className="animate-spin" /> Loading...
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div className="w-full px-3 py-5 md:py-0 md:pb-12 md:w-1/2">
                  <Image
                    src={filteredActivities?.image_url ? filteredActivities?.image_url : "/no-image.jpg"}
                    alt={String(filteredActivities?.name)}
                    width={300}
                    height={200}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="w-full h-auto rounded-md object-cover"
                  />
                </div>

                <div className="w-full px-3  md:pb-12 md:w-1/2">
                  {/* event name */}
                  <h1 className="mb-4 text-3xl font-semibold">{filteredActivities?.name}</h1>
                  <p className="mb-2">
                    <span className="text-white">Category: </span>{" "}
                    <span className="text-muted-foreground font-medium">{filteredActivities?.category}</span>
                  </p>
                  <p className="mb-2">
                    <span className="text-white">Location: </span>{" "}
                    <span className="text-muted-foreground underline">
                      {filteredActivities?.location?.display_address.join(", ")}
                    </span>
                  </p>
                  <p className="mb-2">
                    <span className="text-white">Start Date: </span>{" "}
                    <span className="text-muted-foreground underline">
                      {formateDateTime(String(filteredActivities?.time_start))}
                    </span>
                  </p>
                  {/* descreption */}
                  <p className="mt-6 text-sm text-muted-foreground tracking-wider">{filteredActivities?.description}</p>

                  {/* Price */}
                  {filteredActivities?.is_free ? (
                    <p className="mt-4 text-3xl font-bold">FREE</p>
                  ) : (
                    <p className="mt-4 text-3xl font-bold">
                      {filteredActivities?.cost ? `$${filteredActivities?.cost}` : "Price Not Specify"}
                    </p>
                  )}

                  {/* google map */}
                  <div className="mt-6">
                    <a
                      href={`https://www.google.com/maps?q=${filteredActivities?.latitude},${filteredActivities?.longitude}`}
                      target="_blank"
                    >
                      <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium">
                        Open Maps 🗺️
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ActivityPage;
