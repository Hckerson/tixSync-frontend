'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const salesData = [
  { month: 'Jan', revenue: 4000, tickets: 120 },
  { month: 'Feb', revenue: 3000, tickets: 98 },
  { month: 'Mar', revenue: 5000, tickets: 156 },
  { month: 'Apr', revenue: 4500, tickets: 134 },
  { month: 'May', revenue: 6000, tickets: 189 },
  { month: 'Jun', revenue: 7500, tickets: 234 },
]

const eventTypeData = [
  { type: 'Music', count: 45, revenue: 23400 },
  { type: 'Sports', count: 28, revenue: 18900 },
  { type: 'Arts', count: 15, revenue: 8900 },
  { type: 'Education', count: 12, revenue: 5600 },
]

export function SalesOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tickets Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Events by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventTypeData.map((item) => (
              <div key={item.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{item.type}</h3>
                  <p className="text-sm text-gray-600">{item.count} events</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${item.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}