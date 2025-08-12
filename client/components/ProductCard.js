'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useToast } from './Toaster'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.size || '')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const { addToWishlist } = useWishlist()

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size', 'error')
      return
    }
    
    addToCart(product, selectedSize, quantity)
    addToast(`${product.name} added to cart!`, 'success')
    setQuantity(1)
  }

  const currentPrice = product.sizes.find(size => size.size === selectedSize)?.price || 0

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <Link href={`/product/${product.id}`} className="relative w-full md:w-64 h-64 md:h-auto flex-shrink-0">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="h-5 w-5 text-vibe-brown" />
              </button>
            </div>
            {product.featured && (
              <div className="absolute top-4 left-4">
            <div className="flex items-center bg-vibe-cookie text-vibe-brown px-2 py-1 rounded-full text-xs font-semibold">
                  <Star className="h-3 w-3 fill-current mr-1" />
                  Featured
                </div>
              </div>
            )}
          </Link>

          {/* Product Info */}
          <div className="flex-1 p-6">
            <div className="mb-2">
              <span className="text-xs text-vibe-brown/60 uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            
            <Link href={`/product/${product.id}`} className="block">
              <h3 className="text-xl font-semibold text-vibe-brown mb-2 hover:text-vibe-cookie transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <p className="text-vibe-brown/70 mb-4">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-vibe-brown mb-2">
                Size
              </label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size.size)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      selectedSize === size.size
                        ? 'bg-vibe-cookie text-vibe-brown border-vibe-cookie'
                        : 'border-vibe-cookie/30 text-vibe-brown hover:border-vibe-cookie'
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-vibe-brown">
                  ₹{currentPrice}
                </span>
                <span className="text-sm text-vibe-brown/60 ml-2">
                  / {selectedSize}
                </span>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center px-6 py-2 bg-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-accent transition-colors"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view (default)
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
            <Heart className="h-5 w-5 text-vibe-brown" />
          </button>
        </div>
        {product.featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center bg-vibe-cookie text-vibe-brown px-2 py-1 rounded-full text-xs font-semibold">
              <Star className="h-3 w-3 fill-current mr-1" />
              Featured
            </div>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-vibe-brown/60 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-vibe-brown mb-2 hover:text-vibe-cookie transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-vibe-brown/70 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-vibe-brown mb-2">
            Size
          </label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(size.size)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                  selectedSize === size.size
                    ? 'bg-vibe-cookie text-vibe-brown border-vibe-cookie'
                    : 'border-vibe-cookie/30 text-vibe-brown hover:border-vibe-cookie'
                }`}
              >
                {size.size}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-vibe-brown">
              ₹{currentPrice}
            </span>
            <span className="text-sm text-vibe-brown/60 ml-2">
              / {selectedSize}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center px-4 py-2 bg-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-accent transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </button>
          <button
            onClick={() => addToWishlist({ id: product.id, name: product.name, image: product.image })}
            className="ml-2 text-sm text-vibe-brown/70 hover:text-vibe-brown"
          >
            Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard 