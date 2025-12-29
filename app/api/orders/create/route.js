import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import Razorpay from "razorpay"

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    const db = await getDatabase()
    const { items, totalAmount, customerEmail, customerPhone, shippingAddress } = await request.json()

    if (!items || items.length === 0) {
      return Response.json({ success: false, error: "Cart is empty" }, { status: 400 })
    }

    // Create Razorpay order
    const orderId = new ObjectId().toString()
    
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: orderId,
    })

    // Create order in database with pending status
    const orderData = {
      userId: customerEmail, // Using email as user identifier for now
      items: items.map((item) => ({
        productId: new ObjectId(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "",
        color: item.color || "",
      })),
      totalAmount,
      status: "pending",
      paymentStatus: "pending",
      razorpayOrderId: razorpayOrder.id,
      customerEmail,
      customerPhone,
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection("orders").insertOne(orderData)

    return Response.json({
      success: true,
      orderId: result.insertedId,
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
