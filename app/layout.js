import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import BottomNav from "@/components/bottom-nav"
import AuthGuard from "@/components/auth-guard"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Mayra Collection - Premium Clothing Store",
  description: "Shop premium clothing at Mayra Collection",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    userScalable: false,
    viewportFit: "cover",
    themeColor: "#000000",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Mayra Collection" />
      </head>
      <body className={`font-sans antialiased`}>
        <AuthGuard>{children}</AuthGuard>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  )
}
