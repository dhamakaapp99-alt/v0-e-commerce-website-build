import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import { ChevronRight, Sparkles } from "lucide-react"

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
        <section className="w-full min-h-[600px] bg-white relative overflow-hidden pt-8 md:pt-0">
          <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[600px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-primary" />
                <span className="text-sm font-semibold text-primary">TRENDY & ELEGANT</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Mayra Collection
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover a curated selection of premium clothing designed for the modern, stylish individual. Elevate
                your wardrobe with timeless pieces and contemporary designs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/shop" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded-lg flex items-center justify-center gap-2"
                  >
                    Shop Collection
                    <ChevronRight size={20} />
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="font-bold text-2xl text-gray-900">2K+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">500+</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div>
                  <p className="font-bold text-2xl text-gray-900">4.8★</p>
                  <p className="text-sm text-gray-600">Avg. Rating</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-100 to-blue-100">
              <img
                src="https://images.unsplash.com/photo-1490481651971-daf3e7b3d9fd?w=600&h=700&fit=crop"
                alt="Fashion model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Mayra Collection</h2>
              <p className="text-lg text-gray-600">Premium quality, affordable prices, exceptional service</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Free shipping on orders over ₹500. Delivery within 3-5 business days.</p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% encrypted checkout powered by Razorpay. Your data is safe.</p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">↩️</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Easy Returns</h3>
                <p className="text-gray-600">7-day return policy. No questions asked. Full refund guaranteed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600 mt-2">Discover our latest collection</p>
              </div>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="hidden md:flex border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  View All
                  <ChevronRight size={20} />
                </Button>
              </Link>
            </div>

            {data.success && data.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No products available yet.</p>
              </div>
            )}

            <div className="mt-12 text-center md:hidden">
              <Link href="/shop">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-24 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 text-lg">Get exclusive offers and new arrivals delivered to your inbox.</p>
            <form className="flex gap-4 max-w-md mx-auto flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-lg">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}
