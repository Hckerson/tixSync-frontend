'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { EventCard } from '@/components/events/event-card'
import { EventFilters } from '@/components/events/event-filters'
import { SearchBar } from '@/components/ui/search-bar'
import { useEvents } from '@/hooks/use-events'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function EventsPage() {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    priceRange: '',
    search: ''
  })

  const { data: events, isLoading } = useEvents(filters)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Discover Events</h1>
          <SearchBar 
            onSearch={(search) => setFilters({ ...filters, search })}
            placeholder="Search events..."
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <EventFilters filters={filters} onFiltersChange={setFilters} />
          </aside>

          <section className="lg:col-span-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {events?.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}