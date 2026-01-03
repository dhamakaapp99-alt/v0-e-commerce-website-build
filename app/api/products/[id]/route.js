import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params
    const db = await getDatabase()

    // Validate ObjectId format
    if (!ObjectId.isValid(resolvedParams.id)) {
      return Response.json({ success: false, error: "Invalid product ID" }, { status: 400 })
    }

    const product = await db.collection("products").findOne({
      _id: new ObjectId(resolvedParams.id),
    })

    if (!product) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return Response.json({ success: true, product })
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
