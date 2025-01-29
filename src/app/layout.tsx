import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Analytics } from '@vercel/analytics/react'

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
              rgba(0, 32, 96, 0.7)
            ),
            url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/david-monje-n00dm9FBwrs-unsplash%20(1).jpg-jMF7bjjBwYqeODGTv5NoXNetBhDfhX.jpeg')
          `,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}

