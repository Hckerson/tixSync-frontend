'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { QRScanner } from '@/components/scan/qr-scanner'

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Scan Tickets</h1>
          <QRScanner />
        </div>
      </main>
      <Footer />
    </div>
  )
}