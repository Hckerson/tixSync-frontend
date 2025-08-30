'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { QrCode, Download, Share2, Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import type { Ticket } from '@/types/ticket'

interface TicketQRProps {
  ticket: Ticket
}

export function TicketQR({ ticket }: TicketQRProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, this would generate and download a PDF
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = `ticket-${ticket.id}.png`
      a.click()
    }
    
    setIsDownloading(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${ticket.event.title}`,
          text: `I'm going to ${ticket.event.title}!`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const qrValue = JSON.stringify({
    ticketId: ticket.id,
    eventId: ticket.event.id,
    seat: ticket.seat,
    tier: ticket.tier,
    orderId: ticket.orderId
  })

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <TicketIcon className="w-6 h-6 mr-2" />
            Your Ticket
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {ticket.event.title}
            </h2>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center justify-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(ticket.event.date)} at {ticket.event.time}
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="w-4 h-4 mr-2" />
                {ticket.event.venue}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary">Seat {ticket.seat}</Badge>
            <Badge variant="secondary">{ticket.tier} Tier</Badge>
          </div>

          <div className="flex justify-center bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
            <QRCodeCanvas
              id="qr-code"
              value={qrValue}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600 font-medium">
              Show this QR code at the venue entrance
            </p>
            <p className="text-xs text-gray-500">
              Order #{ticket.orderId}
            </p>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1"
              variant="outline"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
            
            <Button onClick={handleShare} className="flex-1" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Tip:</strong> Save this page to your home screen for quick access, 
              even without internet connection.
            </p>
          </div>

          <div className="border-t pt-4 space-y-2 text-xs text-gray-500">
            <p><strong>Event Guidelines:</strong></p>
            <ul className="space-y-1">
              <li>• Arrive 30 minutes before event start time</li>
              <li>• Valid ID required for entry</li>
              <li>• No outside food or beverages</li>
              <li>• Screenshots not accepted - show original QR code</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}