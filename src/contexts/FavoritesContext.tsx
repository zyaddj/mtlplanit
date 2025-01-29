"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

type FavoritesContextType = {
  favorites: string[]
  toggleFavorite: (id: string) => Promise<void>
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user || user.isAnonymous) {
      setFavorites([])
      return
    }

    const userRef = doc(db, "users", user.uid)
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setFavorites(doc.data().favorites || [])
      } else {
        setDoc(userRef, { favorites: [] })
      }
    })

    return () => unsubscribe()
  }, [user])

  const toggleFavorite = async (id: string) => {
    if (!user || user.isAnonymous) return

    const userRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(userRef)
    const currentFavorites = userDoc.exists() ? userDoc.data().favorites || [] : []
    
    const newFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((fav: string) => fav !== id)
      : [...currentFavorites, id]

    await setDoc(userRef, { favorites: newFavorites }, { merge: true })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
} 