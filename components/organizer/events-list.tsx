'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Edit, Eye, Trash2, Calendar, MapPin, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const mockEvents = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    date: '2024-07-15',
    venue: 'Central Park',
    location: 'New York, NY',
    status: 'Published',
    ticketsSold: 1234,
    totalTickets: 2000,
    revenue: 45230
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    date: '2024-08-20',
    venue: 'Convention Center',
    location: 'San Francisco, CA',
    status: 'Draft',
    ticketsSold: 456,
    totalTickets: 800,
    revenue: 18900
  },
  {
    id: '3',
    title: 'Art Gallery Opening',
    date: '2024-06-10',
    venue: 'Modern Art Museum',
    location: 'Los Angeles, CA',
    status: 'Published',
    ticketsSold: 89,
    totalTickets: 150,
    revenue: 4450
  }
]

export function EventsList() {
  const [events] = useState(mockEvents)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Events</CardTitle>
        <Link href="/organizer/events/new">
          <Button>Create Event</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue}, {event.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {event.ticketsSold}/{event.totalTickets} tickets sold
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="text-lg font-semibold text-green-600">
                    ${event.revenue.toLocaleString()} revenue
                  </span>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link href={`/events/${event.id}`}>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Event
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}