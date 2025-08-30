export interface Ticket {
  id: string
  eventId: string
  event: {
    id: string
    title: string
    date: string
    time: string
    venue: string
    location: string
    image: string
  }
  seat: string
  tier: string
  price: number
  status: 'active' | 'used' | 'expired' | 'cancelled'
  orderId: string
  buyerName: string
  buyerEmail: string
  purchaseDate: string
  qrCode: string
}