"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import Header from "@/components/header"

export default function ProductDetail({ params }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
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
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
      alert("Item added to cart!")
    }
  }

  const handleBuyNow = () => {
    if (product && selectedSize && selectedColor) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
      router.push("/checkout")
    } else {
      alert("Please select size and color before proceeding")
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
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
      </>
    )
  }

  const images = product.images || ["/diverse-clothing-rack.png"]

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pb-24">
        {/* Header */}
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
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
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
                <div className="flex gap-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        imageIndex === idx ? "border-primary" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img || "/placeholder.svg?height=64&width=64&query=clothing"}
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
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart size={24} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
                </button>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary mb-2">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(128 reviews)</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-sm font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </p>
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 text-gray-900">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3 text-gray-900">Select Size</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-5 py-2 border-2 rounded font-medium transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 text-gray-900 hover:border-primary"
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
                  <label className="block text-sm font-semibold mb-3 text-gray-900">Select Color</label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2 border-2 rounded font-medium transition-all ${
                          selectedColor === color
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 text-gray-900 hover:border-primary"
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
                <label className="block text-sm font-semibold mb-3 text-gray-900">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-col md:flex-row mb-6">
                <Button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-6 text-lg rounded flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  Buy Now
                </Button>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  variant="outline"
                  size="lg"
                  className="flex-1 border-2 border-primary text-primary hover:bg-primary/10 font-semibold py-6 text-lg rounded flex items-center justify-center gap-2 bg-transparent"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </Button>
              </div>

              {/* Delivery & Benefits */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🚚</span>
                  <div>
                    <p className="font-semibold text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-600">On orders over ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">↩️</span>
                  <div>
                    <p className="font-semibold text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">7-day return policy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔒</span>
                  <div>
                    <p className="font-semibold text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">100% encrypted checkout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
