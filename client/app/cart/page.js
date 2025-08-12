'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CouponInput from '../../components/CouponInput'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../components/Toaster'
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react'

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, appliedCoupon, removeCoupon } = useCart()
  const { addToast } = useToast()
  const [couponCode, setCouponCode] = useState('')

  const handleQuantityChange = (id, selectedSize, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, selectedSize)
      addToast('Item removed from cart', 'success')
    } else {
      updateQuantity(id, selectedSize, newQuantity)
    }
  }

  const handleRemoveItem = (id, selectedSize) => {
    removeFromCart(id, selectedSize)
    addToast('Item removed from cart', 'success')
  }

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const total = getCartTotal()
  const discount = subtotal - total

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-vibe-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-vibe-brown/40 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-vibe-brown mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-vibe-brown/70 mb-8">
              Looks like you haven't added any snacks to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-vibe-brown mb-2">Shopping Cart</h1>
          <p className="text-vibe-brown/70">
            {items.length} item{items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-vibe-brown mb-6">Cart Items</h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-4 p-4 bg-vibe-bg rounded-xl">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-vibe-brown mb-1">{item.name}</h3>
                      <p className="text-sm text-vibe-brown/60 mb-2">
                        Size: {item.selectedSize}
                      </p>
                      <div className="text-lg font-bold text-vibe-brown">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity - 1)}
                        className="p-1 rounded-full bg-vibe-cookie text-vibe-brown hover:bg-vibe-accent transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-vibe-brown">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.selectedSize, item.quantity + 1)}
                        className="p-1 rounded-full bg-vibe-cookie text-vibe-brown hover:bg-vibe-accent transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right">
                      <div className="font-bold text-vibe-brown">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id, item.selectedSize)}
                      className="p-2 text-vibe-brown/60 hover:text-vibe-brown transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-vibe-brown mb-6">Order Summary</h2>
              
              {/* Coupon Input */}
              <CouponInput />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-vibe-brown/70">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-vibe-brown/20 pt-3">
                  <div className="flex justify-between text-lg font-bold text-vibe-brown">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link
                href="/products"
                className="w-full inline-flex items-center justify-center px-6 py-3 mt-4 border-2 border-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-cookie transition-colors duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CartPage 