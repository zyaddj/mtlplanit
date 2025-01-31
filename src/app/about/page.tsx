"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-16">
          <section className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-gradient">Welcome to Our Story</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're a small team of Montrealers who got tired of always doing the same things on weekends. 
              We built PlanIT because, like you, we wanted to discover more of what our amazing city has to offer.
            </p>
          </section>

          <section className="bg-purple-900/20 p-8 rounded-lg space-y-6">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Our Story</h2>
            <div className="text-gray-200 space-y-4 max-w-3xl mx-auto">
              <p>
                It started with a simple question over coffee: "What should we do this weekend?" 
                We realized we were always cycling through the same spots, missing out on countless 
                hidden gems around Montreal.
              </p>
              <p>
                After months of asking friends for recommendations, keeping lists of interesting places, 
                and randomly discovering amazing spots, we thought: "Why isn't there an easier way to 
                find these places?"
              </p>
              <p>
                So we started building PlanIT in our spare time, first just for ourselves and friends. 
                We walked the streets, talked to locals, and collected stories about their favorite spots. 
                What began as a simple list grew into something bigger than we imagined.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-purple-900/20 p-6 rounded-lg space-y-4">
              <h2 className="text-2xl font-semibold text-white">What Drives Us</h2>
              <p className="text-gray-300">
                We believe the best experiences often happen when you step out of your comfort zone. 
                Whether it's trying that small family restaurant around the corner or joining a local 
                community event - these moments make city life special.
              </p>
            </div>
            <div className="bg-purple-900/20 p-6 rounded-lg space-y-4">
              <h2 className="text-2xl font-semibold text-white">Our Promise</h2>
              <p className="text-gray-300">
                Every place you find on PlanIT has been visited by someone on our team or vouched for 
                by trusted locals. We don't list places just because they're popular - they need to 
                have that special something that makes them worth your time.
              </p>
            </div>
          </section>

          <section className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gradient">Why We Do This</h2>
            <p className="text-xl text-gray-300">
              Montreal isn't just a city to us - it's a collection of stories waiting to be discovered. 
              Every neighborhood, street corner, and local spot has something unique to offer. We're here 
              to help you find these places and create your own stories.
            </p>
            <p className="text-lg text-gray-400">
              And hey, we're always learning too! If you know a great spot we haven't covered, or have 
              a story to share, we'd love to hear from you. This is as much your platform as it is ours.
            </p>
          </section>

          <section className="text-center space-y-6 mt-24">
            <p className="text-2xl font-semibold text-white">
              Ready to explore Montreal differently?
            </p>
            <p className="text-xl text-gray-300">
              Join our community of curious explorers. Let's discover this city together.
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold mt-8"
              >
                Start Exploring
              </Button>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

