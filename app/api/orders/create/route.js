export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request) {
  try {
    const db = await getDatabase()
    const body = await request.json()

    const {
      items,
      totalAmount,
      customerEmail,
      customerPhone,
      shippingAddress,
    } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const orderId = new ObjectId().toString()
    // Dynamically import Razorpay to prevent build-time initialization errors
    const { createRazorpayOrder } = await import("@/lib/razorpay")
    const razorpayOrder = await createRazorpayOrder(totalAmount, orderId)

    const orderData = {
      userId: customerEmail,
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

    return NextResponse.json({
      success: true,
      orderId: result.insertedId.toString(),
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
    })
  } catch (error) {
    console.error("Order create error:", error)

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
