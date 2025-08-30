# TixSync - Event Ticketing Platform

A modern, full-featured event ticketing platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎫 **Event Discovery & Booking**
- Browse events with advanced filtering (category, location, date, price)
- Interactive seat selection with real-time availability
- Timed reservation system with countdown timers
- Multi-step checkout process with payment integration

### 📱 **Progressive Web App**
- Offline ticket access and QR code display
- Installable app experience
- Service worker for caching critical resources
- Mobile-first responsive design

### 🎯 **Event Management**
- Organizer dashboard with analytics
- Event creation and management tools
- Sales tracking and reporting
- Ticket scanning for staff

### ♿ **Accessibility & UX**
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast ratios and clear focus indicators

### 🔄 **Real-time Features**
- Live seat availability updates
- WebSocket simulation for real-time data
- Optimistic UI updates with server reconciliation

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React
- **Charts**: Recharts for analytics
- **QR Codes**: qrcode.react
- **Date Handling**: date-fns

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Homepage sections
│   ├── events/           # Event-related components
│   ├── booking/          # Seat selection, reservations
│   ├── checkout/         # Multi-step checkout flow
│   ├── tickets/          # Ticket display and QR codes
│   ├── organizer/        # Dashboard and management
│   ├── scan/             # QR code scanning
│   └── ui/               # Base UI components (shadcn)
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── lib/                  # Utilities and helpers
└── public/               # Static assets and PWA files
```

## Key Pages

### 🏠 **Homepage** (`/`)
- Hero section with search functionality
- Featured events carousel
- Category browsing
- Trust indicators and statistics

### 🎪 **Events** (`/events`)
- Event listing with filters and search
- Grid/list view options
- Infinite scroll or pagination
- Advanced filtering sidebar

### 📋 **Event Details** (`/events/[id]`)
- Event information and media
- Interactive seating chart
- Ticket tier selection
- Venue and organizer details

### 💺 **Seat Selection** (`/events/[id]/seats`)
- Visual seating map
- Real-time availability updates
- Multi-seat selection
- Reservation timer

### 💳 **Checkout** (`/checkout`)
- Review reservation
- Buyer information form
- Payment processing (demo)
- Order confirmation

### 🎫 **My Tickets** (`/tickets`)
- Purchased tickets overview
- QR code access
- Download and sharing options
- Ticket status tracking

### 📊 **Organizer Dashboard** (`/organizer`)
- Sales analytics and charts
- Event management
- Ticket tracking
- Revenue reporting

### 📱 **QR Scanner** (`/scan`)
- Camera-based QR scanning
- Ticket verification
- Check-in management
- Staff interface

## API Integration

The app uses mock API endpoints with clear integration points for backend services:

### Event Management
- `GET /api/events` - List events with filters
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event

### Booking & Reservations
- `POST /api/reservations` - Create seat reservation
- `GET /api/reservations/:id` - Get reservation details
- `POST /api/bookings` - Complete purchase
- `DELETE /api/reservations/:id` - Cancel reservation

### Tickets & Verification
- `GET /api/tickets` - Get user tickets
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/verify` - Verify ticket QR code
- `PUT /api/tickets/:id/use` - Mark ticket as used

### Real-time Updates
- `WS /ws/events/:id/seats` - Live seat availability
- WebSocket events for reservation updates

## PWA Configuration

The app includes full Progressive Web App support:


- **Service Worker** (`/sw.js`) - Offline caching strategy
- **Offline Support** - Cached tickets viewable without internet
- **Installation Prompts** - Add to home screen functionality

## Performance Optimizations

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based code splitting
- **Caching Strategy** - TanStack Query for efficient data fetching
- **Lazy Loading** - Component-level lazy loading where appropriate
- **Bundle Analysis** - Optimized bundle sizes

## Accessibility Features

- **Keyboard Navigation** - Full keyboard support throughout
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Color Contrast** - WCAG AA compliant color ratios
- **Focus Management** - Clear focus indicators and logical tab order
- **Alternative Text** - Descriptive alt text for all images

## Testing Strategy

The codebase is designed for comprehensive testing:

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - User flow and API integration testing  
- **E2E Tests** - Critical path automation (browse → book → scan)
- **Accessibility Tests** - Automated axe-core scanning
- **Visual Regression** - Component screenshot comparison

## Deployment

The app is configured for seamless deployment:

- **Vercel** - Optimized for Vercel hosting with zero configuration
- **Static Export** - Can be deployed as static site if needed
- **Environment Variables** - Clear separation of config
- **Build Optimization** - Production-ready build configuration

## Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Browsers** - iOS Safari, Chrome Mobile
- **PWA Features** - Service Worker support required for offline functionality
- **Camera Access** - Required for QR code scanning feature

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the existing patterns
4. Test thoroughly across different devices
5. Submit a pull request with clear description

## License

This project is created as a demonstration of modern web development practices for event ticketing platforms.