"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "T-Shirts",
    stock: "",
    images: [],
    sizes: [],
    colors: [],
  })

  const CATEGORIES = ["Shirts", "T-Shirts", "Dresses", "Sarees", "Kurti", "Bottoms", "Accessories"]
  const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"]
  const COLOR_OPTIONS = ["Black", "White", "Blue", "Red", "Green", "Yellow", "Pink", "Gray"]

  const CLOUDINARY_UPLOAD_PRESET = "mayra_collection"
  const CLOUDINARY_CLOUD_NAME = "dewcuqgbd"

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = async (e, index) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImages((prev) => ({
      ...prev,
      [index]: true,
    }))

    try {
      const formDataForCloudinary = new FormData()
      formDataForCloudinary.append("file", file)
      formDataForCloudinary.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formDataForCloudinary,
      })

      const data = await response.json()
      if (data.secure_url) {
        const newImages = [...formData.images]
        newImages[index] = data.secure_url
        setFormData((prev) => ({
          ...prev,
          images: newImages,
        }))
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setUploadingImages((prev) => ({
        ...prev,
        [index]: false,
      }))
    }
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }))
  }

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }))
  }

  const handleColorToggle = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.images.length === 0) {
      alert("Please upload at least one image")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number.parseFloat(formData.price),
          stock: Number.parseInt(formData.stock),
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push("/admin")
      } else {
        alert("Error creating product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      alert("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-40 flex items-center gap-4 p-4">
        <Link href="/admin">
          <button className="p-2 hover:bg-muted rounded-lg">
            <ChevronLeft size={24} />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Name *</label>
            <Input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg min-h-24"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
              <Input
                type="number"
                name="price"
                placeholder="0"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Stock Quantity *</label>
              <Input
                type="number"
                name="stock"
                placeholder="0"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product Images *</label>
            <div className="space-y-3">
              {/* Display uploaded images */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={img || "/placeholder.svg"}
                          alt={`Product ${idx + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload buttons */}
              <div className="grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-teal-600 hover:bg-teal-50 transition"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, idx)}
                      disabled={uploadingImages[idx]}
                      className="hidden"
                    />
                    <div className="text-center">
                      {uploadingImages[idx] ? (
                        <div className="text-sm text-gray-600">Uploading...</div>
                      ) : formData.images[idx] ? (
                        <div className="text-sm text-green-600">✓ Uploaded</div>
                      ) : (
                        <>
                          <Upload size={24} className="mx-auto text-gray-400 mb-1" />
                          <div className="text-sm text-gray-600">Click to upload</div>
                        </>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold mb-3">Available Sizes</label>
            <div className="grid grid-cols-3 gap-2">
              {SIZE_OPTIONS.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`p-2 border rounded-lg font-medium transition-colors ${
                    formData.sizes.includes(size)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-semibold mb-3">Available Colors</label>
            <div className="grid grid-cols-3 gap-2">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorToggle(color)}
                  className={`p-2 border rounded-lg font-medium transition-colors ${
                    formData.colors.includes(color)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </div>
    </div>
  )
}
