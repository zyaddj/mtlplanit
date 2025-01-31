"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Search, Heart, Menu, X } from "lucide-react"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { SignInDialog } from "@/components/auth/sign-in"
import { useAuth } from "@/contexts/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Header() {
  const { t } = useLanguage()
  const { user, signOut } = useAuth()
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleSignOut = async () => {
    await signOut()
    setShowSignOutConfirm(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-200 
      ${isScrolled ? 'bg-black/80' : 'bg-black/50'} backdrop-blur-sm border-b border-blue-900/20`}>
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Left section with logo */}
        <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe_Express_-_file__1_-removebg-preview-KvoQDS38GTuBFzQ3hBAEWX81TmuwR9.png"
            alt="Planit Logo"
            width={100}
            height={33}
            className="h-[1.6rem] md:h-[1.8rem] w-auto"
            priority
          />
        </Link>

        {/* Center section with navigation (desktop only) */}
        <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
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
          <Link href="/favorites" className="text-sm text-gray-300 hover:text-white transition-colors flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {t('favorites')}
          </Link>
        </nav>

        {/* Right section with auth and language */}
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageToggle />
          {user?.isAnonymous ? (
            <SignInDialog />
          ) : user ? (
            <Button 
              onClick={() => setShowSignOutConfirm(true)} 
              variant="outline" 
              className="btn-header text-xs md:text-sm px-2 md:px-4"
            >
              Sign Out
            </Button>
          ) : (
            <SignInDialog />
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300 
        ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
        ${isMobileMenuOpen ? 'z-[90]' : 'z-[-1]'}`}>
        <nav className="pt-20 px-6 space-y-1">
          <div className="relative w-full mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="w-full pl-10 py-2 text-base bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>
          {[
            { href: '/activities', label: t('activities') },
            { href: '/locations', label: t('locations') },
            { href: '/about', label: t('about') },
            { href: '/pricing', label: 'Pricing' },
            { href: '/favorites', label: t('favorites'), icon: Heart }
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="flex items-center text-lg text-gray-300 hover:text-white py-4 border-b border-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon && <item.icon className="w-5 h-5 mr-3" />}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Sign Out Confirmation Dialog */}
      <Dialog open={showSignOutConfirm} onOpenChange={setShowSignOutConfirm}>
        <DialogContent className="sm:max-w-[425px] dialog-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Sign Out
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-300">
            Are you sure you want to sign out?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Sign Out
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowSignOutConfirm(false)}
              className="btn-header"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

