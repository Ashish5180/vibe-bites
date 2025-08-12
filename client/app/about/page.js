import React from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Heart, Leaf, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-vibe-brown mb-6">
            About VIBE BITES
          </h1>
          <p className="text-xl text-vibe-brown/70 max-w-3xl mx-auto">
            We're on a mission to make healthy snacking delicious, accessible, and enjoyable for everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-vibe-brown mb-6">Our Story</h2>
            <p className="text-lg text-vibe-brown/70 mb-6 leading-relaxed">
              VIBE BITES was born from a simple idea: healthy snacking shouldn't mean compromising on taste. 
              Founded in 2020, we started with a vision to create snacks that not only nourish your body 
              but also bring joy to every bite.
            </p>
            <p className="text-lg text-vibe-brown/70 mb-6 leading-relaxed">
              What began as a small kitchen experiment with roasted makhanas has grown into a beloved brand 
              that serves thousands of health-conscious snackers across India. Our journey is driven by 
              passion, innovation, and an unwavering commitment to quality.
            </p>
            <p className="text-lg text-vibe-brown/70 leading-relaxed">
              Today, we're proud to offer a diverse range of healthy snacks that cater to different tastes 
              and dietary preferences, all while maintaining our core values of natural ingredients and 
              exceptional taste.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-snack-2.jpg"
              alt="VIBE BITES Story"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-vibe-brown text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-vibe-cookie rounded-full mb-6">
                <Leaf className="h-8 w-8 text-vibe-brown" />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-3">Natural Ingredients</h3>
              <p className="text-vibe-brown/70">
                We use only the finest natural ingredients, free from artificial preservatives and additives.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-vibe-cookie rounded-full mb-6">
                <Heart className="h-8 w-8 text-vibe-brown" />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-3">Health First</h3>
              <p className="text-vibe-brown/70">
                Every product is crafted with your health in mind, promoting wellness and nutrition.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-vibe-cookie rounded-full mb-6">
                <Users className="h-8 w-8 text-vibe-brown" />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-3">Community</h3>
              <p className="text-vibe-brown/70">
                We build lasting relationships with our customers, farmers, and partners.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-vibe-cookie rounded-full mb-6">
                <Award className="h-8 w-8 text-vibe-brown" />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-3">Excellence</h3>
              <p className="text-vibe-brown/70">
                We maintain the highest standards of quality in every aspect of our business.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-vibe-cookie rounded-3xl p-8 lg:p-12 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-vibe-brown mb-6">Our Mission</h2>
            <p className="text-xl text-vibe-brown/80 leading-relaxed">
              To revolutionize the snacking industry by creating delicious, nutritious, and accessible 
              snacks that support healthy lifestyles while bringing joy to every moment. We believe that 
              healthy eating should be enjoyable, convenient, and sustainable for everyone.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-vibe-brown text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/hero-snack-1.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-2">Priya Sharma</h3>
              <p className="text-vibe-brown/70">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/hero-snack-2.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-2">Rahul Patel</h3>
              <p className="text-vibe-brown/70">Head of Operations</p>
            </div>
            
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/images/hero-snack-3.jpg"
                  alt="Team Member"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-vibe-brown mb-2">Anjali Desai</h3>
              <p className="text-vibe-brown/70">Product Development</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-vibe-brown text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-cookie mb-2">50+</div>
              <div className="text-vibe-brown/70">Unique Flavors</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-cookie mb-2">10k+</div>
              <div className="text-vibe-brown/70">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-cookie mb-2">25+</div>
              <div className="text-vibe-brown/70">Cities Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-vibe-cookie mb-2">100%</div>
              <div className="text-vibe-brown/70">Natural Products</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 