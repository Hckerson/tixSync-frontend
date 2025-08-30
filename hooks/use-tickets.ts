'use client'

import { useQuery } from '@tanstack/react-query'
import type { Ticket } from '@/types/ticket'

const mockTickets: Ticket[] = [
  {
    id: 'TKT001',
    eventId: '1',
    event: {
      id: '1',
      title: 'Summer Music Festival 2024',
      date: '2024-07-15',
      time: '6:00 PM',
      venue: 'Central Park',
      location: 'New York, NY',
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
    },
    seat: 'A12',
    tier: 'Premium',
    price: 89.99,
    status: 'active',
    orderId: 'ORD123456',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    purchaseDate: '2024-06-01',
    qrCode: 'QR_TKT001_DATA'
  },
  {
    id: 'TKT002',
    eventId: '2',
    event: {
      id: '2',
      title: 'Tech Conference 2024',
      date: '2024-08-20',
      time: '9:00 AM',
      venue: 'Convention Center',
      location: 'San Francisco, CA',
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg'
    },
    seat: 'B15',
    tier: 'General',
    price: 199.99,
    status: 'active',
    orderId: 'ORD789012',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    purchaseDate: '2024-06-15',
    qrCode: 'QR_TKT002_DATA'
  },
  {
    id: 'TKT003',
    eventId: '4',
    event: {
      id: '4',
      title: 'Art Gallery Opening',
      date: '2024-06-25',
      time: '6:00 PM',
      venue: 'Modern Art Museum',
      location: 'Los Angeles, CA',
      image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg'
    },
    seat: 'VIP1',
    tier: 'VIP',
    price: 62.50,
    status: 'used',
    orderId: 'ORD345678',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    purchaseDate: '2024-05-20',
    qrCode: 'QR_TKT003_DATA'
  }
]

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return mockTickets
    }
  })
}

export function useTicket(id: string) {
  return useQuery({
    queryKey: ['ticket', id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return mockTickets.find(ticket => ticket.id === id) || null
    }
  })
}