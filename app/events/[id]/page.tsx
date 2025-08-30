'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { EventHero } from '@/components/events/event-hero'
import { EventDetails } from '@/components/events/event-details'
import { EventTickets } from '@/components/events/event-tickets'
import { SeatSelection } from '@/components/booking/seat-selection'
import { useEvent } from '@/hooks/use-events'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const [showSeatSelection, setShowSeatSelection] = useState(false)
  const [selectedTicketTier, setSelectedTicketTier] = useState<string | null>(null)

  const { data: event, isLoading } = useEvent(eventId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <Link href="/events">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSelectSeats = (tierId: string) => {
    setSelectedTicketTier(tierId)
    setShowSeatSelection(true)
  }

  if (showSeatSelection && selectedTicketTier) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <SeatSelection 
          event={event} 
          ticketTier={selectedTicketTier}
          onBack={() => setShowSeatSelection(false)}
        />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <EventHero event={event} />
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventDetails event={event} />
            </div>
            <div className="lg:col-span-1">
              <EventTickets 
                event={event} 
                onSelectSeats={handleSelectSeats}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}