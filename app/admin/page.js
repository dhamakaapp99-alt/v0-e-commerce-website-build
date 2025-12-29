"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Package, ShoppingCart, Plus, Edit2, Trash2, Eye, ChevronLeft } from "lucide-react"
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

  useEffect(() => {
    if (activeTab === "orders") {
      fetchOrders(currentPageOrders)
    } else {
      fetchProducts(currentPageProducts)
    }
  }, [activeTab, currentPageProducts, currentPageOrders])

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
      <div className="sticky top-0 bg-background border-b z-40 flex items-center gap-4 p-4">
        <button onClick={() => router.push("/")} className="p-2 hover:bg-muted rounded-lg">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
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
                      <div key={order._id} className="bg-card border rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Order ID</p>
                            <p className="font-semibold text-sm">{order._id.toString().slice(-8)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Customer</p>
                            <p className="font-semibold text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="font-bold text-lg">₹{order.totalAmount.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Address</p>
                            <p className="text-sm">
                              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Payment Status</p>
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
                  <Button>
                    <Plus size={18} className="mr-2" />
                    Add Product
                  </Button>
                </Link>
              </div>

              {loadingProducts ? (
                <p className="text-muted-foreground">Loading products...</p>
              ) : products.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Name</th>
                          <th className="px-4 py-3 text-left font-semibold">Price</th>
                          <th className="px-4 py-3 text-left font-semibold">Stock</th>
                          <th className="px-4 py-3 text-left font-semibold">Category</th>
                          <th className="px-4 py-3 text-center font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {products.map((product) => (
                          <tr key={product._id} className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-semibold">{product.name}</td>
                            <td className="px-4 py-3">₹{product.price.toLocaleString("en-IN")}</td>
                            <td className="px-4 py-3">{product.stock}</td>
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
                                  className="text-destructive hover:text-destructive"
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
                    <Button>
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
