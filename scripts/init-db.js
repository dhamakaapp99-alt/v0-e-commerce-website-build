import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI

async function initializeDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db("mayra_collection")

    console.log("Creating collections...")

    // Products collection
    await db.createCollection("products", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "price", "category", "stock", "images"],
          properties: {
            _id: { bsonType: "objectId" },
            name: { bsonType: "string" },
            description: { bsonType: "string" },
            price: { bsonType: "double" },
            category: { bsonType: "string" },
            images: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            stock: { bsonType: "int" },
            sizes: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            colors: {
              bsonType: "array",
              items: { bsonType: "string" },
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
          },
        },
      },
    })

    // Orders collection
    await db.createCollection("orders", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "items", "totalAmount", "status", "paymentStatus"],
          properties: {
            _id: { bsonType: "objectId" },
            userId: { bsonType: "string" },
            items: {
              bsonType: "array",
              items: {
                bsonType: "object",
                properties: {
                  productId: { bsonType: "objectId" },
                  name: { bsonType: "string" },
                  price: { bsonType: "double" },
                  quantity: { bsonType: "int" },
                  size: { bsonType: "string" },
                  color: { bsonType: "string" },
                },
              },
            },
            totalAmount: { bsonType: "double" },
            status: { enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"] },
            paymentStatus: { enum: ["pending", "captured", "failed"] },
            razorpayOrderId: { bsonType: "string" },
            razorpayPaymentId: { bsonType: "string" },
            razorpaySignature: { bsonType: "string" },
            customerEmail: { bsonType: "string" },
            customerPhone: { bsonType: "string" },
            shippingAddress: {
              bsonType: "object",
              properties: {
                name: { bsonType: "string" },
                address: { bsonType: "string" },
                city: { bsonType: "string" },
                state: { bsonType: "string" },
                pincode: { bsonType: "string" },
                country: { bsonType: "string" },
              },
            },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" },
          },
        },
      },
    })

    // Admin users collection
    await db.createCollection("admins")

    // Create indexes
    console.log("Creating indexes...")
    await db.collection("products").createIndex({ category: 1 })
    await db.collection("products").createIndex({ name: "text", description: "text" })
    await db.collection("orders").createIndex({ userId: 1 })
    await db.collection("orders").createIndex({ status: 1 })
    await db.collection("orders").createIndex({ paymentStatus: 1 })
    await db.collection("orders").createIndex({ createdAt: -1 })

    console.log("Database initialized successfully!")
  } catch (error) {
    console.error("Error initializing database:", error)
  } finally {
    await client.close()
  }
}

initializeDatabase()
