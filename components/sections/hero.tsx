'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/search-bar'
import { Calendar, MapPin, Users } from 'lucide-react'

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Navigate to events page with search
    window.location.href = `/events?search=${encodeURIComponent(query)}`
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Amazing
            <span className="block text-yellow-300">Events Near You</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Find, reserve, and experience the best events in your city
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search events, artists, venues..."
              className="bg-white text-gray-900"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Calendar className="w-12 h-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-blue-100">Reserve seats in seconds with our intuitive platform</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Local Events</h3>
              <p className="text-blue-100">Discover events happening right in your neighborhood</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Platform</h3>
              <p className="text-blue-100">Join millions of satisfied customers worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}