'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-vibe-bg via-vibe-cookie/20 to-vibe-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-vibe-brown mb-6">
              Vibe Every{' '}
              <span className="text-vibe-cookie">Bite</span>
            </h1>
            <p className="text-lg md:text-xl text-vibe-brown/80 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover healthy snacks that taste amazing. From roasted makhanas to baked chips, 
              every bite is packed with flavor and nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-cookie transition-colors duration-300">
                <Play className="mr-2 h-5 w-5" />
                Watch Story
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-cookie">50+</div>
                <div className="text-sm text-vibe-brown/70">Flavors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-cookie">10k+</div>
                <div className="text-sm text-vibe-brown/70">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-vibe-cookie">100%</div>
                <div className="text-sm text-vibe-brown/70">Natural</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-snack-1.jpg"
                alt="VIBE BITES Healthy Snacks"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vibe-brown/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-16 h-16 bg-vibe-cookie rounded-full flex items-center justify-center">
                <span className="text-vibe-brown font-bold text-sm">100%</span>
              </div>
              <div className="text-xs text-vibe-brown mt-1 text-center">Natural</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="w-16 h-16 bg-vibe-cookie rounded-full flex items-center justify-center">
                <span className="text-vibe-brown font-bold text-sm">0g</span>
              </div>
              <div className="text-xs text-vibe-brown mt-1 text-center">Trans Fat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-vibe-cookie rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-vibe-cookie rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-vibe-cookie rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-vibe-cookie rounded-full"></div>
      </div>
    </section>
  )
}

export default HeroSection 