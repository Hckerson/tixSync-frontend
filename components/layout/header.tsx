'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Ticket, User } from 'lucide-react'
import { SearchBar } from '@/components/ui/search-bar'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">TixSync</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Events
            </Link>
            <Link href="/organizer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Organizer
            </Link>
            <Link href="/scan" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Scan
            </Link>
          </nav>

          {/* Desktop Search */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar placeholder="Search events..." />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/tickets">
              <Button variant="ghost" size="sm">
                <Ticket className="w-4 h-4 mr-2" />
                My Tickets
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="mb-4">
              <SearchBar placeholder="Search events..." />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/events" className="text-gray-700 hover:text-blue-600 font-medium">
                Events
              </Link>
              <Link href="/organizer" className="text-gray-700 hover:text-blue-600 font-medium">
                Organizer
              </Link>
              <Link href="/scan" className="text-gray-700 hover:text-blue-600 font-medium">
                Scan
              </Link>
              <Link href="/tickets" className="text-gray-700 hover:text-blue-600 font-medium">
                My Tickets
              </Link>
              <Button variant="outline" size="sm" className="w-fit">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}