"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Package, ShoppingCart, Plus, Edit2, Trash2, Eye, ChevronLeft, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")
  const [currentPageProducts, setCurrentPageProducts] = useState(1)
  const [currentPageOrders, setCurrentPageOrders] = useState(1)
  const [totalPagesProducts, setTotalPagesProducts] = useState(1)
  const [totalPagesOrders, setTotalPagesOrders] = useState(1)
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalProducts: 0 })

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders(currentPageOrders)
    } else {
      fetchProducts(currentPageProducts)
    }
  }, [activeTab, currentPageProducts, currentPageOrders])

  useEffect(() => {
    // Calculate stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    setStats({
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      totalProducts: products.length,
    })
  }, [orders, products])

  const fetchOrders = async (page) => {
    try {
      setLoadingOrders(true)
      const response = await fetch(`/api/admin/orders?status=captured&page=${page}`)
      const data = await response.json()
      if (data.success) {
        setOrders(data.orders)
        setTotalPagesOrders(data.pages)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoadingOrders(false)
    }
  }

  const fetchProducts = async (page) => {
    try {
      setLoadingProducts(true)
      const response = await fetch(`/api/admin/products?page=${page}`)
      const data = await response.json()
      if (data.success) {
        setProducts(data.products)
        setTotalPagesProducts(data.pages)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const deleteProduct = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/admin/products?id=${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          fetchProducts(currentPageProducts)
        }
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/")} className="p-2 hover:bg-muted rounded-lg">
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <img src="/mayra-logo.png" alt="Mayra Collection" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Total Orders</p>
              <ShoppingCart className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-blue-900">{orders.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Total Revenue</p>
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-900">₹{stats.totalRevenue.toLocaleString("en-IN")}</p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-600">Total Products</p>
              <Package className="text-teal-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-teal-900">{products.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders" className="flex gap-2">
              <ShoppingCart size={18} />
              Orders
            </TabsTrigger>
            <TabsTrigger value="products" className="flex gap-2">
              <Package size={18} />
              Products
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Payment Confirmed Orders</h2>
                <p className="text-sm text-muted-foreground">Total: {orders.length}</p>
              </div>

              {loadingOrders ? (
                <p className="text-muted-foreground">Loading orders...</p>
              ) : orders.length > 0 ? (
                <>
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div key={order._id} className="bg-card border rounded-lg p-4 hover:shadow-md transition">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">Order ID</p>
                            <p className="font-mono text-sm font-bold text-teal-700">
                              {order._id.toString().slice(-8)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">Customer</p>
                            <p className="font-semibold text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">Amount</p>
                            <p className="font-bold text-lg text-green-600">
                              ₹{order.totalAmount.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">Address</p>
                            <p className="text-sm">
                              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground font-semibold">Payment Status</p>
                            <p className="font-semibold text-green-600">
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded mb-3 max-h-24 overflow-y-auto">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-xs text-muted-foreground">
                              {item.name} x {item.quantity} - ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                          ))}
                        </div>
                        <Link href={`/admin/orders/${order._id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Eye size={16} className="mr-2" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPagesOrders > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPageOrders(Math.max(1, currentPageOrders - 1))}
                        disabled={currentPageOrders === 1}
                      >
                        Previous
                      </Button>
                      <span className="px-4 py-2 text-sm">
                        Page {currentPageOrders} of {totalPagesOrders}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPageOrders(Math.min(totalPagesOrders, currentPageOrders + 1))}
                        disabled={currentPageOrders === totalPagesOrders}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground text-center py-8">No confirmed orders yet.</p>
              )}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Manage Products</h2>
                <Link href="/admin/products/new">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus size={18} className="mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>

              {loadingProducts ? (
                <p className="text-muted-foreground">Loading products...</p>
              ) : products.length > 0 ? (
                <>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Name</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Stock</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                          <th className="px-4 py-3 text-center font-semibold text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {products.map((product) => (
                          <tr key={product._id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 font-semibold text-gray-900">{product.name}</td>
                            <td className="px-4 py-3 text-gray-900">₹{product.price.toLocaleString("en-IN")}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.stock}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{product.category}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-center gap-2">
                                <Link href={`/admin/products/${product._id}`}>
                                  <Button variant="outline" size="sm">
                                    <Edit2 size={16} />
                                  </Button>
                                </Link>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => deleteProduct(product._id)}
                                  className="text-red-600 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPagesProducts > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPageProducts(Math.max(1, currentPageProducts - 1))}
                        disabled={currentPageProducts === 1}
                      >
                        Previous
                      </Button>
                      <span className="px-4 py-2 text-sm">
                        Page {currentPageProducts} of {totalPagesProducts}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPageProducts(Math.min(totalPagesProducts, currentPageProducts + 1))}
                        disabled={currentPageProducts === totalPagesProducts}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No products yet.</p>
                  <Link href="/admin/products/new">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <Plus size={18} className="mr-2" />
                      Add First Product
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
