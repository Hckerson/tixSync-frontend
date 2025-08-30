import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Event } from '@/types/event'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      <div className="relative overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900">
            {event.category}
          </Badge>
        </div>
        {event.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-yellow-500 text-white">Featured</Badge>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            {event.venue}, {event.location}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees} going
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(event.startingPrice)}
            </div>
          </div>
          <Link href={`/events/${event.id}`}>
            <Button>View Event</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}