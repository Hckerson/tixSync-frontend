import Image from 'next/image'
import { Calendar, Clock, MapPin, Share2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Event } from '@/types/event'

interface EventHeroProps {
  event: Event
}

export function EventHero({ event }: EventHeroProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="relative">
      <div className="h-64 md:h-96 relative overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              {event.category}
            </Badge>
            {event.featured && (
              <Badge className="bg-yellow-500 text-white">Featured</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {event.title}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.venue}</span>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="secondary" size="sm">
                <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}