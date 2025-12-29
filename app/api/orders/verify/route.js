import { getDatabase } from "@/lib/mongodb"
import crypto from "crypto"
import { ObjectId } from "mongodb"

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = await request.json()

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex")

    if (expectedSignature === razorpay_signature) {
      const db = await getDatabase()
      await db.collection("orders").updateOne(
        { _id: new ObjectId(orderId) },
        {
          $set: {
            paymentStatus: "paid",
            status: "processing",
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            updatedAt: new Date(),
          },
        }
      )
      return Response.json({ success: true })
    } else {
      return Response.json({ success: false, error: "Invalid signature" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}