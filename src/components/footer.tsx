"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WaveBackground } from "@/components/wave-background"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative bg-black/90 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('company')}</h3>
            <p className="text-sm text-gray-400">
              Discover and plan amazing activities in Montreal. Your adventure starts here.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('resources')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('press')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('followUs')}</h3>
            <p className="text-sm text-gray-400">{t('stayUpdated')}</p>
            <form
              className="flex space-x-2"
              onSubmit={(e) => {
                e.preventDefault()
                console.log("Newsletter signup")
              }}
            >
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border-white/10 text-white" 
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
              >
                {t('subscribe')}
              </Button>
            </form>
          </div>
        </div>
        <div className="border-t border-blue-900/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">{t('copyright')}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

