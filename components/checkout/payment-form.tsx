'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CreditCard, Lock, Shield } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface PaymentFormProps {
  reservation: any
  buyerDetails: any
  onSubmit: (data: any) => void
}

export function PaymentForm({ reservation, buyerDetails, onSubmit }: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    agreeToTerms: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!paymentData.cardNumber.replace(/\s/g, '')) newErrors.cardNumber = 'Card number is required'
    if (!paymentData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
    if (!paymentData.cvv) newErrors.cvv = 'CVV is required'
    if (!paymentData.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required'
    if (!paymentData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsProcessing(true)
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      onSubmit({
        ...paymentData,
        buyerDetails,
        reservation
      })
    }
  }

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')
    setPaymentData({ ...paymentData, cardNumber: formatted })
  }

  const handleExpiryChange = (value: string) => {
    // Format as MM/YY
    const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
    setPaymentData({ ...paymentData, expiryDate: formatted })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="w-5 h-5 mr-2" />
          Payment Information
        </CardTitle>
        <div className="flex items-center text-sm text-green-600">
          <Shield className="w-4 h-4 mr-2" />
          Your payment is secured with SSL encryption
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <div className="relative">
              <CreditCard className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                id="cardNumber"
                type="text"
                className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                value={paymentData.cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            {errors.cardNumber && (
              <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="text"
                className={errors.expiryDate ? 'border-red-500' : ''}
                value={paymentData.expiryDate}
                onChange={(e) => handleExpiryChange(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                type="text"
                className={errors.cvv ? 'border-red-500' : ''}
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value.replace(/\D/g, '') })}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="nameOnCard">Name on Card *</Label>
            <Input
              id="nameOnCard"
              type="text"
              className={errors.nameOnCard ? 'border-red-500' : ''}
              value={paymentData.nameOnCard}
              onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
              placeholder="John Doe"
            />
            {errors.nameOnCard && (
              <p className="text-sm text-red-500 mt-1">{errors.nameOnCard}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Billing Address</h3>
            
            <div>
              <Label htmlFor="billingAddress">Address</Label>
              <Input
                id="billingAddress"
                type="text"
                value={paymentData.billingAddress}
                onChange={(e) => setPaymentData({ ...paymentData, billingAddress: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type="text"
                  value={paymentData.city}
                  onChange={(e) => setPaymentData({ ...paymentData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  type="text"
                  value={paymentData.zipCode}
                  onChange={(e) => setPaymentData({ ...paymentData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={paymentData.agreeToTerms}
              onCheckedChange={(checked) => 
                setPaymentData({ ...paymentData, agreeToTerms: checked as boolean })
              }
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:underline" target="_blank">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline" target="_blank">
                Privacy Policy
              </a>
            </Label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Lock className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Secure Payment</p>
                <p className="text-yellow-700">
                  This is a demo payment form. No actual charges will be made.
                  In production, this would integrate with Stripe or another payment processor.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner className="mr-2" />
                Processing Payment...
              </>
            ) : (
              `Complete Purchase - $${(reservation?.total || 175.75).toFixed(2)}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}