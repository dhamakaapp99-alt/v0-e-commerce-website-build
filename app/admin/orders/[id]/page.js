"use client"

import { use, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OrderDetail({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${id}`)
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

  const updateOrderStatus = async (newStatus) => {
    setUpdatingStatus(true)
    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setOrder((prev) => ({ ...prev, status: newStatus }))
      }
    } catch (error) {
      console.error("Error updating order:", error)
    } finally {
      setUpdatingStatus(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Link href="/admin">
          <Button>Back to Admin</Button>
        </Link>
      </div>
    )
  }

  const statusOptions = ["confirmed", "shipped", "delivered", "cancelled"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-40 flex items-center gap-4 p-4">
        <Link href="/admin">
          <button className="p-2 hover:bg-muted rounded-lg">
            <ChevronLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Order Summary */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Order ID</p>
              <p className="font-semibold text-sm break-all">{order._id.toString().slice(-12)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="font-semibold text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
              <p className="font-semibold text-green-600">{order.paymentStatus.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Order Status</p>
              <p className="font-semibold text-blue-600">{order.status.toUpperCase()}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground mb-1">Razorpay Order ID</p>
            <p className="font-mono text-xs break-all text-muted-foreground mb-4">{order.razorpayOrderId}</p>

            <p className="text-xs text-muted-foreground mb-1">Razorpay Payment ID</p>
            <p className="font-mono text-xs break-all text-muted-foreground">{order.razorpayPaymentId}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-semibold">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-semibold">{order.customerPhone}</p>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground mb-2">Shipping Address</p>
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
              <p className="text-sm text-muted-foreground">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
              </p>
              <p className="text-sm text-muted-foreground">{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start pb-4 border-b last:border-b-0 last:pb-0">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.size && `Size: ${item.size}`}
                    {item.color && ` | Color: ${item.color}`}
                  </p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground">₹{item.price}/unit</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 text-right">
            <p className="text-lg font-bold">Total: ₹{order.totalAmount.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* Order Status Update */}
        <div className="bg-card border rounded-lg p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Update Order Status</h2>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={order.status === status ? "default" : "outline"}
                onClick={() => updateOrderStatus(status)}
                disabled={updatingStatus}
                className={order.status === status ? "" : "bg-transparent"}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
