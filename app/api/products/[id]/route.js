import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const db = await getDatabase()
    const product = await db.collection("products").findOne({
      _id: new ObjectId(id),
    })

    if (!product) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return Response.json({ success: true, product })
  } catch (error) {
    console.error("Error fetching product:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
