'use client'

import { useQuery } from '@tanstack/react-query'

export function useReservation(id: string) {
  return useQuery({
    queryKey: ['reservation', id],
    queryFn: async () => {
      if (!id) return null
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Mock reservation data
      return {
        id,
        eventId: '1',
        seats: ['A12', 'A13'],
        tier: 'Premium',
        subtotal: 179.98,
        fees: 14.50,
        taxes: 15.52,
        total: 210.00,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
        status: 'active'
      }
    },
    enabled: !!id
  })
}