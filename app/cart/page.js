"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ChevronLeft, ShoppingCart, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/header"

export default function Cart() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, getTotal, isLoading } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading cart...</p>
          </div>
        </div>
      </>
    )
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white flex flex-col items-center justify-center pb-24">
          <ShoppingCart size={80} className="text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-center max-w-sm">
            Start shopping to add items to your cart. Browse our collection of premium clothing.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 px-8 text-lg rounded-lg"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </>
    )
  }

  const total = getTotal()
  const shipping = total > 500 ? 0 : 50

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pb-32 md:pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-16 bg-white border-b z-40 flex items-center justify-between p-4 md:px-8">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center text-gray-900">Shopping Cart</h1>
          <div className="w-10" />
        </div>

        {/* Cart Items & Summary */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {cart.length} {cart.length === 1 ? "Item" : "Items"}
              </h2>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}-${index}`}
                    className="flex gap-4 bg-white border border-gray-200 p-4 rounded-lg hover:border-primary transition-colors"
                  >
                    {/* Product Image */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=96&width=96&query=clothing"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                      </div>
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex flex-col justify-between items-end gap-4">
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-200 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-32">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">Free shipping on orders over ₹500</p>
                  )}
                  <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{(total + shipping).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block mb-3">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-2"
                  >
                    Checkout
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-2 border-gray-300 text-gray-900 hover:bg-gray-100 font-semibold py-6 text-lg rounded-lg bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
