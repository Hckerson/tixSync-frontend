import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Download, Mail, Smartphone } from 'lucide-react'
import Link from 'next/link'

interface OrderConfirmationProps {
  orderId: string
  reservation: any
}

export function OrderConfirmation({ orderId, reservation }: OrderConfirmationProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            Payment Successful!
          </CardTitle>
          <p className="text-gray-600">
            Your tickets have been purchased and sent to your email
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-mono font-bold text-gray-900">{orderId}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">What happens next?</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Email confirmation sent</p>
                  <p className="text-sm text-gray-600">
                    Check your inbox for tickets and event details
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Mobile tickets ready</p>
                  <p className="text-sm text-gray-600">
                    Access your tickets anytime in the app
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Download available</p>
                  <p className="text-sm text-gray-600">
                    Save tickets to your device for offline access
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tickets" className="flex-1">
                <Button className="w-full">
                  View My Tickets
                </Button>
              </Link>
              <Link href="/events" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More Events
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Need help?</strong> Contact our customer support team at{' '}
              <a href="mailto:support@tixsync.com" className="text-blue-600 hover:underline">
                support@tixsync.com
              </a>{' '}
              or call{' '}
              <a href="tel:+15551234567" className="text-blue-600 hover:underline">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}