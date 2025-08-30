'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TicketCard } from '@/components/tickets/ticket-card'
import { useTickets } from '@/hooks/use-tickets'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Ticket } from 'lucide-react'

export default function TicketsPage() {
  const { data: tickets, isLoading } = useTickets()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tickets</h1>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : tickets && tickets.length > 0 ? (
            <div className="space-y-6">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets yet</h3>
              <p className="text-gray-600 mb-6">Start exploring events and book your first ticket!</p>
              <a 
                href="/events" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Events
              </a>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}