'use client'

import React from 'react'
import { X } from 'lucide-react'

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, categories }) => {
  const priceRanges = [
    { label: 'Under ₹50', value: '0-50' },
    { label: '₹50 - ₹100', value: '50-100' },
    { label: '₹100 - ₹150', value: '100-150' },
    { label: 'Over ₹150', value: '150-999' }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-vibe-brown">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-vibe-brown/60 hover:text-vibe-brown transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h4 className="font-medium text-vibe-brown mb-4">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={filters.category === category.id}
                onChange={(e) => onFilterChange({ category: e.target.value })}
                className="mr-3 text-vibe-cookie focus:ring-vibe-cookie"
              />
              <span className="text-vibe-brown/80">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-vibe-brown mb-4">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                className="mr-3 text-vibe-cookie focus:ring-vibe-cookie"
              />
              <span className="text-vibe-brown/80">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {(filters.category || filters.priceRange) && (
        <div className="mb-6">
          <h4 className="font-medium text-vibe-brown mb-3">Active Filters</h4>
          <div className="space-y-2">
            {filters.category && (
              <div className="flex items-center justify-between bg-vibe-bg px-3 py-2 rounded-lg">
                <span className="text-sm text-vibe-brown">
                  Category: {categories.find(c => c.id === filters.category)?.name}
                </span>
                <button
                  onClick={() => onFilterChange({ category: '' })}
                  className="text-vibe-brown/60 hover:text-vibe-brown"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {filters.priceRange && (
              <div className="flex items-center justify-between bg-vibe-bg px-3 py-2 rounded-lg">
                <span className="text-sm text-vibe-brown">
                  Price: {priceRanges.find(p => p.value === filters.priceRange)?.label}
                </span>
                <button
                  onClick={() => onFilterChange({ priceRange: '' })}
                  className="text-vibe-brown/60 hover:text-vibe-brown"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="space-y-3">
        <button
          onClick={() => onFilterChange({ category: 'makhana' })}
          className="w-full text-left px-4 py-2 bg-vibe-bg rounded-lg hover:bg-vibe-cookie/20 transition-colors"
        >
          <div className="font-medium text-vibe-brown">Makhana</div>
          <div className="text-sm text-vibe-brown/60">Roasted fox nuts</div>
        </button>
        <button
          onClick={() => onFilterChange({ category: 'chips' })}
          className="w-full text-left px-4 py-2 bg-vibe-bg rounded-lg hover:bg-vibe-cookie/20 transition-colors"
        >
          <div className="font-medium text-vibe-brown">Chips</div>
          <div className="text-sm text-vibe-brown/60">Baked & multigrain</div>
        </button>
        <button
          onClick={() => onFilterChange({ category: 'bites' })}
          className="w-full text-left px-4 py-2 bg-vibe-bg rounded-lg hover:bg-vibe-cookie/20 transition-colors"
        >
          <div className="font-medium text-vibe-brown">Energy Bites</div>
          <div className="text-sm text-vibe-brown/60">Protein & energy</div>
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar 