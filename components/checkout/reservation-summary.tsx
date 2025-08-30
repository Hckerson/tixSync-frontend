import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, Ticket } from 'lucide-react'

interface ReservationSummaryProps {
  reservation: any // Type would come from backend
  onContinue?: () => void
  showActions?: boolean
}

export function ReservationSummary({ 
  reservation, 
  onContinue, 
  showActions = true 
}: ReservationSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Mock reservation data
  const mockReservation = {
    event: {
      title: 'Summer Music Festival 2024',
      date: '2024-07-15',
      venue: 'Madison Square Garden',
      location: 'New York, NY'
    },
    seats: ['A12', 'A13'],
    tier: 'Premium',
    subtotal: 150.00,
    fees: 12.50,
    taxes: 13.25,
    total: 175.75,
    ...reservation
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Ticket className="w-5 h-5 mr-2" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">{mockReservation.event.title}</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(mockReservation.event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {mockReservation.event.venue}, {mockReservation.event.location}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Tickets</span>
            <Badge variant="secondary">{mockReservation.tier}</Badge>
          </div>
          <div className="space-y-1">
            {mockReservation.seats.map((seat: string) => (
              <div key={seat} className="flex justify-between text-sm">
                <span>Seat {seat}</span>
                <span>{formatPrice(mockReservation.subtotal / mockReservation.seats.length)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(mockReservation.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service fees</span>
            <span>{formatPrice(mockReservation.fees)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>{formatPrice(mockReservation.taxes)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>{formatPrice(mockReservation.total)}</span>
          </div>
        </div>

        {showActions && onContinue && (
          <Button onClick={onContinue} className="w-full" size="lg">
            Continue to Buyer Details
          </Button>
        )}
      </CardContent>
    </Card>
  )
}