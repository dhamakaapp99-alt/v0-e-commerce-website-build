"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const CATEGORIES = ["all", "Shirts", "T-Shirts", "Dresses", "Sarees", "Kurti", "Bottoms", "Accessories"]

export default function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchProducts(selectedCategory, currentPage)
  }, [selectedCategory, currentPage])

  const fetchProducts = async (category, page) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        category: category !== "all" ? category : "",
        page: page.toString(),
      })
      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (data.success) {
        setProducts(data.products)
        setTotalPages(data.pages)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-40 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Shop</h1>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex gap-2 min-w-min">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className="whitespace-nowrap"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-4 py-2 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
