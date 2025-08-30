'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { OrganizerDashboard } from '@/components/organizer/organizer-dashboard'

export default function OrganizerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <OrganizerDashboard />
      </main>
      <Footer />
    </div>
  )
}