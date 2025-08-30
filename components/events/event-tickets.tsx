import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Ticket, Users, Clock } from 'lucide-react'
import type { Event } from '@/types/event'

interface EventTicketsProps {
  event: Event
  onSelectSeats: (tierId: string) => void
}

export function EventTickets({ event, onSelectSeats }: EventTicketsProps) {
  const ticketTiers = [
    {
      id: 'general',
      name: 'General Admission',
      price: event.startingPrice,
      description: 'Standard entry with general seating',
      available: 150,
      total: 200,
      features: ['General seating', 'Standard entry']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: event.startingPrice * 1.5,
      description: 'Better seating with premium amenities',
      available: 45,
      total: 50,
      features: ['Premium seating', 'Priority entry', 'Complimentary drink']
    },
    {
      id: 'vip',
      name: 'VIP Experience',
      price: event.startingPrice * 2.5,
      description: 'Ultimate experience with exclusive access',
      available: 8,
      total: 20,
      features: ['VIP seating', 'Meet & greet', 'Premium bar access', 'Exclusive merchandise']
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="sticky top-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ticket className="w-5 h-5 mr-2" />
            Select Tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ticketTiers.map((tier) => (
            <div key={tier.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{tier.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(tier.price)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Users className="w-4 h-4 mr-1" />
                    {tier.available}/{tier.total}
                  </div>
                  {tier.available < 20 && (
                    <Badge variant="destructive" className="text-xs">
                      Only {tier.available} left!
                    </Badge>
                  )}
                </div>
              </div>

              <ul className="text-sm text-gray-600 space-y-1">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => onSelectSeats(tier.id)}
                className="w-full"
                disabled={tier.available === 0}
              >
                {tier.available === 0 ? 'Sold Out' : 'Select Seats'}
              </Button>
            </div>
          ))}

          <div className="border-t pt-4 text-center">
            <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              Seats held for 15 minutes after selection
            </div>
            <p className="text-xs text-gray-400">
              All prices exclude service fees and taxes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}