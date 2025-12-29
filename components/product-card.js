"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"
import { useState } from "react"

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg bg-muted aspect-square mb-3">
          <Image
            src={product.images?.[0] || "/placeholder.svg?height=300&width=300&query=clothing"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button>
        </div>
        <h3 className="font-semibold text-sm line-clamp-2 mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-2">{product.category}</p>
        <p className="font-bold text-base">₹{product.price.toLocaleString("en-IN")}</p>
      </div>
    </Link>
  )
}
