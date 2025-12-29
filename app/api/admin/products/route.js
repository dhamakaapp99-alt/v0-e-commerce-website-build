import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request) {
  try {
    const db = await getDatabase()
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20

    const products = await db
      .collection("products")
      .find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection("products").countDocuments()

    return Response.json({
      success: true,
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const db = await getDatabase()
    const { id, ...updateData } = await request.json()

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error updating product:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const db = await getDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
