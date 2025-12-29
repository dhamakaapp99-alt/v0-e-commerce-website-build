"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Header from "@/components/header"

export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      const data = await response.json()
      if (data.success) {
        setOrder(data.order)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex items-center justify-center px-4 pb-24 pt-8">
        <div className="max-w-md w-full">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
              <CheckCircle size={80} className="text-green-600 relative" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-center mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground text-center mb-8">
            Thank you for your purchase. Your order has been received and will be processed shortly.
          </p>

          {/* Order Details */}
          {loading ? (
            <p className="text-muted-foreground text-center">Loading order details...</p>
          ) : order ? (
            <div className="bg-white border-2 border-green-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Order ID</p>
                  <p className="font-mono text-sm font-bold text-green-700 break-all mt-1">{orderId}</p>
                </div>
                <div className="pb-4 border-b">
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Amount Paid</p>
                  <p className="font-bold text-2xl text-green-600 mt-1">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Payment Status</p>
                  <p className="font-semibold text-green-600 mt-1 flex items-center gap-2">
                    <CheckCircle size={16} />
                    Payment Verified
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Delivery Timeline */}
          <div className="bg-card border rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sm mb-4">Expected Delivery Timeline</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Order Placed</p>
                  <p className="text-muted-foreground text-xs">Today</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Order Confirmed</p>
                  <p className="text-muted-foreground text-xs">1-2 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Shipped</p>
                  <p className="text-muted-foreground text-xs">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Delivered</p>
                  <p className="text-muted-foreground text-xs">3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/shop" className="block">
              <Button size="lg" className="w-full bg-teal-600 hover:bg-teal-700">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Footer Message */}
          <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
            You will receive an order confirmation email shortly. Please save your order ID for tracking. Contact us if
            you have any questions.
          </p>
        </div>
      </div>
    </>
  )
}
