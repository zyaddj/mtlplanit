"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Activity,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Utensils,
  Mountain,
  Camera,
  GlassWater,
  Palette,
  ShoppingBag,
  TreesIcon as Tree,
  Building,
  Mic,
  Theater,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ActivityCard } from "@/components/activity-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchActivity, generateActivityFilterQueryParameter } from "@/lib/yelp-events";
import { useRouter } from "next/navigation";

const locations = [
  "Downtown",
  "Old Port",
  "Plateau",
  "Mile End",
  "Westmount",
  "Brossard",
  "Laval",
  "Longueuil",
  "Outremont",
  "Verdun",
  "Griffintown",
  "Little Italy",
  "Hochelaga-Maisonneuve",
  "Saint-Henri",
  "Côte-des-Neiges",
  "NDG",
  "Villeray",
  "Rosemont",
  "Ahuntsic",
  "Pointe-Claire",
  "Dorval",
];

const activities = [
  { name: "Sports", icon: Activity },
  { name: "Active", icon: Mountain },
  { name: "Sightseeing", icon: Camera },
  { name: "Cultural", icon: Palette },
  { name: "Relaxation", icon: GlassWater },
  { name: "Food & Drink", icon: Utensils },
  { name: "Nightlife", icon: GlassWater },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Nature", icon: Tree },
  { name: "Museums", icon: Building },
  { name: "Live Music", icon: Mic },
  { name: "Theater", icon: Theater },
];

// Mock data for activities with complete information
// const allActivities = [
//   {
//     title: "Mount Royal Sunset Hike",
//     category: "Active",
//     price: "Free",
//     image:
//       "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     rating: 4.7,
//     description:
//       "Experience breathtaking views of Montreal from atop Mount Royal at sunset. This moderate hike offers a perfect blend of nature and city views, culminating in a stunning panorama of the city skyline as the sun sets.",
//     location: "Mount Royal Park, Montreal, QC",
//     googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
//   },
//   {
//     title: "Old Port Food Tour",
//     category: "Food & Drink",
//     price: "$75",
//     image:
//       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     rating: 4.8,
//     description:
//       "Savor the flavors of Old Montreal with this guided culinary adventure. Sample local delicacies, learn about the area's rich history, and discover hidden gems in one of the city's most charming neighborhoods.",
//     location: "Old Port of Montreal, Montreal, QC",
//     googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
//   },
//   {
//     title: "Jazz Night at Upstairs Jazz Bar",
//     category: "Live Music",
//     price: "$20",
//     image:
//       "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     rating: 4.6,
//     description:
//       "Experience Montreal's vibrant jazz scene at one of the city's most renowned venues. Enjoy live performances by local and international artists in an intimate setting with great acoustics and ambiance.",
//     location: "1254 Mackay St, Montreal, QC H3G 2H4",
//     googleMapsUrl: "https://goo.gl/maps/5QX7vZ7Z8Z9Z9Z9Z9",
//   },
//   {
//     title: "Botanical Garden Tour",
//     category: "Nature",
//     price: "$20",
//     image:
//       "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
//     rating: 4.6,
//     description:
//       "Explore the beautiful Montreal Botanical Garden with a guided tour. Discover a diverse collection of plant species from around the world, themed gardens, and the popular Insectarium. A perfect outing for nature lovers and photography enthusiasts.",
//     location: "4101 Sherbrooke St E, Montreal, QC H1X 2B2",
//     googleMapsUrl: "https://goo.gl/maps/7Z7Z7Z7Z7Z7Z7Z7Z7",
//   },
//   {
//     title: "Biosphere Environmental Museum",
//     category: "Museums",
//     price: "$15",
//     image:
//       "https://images.unsplash.com/photo-1582711012153-0ef6ef75d08d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
//     rating: 4.5,
//     description:
//       "Learn about environmental issues and sustainable solutions at this unique museum. Housed in the iconic geodesic dome from Expo 67, the Biosphere offers interactive exhibits and thought-provoking displays on climate change, biodiversity, and eco-technologies.",
//     location: "160 Chemin Tour-de-l'Isle, Île Sainte-Hélène, Montreal, QC H3C 4G8",
//     googleMapsUrl: "https://goo.gl/maps/8Z8Z8Z8Z8Z8Z8Z8Z8",
//   },
// ];

