import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronRight, ShoppingBag, Heart, Zap, Star, TrendingUp, Sparkles, ArrowRight, Crown, Tag } from "lucide-react"
import Image from "next/image"
import HeroSlider from "@/components/hero-slider"

export default async function Home() {
  let data = { success: false, products: [] }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/products?limit=8`, {
      cache: "no-store",
    })

    if (response.ok) {
      data = await response.json()
    }
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }


  console.log("data.....",data);
  

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Banner Slider Section */}
        <HeroSlider />

        {/* Stats Bar */}
        <section className="bg-[#00786f] py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-2 md:gap-8 text-center text-white">
              <div>
                <div className="text-2xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-sm md:text-base opacity-90">Products</div>
              </div>
              <div>
                <div className="text-2xl md:text-5xl font-bold mb-2">10K+</div>
                <div className="text-sm md:text-base opacity-90">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl md:text-5xl font-bold mb-2">4.8★</div>
                <div className="text-sm md:text-base opacity-90">Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Categories */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Shop by Category</h2>
              <p className="text-gray-600">Find exactly what you're looking for</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Link href="/shop?category=new-arrivals">
                <div className="group bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-[#00786f]/30 hover:-translate-y-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <Sparkles className="text-[#00786f]" size={32} />
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">New Arrivals</p>
                  <p className="text-sm text-gray-600">Latest Styles</p>
                </div>
              </Link>
              
              <Link href="/shop?category=trending">
                <div className="group bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-[#00786f]/30 hover:-translate-y-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <TrendingUp className="text-[#00786f]" size={32} />
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">Trending</p>
                  <p className="text-sm text-gray-600">Most Popular</p>
                </div>
              </Link>
              
              <Link href="/shop?sale=true">
                <div className="group bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-[#00786f]/30 hover:-translate-y-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <Tag className="text-[#00786f]" size={32} />
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">Sale</p>
                  <p className="text-sm text-gray-600">Up to 50% Off</p>
                </div>
              </Link>
              
              <Link href="/shop?category=premium">
                <div className="group bg-white rounded-2xl p-4 md:p-6 text-center hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-[#00786f]/30 hover:-translate-y-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                    <Crown className="text-[#00786f]" size={32} />
                  </div>
                  <p className="font-bold text-gray-900 text-lg mb-1">Premium</p>
                  <p className="text-sm text-gray-600">Exclusive</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Trending Now</h2>
                <p className="text-gray-600">Bestsellers this week - Don't miss out!</p>
              </div>
              <Link href="/shop">
                <Button className="bg-[#00786f] hover:bg-[#006059] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all group">
                  View All Products
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </Link>
            </div>

            {/* Products Grid */}
            {data.success && data.products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {data.products.map((product) => (
                  <Link 
                    key={product._id} 
                    href={`/product/${product._id}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#00786f]/30 hover:-translate-y-2">
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingBag size={48} />
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-lg shadow-lg">
                              View Details
                            </Button>
                          </div>
                        </div>
                        
                        {/* Wishlist Button */}
                        <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#00786f] hover:text-white transition-all group/heart">
                          <Heart size={18} className="group-hover/heart:fill-current" />
                        </button>
                        
                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 bg-[#00786f] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {product.badge}
                          </div>
                        )}
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#00786f] transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                            <span className="text-xs text-gray-500">(250+ reviews)</span>
                          </div>
                        )}
                        
                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                            )}
                          </div>
                          <ShoppingBag size={20} className="text-gray-400 group-hover:text-[#00786f] transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
                <p className="text-xl font-semibold text-gray-600 mb-2">No products available yet</p>
                <p className="text-gray-500">Check back soon for amazing deals!</p>
              </div>
            )}
          </div>
        </section>

        {/* Promotional Banner */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-[#00786f] rounded-3xl p-6 md:p-16 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
              </div>
              <Sparkles className="absolute top-10 right-20 text-white/30 animate-pulse" size={60} />
              <Tag className="absolute bottom-10 left-20 text-white/30 animate-pulse" size={50} />
              
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-6xl font-bold mb-4">
                  Exclusive Sale Event!
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Get flat 30% OFF on your first purchase. Limited time offer!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/shop">
                    <Button className="bg-white text-[#00786f] hover:bg-gray-100 font-bold px-10 py-6 rounded-xl text-lg shadow-2xl hover:scale-105 transition-all">
                      Shop Now & Save
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center font-bold text-2xl border-2 border-white/30">
                      30%
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Limited Time</div>
                      <div className="text-sm text-white/80">Ends Soon!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why Shop With Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the best in fashion shopping with premium quality and exceptional service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-[#00786f]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Zap className="text-[#00786f]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Free shipping on orders over ₹500. Quick delivery to your doorstep within 3-5 business days.
                </p>
              </div>

              <div className="group bg-white p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-[#00786f]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Star className="text-[#00786f]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  100% authentic products. Handpicked collections ensuring the finest quality for you.
                </p>
              </div>

              <div className="group bg-white p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-[#00786f]/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#00786f]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Heart className="text-[#00786f]" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Care</h3>
                <p className="text-gray-600 leading-relaxed">
                  7-day easy returns. Hassle-free exchanges. Dedicated support team always ready to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#00786f]/10 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <ShoppingBag className="text-[#00786f]" size={40} />
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover the latest fashion trends, exclusive offers, and premium collections tailored just for you
            </p>
            <Link href="/shop">
              <Button className="bg-[#00786f] hover:bg-[#006059] text-white font-bold px-12 py-6 rounded-xl text-lg shadow-2xl hover:shadow-[#00786f]/50 transition-all hover:scale-105 group">
                Start Shopping Now
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}