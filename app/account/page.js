"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Settings, ShoppingBag } from "lucide-react"
import Header from "@/components/header"

export default function Account() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-24">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-3xl font-bold">MC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mayra Collection</h1>
                <p className="text-teal-100">Premium Clothing Store</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="bg-teal-50 border-l-4 border-teal-600 rounded p-4 mb-8">
            <p className="text-sm text-teal-900">
              Welcome to Mayra Collection! Browse our premium clothing collection and enjoy a seamless shopping
              experience with secure checkout and fast delivery.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/shop" className="block">
                <Button variant="outline" size="lg" className="w-full justify-start bg-white hover:bg-gray-50">
                  <ShoppingBag size={18} className="mr-3" />
                  Browse Products
                </Button>
              </Link>
              <Link href="/cart" className="block">
                <Button variant="outline" size="lg" className="w-full justify-start bg-white hover:bg-gray-50">
                  <ShoppingBag size={18} className="mr-3" />
                  My Shopping Cart
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" size="lg" className="w-full justify-start bg-white hover:bg-gray-50">
                  <Home size={18} className="mr-3" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Admin Panel Section */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="text-teal-600" size={24} />
              <h3 className="font-bold text-lg">Admin Dashboard</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Access the admin panel to manage products, inventory, orders, and view detailed sales data.
            </p>
            <Link href="/admin" className="block">
              <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                Open Admin Dashboard
              </Button>
            </Link>
          </div>

          {/* Store Info */}
          <div className="bg-gray-50 rounded-lg p-6 text-center text-sm">
            <p className="font-semibold text-gray-900 mb-1">Mayra Collection</p>
            <p className="text-muted-foreground mb-4">Trendy. Elegant. Timeless.</p>
            <p className="text-xs text-muted-foreground">© 2025 Mayra Collection. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}
