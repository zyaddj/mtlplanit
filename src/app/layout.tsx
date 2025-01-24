import "@/app/globals.css"
import { Inter } from "next/font/google"
import { FavoritesProvider } from "@/contexts/FavoritesContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen text-white`}
        style={{
          backgroundImage: `
            linear-gradient(to bottom,
              rgba(0, 0, 0, 0.7),
              rgba(45, 27, 77, 0.7)
            ),
            url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-apasaric-1694000.jpg-lQdm5sRthFgEOpBqim1z0UezcrzTmK.jpeg')
          `,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}

