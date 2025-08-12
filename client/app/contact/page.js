'use client'

import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-vibe-brown mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-vibe-brown/70 max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-vibe-brown mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-vibe-brown mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-vibe-cookie/30 rounded-lg text-vibe-brown placeholder-vibe-brown/60 focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-vibe-brown mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-vibe-cookie/30 rounded-lg text-vibe-brown placeholder-vibe-brown/60 focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-vibe-brown mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-vibe-cookie/30 rounded-lg text-vibe-brown placeholder-vibe-brown/60 focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-vibe-brown mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-vibe-cookie/30 rounded-lg text-vibe-brown placeholder-vibe-brown/60 focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-vibe-cookie text-vibe-brown font-semibold rounded-full hover:bg-vibe-accent transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-vibe-brown mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-vibe-cookie mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-vibe-brown mb-1">Address</h3>
                    <p className="text-vibe-brown/70">
                      123 Snack Street<br />
                      Foodie District, Mumbai<br />
                      Maharashtra 400001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-vibe-cookie mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-vibe-brown mb-1">Phone</h3>
                    <p className="text-vibe-brown/70">
                      <a href="tel:+919876543210" className="hover:text-vibe-cookie transition-colors">
                        +91 98765 43210
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-vibe-cookie mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-vibe-brown mb-1">Email</h3>
                    <p className="text-vibe-brown/70">
                      <a href="mailto:hello@vibebites.com" className="hover:text-vibe-cookie transition-colors">
                        hello@vibebites.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-vibe-cookie mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-vibe-brown mb-1">Business Hours</h3>
                    <p className="text-vibe-brown/70">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-vibe-brown mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-vibe-brown mb-2">How long does shipping take?</h3>
                  <p className="text-vibe-brown/70">
                    We typically ship within 24 hours and delivery takes 3-5 business days across India.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-vibe-brown mb-2">Do you offer refunds?</h3>
                  <p className="text-vibe-brown/70">
                    Yes, we offer a 30-day money-back guarantee if you're not satisfied with your purchase.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-vibe-brown mb-2">Are your products gluten-free?</h3>
                  <p className="text-vibe-brown/70">
                    Most of our products are gluten-free. Check individual product pages for specific details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-vibe-brown mb-6">Find Us</h2>
            <div className="bg-vibe-bg rounded-xl h-64 flex items-center justify-center">
              <p className="text-vibe-brown/60">Map placeholder - Integrate with Google Maps API</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 