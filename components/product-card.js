"use client"
import Image from "next/image"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/use-cart"

export default function ProductCard({ product }) {
  const router = useRouter()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [showAddedNotification, setShowAddedNotification] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const checkIfInCart = () => {
      const cart = localStorage.getItem("mayra_cart")
      if (cart) {
        const items = JSON.parse(cart)
        const found = items.some((i) => i.id === product._id)
        setIsInCart(found)
      } else {
        setIsInCart(false)
      }
    }

    checkIfInCart()

    const handleCartChange = () => {
      checkIfInCart()
    }

    window.addEventListener("cartChanged", handleCartChange)
    window.addEventListener("storage", handleCartChange)

    return () => {
      window.removeEventListener("cartChanged", handleCartChange)
      window.removeEventListener("storage", handleCartChange)
    }
  }, [product._id])

  const handleQuickAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCart) {
      // Remove from cart
      const cart = JSON.parse(localStorage.getItem("mayra_cart") || "[]")
      const updatedCart = cart.filter((i) => i.id !== product._id)
      localStorage.setItem("mayra_cart", JSON.stringify(updatedCart))
      window.dispatchEvent(new CustomEvent("cartChanged", { detail: updatedCart }))
      setIsInCart(false)
    } else {
      // Add to cart with quantity notification
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0],
        size: product.sizes?.[0] || "One Size",
        color: product.colors?.[0] || "Default",
        quantity: 1,
      })

      setIsInCart(true)
      setShowAddedNotification(true)
      setTimeout(() => setShowAddedNotification(false), 1500)
    }
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${product._id}`)
  }

  const handleCardClick = () => {
    router.push(`/product/${product._id}`)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-2xl p-2 md:p-3 border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-3 w-full shadow-sm">
        <Image
          src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=clothing"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity">
            <button
              onClick={handleQuickView}
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Quick View"
            >
              <Eye size={20} className="text-[#00786f]" />
            </button>
            <button
              onClick={handleWishlist}
              className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Add to Wishlist"
            >
              <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
            </button>
          </div>
        )}

        {/* Stock Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {showAddedNotification && (
          <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-lg">Added to Cart</span>
          </div>
        )}
      </div>

      <div className="space-y-2 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-900 group-hover:text-[#00786f] transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs md:text-sm text-gray-600">{product.category}</p>

        <div className="flex items-center gap-1 py-1">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xs">
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-600">(32)</span>
        </div>

        <p className="font-bold text-lg text-gray-900">₹{product.price.toLocaleString("en-IN")}</p>

        <div className="mt-auto pt-2">
        <button
          onClick={handleQuickAddToCart}
          disabled={product.stock === 0}
          className={`w-full font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-[#00786f] hover:bg-[#006059] text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
          }`}
        >
          {isInCart ? (
            <>
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
        </div>
      </div>
    </div>
  )
}
