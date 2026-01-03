import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import BottomNav from "@/components/bottom-nav"
import ClientProviders from "@/components/client-providers"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Mayra Collection - Premium Clothing Store",
  description: "Shop premium clothing at Mayra Collection",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mayra Collection" />
      </head>
      <body className="font-sans antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>

        <BottomNav />
        <Analytics />
      </body>
    </html>
  )
}
