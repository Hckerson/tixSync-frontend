'use client'

import { useQuery } from '@tanstack/react-query'
import type { Event, EventFilters } from '@/types/event'

// Mock data
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    description: 'The biggest music festival of the summer featuring top artists from around the world.',
    category: 'music',
    date: '2024-07-15',
    time: '6:00 PM',
    venue: 'Central Park',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    startingPrice: 89.99,
    attendees: 15000,
    featured: true,
    organizer: 'Music Events Co.'
  },
  {
    id: '2',
    title: 'Tech Conference 2024',
    category: 'education',
    date: '2024-08-20',
    time: '9:00 AM',
    venue: 'Convention Center',
    location: 'San Francisco, CA',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    startingPrice: 199.99,
    attendees: 2500,
    featured: true
  },
  {
    id: '3',
    title: 'Basketball Championship',
    category: 'sports',
    date: '2024-09-10',
    time: '7:30 PM',
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg',
    startingPrice: 75.00,
    attendees: 18000,
    featured: true
  },
  {
    id: '4',
    title: 'Art Gallery Opening',
    category: 'arts',
    date: '2024-06-25',
    time: '6:00 PM',
    venue: 'Modern Art Museum',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg',
    startingPrice: 25.00,
    attendees: 300,
    featured: false
  },
  {
    id: '5',
    title: 'Gaming Tournament',
    category: 'gaming',
    date: '2024-10-05',
    time: '12:00 PM',
    venue: 'Esports Arena',
    location: 'Los Angeles, CA',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    startingPrice: 35.00,
    attendees: 1200,
    featured: false
  },
  {
    id: '6',
    title: 'Charity Gala',
    category: 'charity',
    date: '2024-11-15',
    time: '7:00 PM',
    venue: 'Grand Ballroom',
    location: 'Chicago, IL',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    startingPrice: 150.00,
    attendees: 500,
    featured: true
  }
]

export function useEvents(filters?: EventFilters) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      let filteredEvents = [...mockEvents]
      
      if (filters) {
        if (filters.category) {
          filteredEvents = filteredEvents.filter(event => event.category === filters.category)
        }
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchLower) ||
            event.location.toLowerCase().includes(searchLower) ||
            event.venue.toLowerCase().includes(searchLower)
          )
        }
        
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-').map(p => 
            p === '+' ? Infinity : parseFloat(p)
          )
          filteredEvents = filteredEvents.filter(event => 
            event.startingPrice >= min && event.startingPrice <= (max || Infinity)
          )
        }
      }
      
      return filteredEvents
    }
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockEvents.find(event => event.id === id) || null
    }
  })
}

export function useFeaturedEvents() {
  return useQuery({
    queryKey: ['featured-events'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockEvents.filter(event => event.featured)
    }
  })
}