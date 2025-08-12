'use client'

import React from 'react'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      image: '/images/hero-snack-1.jpg',
      text: 'VIBE BITES has completely changed my snacking habits! The Peri Peri Makhana is absolutely addictive and guilt-free. Perfect for my evening cravings.'
    },
    {
      name: 'Rahul Patel',
      location: 'Delhi',
      rating: 5,
      image: '/images/hero-snack-2.jpg',
      text: 'As a fitness enthusiast, I love the protein energy bites. They give me the perfect energy boost before my workouts. Great taste and nutrition!'
    },
    {
      name: 'Anjali Desai',
      location: 'Bangalore',
      rating: 5,
      image: '/images/hero-snack-3.jpg',
      text: 'My kids love the baked chips and I love that they\'re healthy! Finally found snacks that are both delicious and nutritious for the whole family.'
    },
    {
      name: 'Vikram Singh',
      location: 'Chennai',
      rating: 5,
      image: '/images/hero-snack-1.jpg',
      text: 'The quality and taste of VIBE BITES products is outstanding. The masala makhana is my favorite - authentic Indian flavors with a healthy twist.'
    },
    {
      name: 'Meera Reddy',
      location: 'Hyderabad',
      rating: 5,
      image: '/images/hero-snack-2.jpg',
      text: 'Perfect for my office snacks! The portion sizes are great and the packaging keeps everything fresh. Highly recommend to everyone!'
    },
    {
      name: 'Arjun Kumar',
      location: 'Pune',
      rating: 5,
      image: '/images/hero-snack-3.jpg',
      text: 'Been ordering from VIBE BITES for months now. Consistent quality, great taste, and excellent customer service. My go-to healthy snack brand!'
    }
  ]

  return (
    <section className="py-20 bg-vibe-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-vibe-brown mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-vibe-brown/70 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about VIBE BITES
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="h-8 w-8 text-vibe-cookie" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-vibe-brown/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-vibe-brown">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-vibe-brown/60">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="bg-vibe-cookie rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
              ))}
            </div>
            <h3 className="text-2xl font-bold text-vibe-brown mb-2">
              4.9/5 Average Rating
            </h3>
            <p className="text-vibe-brown/80 text-lg">
              Based on 10,000+ customer reviews
            </p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-vibe-brown">98%</div>
                <div className="text-sm text-vibe-brown/80">Would Recommend</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vibe-brown">95%</div>
                <div className="text-sm text-vibe-brown/80">Taste Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vibe-brown">97%</div>
                <div className="text-sm text-vibe-brown/80">Quality Rating</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-vibe-brown">99%</div>
                <div className="text-sm text-vibe-brown/80">Delivery Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
