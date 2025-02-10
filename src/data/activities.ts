import { IActivity } from "@/lib/yelp-events";
// export const popularActivities: Activity[] = [
//   {
//     id: "mount-royal-hike",
//     title: "Mount Royal Sunset Hike",
//     category: "Active",
//     price: "Free",
//     image: "/placeholder.svg?height=200&width=300",
//     rating: 4.7,
//     description: "Experience breathtaking views of Montreal from atop Mount Royal at sunset.",
//     location: "Mount Royal Park, Montreal, QC",
//     googleMapsUrl: "https://goo.gl/maps/8WKt9YZZgJN2Ld6J6",
//   },
//   {
//     id: "old-port-food",
//     title: "Old Port Food Tour",
//     category: "Food & Drink",
//     price: "$75",
//     image: "/placeholder.svg?height=200&width=300",
//     rating: 4.8,
//     description: "Savor the flavors of Old Montreal with this guided culinary adventure.",
//     location: "Old Port of Montreal, Montreal, QC",
//     googleMapsUrl: "https://goo.gl/maps/QMXmqKwjsTZwvqSt8",
//   }
// ]

export const popularActivities: IActivity[] = [
  {
    category: "other",
    cost: 15,

    description:
      "Our next Trivia night is coming up, so grab your favorite know-it-all and make sure to meet us at PLAY Louisville on Thursday, June 6th for Olympics of the...",
    id: "louisville-voices-trivia-night",
    image_url: "https://s3-media3.fl.yelpcdn.com/ephoto/77JxlIinkKjmUZiVbJ5Wpg/o.jpg",
    is_free: false,
    latitude: 38.2564549930724,
    longitude: -85.7306980714202,
    name: "VOICES trivia night",
    time_start: "2025-06-06T18:30:00-04:00",
    location: {
      display_address: ["1101 E Washington St", "Louisville, KY 40206"],
    },
  },
  {
    category: "kids-family",
    cost: 20,
    description:
      "Create a unique art piece through chaotic processes. Where you can only influence the final design. Investigate Pendulum painting, Scrape painting and more!",
    id: "louisville-makerplace-workshop-chaotic-art-2",
    image_url: "https://s3-media4.fl.yelpcdn.com/ephoto/c98bTxMKbPknr00x5TgtRA/o.jpg",
    is_free: false,
    latitude: 38.2576692,
    longitude: -85.7627395,
    name: "MakerPlace Workshop: Chaotic Art",
    time_start: "2025-06-07T10:00:00-04:00",
    location: {
      display_address: ["727 W Main St, Louisville, KY 40202"],
    },
  },
  {
    category: "kids-family",
    cost: 20,
    description:
      "Assemble a home for your succulents that is both practical and beautiful in this glasswork workshop that will expand on your skills with a soldering iron.",
    id: "louisville-makerplace-workshop-geometric-terrariums",
    image_url: "https://s3-media4.fl.yelpcdn.com/ephoto/LvCz55V4tJsojTJN-bvMRw/o.jpg",
    is_free: false,
    latitude: 38.2576692,
    longitude: -85.7627395,
    name: "MakerPlace Workshop: Geometric Terrariums",
    time_start: "2025-06-28T10:00:00-04:00",
    location: {
      display_address: ["727 W Main St, Louisville, KY 40202"],
    },
  },
];
