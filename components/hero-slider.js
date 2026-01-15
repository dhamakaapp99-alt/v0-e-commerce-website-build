"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Tag, Crown, Sparkles } from "lucide-react"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden bg-black group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {/* Slide 1 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80"
            alt="Fashion Collection 1"
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentSlide === 0 ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl text-white space-y-6">
                <div className="inline-block animate-fade-in">
                  <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-bold">
                    ✨ New Arrivals 2024
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
                  Latest Fashion
                  <span className="block text-green-400">Trends</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-200 animate-slide-up delay-100">
                  Discover stunning collections that define your style
                </p>
                <div className="flex gap-4 pt-4 animate-slide-up delay-200">
                  <Link href="/shop">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl hover:scale-105 transition-all">
                      Shop Now
                      <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Fashion Collection 2"
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentSlide === 1 ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl text-white space-y-6">
                <div className="inline-block">
                  <span className="bg-emerald-600 px-4 py-2 rounded-full text-sm font-bold">
                    🔥 Hot Sale
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Up to 50% OFF
                  <span className="block text-emerald-300">Summer Sale</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  Limited time offer on selected items
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/shop?sale=true">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl hover:scale-105 transition-all">
                      Shop Sale
                      <Tag className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80"
            alt="Fashion Collection 3"
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentSlide === 2 ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl text-white space-y-6">
                <div className="inline-block">
                  <span className="bg-teal-600 px-4 py-2 rounded-full text-sm font-bold">
                    ⭐ Premium Collection
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Elegant Style
                  <span className="block text-teal-300">For Every Occasion</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  Handpicked designs for the modern woman
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/shop?category=premium">
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl hover:scale-105 transition-all">
                      Explore Premium
                      <Crown className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4 */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 3 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80"
            alt="Fashion Collection 4"
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${currentSlide === 3 ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-green-800/50 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl text-white space-y-6">
                <div className="inline-block">
                  <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-bold">
                    💎 Exclusive
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                  Trendy Outfits
                  <span className="block text-green-300">Just For You</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-200">
                  Be the trendsetter with our latest collection
                </p>
                <div className="flex gap-4 pt-4">
                  <Link href="/shop">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-2xl hover:scale-105 transition-all">
                      Discover More
                      <Sparkles className="ml-2" size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full flex items-center justify-center transition-all group opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full flex items-center justify-center transition-all group opacity-0 group-hover:opacity-100"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? "w-10 bg-white" : "bg-white/40 hover:bg-white/60"}`}
          ></button>
        ))}
      </div>
    </section>
  )
}