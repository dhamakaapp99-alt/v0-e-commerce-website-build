"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import Header from "@/components/header"

export default function ProductDetail({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`)
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
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-muted-foreground">Loading product...</p>
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-20 md:top-20 bg-background border-b z-40 flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-lg">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold flex-1 text-center">Product Details</h1>
          <div className="w-10" />
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Product Image */}
          <div className="relative w-full aspect-square mb-6 rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.images?.[0] || "/placeholder.svg?height=400&width=400&query=clothing"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                <p className="text-muted-foreground text-sm">{product.category}</p>
              </div>
              <button className="p-2 hover:bg-muted rounded-full">
                <Heart size={24} />
              </button>
            </div>

            <p className="text-3xl font-bold text-primary mb-4">₹{product.price.toLocaleString("en-IN")}</p>

            {product.description && <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>}

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-sm font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-semibold block mb-3">Size</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
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
                <label className="text-sm font-semibold block mb-3">Color</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold block mb-3">Quantity</label>
              <div className="flex items-center border border-border rounded-lg w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-muted">
                  −
                </button>
                <span className="px-6 py-2 font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} disabled={product.stock === 0} size="lg" className="w-full mb-4">
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </Button>

          {/* Share Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full bg-transparent"
            onClick={() => alert("Share feature coming soon!")}
          >
            <Share2 size={20} className="mr-2" />
            Share
          </Button>
        </div>
      </div>
    </>
  )
}
