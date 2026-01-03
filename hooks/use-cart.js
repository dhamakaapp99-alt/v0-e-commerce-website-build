"use client"

import { useCallback, useEffect, useState } from "react"

const CART_KEY = "mayra_cart"

export function useCart() {
  const [cart, setCart] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_KEY)
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  const updateCart = useCallback((newCart) => {
    setCart(newCart)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
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
      window.dispatchEvent(new CustomEvent("cartChanged", { detail: updatedCart }))
    },
    [cart, updateCart],
  )

  const removeFromCart = useCallback(
    (itemId, size, color) => {
      updateCart(cart.filter((i) => !(i.id === itemId && i.size === size && i.color === color)))
    },
    [cart, updateCart],
  )

  const updateQuantity = useCallback(
    (itemId, size, color, quantity) => {
      if (quantity <= 0) {
        removeFromCart(itemId, size, color)
      } else {
        updateCart(cart.map((i) => (i.id === itemId && i.size === size && i.color === color ? { ...i, quantity } : i)))
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
