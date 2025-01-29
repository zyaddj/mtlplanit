"use client"

import { SessionProvider } from "next-auth/react"
import { FavoritesProvider } from "@/contexts/FavoritesContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { AuthProvider } from "@/contexts/AuthContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SessionProvider>
        <LanguageProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </LanguageProvider>
      </SessionProvider>
    </AuthProvider>
  )
} 