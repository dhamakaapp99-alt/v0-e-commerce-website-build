import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import BottomNav from "@/components/bottom-nav"
import ClientProviders from "@/components/client-providers"
import FloatingButtons from "@/components/floating-buttons"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Mayra Collection - Premium Clothing Store",
  description: "Shop premium clothing at Mayra Collection",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mayra Collection" />
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
      </head>
      <body className="font-sans antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>

        <BottomNav />
        <FloatingButtons />
        <Analytics />
      </body>
    </html>
  )
}
