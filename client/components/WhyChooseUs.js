'use client'

import React from 'react'
import { Leaf, Heart, Shield, Zap, Users, Award } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'All our snacks are made with natural ingredients, free from artificial preservatives and additives.'
    },
    {
      icon: Heart,
      title: 'Heart Healthy',
      description: 'Our products are low in sodium and trans fats, promoting heart health and overall wellness.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every batch undergoes rigorous quality checks to ensure the highest standards of food safety.'
    },
    {
      icon: Zap,
      title: 'Energy Boost',
      description: 'Packed with essential nutrients and proteins to keep you energized throughout the day.'
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Safe and delicious snacks that the whole family can enjoy together.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for our commitment to quality and innovation in healthy snacking.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-vibe-brown mb-4">
            Why Choose VIBE BITES?
          </h2>
          <p className="text-lg text-vibe-brown/70 max-w-2xl mx-auto">
            We're committed to bringing you the healthiest and tastiest snacks that nourish your body and soul
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-vibe-bg hover:bg-vibe-cookie/10 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-vibe-cookie rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-vibe-brown" />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-3">
                {feature.title}
              </h3>
              <p className="text-vibe-brown/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-vibe-cookie rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-brown mb-2">
                50+
              </div>
              <div className="text-vibe-brown/80 text-sm">
                Unique Flavors
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-brown mb-2">
                10k+
              </div>
              <div className="text-vibe-brown/80 text-sm">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-brown mb-2">
                100%
              </div>
              <div className="text-vibe-brown/80 text-sm">
                Natural Ingredients
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-brown mb-2">
                5★
              </div>
              <div className="text-vibe-brown/80 text-sm">
                Customer Rating
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-vibe-brown mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-vibe-brown/70 leading-relaxed">
              At VIBE BITES, we believe that healthy snacking should never compromise on taste. 
              Our mission is to create delicious, nutritious snacks that bring joy to every bite 
              while supporting your health and wellness journey. We're committed to using only 
              the finest natural ingredients and innovative recipes that make healthy eating 
              an enjoyable experience for everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
