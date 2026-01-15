"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react"
import { useEffect, useState } from "react"

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Don't show bottom nav on admin routes
  if (pathname.startsWith("/admin")) {
    return null
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/cart", label: "Cart", icon: ShoppingCart },
    { href: user ? "/profile" : "/login", label: user ? "Account" : "Sign In", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center justify-center py-3 px-2 ${
                  isActive ? "text-[#00786f] border-t-2 border-[#00786f]" : "text-muted-foreground"
                }`}
              >
                <Icon size={24} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
