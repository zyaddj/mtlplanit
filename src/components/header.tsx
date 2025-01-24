import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search, Heart } from "lucide-react"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-purple-900/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-18%20194851-6eaRU6sjPukX7KjokZY5KBpNMeNG4r.png"
            alt="Planit Logo"
            width={160}
            height={53}
            className="h-[2.6rem] w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for an activity"
              className="pl-10 py-1 text-sm bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Link href="/activities" className="text-sm text-gray-300 hover:text-white transition-colors">
            Activities
          </Link>
          <Link href="/locations" className="text-sm text-gray-300 hover:text-white transition-colors">
            Locations
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/favorites"
            className="text-sm text-gray-300 hover:text-white transition-colors flex items-center"
          >
            <Heart className="w-4 h-4 mr-1" />
            Favorites
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="btn-header">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="btn-header-gradient">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

