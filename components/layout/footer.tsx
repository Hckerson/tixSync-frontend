import Link from 'next/link'
import { Ticket, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Ticket className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">TixSync</span>
            </div>
            <p className="text-gray-400 mb-4">
              The premier platform for discovering and booking amazing events.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Events</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/events" className="hover:text-white">Browse Events</Link></li>
              <li><Link href="/events?category=music" className="hover:text-white">Music</Link></li>
              <li><Link href="/events?category=sports" className="hover:text-white">Sports</Link></li>
              <li><Link href="/events?category=arts" className="hover:text-white">Arts & Culture</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Organizers</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/organizer" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/organizer/events/new" className="hover:text-white">Create Event</Link></li>
              <li><Link href="/scan" className="hover:text-white">Scan Tickets</Link></li>
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2024 TixSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}