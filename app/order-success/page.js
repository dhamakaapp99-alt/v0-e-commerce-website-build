"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"

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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. Your order has been received.</p>

        {loading ? (
          <p className="text-muted-foreground">Loading order details...</p>
        ) : order ? (
          <div className="bg-card border rounded-lg p-6 mb-8 text-left">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Order ID</p>
                <p className="font-semibold text-sm break-all">{orderId}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Amount Paid</p>
                <p className="font-bold text-lg">₹{order.totalAmount.toLocaleString("en-IN")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-green-600">Payment Confirmed</p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <Link href="/shop" className="block">
            <Button size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          You will receive an order confirmation email shortly. Please keep your order ID for reference.
        </p>
      </div>
    </div>
  )
}
