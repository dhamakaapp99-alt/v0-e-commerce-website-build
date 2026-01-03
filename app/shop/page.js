"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "New In", name: "New In", icon: "✨" },
  { id: "Kurtas", name: "Kurtas", icon: "👗" },
  { id: "Suits", name: "Suits", icon: "🎩" },
  { id: "Dresses", name: "Dresses", icon: "💃" },
  { id: "T-Shirts", name: "T-Shirts", icon: "👕" },
  { id: "Sarees", name: "Sarees", icon: "🧵" },
  { id: "Bottoms", name: "Bottoms", icon: "👖" },
]

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
    <>
      <Header />
      <div className="min-h-screen bg-background pb-24 md:pb-8">
        {/* Sticky Header with Search */}
        <div className="sticky top-20 md:top-20 bg-background border-b z-40 p-4">
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
          <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-min">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setCurrentPage(1)
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading products...</p>
              </div>
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-teal-600 hover:text-teal-700 font-medium flex items-center justify-center gap-2"
                >
                  <X size={16} />
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