const allActivities = [
  {
    attending_count: 1,
    category: "other",
    cost: 15,
    cost_max: null,
    description:
      "Our next Trivia night is coming up, so grab your favorite know-it-all and make sure to meet us at PLAY Louisville on Thursday, June 6th for Olympics of the...",
    event_site_url:
      "https://www.yelp.com/events/louisville-voices-trivia-night?adjust_creative=gs24dJ_OAIkD4UHGgwCUNA&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=gs24dJ_OAIkD4UHGgwCUNA",
    id: "louisville-voices-trivia-night",
    image_url: "https://s3-media3.fl.yelpcdn.com/ephoto/77JxlIinkKjmUZiVbJ5Wpg/o.jpg",
    interested_count: 0,
    is_canceled: false,
    is_free: false,
    is_official: false,
    latitude: 38.2564549930724,
    longitude: -85.7306980714202,
    name: "VOICES trivia night",
    tickets_url: null,
    time_end: null,
    time_start: "2025-06-06T18:30:00-04:00",
    location: {
      address1: "1101 E Washington St",
      address2: "",
      address3: "",
      city: "Louisville",
      zip_code: "40206",
      country: "US",
      state: "KY",
      display_address: ["1101 E Washington St", "Louisville, KY 40206"],
      cross_streets: "",
    },
    business_id: "play-louisville",
  },
  {
    attending_count: 1,
    category: "kids-family",
    cost: 20,
    cost_max: 35,
    description:
      "Create a unique art piece through chaotic processes. Where you can only influence the final design. Investigate Pendulum painting, Scrape painting and more!",
    event_site_url:
      "https://www.yelp.com/events/louisville-makerplace-workshop-chaotic-art-2?adjust_creative=gs24dJ_OAIkD4UHGgwCUNA&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=gs24dJ_OAIkD4UHGgwCUNA",
    id: "louisville-makerplace-workshop-chaotic-art-2",
    image_url: "https://s3-media4.fl.yelpcdn.com/ephoto/c98bTxMKbPknr00x5TgtRA/o.jpg",
    interested_count: 0,
    is_canceled: false,
    is_free: false,
    is_official: false,
    latitude: 38.2576692,
    longitude: -85.7627395,
    name: "MakerPlace Workshop: Chaotic Art",
    tickets_url: "https://emuseum.kysciencecenter.org/performance.aspx?PID=222207",
    time_end: "2025-06-07T12:00:00-04:00",
    time_start: "2025-06-07T10:00:00-04:00",
    location: {
      address1: "727 W Main St, Louisville, KY, United States, Kentucky 40202",
      address2: "",
      address3: "",
      city: "Louisville",
      zip_code: "40202",
      country: "US",
      state: "KY",
      display_address: ["727 W Main St, Louisville, KY 40202"],
      cross_streets: "",
    },
    business_id: null,
  },
  {
    attending_count: 1,
    category: "kids-family",
    cost: 20,
    cost_max: 35,
    description:
      "Assemble a home for your succulents that is both practical and beautiful in this glasswork workshop that will expand on your skills with a soldering iron.",
    event_site_url:
      "https://www.yelp.com/events/louisville-makerplace-workshop-geometric-terrariums?adjust_creative=gs24dJ_OAIkD4UHGgwCUNA&utm_campaign=yelp_api_v3&utm_medium=api_v3_event_search&utm_source=gs24dJ_OAIkD4UHGgwCUNA",
    id: "louisville-makerplace-workshop-geometric-terrariums",
    image_url: "https://s3-media4.fl.yelpcdn.com/ephoto/LvCz55V4tJsojTJN-bvMRw/o.jpg",
    interested_count: 0,
    is_canceled: false,
    is_free: false,
    is_official: false,
    latitude: 38.2576692,
    longitude: -85.7627395,
    name: "MakerPlace Workshop: Geometric Terrariums",
    tickets_url: "https://emuseum.kysciencecenter.org/performance.aspx?PID=222208",
    time_end: "2025-06-28T12:00:00-04:00",
    time_start: "2025-06-28T10:00:00-04:00",
    location: {
      address1: "727 W Main St, Louisville, KY, United States, Kentucky 40202",
      address2: "",
      address3: "",
      city: "Louisville",
      zip_code: "40202",
      country: "US",
      state: "KY",
      display_address: ["727 W Main St, Louisville, KY 40202"],
      cross_streets: "",
    },
    business_id: null,
  },
];

