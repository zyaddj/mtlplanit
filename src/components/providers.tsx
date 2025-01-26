"use client"

import { SessionProvider } from "next-auth/react"
import { FavoritesProvider } from "@/contexts/FavoritesContext"
import { LanguageProvider } from "@/contexts/LanguageContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </LanguageProvider>
    </SessionProvider>
  )
} 