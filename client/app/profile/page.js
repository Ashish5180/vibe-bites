'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'
import { useToast } from '../../components/Toaster'

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const loadProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success) {
          setUser(data.data.user)
        } else {
          router.push('/login')
        }
      } catch (e) {
        addToast('Failed to load profile', 'error')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router, addToast])

  return (
    <div className="min-h-screen bg-vibe-bg">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-vibe-brown mb-6">My Profile</h1>
        {loading ? (
          <div className="text-vibe-brown/70">Loading...</div>
        ) : user ? (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-vibe-brown/60 text-sm">First Name</div>
                <div className="text-vibe-brown font-semibold">{user.firstName}</div>
              </div>
              <div>
                <div className="text-vibe-brown/60 text-sm">Last Name</div>
                <div className="text-vibe-brown font-semibold">{user.lastName}</div>
              </div>
              <div>
                <div className="text-vibe-brown/60 text-sm">Email</div>
                <div className="text-vibe-brown font-semibold">{user.email}</div>
              </div>
              <div>
                <div className="text-vibe-brown/60 text-sm">Phone</div>
                <div className="text-vibe-brown font-semibold">{user.phone || '—'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-vibe-brown/70">Unable to load profile</div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default ProfilePage

