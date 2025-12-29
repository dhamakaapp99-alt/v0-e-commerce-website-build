"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/use-cart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Lock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

export default function Checkout() {
  const router = useRouter()
  const { cart, getTotal, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
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
        <div className="min-h-screen bg-white flex items-center justify-center pb-24">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 px-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const total = getTotal()
  const shipping = total > 500 ? 0 : 50

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Invalid phone number"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode"
    return newErrors
  }

  const initializeRazorpayPayment = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      // Create order on backend
      const createOrderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: total + shipping,
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
      <div className="min-h-screen bg-white pb-24">
        {/* Header */}
        <div className="sticky top-16 md:top-16 bg-white border-b z-40 flex items-center justify-between p-4 md:px-8">
          <Link href="/cart">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft size={24} />
            </button>
          </Link>
          <h1 className="text-lg font-semibold flex-1 text-center text-gray-900">Checkout</h1>
          <div className="w-10" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={initializeRazorpayPayment} className="space-y-8">
                {/* Shipping Address */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`border-2 rounded-lg py-3 ${errors.name ? "border-red-500" : "border-gray-200"}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`border-2 rounded-lg py-3 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                        <Input
                          type="tel"
                          name="phone"
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`border-2 rounded-lg py-3 ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address *</label>
                      <Input
                        type="text"
                        name="address"
                        placeholder="123 Main Street"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={`border-2 rounded-lg py-3 ${errors.address ? "border-red-500" : "border-gray-200"}`}
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">City *</label>
                        <Input
                          type="text"
                          name="city"
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`border-2 rounded-lg py-3 ${errors.city ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">State *</label>
                        <Input
                          type="text"
                          name="state"
                          placeholder="Maharashtra"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`border-2 rounded-lg py-3 ${errors.state ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Pincode *</label>
                        <Input
                          type="text"
                          name="pincode"
                          placeholder="400001"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className={`border-2 rounded-lg py-3 ${errors.pincode ? "border-red-500" : "border-gray-200"}`}
                        />
                        {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900">100% Secure Payment</p>
                    <p className="text-sm text-green-800">Your payment is encrypted and secure</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-2 hidden md:flex"
                  disabled={loading}
                >
                  <Lock size={20} />
                  {loading ? "Processing..." : `Pay ₹${(total + shipping).toLocaleString("en-IN")}`}
                </Button>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 sticky top-32">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-300 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : "text-gray-900"}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{(total + shipping).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <form onSubmit={initializeRazorpayPayment} className="md:hidden">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    <Lock size={20} />
                    {loading ? "Processing..." : "Proceed to Pay"}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Submit Button */}
          <form onSubmit={initializeRazorpayPayment} className="md:hidden mt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Lock size={20} />
              {loading ? "Processing..." : `Pay ₹${(total + shipping).toLocaleString("en-IN")}`}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
