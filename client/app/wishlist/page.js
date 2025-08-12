'use client'

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useWishlist } from '../../context/WishlistContext'
import Image from 'next/image'

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-vibe-brown mb-6">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-vibe-brown/70">No items in wishlist</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow p-4">
                <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="font-semibold text-vibe-brown">{item.name}</div>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-3 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default WishlistPage

