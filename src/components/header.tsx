"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search, Heart, Menu } from "lucide-react";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { SignInDialog } from "@/components/auth/sign-in";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function Header() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setShowSignOutConfirm(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-black/50 backdrop-blur-sm border-b border-blue-900/20 px-2">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adobe_Express_-_file__1_-removebg-preview-KvoQDS38GTuBFzQ3hBAEWX81TmuwR9.png"
              alt="Planit Logo"
              width={100}
              height={33}
              className="h-[1.5rem] md:h-[1.8rem] w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center justify-center flex-grow space-x-8 mx-8">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="pl-10 py-1 text-sm bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <Link href="/activities" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t("activities")}
          </Link>
          <Link href="/locations" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t("locations")}
          </Link>
          <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t("about")}
          </Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link
            href="/favorites"
            className="text-sm text-gray-300 hover:text-white transition-colors flex items-center"
          >
            <Heart className="w-4 h-4 mr-1" />
            {t("favorites")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />

          <div className="scale-90 md:scale-100">
            {user?.isAnonymous ? (
              <SignInDialog />
            ) : user ? (
              <Button
                onClick={() => setShowSignOutConfirm(true)}
                variant="outline"
                className="btn-header text-sm whitespace-nowrap"
              >
                Sign Out
              </Button>
            ) : (
              <SignInDialog />
            )}
          </div>

          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-md ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <nav className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-blue-900/20 py-2 px-4 space-y-1 max-h-[80vh] overflow-y-auto">
            <div className="xs:hidden py-2 border-b border-blue-900/20 mb-2">
              <LanguageToggle />
            </div>

            <div className="relative w-full py-2 mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full pl-10 py-2 text-base bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>

            {[
              { href: "/activities", label: t("activities") },
              { href: "/locations", label: t("locations") },
              { href: "/about", label: t("about") },
              { href: "/pricing", label: "Pricing" },
              {
                href: "/favorites",
                label: t("favorites"),
                icon: <Heart className="w-4 h-4 mr-2" />,
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center text-base text-gray-300 hover:text-white py-3 px-2 hover:bg-white/5 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <Dialog open={showSignOutConfirm} onOpenChange={setShowSignOutConfirm}>
        <DialogContent className="sm:max-w-[425px] dialog-background">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-white">Sign Out</DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-300">Are you sure you want to sign out?</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={handleSignOut} className="bg-red-600 hover:bg-red-700 text-white">
              Yes, Sign Out
            </Button>
            <Button variant="outline" onClick={() => setShowSignOutConfirm(false)} className="btn-header">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
