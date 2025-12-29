import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products?limit=8`, {
    cache: "no-store",
  })
  const data = await response.json()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full h-96 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-center mb-12">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mayra Collection</h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">Premium Clothing for Every Occasion</p>
          <Link href="/shop">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
          <Link href="/shop">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {data.success && data.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available yet.</p>
          </div>
        )}
      </section>
    </main>
  )
}
