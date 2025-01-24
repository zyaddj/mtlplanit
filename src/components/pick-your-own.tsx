"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const locations = [
  "Downtown", "Old Port", "Plateau", "Mile End", "Westmount", "Brossard", "Laval", "Longueuil",
  "Outremont", "Verdun", "Griffintown", "Little Italy", "Hochelaga-Maisonneuve", "Saint-Henri",
  "Côte-des-Neiges", "NDG", "Villeray", "Rosemont", "Ahuntsic", "Pointe-Claire", "Dorval"
]

const moods = ["Chill", "Relax", "Outdoors", "Adventurous", "Cultural", "Romantic", "Energetic"]

const budgets = ["Free", "$", "$$", "$$$", "$$$$"]

export function PickYourOwn() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState("")
  const [mood, setMood] = useState("")
  const [budget, setBudget] = useState("")

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Here you would typically call an API or perform some logic to find an activity
      console.log("Finding activity with:", { location, mood, budget })
      // Reset the form
      setStep(1)
      setLocation("")
      setMood("")
      setBudget("")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="min-w-[200px] border-pink-500 text-white hover:bg-pink-500/10 hover-lift">
          Pick your own
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {step === 1 ? "Choose Location" : step === 2 ? "Select Mood" : "Set Budget"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {step === 1 && (
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {step === 2 && (
            <RadioGroup value={mood} onValueChange={setMood} className="flex flex-col space-y-2">
              {moods.map((m) => (
                <div key={m} className="flex items-center space-x-2">
                  <RadioGroupItem value={m} id={m} />
                  <Label htmlFor={m}>{m}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {step === 3 && (
            <RadioGroup value={budget} onValueChange={setBudget} className="flex justify-between">
              {budgets.map((b) => (
                <div key={b} className="flex items-center space-x-2">
                  <RadioGroupItem value={b} id={b} />
                  <Label htmlFor={b}>{b}</Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} className="btn-gradient">
            {step === 3 ? "Find Activity" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

