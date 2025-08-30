'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { EventForm } from '@/components/organizer/event-form'

export default function NewEventPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
          <EventForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}