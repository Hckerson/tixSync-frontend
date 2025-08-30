'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Camera, Upload, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface ScanResult {
  ticketId: string
  eventTitle: string
  seat: string
  tier: string
  status: 'valid' | 'used' | 'invalid' | 'expired'
  buyerName: string
}

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStartCamera = async () => {
    setIsScanning(true)
    
    // In a real app, this would access the camera
    // For demo purposes, we'll simulate a scan result after 3 seconds
    setTimeout(() => {
      const mockResult: ScanResult = {
        ticketId: 'TKT001',
        eventTitle: 'Summer Music Festival 2024',
        seat: 'A12',
        tier: 'Premium',
        status: 'valid',
        buyerName: 'John Doe'
      }
      setScanResult(mockResult)
      setIsScanning(false)
    }, 3000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, this would decode the QR code from the image
      // For demo purposes, we'll simulate a scan result
      const mockResult: ScanResult = {
        ticketId: 'TKT002',
        eventTitle: 'Tech Conference 2024',
        seat: 'B15',
        tier: 'General',
        status: 'used',
        buyerName: 'Jane Smith'
      }
      setScanResult(mockResult)
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'valid':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-100',
          label: 'Valid Ticket',
          description: 'This ticket is valid for entry'
        }
      case 'used':
        return {
          icon: AlertCircle,
          color: 'text-yellow-600 bg-yellow-100',
          label: 'Already Used',
          description: 'This ticket has already been scanned'
        }
      case 'expired':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-100',
          label: 'Expired',
          description: 'This ticket has expired'
        }
      case 'invalid':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-100',
          label: 'Invalid Ticket',
          description: 'This ticket is not valid'
        }
      default:
        return {
          icon: XCircle,
          color: 'text-gray-600 bg-gray-100',
          label: 'Unknown',
          description: 'Unable to verify ticket'
        }
    }
  }

  const markAsUsed = async () => {
    if (scanResult && scanResult.status === 'valid') {
      // In a real app, this would make an API call to mark the ticket as used
      setScanResult({ ...scanResult, status: 'used' })
    }
  }

  const resetScanner = () => {
    setScanResult(null)
    setIsScanning(false)
  }

  if (scanResult) {
    const statusDisplay = getStatusDisplay(scanResult.status)
    const StatusIcon = statusDisplay.icon

    return (
      <Card>
        <CardHeader className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${statusDisplay.color}`}>
            <StatusIcon className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl">
            {statusDisplay.label}
          </CardTitle>
          <p className="text-gray-600">{statusDisplay.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Ticket ID:</span>
              <span className="font-mono">{scanResult.ticketId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Event:</span>
              <span>{scanResult.eventTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Seat:</span>
              <span>{scanResult.seat}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Tier:</span>
              <Badge variant="secondary">{scanResult.tier}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Buyer:</span>
              <span>{scanResult.buyerName}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {scanResult.status === 'valid' && (
              <Button onClick={markAsUsed} className="flex-1">
                Mark as Used
              </Button>
            )}
            <Button onClick={resetScanner} variant="outline" className="flex-1">
              Scan Another
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Ticket Scanner</CardTitle>
        <p className="text-center text-gray-600">
          Scan QR codes to verify tickets and check attendees in
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {isScanning ? (
          <div className="text-center py-12">
            <div className="w-64 h-64 bg-gray-900 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-gray-600 mb-4">Position QR code within the frame</p>
            <Button onClick={() => setIsScanning(false)} variant="outline">
              Stop Scanning
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Button onClick={handleStartCamera} className="w-full" size="lg">
              <Camera className="w-5 h-5 mr-2" />
              Start Camera Scan
            </Button>
            
            <div className="text-center text-gray-500">or</div>
            
            <div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload QR Code Image
              </Button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Scanner Instructions</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Point camera at QR code on ticket</li>
            <li>• Ensure good lighting for best results</li>
            <li>• Valid tickets will show green confirmation</li>
            <li>• Used tickets will show yellow warning</li>
            <li>• Invalid tickets will show red error</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}