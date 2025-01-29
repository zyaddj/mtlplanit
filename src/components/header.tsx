import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search, Heart } from "lucide-react"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/LanguageContext"

export function Header() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-blue-900/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center -ml-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe_Express_-_file__1_-removebg-preview-KvoQDS38GTuBFzQ3hBAEWX81TmuwR9.png"
            alt="Planit Logo"
            width={100}
            height={33}
            className="h-[1.8rem] w-auto"
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="pl-10 py-1 text-sm bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Link href="/activities" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t('activities')}
          </Link>
          <Link href="/locations" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t('locations')}
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t('about')}
          </Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/favorites"
            className="text-sm text-gray-300 hover:text-white transition-colors flex items-center"
          >
            <Heart className="w-4 h-4 mr-1" />
            {t('favorites')}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link href="/login">
            <Button variant="outline" className="btn-header">
              {t('login')}
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="btn-header-gradient">
              {t('signup')}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

