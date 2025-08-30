export interface Event {
  id: string
  title: string
  description?: string
  category: string
  date: string
  time: string
  venue: string
  location: string
  image: string
  startingPrice: number
  attendees: number
  featured?: boolean
  organizer?: string
  capacity?: number
}

export interface EventFilters {
  category: string
  location: string
  dateRange: string
  priceRange: string
  search: string
}