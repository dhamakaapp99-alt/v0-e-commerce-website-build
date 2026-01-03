import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const db = await getDatabase()
    const order = await db.collection("orders").findOne({
      _id: new ObjectId(id),
    })

    if (!order) {
      return Response.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return Response.json({ success: true, order })
  } catch (error) {
    console.error("Error fetching order:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const db = await getDatabase()
    const { status } = await request.json()

    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
    )

    if (result.modifiedCount === 0) {
      return Response.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    return Response.json({ success: true, message: "Order updated" })
  } catch (error) {
    console.error("Error updating order:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
