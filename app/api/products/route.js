import { getDatabase } from "@/lib/mongodb"

export async function GET(request) {
  try {
    const db = await getDatabase()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 12

    const query = {}
    if (category && category !== "all") {
      query.category = category
    }

    const products = await db
      .collection("products")
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection("products").countDocuments(query)

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

export async function POST(request) {
  try {
    const db = await getDatabase()
    const data = await request.json()

    const result = await db.collection("products").insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return Response.json({
      success: true,
      productId: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
