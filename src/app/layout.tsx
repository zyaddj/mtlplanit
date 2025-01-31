import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Analytics } from '@vercel/analytics/react'
import { FeedbackForm } from "@/components/feedback-form"

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
            url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-apasaric-1694000.jpg-lQdm5sRthFgEOpBqim1z0UezcrzTmK.jpeg')
          `,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden"
        }}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <FeedbackForm />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

