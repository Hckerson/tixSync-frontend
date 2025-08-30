'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const mockTickets = [
  {
    id: 'TKT001',
    eventTitle: 'Summer Music Festival 2024',
    buyerName: 'John Doe',
    buyerEmail: 'john@example.com',
    seat: 'A12',
    tier: 'Premium',
    price: 89.99,
    status: 'paid',
    purchaseDate: '2024-06-01'
  },
  {
    id: 'TKT002',
    eventTitle: 'Summer Music Festival 2024',
    buyerName: 'Jane Smith',
    buyerEmail: 'jane@example.com',
    seat: 'B15',
    tier: 'General',
    price: 59.99,
    status: 'used',
    purchaseDate: '2024-06-02'
  },
  {
    id: 'TKT003',
    eventTitle: 'Tech Conference 2024',
    buyerName: 'Bob Johnson',
    buyerEmail: 'bob@example.com',
    seat: 'VIP1',
    tier: 'VIP',
    price: 199.99,
    status: 'paid',
    purchaseDate: '2024-06-03'
  }
]

export function TicketsList() {
  const [tickets] = useState(mockTickets)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'used':
        return 'bg-blue-100 text-blue-800'
      case 'refunded':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesSearch = ticket.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ticket Sales</CardTitle>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tickets..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2">Ticket ID</th>
                <th className="text-left p-2">Event</th>
                <th className="text-left p-2">Buyer</th>
                <th className="text-left p-2">Seat</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-mono text-sm">{ticket.id}</td>
                  <td className="p-2">{ticket.eventTitle}</td>
                  <td className="p-2">
                    <div>
                      <div className="font-medium">{ticket.buyerName}</div>
                      <div className="text-sm text-gray-500">{ticket.buyerEmail}</div>
                    </div>
                  </td>
                  <td className="p-2">
                    <div>
                      <div className="font-medium">{ticket.seat}</div>
                      <div className="text-sm text-gray-500">{ticket.tier}</div>
                    </div>
                  </td>
                  <td className="p-2 font-semibold">${ticket.price}</td>
                  <td className="p-2">
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="p-2 text-sm text-gray-500">
                    {new Date(ticket.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}