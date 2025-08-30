'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { CheckoutSteps } from '@/components/checkout/checkout-steps'
import { ReservationTimer } from '@/components/booking/reservation-timer'
import { ReservationSummary } from '@/components/checkout/reservation-summary'
import { BuyerDetails } from '@/components/checkout/buyer-details'
import { PaymentForm } from '@/components/checkout/payment-form'
import { OrderConfirmation } from '@/components/checkout/order-confirmation'
import { useReservation } from '@/hooks/use-reservations'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reservationId = searchParams.get('reservation')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [buyerDetails, setBuyerDetails] = useState({})
  const [orderId, setOrderId] = useState<string | null>(null)

  const { data: reservation, isLoading } = useReservation(reservationId || '')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!reservation) {
    router.push('/events')
    return null
  }

  const handleStepComplete = (stepData?: any) => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setBuyerDetails(stepData)
      setCurrentStep(3)
    } else if (currentStep === 3) {
      // Simulate order creation
      const mockOrderId = 'ORDER_' + Math.random().toString(36).substr(2, 9)
      setOrderId(mockOrderId)
      setCurrentStep(4)
    }
  }

  const handleReservationExpired = () => {
    router.push(`/events/${reservation.eventId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <ReservationTimer 
              expiresAt={reservation.expiresAt}
              onExpired={handleReservationExpired}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutSteps currentStep={currentStep} />
              
              {currentStep === 1 && (
                <ReservationSummary 
                  reservation={reservation}
                  onContinue={() => handleStepComplete()}
                />
              )}
              
              {currentStep === 2 && (
                <BuyerDetails 
                  onSubmit={handleStepComplete}
                />
              )}
              
              {currentStep === 3 && (
                <PaymentForm 
                  reservation={reservation}
                  buyerDetails={buyerDetails}
                  onSubmit={handleStepComplete}
                />
              )}
              
              {currentStep === 4 && orderId && (
                <OrderConfirmation 
                  orderId={orderId}
                  reservation={reservation}
                />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <ReservationSummary 
                  reservation={reservation}
                  showActions={false}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}