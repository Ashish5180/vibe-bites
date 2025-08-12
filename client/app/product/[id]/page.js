'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import ProductReviews from '../../../components/ProductReviews'
import { useCart } from '../../../context/CartContext'
import { useToast } from '../../../components/Toaster'
import { getProductById } from '../../../data/products'
import { ShoppingCart, ArrowLeft, Star, Heart, Share2 } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.size || '')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToast } = useToast()

  if (!product) {
    return (
      <div className="min-h-screen bg-vibe-bg">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-vibe-brown mb-4">Product Not Found</h1>
            <p className="text-lg text-vibe-brown/70 mb-8">
              The product you're looking for doesn't exist.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentPrice = product.sizes.find(size => size.size === selectedSize)?.price || 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size', 'error')
      return
    }
    
    addToCart(product, selectedSize, quantity)
    addToast(`${product.name} added to cart!`, 'success')
    setQuantity(1)
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{`${product.name} | VIBE BITES`}</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content={`${product.name}, ${product.category}, healthy snacks, VIBE BITES`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} | VIBE BITES`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | VIBE BITES`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image} />
        
        {/* Product Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "description": product.description,
              "image": product.image,
              "brand": {
                "@type": "Brand",
                "name": "VIBE BITES"
              },
              "offers": {
                "@type": "Offer",
                "price": currentPrice,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "VIBE BITES"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "156"
              }
            })
          }}
        />
      </head>

      <div className="min-h-screen bg-vibe-bg">
        <Navbar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-vibe-brown/60">
              <li>
                <Link href="/" className="hover:text-vibe-brown transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/products" className="hover:text-vibe-brown transition-colors">
                  Products
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-vibe-brown transition-colors">
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-vibe-brown font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-vibe-brown" />
                </button>
                <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Share2 className="h-5 w-5 text-vibe-brown" />
                </button>
              </div>
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <div className="flex items-center bg-vibe-cookie text-vibe-brown px-3 py-1 rounded-full text-sm font-semibold">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    Featured
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm text-vibe-brown/60 uppercase tracking-wide">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-vibe-brown mt-2">{product.name}</h1>
                <p className="text-lg text-vibe-brown/70 mt-4">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-vibe-brown/60">4.8 (156 reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-vibe-brown">
                ₹{currentPrice}
                <span className="text-lg text-vibe-brown/60 ml-2">/ {selectedSize}</span>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-medium text-vibe-brown mb-3">
                  Select Size
                </label>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSize(size.size)}
                      className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                        selectedSize === size.size
                          ? 'bg-vibe-cookie text-vibe-brown border-vibe-cookie'
                          : 'border-vibe-cookie/30 text-vibe-brown hover:border-vibe-cookie'
                      }`}
                    >
                      <div className="font-semibold">{size.size}</div>
                      <div className="text-sm">₹{size.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-vibe-brown mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-vibe-cookie text-vibe-brown hover:bg-vibe-accent transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-vibe-brown w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-vibe-cookie text-vibe-brown hover:bg-vibe-accent transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full inline-flex items-center justify-center px-8 py-4 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ₹{currentPrice * quantity}
              </button>

              {/* Product Details */}
              <div className="space-y-6 pt-8 border-t border-vibe-cookie/20">
                <div>
                  <h3 className="text-lg font-semibold text-vibe-brown mb-3">Ingredients</h3>
                  <p className="text-vibe-brown/70">{product.ingredients}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-vibe-brown mb-3">Nutrition Facts</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-vibe-brown/70">Calories</span>
                      <span className="font-semibold text-vibe-brown">{product.nutrition.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vibe-brown/70">Protein</span>
                      <span className="font-semibold text-vibe-brown">{product.nutrition.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vibe-brown/70">Carbs</span>
                      <span className="font-semibold text-vibe-brown">{product.nutrition.carbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vibe-brown/70">Fat</span>
                      <span className="font-semibold text-vibe-brown">{product.nutrition.fat}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-vibe-brown/70">Fiber</span>
                      <span className="font-semibold text-vibe-brown">{product.nutrition.fiber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ProductReviews productId={product.id} productName={product.name} />
        </div>
      </div>

      <Footer />
    </>
  )
} 