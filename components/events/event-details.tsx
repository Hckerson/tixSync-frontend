import { MapPin, Calendar, Clock, Users, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Event } from '@/types/event'

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2" />
            Event Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-3" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3" />
            <span>{event.venue}, {event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-3" />
            <span>{event.attendees} people attending</span>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="venue">Venue</TabsTrigger>
          <TabsTrigger value="organizer">Organizer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {event.description || `Join us for an unforgettable experience at ${event.title}. This event promises to be one of the most exciting gatherings of the year, featuring world-class entertainment, amazing atmosphere, and memories that will last a lifetime.`}
                </p>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">What to Expect</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• World-class performers and entertainment</li>
                  <li>• Premium sound and lighting systems</li>
                  <li>• Food and beverage options available</li>
                  <li>• Convenient parking and transportation</li>
                  <li>• Professional security and safety measures</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6 mb-3">Important Information</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Doors open 1 hour before event start time</li>
                  <li>• All tickets are non-refundable</li>
                  <li>• Valid ID required for entry</li>
                  <li>• No outside food or beverages permitted</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="venue" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{event.venue}</h3>
              <p className="text-gray-600 mb-4">{event.location}</p>
              
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500">Interactive map would be displayed here</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Address:</strong> {event.location}</p>
                <p><strong>Capacity:</strong> 5,000 people</p>
                <p><strong>Accessibility:</strong> Wheelchair accessible</p>
                <p><strong>Parking:</strong> Available on-site</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="organizer" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{event.organizer || 'Event Organizer'}</h3>
                  <p className="text-gray-600">Professional Event Management</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">
                We are dedicated to creating unforgettable experiences through carefully curated events. 
                With years of experience in event management, we ensure every detail is perfect.
              </p>
              
              <div className="space-y-2 text-sm">
                <p><strong>Events Organized:</strong> 150+</p>
                <p><strong>Years of Experience:</strong> 8 years</p>
                <p><strong>Customer Rating:</strong> 4.9/5</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}