export const runtime = "nodejs"

import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request) {
  try {
    const db = await getDatabase()
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await request.json()

    // Verify signature
    // Dynamically import Razorpay to prevent build-time initialization errors
    const { verifyRazorpaySignature } = await import("@/lib/razorpay")
    const isSignatureValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature)

    if (!isSignatureValid) {
      return Response.json({ success: false, error: "Invalid payment signature" }, { status: 400 })
    }

    // Update order in database
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          paymentStatus: "captured",
          status: "confirmed",
          razorpayPaymentId,
          razorpaySignature,
          updatedAt: new Date(),
        },
      },
    )

    if (result.modifiedCount === 0) {
      return Response.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return Response.json({
      success: true,
      message: "Payment verified and order confirmed",
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
