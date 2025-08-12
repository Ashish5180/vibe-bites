'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react'

const ProductReviews = ({ productId, productName }) => {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: ''
  })

  // Mock reviews data - in real app, this would come from API
  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2024-01-15',
      title: 'Absolutely Delicious!',
      comment: 'This is my new favorite snack! The taste is amazing and it\'s so healthy. Perfect for my evening cravings.',
      helpful: 12,
      verified: true,
      avatar: '/images/hero-snack-1.jpg'
    },
    {
      id: 2,
      name: 'Rahul Patel',
      rating: 5,
      date: '2024-01-10',
      title: 'Great Quality Product',
      comment: 'High quality ingredients and excellent taste. The packaging is also very good and keeps the product fresh.',
      helpful: 8,
      verified: true,
      avatar: '/images/hero-snack-2.jpg'
    },
    {
      id: 3,
      name: 'Anjali Desai',
      rating: 4,
      date: '2024-01-08',
      title: 'Good but could be better',
      comment: 'Taste is good and it\'s healthy. Would love to see more variety in flavors. Overall satisfied with the purchase.',
      helpful: 5,
      verified: false,
      avatar: '/images/hero-snack-3.jpg'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      rating: 5,
      date: '2024-01-05',
      title: 'Perfect Healthy Snack',
      comment: 'Exactly what I was looking for! Healthy, tasty, and guilt-free. Will definitely order again.',
      helpful: 15,
      verified: true,
      avatar: '/images/hero-snack-1.jpg'
    }
  ]

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const handleSubmitReview = (e) => {
    e.preventDefault()
    // In real app, this would submit to API
    console.log('Review submitted:', newReview)
    setShowReviewForm(false)
    setNewReview({ rating: 5, title: '', comment: '', name: '' })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="mt-12">
      {/* Reviews Header */}
      <div className="border-b border-vibe-cookie/20 pb-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-vibe-brown">Customer Reviews</h2>
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-6 py-2 bg-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-accent transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-vibe-brown">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-vibe-brown/60 mt-1">
              {totalReviews} reviews
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter(r => r.rating === rating).length
              const percentage = (count / totalReviews) * 100
              return (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-vibe-brown/60 w-4">{rating}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-vibe-cookie h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-vibe-brown/60 w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-vibe-bg rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-vibe-brown mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-vibe-brown mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-vibe-brown mb-2">Your Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="w-full px-4 py-2 border border-vibe-cookie/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibe-cookie"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-vibe-brown mb-2">Review Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                className="w-full px-4 py-2 border border-vibe-cookie/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibe-cookie"
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-vibe-brown mb-2">Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-vibe-cookie/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-vibe-cookie resize-none"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-accent transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-cookie/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-vibe-cookie/20 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-vibe-brown">{review.name}</h4>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-vibe-brown/60">
                    {formatDate(review.date)}
                  </span>
                </div>
                
                <h5 className="font-medium text-vibe-brown mb-2">{review.title}</h5>
                <p className="text-vibe-brown/70 mb-3">{review.comment}</p>
                
                <div className="flex items-center gap-4 text-sm text-vibe-brown/60">
                  <button className="flex items-center gap-1 hover:text-vibe-brown transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1 hover:text-vibe-brown transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Reviews */}
      <div className="text-center mt-8">
        <button className="px-6 py-2 border border-vibe-cookie text-vibe-brown rounded-full hover:bg-vibe-cookie transition-colors">
          Load More Reviews
        </button>
      </div>
    </div>
  )
}

export default ProductReviews 