export function ChooseSpecificButton({ children }: { children?: React.ReactNode }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [budget, setBudget] = useState(50);
  const [customBudget, setCustomBudget] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(allActivities);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const router = useRouter();

  const toggleSelection = (item: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (current.includes(item)) {
      setter(current.filter((i) => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedLocations([]);
    setSelectedActivities([]);
    setBudget(50);
    setCustomBudget("");
    setFilteredActivities(allActivities);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      filterActivities();
    }
  };

  const filterActivities = async () => {
    const filterActivitiesQueryParameter = generateActivityFilterQueryParameter({
      locations: selectedLocations,
      activities: selectedActivities,
      budget,
    });
    router.push(`/activities/filter?${filterActivitiesQueryParameter}`);
    // const filtered = allActivities.filter((activity) => {
    //   // const locationMatch =
    //   //   selectedLocations.length === 0 || selectedLocations.includes(activity.location.split(",")[0].trim());
    //   const categoryMatch = selectedActivities.length === 0 || selectedActivities.includes(activity.category);
    //   const priceMatch = activity.is_free || activity.cost <= budget;
    //   return categoryMatch && priceMatch;
    // });
    // setFilteredActivities(filtered);
    // setStep(4);
  };

  const getCurrentSelections = () => {
    switch (step) {
      case 1:
        return { items: locations, selected: selectedLocations, setter: setSelectedLocations };
      case 2:
        return { items: activities.map((a) => a.name), selected: selectedActivities, setter: setSelectedActivities };
      case 3:
        return null;
    }
  };

  const { items, selected, setter } = getCurrentSelections() || {};

  const stepContent = [
    { title: "Choose Location(s)", icon: MapPin },
    { title: "Activity Type(s)", icon: Activity },
    { title: "Budget", icon: DollarSign },
  ];

  const handleCustomBudgetChange = (value: string) => {
    const numValue = Number.parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setBudget(Math.min(numValue, 100));
      setCustomBudget(value);
    } else if (value === "") {
      setCustomBudget("");
    }
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetAndClose()}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-white/90 to-white/80 text-blue-600
            font-semibold text-base px-8 py-3 h-auto 
            shadow-md hover:shadow-lg transition-all backdrop-blur-sm
            hover:from-white hover:to-white/90 border border-blue-200"
        >
          {children || t("chooseSpecific")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col dialog-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {step === 4 ? "Your Personalized Activities" : "Plan Your Perfect Montreal Adventure"}
          </DialogTitle>
        </DialogHeader>
        {step < 4 && (
          <div className="flex items-start mb-8 relative px-4">
            {/* Progress line */}
            <div className="absolute left-[85px] right-[85px] top-[20px] h-0.5">
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gray-600"></div>
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300`}
                  style={{
                    width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                    left: step === 1 ? "10px" : "0px",
                  }}
                ></div>
              </div>
            </div>

            {/* Icons and labels */}
            {stepContent.map((s, index) => (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center relative z-10 ${
                  index + 1 === step
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400"
                    : index + 1 < step
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index + 1 === step
                      ? "bg-gradient-to-r from-blue-600 to-blue-400"
                      : index + 1 < step
                      ? "bg-blue-500"
                      : "bg-gray-600"
                  }`}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-center px-2">{s.title}</span>
              </div>
            ))}
          </div>
        )}
        <div className="flex-grow overflow-y-auto py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === 3 ? (
                <div className="px-4 overflow-hidden">
                  <h3 className="text-lg font-semibold text-center text-white mb-6">Set Your Budget</h3>
                  <div className="space-y-2">
                    <Slider
                      value={[budget]}
                      onValueChange={(value) => {
                        setBudget(value[0]);
                        setCustomBudget(value[0].toFixed(2));
                      }}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-blue-500 [&_[role=slider]]:shadow-md [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-blue-600 [&_.bg-primary]:to-blue-400"
                    />
                    <div className="flex justify-between items-center text-gray-300">
                      <span className="text-sm">$0</span>
                      <span className="text-sm">$100</span>
                    </div>
                  </div>
                  <div className="text-center space-y-6">
                    <p className="text-2xl font-bold text-white">
                      {budget === 100 ? "Over $100" : customBudget ? `$${customBudget}` : `$${budget.toFixed(2)}`}
                    </p>
                    <div className="mt-8">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="text-blue-300 border-blue-500  bg-transparent">
                            Set Custom Amount
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 bg-gray-800 border-blue-500/50">
                          <div className="space-y-2">
                            <label htmlFor="custom-budget" className="text-sm font-medium text-gray-300">
                              Enter custom budget:
                            </label>
                            <Input
                              id="custom-budget"
                              type="number"
                              step="0.01"
                              min="0"
                              max="100"
                              placeholder="Enter amount"
                              value={customBudget}
                              onChange={(e) => handleCustomBudgetChange(e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              ) : step === 4 ? (
                <div className="px-4 space-y-6">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.map((activity, index) => (
                      <ActivityCard
                        key={index}
                        {...activity}
                        // id={activity.name.toLowerCase().replace(/\s+/g, "-")}
                        isFavorite={false}
                        onToggleFavorite={() => {}}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-300">
                      No activities found matching your criteria. Try adjusting your filters.
                    </p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-4">
                  {step === 1
                    ? items?.map((item) => (
                        <Badge
                          key={item}
                          variant={selected?.includes(item) ? "default" : "outline"}
                          className={`cursor-pointer transition-all hover:scale-105 px-3 py-2 text-sm flex items-center justify-center text-center ${
                            selected?.includes(item)
                              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                          onClick={() => setter && toggleSelection(item, selected || [], setter)}
                        >
                          {item}
                        </Badge>
                      ))
                    : activities.map((activity) => (
                        <Badge
                          key={activity.name}
                          variant={selected?.includes(activity.name) ? "default" : "outline"}
                          className={`cursor-pointer transition-all hover:scale-105 px-3 py-2 text-sm flex items-center justify-center text-center ${
                            selected?.includes(activity.name)
                              ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }`}
                          onClick={() => setter && toggleSelection(activity.name, selected || [], setter)}
                        >
                          <activity.icon className="w-4 h-4 mr-2" />
                          {activity.name}
                        </Badge>
                      ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          {step < 4 && (
            <Button
              variant="outline"
              onClick={() => setter && setter([])}
              className="text-black bg-white/80 hover:bg-white border-transparent hover:text-black/80"
              disabled={step === 3}
            >
              Clear All
            </Button>
          )}
          <div className="flex gap-2">
            {step < 4 ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="text-black bg-white/80 hover:bg-white border-transparent hover:text-black/80"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 min-w-[100px]"
                  onClick={handleNext}
                >
                  {step === 3 ? "Find Activities" : selected && selected.length > 0 ? "Next" : "Skip"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <Button
                onClick={resetAndClose}
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600"
              >
                Start Over
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-center pt-4 border-t border-gray-700">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 transition-colors w-full justify-center"
          >
            {showAdvancedFilters ? "Hide" : "Show"} Advanced Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
          </button>
        </div>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Locations</label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                {locations.map((location) => (
                  <Badge
                    key={location}
                    variant={selectedLocations.includes(location) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      selectedLocations.includes(location)
                        ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={() => toggleLocation(location)}
                  >
                    <MapPin className="w-3 h-3 mr-1" />
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
