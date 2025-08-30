'use client'

import { EventCard } from '@/components/events/event-card'
import { Button } from '@/components/ui/button'
import { useFeaturedEvents } from '@/hooks/use-events'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import Link from 'next/link'

export function FeaturedEvents() {
  const { data: events, isLoading } = useFeaturedEvents()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss out on these amazing upcoming events
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {events?.slice(0, 8).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/events">
                <Button size="lg" className="px-8">
                  View All Events
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}