"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { motion } from "framer-motion"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    features: ["Access to basic activities", "Limited recommendations", "Standard support"],
    notIncluded: ["Premium activities", "Personalized itineraries", "Priority support"],
  },
  {
    name: "Premium",
    price: "$9.99",
    features: [
      "Access to all activities",
      "Unlimited recommendations",
      "Personalized itineraries",
      "Priority support",
      "Exclusive events access",
    ],
    notIncluded: [],
  },
  {
    name: "Family",
    price: "$19.99",
    features: [
      "All Premium features",
      "Up to 5 family members",
      "Family-friendly recommendations",
      "Group activity planning",
      "Discounts on family events",
    ],
    notIncluded: [],
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 space-y-12">
          <motion.h1
            className="text-4xl font-bold text-center text-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Adventure Plan
          </motion.h1>

          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "outline"}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly (Save 20%)
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className="bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50 transition-all hover-lift"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center text-white">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-3xl font-bold text-center text-gradient">
                    {billingCycle === "yearly"
                      ? `$${(Number.parseFloat(plan.price.slice(1)) * 12 * 0.8).toFixed(2)}`
                      : plan.price}
                    <span className="text-sm font-normal text-gray-400">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white">
                        <Check className="w-5 h-5 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-400">
                        <X className="w-5 h-5 mr-2 text-red-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

