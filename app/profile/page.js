"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, LogOut, ShoppingBag, Heart, ArrowRight } from "lucide-react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    if (!isLoggedIn || !userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))

    // Fetch user orders
    const userOrders = localStorage.getItem(`orders_${JSON.parse(userData).email}`)
    if (userOrders) {
      setOrders(JSON.parse(userOrders))
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <Link href="/shop">
            <Button variant="ghost" className="text-teal-600 hover:bg-teal-50">
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:col-span-1">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{user.email}</p>
            </div>

            <div className="space-y-4">
              {/* Profile Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Orders & Activity */}
          <div className="md:col-span-2 space-y-8">
            {/* Orders Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={24} className="text-teal-600" />
                  Recent Orders
                </h3>
                <Link href="/orders">
                  <Button variant="ghost" className="text-teal-600 hover:bg-teal-50">
                    View All
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Completed
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">₹{order.total}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No orders yet</p>
                  <Link href="/shop">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white">Start Shopping</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <ShoppingBag size={32} className="text-teal-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total Orders</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <Heart size={32} className="text-red-500 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">0</p>
                <p className="text-sm text-gray-600 mt-1">Wishlist Items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
