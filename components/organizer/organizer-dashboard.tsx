'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Calendar, DollarSign, Users, Ticket } from 'lucide-react'
import { EventsList } from './events-list'
import { SalesOverview } from './sales-overview'
import { TicketsList } from './tickets-list'
import Link from 'next/link'

export function OrganizerDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Events This Month',
      value: '12',
      change: '+3 new',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Tickets Sold',
      value: '1,234',
      change: '+234 this week',
      icon: Ticket,
      color: 'text-purple-600'
    },
    {
      title: 'Active Attendees',
      value: '892',
      change: '+15.3%',
      icon: Users,
      color: 'text-indigo-600'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-gray-600">Manage your events and track performance</p>
        </div>
        
        <Link href="/organizer/events/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SalesOverview />
        </TabsContent>

        <TabsContent value="events">
          <EventsList />
        </TabsContent>

        <TabsContent value="tickets">
          <TicketsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}