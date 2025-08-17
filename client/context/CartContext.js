'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        ...action.payload
      }
    case 'ADD_ITEM':
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      )
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        }
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          item => !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
        )
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        appliedCoupon: null
      }

    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload
      }

    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    appliedCoupon: null
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('vibe-bites-cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      dispatch({ type: 'LOAD_CART', payload: parsedCart })
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('vibe-bites-cart', JSON.stringify(state))
    // If logged-in, try to sync to server (best-effort)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/cart/sync`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(state)
      }).catch(() => {})
    }
  }, [state])

  const addToCart = (product, selectedSize, quantity = 1) => {
    const price = product.sizes.find(size => size.size === selectedSize)?.price || 0
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        image: product.image,
        selectedSize,
        price,
        quantity,
        category: product.category
      }
    })
  }

  const removeFromCart = (id, selectedSize) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, selectedSize }
    })
  }

  const updateQuantity = (id, selectedSize, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize)
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, selectedSize, quantity }
      })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const applyCoupon = (couponCode) => {
    const coupons = {
      'VIBE10': { discount: 10, type: 'percentage' },
      'MAKHANA20': { discount: 20, type: 'percentage', category: 'Makhana' }
    }
    
    const coupon = coupons[couponCode.toUpperCase()]
    if (coupon) {
      dispatch({
        type: 'APPLY_COUPON',
        payload: { code: couponCode.toUpperCase(), ...coupon }
      })
      return { success: true, message: `Coupon ${couponCode.toUpperCase()} applied!` }
    } else {
      return { success: false, message: 'Invalid coupon code' }
    }
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  const getCartTotal = () => {
    const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    if (!state.appliedCoupon) return subtotal

    let discount = 0
    if (state.appliedCoupon.type === 'percentage') {
      if (state.appliedCoupon.category) {
        // Category-specific discount
        const categoryItems = state.items.filter(item => item.category === state.appliedCoupon.category)
        const categoryTotal = categoryItems.reduce((total, item) => total + (item.price * item.quantity), 0)
        discount = (categoryTotal * state.appliedCoupon.discount) / 100
      } else {
        // General discount
        discount = (subtotal * state.appliedCoupon.discount) / 100
      }
    }

    return subtotal - discount
  }

  const getCartCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items: state.items,
    appliedCoupon: state.appliedCoupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 