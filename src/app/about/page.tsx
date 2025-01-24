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
            <h1 className="text-4xl font-bold text-gradient">Discover. Plan. Enjoy.</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Welcome to PlanIT, your ultimate platform for discovering Montreal&apos;s best activities!
            </p>
          </section>

          <section className="grid md:grid-cols-3 gap-8">
            <div className="bg-purple-900/20 p-6 rounded-lg space-y-4">
              <MapPin className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Discover</h2>
              <p className="text-gray-300">
                Explore hidden gems and iconic spots alike. From community events to thrilling activities.
              </p>
            </div>
            <div className="bg-purple-900/20 p-6 rounded-lg space-y-4">
              <Calendar className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Plan</h2>
              <p className="text-gray-300">
                Organize your perfect day with just a few clicks. Filter by type, location, and budget.
              </p>
            </div>
            <div className="bg-purple-900/20 p-6 rounded-lg space-y-4">
              <DollarSign className="h-8 w-8 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Enjoy</h2>
              <p className="text-gray-300">
                Create lasting memories with ease. Find the perfect activity for any mood.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 p-8 rounded-lg space-y-6">
            <h2 className="text-3xl font-bold text-center text-white">Why PlanIT?</h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Personalized Recommendations: Find activities that match your style and interests.</li>
              <li>Hassle-Free Planning: Organize your day with just a few clicks.</li>
              <li>Inclusive Options: Explore free and budget-friendly activities alongside premium experiences.</li>
              <li>Mystery Button Fun: Add a little spontaneity to your life with a random, curated suggestion.</li>
            </ul>
          </section>

          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gradient">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              At PlanIT, we believe that creating memories should be easy. Our mission is to bring people together
              through shared experiences, helping you uncover the best Montreal has to offer.
            </p>
          </section>

          <section className="text-center space-y-6">
            <p className="text-2xl font-semibold text-white">
              Plan your next adventure with ease. Plan it, live it, love it—PlanIT!
            </p>
            <p className="text-xl text-gray-300">
              Let us help you turn everyday moments into extraordinary experiences.
            </p>
            <Link href="/">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
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

