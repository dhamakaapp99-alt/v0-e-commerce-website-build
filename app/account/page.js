"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

export default function Account() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-40 p-4">
        <h1 className="text-2xl font-bold">My Account</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Account Info */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">MC</span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Mayra Collection</h2>
              <p className="text-muted-foreground text-sm">Premium Clothing Store</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Welcome to Mayra Collection. Browse our premium clothing collection and enjoy seamless shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 mb-8">
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="w-full justify-start bg-transparent">
              Browse Products
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="lg" className="w-full justify-start bg-transparent">
              My Cart
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full justify-start bg-transparent">
              <Home size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Admin Access */}
        <div className="bg-card border rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-3">Admin Access</h3>
          <p className="text-sm text-muted-foreground mb-4">Manage products, orders, and inventory</p>
          <Link href="/admin">
            <Button size="lg" className="w-full">
              Go to Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Mayra Collection © 2025</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </div>
  )
}
