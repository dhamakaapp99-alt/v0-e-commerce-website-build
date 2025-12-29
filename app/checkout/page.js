"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function Checkout() {
  const router = useRouter()
  const { cart, getTotal, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background flex items-center justify-center pb-24">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/shop">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const total = getTotal()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const initializeRazorpayPayment = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pincode
      ) {
        alert("Please fill all required fields")
        setLoading(false)
        return
      }

      // Create order on backend
      const createOrderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            name: formData.name,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country,
          },
        }),
      })

      const orderData = await createOrderResponse.json()

      if (!orderData.success) {
        alert("Failed to create order. Please try again.")
        setLoading(false)
        return
      }

      // Load Razorpay script
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        const options = {
          key: orderData.razorpayKeyId,
          amount: orderData.amount,
          currency: "INR",
          name: "Mayra Collection",
          description: "Premium Clothing Purchase",
          order_id: orderData.razorpayOrderId,
          handler: async (response) => {
            // Verify payment on backend
            const verifyResponse = await fetch("/api/orders/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyData.success) {
              clearCart()
              router.push(`/order-success?orderId=${orderData.orderId}`)
            } else {
              alert("Payment verification failed. Please contact support.")
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: "#0d9488",
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
            },
          },
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-20 md:top-20 bg-background border-b z-40 flex items-center justify-between p-4">
          <Link href="/cart">
            <button className="p-2 hover:bg-muted rounded-lg">
              <ChevronLeft size={24} />
            </button>
          </Link>
          <h1 className="text-lg font-semibold flex-1 text-center">Checkout</h1>
          <div className="w-10" />
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          <form onSubmit={initializeRazorpayPayment} className="space-y-8">
            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
              <div className="space-y-3">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    name="city"
                    placeholder="City *"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="state"
                    placeholder="State *"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    name="pincode"
                    placeholder="Pincode *"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold mb-6">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              {/* Payment Info */}
              <div className="bg-teal-50 border border-teal-200 rounded p-3 mb-6">
                <p className="text-sm text-teal-900">
                  <strong>Payment Method:</strong> Razorpay Secure Payment
                </p>
                <p className="text-xs text-teal-800 mt-1">Your payment will be processed securely through Razorpay.</p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Processing..." : `Pay ₹${total.toLocaleString("en-IN")}`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
