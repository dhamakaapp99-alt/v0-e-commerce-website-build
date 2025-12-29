"use client"

import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ChevronLeft, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Cart() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, getTotal, isLoading } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pb-24">
        <ShoppingCart size={64} className="text-muted-foreground mb-4 opacity-50" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
        <Link href="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  const total = getTotal()

  return (
    <div className="min-h-screen bg-background pb-32 md:pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-40 flex items-center justify-between p-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-lg">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1 text-center">Shopping Cart</h1>
        <div className="w-10" />
      </div>

      {/* Cart Items */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.size}-${item.color}-${index}`}
              className="flex gap-4 bg-card p-4 rounded-lg border"
            >
              {/* Product Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
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
                  <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                </div>
                <p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
              </div>

              {/* Quantity and Remove */}
              <div className="flex flex-col justify-between items-end">
                <button
                  onClick={() => removeFromCart(item.id, item.size, item.color)}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                    className="px-2 py-1 hover:bg-muted"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    className="px-2 py-1 hover:bg-muted"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-card border rounded-lg p-6">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Link href="/checkout" className="block">
            <Button size="lg" className="w-full mb-3">
              Proceed to Checkout
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
