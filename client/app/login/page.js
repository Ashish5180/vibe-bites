'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useToast } from '../../components/Toaster'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/')
    }
  }, [router])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = isRegistering ? '/auth/register' : '/auth/login'
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        addToast(
          isRegistering 
            ? 'Registration successful! Please check your email for verification.' 
            : 'Login successful!',
          'success'
        )
        
        // Redirect based on user role
        if (data.data.user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        addToast(data.message || 'An error occurred', 'error')
      }
    } catch (error) {
      console.error('Auth error:', error)
      addToast('Network error. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsRegistering(!isRegistering)
    setFormData({ email: '', password: '' })
  }

  return (
    <div className="min-h-screen bg-vibe-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="relative w-32 h-16">
              <Image
                src="/images/logo.jpeg"
                alt="VIBE BITES"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-vibe-brown">
            {isRegistering ? 'Create Account' : 'Sign In'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering 
              ? 'Join VIBE BITES and discover amazing snacks!' 
              : 'Welcome back to VIBE BITES!'
            }
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-vibe-cookie">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegistering && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-vibe-brown">
                      First Name
                    </label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName || ''}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-vibe-cookie placeholder-gray-500 text-vibe-brown rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-vibe-brown">
                      Last Name
                    </label>
                    <div className="mt-1 relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName || ''}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-vibe-cookie placeholder-gray-500 text-vibe-brown rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-vibe-brown">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-vibe-cookie placeholder-gray-500 text-vibe-brown rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-vibe-brown">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-vibe-cookie placeholder-gray-500 text-vibe-brown rounded-md focus:outline-none focus:ring-2 focus:ring-vibe-cookie focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {!isRegistering && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-vibe-cookie focus:ring-vibe-cookie border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-vibe-cookie hover:text-vibe-brown">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-vibe-cookie hover:bg-vibe-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibe-cookie disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isRegistering ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isRegistering ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={toggleMode}
                className="w-full flex justify-center py-2 px-4 border border-vibe-cookie text-sm font-medium rounded-md text-vibe-cookie bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibe-cookie transition-colors"
              >
                {isRegistering ? 'Sign In Instead' : 'Create New Account'}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-vibe-cookie hover:text-vibe-brown transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage 