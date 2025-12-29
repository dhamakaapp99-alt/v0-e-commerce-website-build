import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import { ChevronRight, ShoppingBag, Heart, Zap, Star, TrendingUp, MapPin, Store, Search, Sparkles, ArrowRight } from "lucide-react"
import { getDatabase } from "@/lib/mongodb"

export default async function Home() {
  let products = []
  try {
    const db = await getDatabase()
    const productsRaw = await db.collection("products").find({}).sort({ _id: -1 }).limit(8).toArray()
    products = productsRaw.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  const categories = [
    { name: "New In", icon: "✨", color: "bg-amber-100" },
    { name: "Kurtas", icon: "👗", color: "bg-pink-100" },
    { name: "Suits", icon: "👘", color: "bg-purple-100" },
    { name: "Dresses", icon: "💃", color: "bg-rose-100" },
    { name: "Tops", icon: "👚", color: "bg-blue-100" },
    { name: "Bottoms", icon: "👖", color: "bg-green-100" },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pb-24">
        {/* Mobile App-Style Hero */}
        <section className="bg-white rounded-b-[2.5rem] shadow-sm pt-6 pb-10 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-50 rounded-full -ml-24 -mb-24 opacity-50 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto px-4">
            {/* Welcome Message */}
            <div className="mb-6 relative z-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1 tracking-tight">Mayra Collection</h1>
              <p className="text-sm text-gray-500 font-medium">Discover your unique style</p>
            </div>

            {/* Search Bar Simulation */}
            <div className="relative mb-8 shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                placeholder="Search for kurtas, tops..."
                readOnly
              />
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <Link href="/shop">
                <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-2xl p-4 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100">
                  <div className="bg-teal-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShoppingBag size={20} className="text-teal-600" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">Shop All</p>
                </div>
              </Link>
              <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-2xl p-4 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="bg-red-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart size={20} className="text-red-500" />
                </div>
                <p className="text-xs font-bold text-gray-800">Wishlist</p>
              </div>
              <div className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] rounded-2xl p-4 text-center hover:shadow-md transition-all cursor-pointer border border-gray-100">
                <div className="bg-yellow-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Zap size={20} className="text-yellow-500" />
                </div>
                <p className="text-xs font-bold text-gray-800">Flash Deals</p>
              </div>
            </div>

            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl shadow-teal-200/50 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold inline-block mb-2">LIMITED TIME</div>
                  <h2 className="text-2xl font-bold mb-1">Summer Sale</h2>
                  <p className="text-sm opacity-90 mb-3">Up to 50% OFF on Kurtas</p>
                  <button className="bg-white text-teal-700 text-xs font-bold px-4 py-2 rounded-full">Shop Now</button>
                </div>
                <Sparkles size={48} className="text-yellow-300 opacity-80" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Categories</h2>
              <Link href="/shop" className="text-teal-600 text-xs font-semibold">View All</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[70px]">
                  <div className={`${cat.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm mb-2 border-2 border-white`}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  Trending Now <TrendingUp size={18} className="text-red-500" />
                </h2>
                <p className="text-xs text-gray-500 mt-1">Bestsellers this week</p>
              </div>
              <Link href="/shop">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <ChevronRight size={18} className="text-gray-600" />
                </div>
              </Link>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">Loading amazing products...</p>
              </div>
            )}
          </div>
        </section>

        {/* Secondary Banner */}
        <section className="py-4 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
              <div className="relative z-10 flex flex-col items-start">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-2">NEW ARRIVAL</span>
                <h3 className="text-2xl font-bold mb-2">Elegant Ethnic Wear</h3>
                <p className="text-gray-200 text-xs mb-4 max-w-[200px]">Discover our latest collection of handcrafted suits and sarees.</p>
                <Link href="/shop">
                  <Button size="sm" className="bg-white text-black hover:bg-gray-100 rounded-full text-xs font-bold">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* More Products Section */}
        {products.length > 4 && (
          <section className="py-6">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Fresh Arrivals</h2>
                  <p className="text-xs text-gray-500 mt-1">Just added to the store</p>
                </div>
                <Link href="/shop">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <ArrowRight size={18} className="text-gray-600" />
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.slice(4, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Store Locations Section */}
        <section className="py-8 bg-white mt-4">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Our Offline Stores</h2>
                <p className="text-xs text-gray-500 mt-1">Visit us for a premium experience</p>
              </div>
              <div className="bg-teal-50 p-2.5 rounded-full">
                <Store className="text-teal-600" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tijara Store */}
              <div className="group relative h-64 w-full rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://content.jdmagicbox.com/v2/comp/alwar/a9/9999px144.x144.250508103106.g4a9/catalogue/mayra-collection-maharana-mohalla-alwar-readymade-garment-retailers-oznu24yje6-250.jpg"
                  alt="Tijara Store"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white text-2xl font-bold mb-1">Tijara Branch</h3>
                    <p className="text-gray-300 text-sm flex items-center gap-2 mb-3"><MapPin size={14} className="text-teal-400" /> Main Market, Tijara</p>
                    <button className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Nuh Store */}
              <div className="group relative h-64 w-full rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgrWlfZXUcfuu5uKnFs0U0gK9zWzQv5FkOA&s"
                  alt="Nuh Store"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white text-2xl font-bold mb-1">Nuh Branch</h3>
                    <p className="text-gray-300 text-sm flex items-center gap-2 mb-3"><MapPin size={14} className="text-teal-400" /> City Center, Nuh</p>
                    <button className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Why Choose Mayra?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                  <Zap size={24} className="text-teal-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">
                  Lightning fast shipping on all orders. Get your favorites in no time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Star size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-sm text-gray-600">100% authentic products. Handpicked collections for you.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <Heart size={24} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Customer Care</h3>
                <p className="text-sm text-gray-600">7-day returns. Easy exchanges. Dedicated support team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-white rounded-t-[2.5rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Ready to Upgrade Your Style?</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Join thousands of happy customers who trust Mayra Collection for their fashion needs.</p>
            <Link href="/shop">
              <Button className="bg-gray-900 hover:bg-black text-white font-bold px-10 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
