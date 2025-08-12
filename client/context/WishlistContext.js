'use client'

import { createContext, useContext, useEffect, useReducer } from 'react'

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.payload
    case 'ADD':
      if (state.find(i => i.id === action.payload.id)) return state
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload.id)
    default:
      return state
  }
}

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, [])

  useEffect(() => {
    const saved = localStorage.getItem('vibe-bites-wishlist')
    if (saved) dispatch({ type: 'LOAD', payload: JSON.parse(saved) })
  }, [])

  useEffect(() => {
    localStorage.setItem('vibe-bites-wishlist', JSON.stringify(state))
  }, [state])

  const addToWishlist = (product) => dispatch({ type: 'ADD', payload: product })
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: { id } })

  return (
    <WishlistContext.Provider value={{ items: state, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}

