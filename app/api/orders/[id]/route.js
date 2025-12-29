import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const db = await getDatabase()
    const order = await db.collection("orders").findOne({
      _id: new ObjectId(params.id),
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
