"use client"

import { useCallback, useEffect, useState } from "react"

const CART_KEY = "mayra_cart"

export function useCart() {
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem(CART_KEY)
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart))
        } catch (error) {
          console.error("Error loading cart:", error)
        }
      }
      setIsLoading(false)
    }

    loadCart()

    const handleStorageChange = (e) => {
      if (e.key === CART_KEY) {
        loadCart()
      }
    }

    const handleCartEvent = (e) => {
      if (e.detail) {
        setCart(e.detail)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("cartChanged", handleCartEvent)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartChanged", handleCartEvent)
    }
  }, [])

  const updateCart = useCallback((newCart) => {
    setCart(newCart)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    // Dispatch event to update all components listening to cart changes
    window.dispatchEvent(new CustomEvent("cartChanged", { detail: newCart }))
  }, [])

  const addToCart = useCallback(
    (item) => {
      const existingItem = cart.find((i) => i.id === item.id && i.size === item.size && i.color === item.color)

      let updatedCart
      if (existingItem) {
        updatedCart = cart.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        )
      } else {
        updatedCart = [...cart, item]
      }

      updateCart(updatedCart)
    },
    [cart, updateCart],
  )

  const removeFromCart = useCallback(
    (itemId, size, color) => {
      const updatedCart = cart.filter((i) => !(i.id === itemId && i.size === size && i.color === color))
      updateCart(updatedCart)
    },
    [cart, updateCart],
  )

  const updateQuantity = useCallback(
    (itemId, size, color, quantity) => {
      if (quantity <= 0) {
        removeFromCart(itemId, size, color)
      } else {
        const updatedCart = cart.map((i) =>
          i.id === itemId && i.size === size && i.color === color ? { ...i, quantity } : i,
        )
        updateCart(updatedCart)
      }
    },
    [cart, updateCart, removeFromCart],
  )

  const clearCart = useCallback(() => {
    updateCart([])
  }, [updateCart])

  const getTotal = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cart])

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
  }
}
