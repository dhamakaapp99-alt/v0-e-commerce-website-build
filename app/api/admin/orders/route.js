import { getDatabase } from "@/lib/mongodb"

export async function GET(request) {
  try {
    const db = await getDatabase()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20

    const query = {}
    if (status && status !== "all") {
      query.paymentStatus = status
    }

    const orders = await db
      .collection("orders")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection("orders").countDocuments(query)

    return Response.json({
      success: true,
      orders,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
