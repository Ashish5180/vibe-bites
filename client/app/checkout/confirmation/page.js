'use client'

import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
        <h1 className="text-3xl font-bold text-vibe-brown mb-2">Order Confirmed!</h1>
        <p className="text-vibe-brown/70 mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
        <Link href="/products" className="inline-block px-6 py-3 bg-vibe-cookie text-vibe-brown rounded-full font-semibold hover:bg-vibe-accent transition-colors">
          Continue Shopping
        </Link>
      </div>
      <Footer />
    </div>
  )
}

