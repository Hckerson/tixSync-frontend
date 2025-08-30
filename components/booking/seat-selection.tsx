'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Users, Clock } from 'lucide-react'
import { ReservationTimer } from './reservation-timer'
import { useRouter } from 'next/navigation'
import type { Event } from '@/types/event'

interface SeatSelectionProps {
  event: Event
  ticketTier: string
  onBack: () => void
}

interface Seat {
  id: string
  row: string
  number: number
  status: 'available' | 'selected' | 'reserved' | 'sold'
  price: number
}

export function SeatSelection({ event, ticketTier, onBack }: SeatSelectionProps) {
  const router = useRouter()
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [reservationExpiry, setReservationExpiry] = useState<Date | null>(null)

  // Generate mock seats
  useEffect(() => {
    const mockSeats: Seat[] = []
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 12
    const basePrice = event.startingPrice * (ticketTier === 'premium' ? 1.5 : ticketTier === 'vip' ? 2.5 : 1)

    rows.forEach((row) => {
      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`
        const status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'reserved' : 'sold') : 'available'
        mockSeats.push({
          id: seatId,
          row,
          number: i,
          status,
          price: basePrice
        })
      }
    })
    setSeats(mockSeats)
  }, [event.startingPrice, ticketTier])

  // Simulate real-time seat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSeats(currentSeats => {
        const newSeats = [...currentSeats]
        // Randomly update a few seat statuses
        const indicesToUpdate = Array.from({ length: Math.floor(Math.random() * 3) }, 
          () => Math.floor(Math.random() * newSeats.length))
        
        indicesToUpdate.forEach(index => {
          if (newSeats[index].status === 'available' && Math.random() > 0.7) {
            newSeats[index] = { ...newSeats[index], status: 'reserved' }
          }
        })
        
        return newSeats
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'reserved' || seat.status === 'sold') return

    const isSelected = selectedSeats.find(s => s.id === seat.id)
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id))
    } else {
      if (selectedSeats.length < 8) { // Max 8 seats per transaction
        setSelectedSeats([...selectedSeats, seat])
        
        // Set reservation timer if this is the first seat selected
        if (selectedSeats.length === 0) {
          setReservationExpiry(new Date(Date.now() + 15 * 60 * 1000)) // 15 minutes
        }
      }
    }
  }

  const handleReserveSeats = async () => {
    if (selectedSeats.length === 0) return

    // Mock API call to create reservation
    const reservationData = {
      eventId: event.id,
      seats: selectedSeats.map(s => s.id),
      totalAmount: selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
      expiresAt: reservationExpiry?.toISOString()
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Navigate to checkout with reservation ID
    const mockReservationId = 'RES_' + Math.random().toString(36).substr(2, 9)
    router.push(`/checkout?reservation=${mockReservationId}`)
  }

  const getSeatClassName = (seat: Seat) => {
    const baseClasses = 'w-8 h-8 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs font-medium'
    const isSelected = selectedSeats.find(s => s.id === seat.id)

    if (isSelected) {
      return `${baseClasses} bg-blue-600 border-blue-700 text-white`
    }

    switch (seat.status) {
      case 'available':
        return `${baseClasses} bg-green-100 border-green-300 text-green-800 hover:bg-green-200`
      case 'reserved':
        return `${baseClasses} bg-yellow-100 border-yellow-300 text-yellow-800 cursor-not-allowed opacity-60`
      case 'sold':
        return `${baseClasses} bg-gray-300 border-gray-400 text-gray-600 cursor-not-allowed`
      default:
        return baseClasses
    }
  }

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Event
          </Button>
          
          {reservationExpiry && (
            <ReservationTimer 
              expiresAt={reservationExpiry.toISOString()}
              onExpired={() => {
                setSelectedSeats([])
                setReservationExpiry(null)
              }}
            />
          )}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Seats</CardTitle>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded-t-lg mr-2" />
                    Available
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-600 border border-blue-700 rounded-t-lg mr-2" />
                    Selected
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded-t-lg mr-2" />
                    Reserved
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded-t-lg mr-2" />
                    Sold
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Stage */}
                <div className="bg-gray-800 text-white text-center py-3 rounded-lg mb-8">
                  <span className="font-semibold">STAGE</span>
                </div>

                {/* Seating Chart */}
                <div className="space-y-4">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
                    <div key={row} className="flex items-center justify-center space-x-2">
                      <div className="w-8 text-center font-semibold text-gray-600">{row}</div>
                      <div className="flex space-x-1">
                        {seats.filter(seat => seat.row === row).map((seat) => (
                          <div
                            key={seat.id}
                            className={getSeatClassName(seat)}
                            onClick={() => handleSeatClick(seat)}
                            title={`${seat.id} - ${formatPrice(seat.price)}`}
                          >
                            {seat.number}
                          </div>
                        ))}
                      </div>
                      <div className="w-8 text-center font-semibold text-gray-600">{row}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Selection Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.venue}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <Badge variant="secondary">{ticketTier.toUpperCase()} TIER</Badge>
                  </div>

                  {selectedSeats.length > 0 ? (
                    <>
                      <div>
                        <h4 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h4>
                        <div className="space-y-2">
                          {selectedSeats.map((seat) => (
                            <div key={seat.id} className="flex justify-between text-sm">
                              <span>Seat {seat.id}</span>
                              <span>{formatPrice(seat.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total:</span>
                          <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Excluding fees and taxes
                        </p>
                      </div>

                      <Button 
                        onClick={handleReserveSeats}
                        className="w-full"
                        size="lg"
                      >
                        Continue to Checkout
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Select seats to continue</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Click on available seats to select them
                      </p>
                    </div>
                  )}

                  <div className="border-t pt-4 text-center">
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      Seats held for 15 minutes
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}