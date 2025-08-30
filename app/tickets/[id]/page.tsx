'use client'

import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TicketQR } from '@/components/tickets/ticket-qr'
import { useTicket } from '@/hooks/use-tickets'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function TicketPage() {
  const params = useParams()
  const ticketId = params.id as string
  
  const { data: ticket, isLoading } = useTicket(ticketId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Ticket Not Found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TicketQR ticket={ticket} />
      </main>
      <Footer />
    </div>
  )
}