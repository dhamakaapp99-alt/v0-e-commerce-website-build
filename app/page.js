import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products?limit=8`, {
    cache: "no-store",
  })
  const data = await response.json()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="w-full min-h-[500px] bg-gradient-to-br from-teal-600 via-teal-700 to-slate-900 text-white flex items-center justify-center mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-screen blur-3xl -top-32 -left-32"></div>
            <div className="absolute w-96 h-96 bg-white rounded-full mix-blend-screen blur-3xl -bottom-32 -right-32"></div>
          </div>
          <div className="text-center px-4 relative z-10">
            <div className="mb-6 flex justify-center">
              <img src="/mayra-logo.png" alt="Mayra Collection" className="w-20 h-20" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Mayra Collection</h1>
            <p className="text-lg md:text-2xl text-teal-100 mb-8 font-light">Trendy. Elegant. Timeless.</p>
            <Link href="/shop">
              <Button size="lg" className="bg-white text-teal-700 hover:bg-gray-100 font-semibold">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Trust Section */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚚</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Free shipping on orders over ₹500</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🔒</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Powered by Razorpay</p>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">↩️</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day return policy</p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link href="/shop">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          {data.success && data.products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available yet.</p>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
