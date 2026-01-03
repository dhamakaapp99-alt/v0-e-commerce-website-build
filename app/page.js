import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronRight, ShoppingBag, Heart, Zap, Star, TrendingUp, Sparkles } from "lucide-react"

export default async function Home() {
  let data = { success: false, products: [] }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products?limit=8`, {
      cache: "no-store",
    })
    if (response.ok) {
      data = await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Mobile App-Style Hero */}
        <section className="bg-gradient-to-br from-teal-50 via-white to-blue-50 pt-6 pb-4">
          <div className="max-w-6xl mx-auto px-4">
            {/* Welcome Message */}
            <div className="mb-8">
              {/* <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-teal-600" size={28} />
              </div> */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Mayra Collection</h1>
              <p className="text-gray-600 text-lg">Trendy & Elegant Fashion</p>
            </div>

            {/* Quick Action Buttons */}
            {/* <div className="grid grid-cols-3 gap-3 mb-8">
              <Link href="/shop">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-teal-300 hover:shadow-md transition-all cursor-pointer">
                  <ShoppingBag size={24} className="text-teal-600 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-gray-900">Shop</p>
                </div>
              </Link>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-red-300 hover:shadow-md transition-all cursor-pointer">
                <Heart size={24} className="text-red-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">Wishlist</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-yellow-300 hover:shadow-md transition-all cursor-pointer">
                <Zap size={24} className="text-yellow-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-900">Deals</p>
              </div>
            </div> */}

            {/* Featured Banner */}
             <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold opacity-90">Limited Offer</p>
                  <h2 className="text-2xl font-bold">Up to 50% OFF</h2>
                  <p className="text-sm opacity-75 mt-1">On selected items</p>
                </div>
                <TrendingUp size={48} className="opacity-20" />
              </div>
            </div>
           
          </div>
        </section>

        <section className="py-0 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              <Link href="/shop">
                <Button variant="ghost" className="text-teal-600 hover:bg-teal-50">
                  View All
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </div>

            {/* Category Icons Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: "New In", icon: "✨", color: "bg-yellow-100" },
                { name: "Kurtas", icon: "👗", color: "bg-pink-100" },
                { name: "Suits", icon: "🎩", color: "bg-blue-100" },
                { name: "Dresses", icon: "💃", color: "bg-orange-100" },
                { name: "Tops", icon: "👕", color: "bg-red-100" },
                { name: "Bottoms", icon: "👖", color: "bg-green-100" },
              ].map((cat) => (
                <Link key={cat.name} href="/shop">
                  <div
                    className={`${cat.color} w-20 h-20 mx-auto rounded-full flex items-center justify-center hover:shadow-lg transition-all cursor-pointer`}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{cat.icon}</div>
                      <p className="text-xs font-semibold text-gray-900 leading-tight">{cat.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        

        {/* Featured Products Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                <p className="text-sm text-gray-600 mt-1">Bestsellers this week</p>
              </div>
              <Link href="/shop">
                <Button variant="ghost" className="text-teal-600 hover:bg-teal-50">
                  See All
                  <ChevronRight size={18} />
                </Button>
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
                <p className="text-gray-600">No products available yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Shop With Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">
                  Free shipping on orders over ₹500. Quick delivery to your doorstep.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Star size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">100% authentic products. Handpicked collections for you.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customer Care</h3>
                <p className="text-sm text-gray-600">7-day returns. Easy exchanges. Dedicated support team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Explore?</h2>
            <p className="text-gray-600 mb-8">Discover the latest fashion trends and exclusive offers</p>
            <Link href="/shop">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-3 rounded-lg">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
