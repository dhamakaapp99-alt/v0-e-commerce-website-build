"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Search, X, User, LogOut, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartUpdate, setCartUpdate] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn && userData) {
      setUser(JSON.parse(userData))
    }

    const updateCartCount = () => {
      const cart = localStorage.getItem("mayra_cart")
      if (cart) {
        const items = JSON.parse(cart)
        setCartCount(items.length)
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()

    // Listen for storage changes (from other tabs)
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates from same tab
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [cartUpdate])

  // Trigger update when component mounts
  useEffect(() => {
    setCartUpdate((prev) => prev + 1)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    setUser(null)
    setMobileMenuOpen(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 relative">
              <img src="/mayra-logo.png" alt="Mayra Collection" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold text-gray-900">Mayra Collection</div>
              <div className="text-xs text-gray-600">Trendy Elegant</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Shop
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              About
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition hidden sm:flex">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition relative group">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <a
              href="https://wa.me/919636509015"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-green-100 rounded-lg transition hidden sm:flex text-green-600"
              title="Contact on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-teal-600 hover:bg-teal-50">
                    <User size={18} />
                    <span className="text-sm font-medium">{user.name?.split(" ")[0]}</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/shop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Shop
            </Link>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              About
            </Link>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Contact
            </Link>

            <a
              href="https://wa.me/919636509015"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-green-600 hover:bg-green-50 rounded font-medium"
            >
              <MessageCircle size={18} className="inline mr-2" />
              WhatsApp Us
            </a>

            {user ? (
              <>
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-medium">
                  <User size={18} className="inline mr-2" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded font-medium"
                >
                  <LogOut size={18} className="inline mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="w-full mt-2 text-teal-600 border-teal-600 bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
