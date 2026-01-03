"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ShoppingCart, Zap, Share2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductDetail({ params }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const [showAddedAnimation, setShowAddedAnimation] = useState(false)
  const [showBuyAnimation, setShowBuyAnimation] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setProduct(data.product)
        if (data.product.sizes?.length > 0) {
          setSelectedSize(data.product.sizes[0])
        }
        if (data.product.colors?.length > 0) {
          setSelectedColor(data.product.colors[0])
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: selectedSize || "",
        color: selectedColor || "",
        quantity,
      })

      setShowAddedAnimation(true)
      setTimeout(() => setShowAddedAnimation(false), 1500)

      // Dispatch custom event to update header cart count
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: selectedSize || "",
        color: selectedColor || "",
        quantity,
      })

      setShowBuyAnimation(true)

      setTimeout(() => {
        window.dispatchEvent(new Event("cartUpdated"))
        router.push("/checkout")
      }, 800)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
        <Footer />
      </>
    )
  }

  const images = product.images || ["/diverse-clothing-rack.png"]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pb-24">
        {/* Sticky Header */}
        <div className="sticky top-16 md:top-16 bg-white border-b z-40 flex items-center justify-between p-4 md:px-8">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Product Details</h1>
          <div className="w-10" />
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src={images[imageIndex] || "/placeholder.svg?height=500&width=500&query=clothing"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        imageIndex === idx ? "border-teal-600 ring-2 ring-teal-300" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg?height=80&width=80&query=clothing"}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-gray-600 text-sm font-medium">{product.category}</p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart size={24} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
                </button>
              </div>

              {/* Price & Ratings */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-4xl font-bold text-teal-600 mb-3">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(128 reviews)</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-sm font-bold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 5
                    ? "✓ In Stock"
                    : product.stock > 0
                      ? `Only ${product.stock} left!`
                      : "✗ Out of Stock"}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-900">About this product</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3 text-gray-900">Select Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-bold transition-all ${
                          selectedSize === size
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-gray-300 text-gray-900 hover:border-teal-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-bold mb-3 text-gray-900">Select Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-lg font-bold transition-all ${
                          selectedColor === color
                            ? "border-teal-600 bg-teal-600 text-white"
                            : "border-gray-300 text-gray-900 hover:border-teal-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-bold mb-3 text-gray-900">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-col md:flex-row mb-6">
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`flex-1 font-bold py-4 text-lg rounded-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden ${
                    showBuyAnimation
                      ? "bg-green-500 text-white"
                      : "bg-teal-600 hover:bg-teal-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                  }`}
                >
                  {showBuyAnimation ? (
                    <>✓ Redirecting...</>
                  ) : (
                    <>
                      <Zap size={20} />
                      Buy Now
                    </>
                  )}
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 font-bold py-4 text-lg rounded-lg flex items-center justify-center gap-2 transition-all border-2 ${
                    showAddedAnimation
                      ? "bg-green-100 border-green-600 text-green-600"
                      : "border-teal-600 text-teal-600 hover:bg-teal-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                  }`}
                >
                  {showAddedAnimation ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Share Button */}
              <button className="w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-medium text-gray-700">
                <Share2 size={18} />
                Share Product
              </button>

              {/* Benefits Section */}
              <div className="border-t mt-8 pt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🚚</span>
                  <div>
                    <p className="font-bold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">↩️</span>
                  <div>
                    <p className="font-bold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">7-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="font-bold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% encrypted checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
