import Razorpay from "razorpay"
import crypto from "crypto"

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function createRazorpayOrder(amount, orderId) {
  try {
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1, // Auto capture payment
    }

    const order = await razorpayInstance.orders.create(options)
    return order
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    throw error
  }
}

export function verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
  try {
    const body = razorpayOrderId + "|" + razorpayPaymentId
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")

    return expectedSignature === razorpaySignature
  } catch (error) {
    console.error("Error verifying signature:", error)
    return false
  }
}
