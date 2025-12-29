"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { useState } from "react"

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/product/${product._id}`}>
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4 shadow-sm hover:shadow-md transition-all duration-300">
          <Image
            src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=clothing"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsWishlisted(!isWishlisted)
                }}
                className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart size={20} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
              </button>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Only {product.stock} left
            </div>
          )}

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm">{product.category}</p>

          {/* Rating */}
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

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              // This will be handled by the link click
            }}
            className="w-full mt-3 bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Quick View
          </button>
        </div>
      </div>
    </Link>
  )
}
