'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ReservationTimerProps {
  expiresAt: string
  onExpired: () => void
}

export function ReservationTimer({ expiresAt, onExpired }: ReservationTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference <= 0) {
        setTimeLeft(null)
        onExpired()
        return
      }

      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ minutes, seconds })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [expiresAt, onExpired])

  if (!timeLeft) return null

  const isUrgent = timeLeft.minutes < 5

  return (
    <Badge 
      variant={isUrgent ? "destructive" : "secondary"}
      className="animate-pulse"
    >
      <Clock className="w-4 h-4 mr-2" />
      {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')} remaining
    </Badge>
  )
}