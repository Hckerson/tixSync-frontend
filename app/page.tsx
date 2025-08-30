import { Hero } from '@/components/sections/hero'
import { FeaturedEvents } from '@/components/sections/featured-events'
import { Categories } from '@/components/sections/categories'
import { Stats } from '@/components/sections/stats'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedEvents />
        <Stats />
      </main>
      <Footer />
    </div>
  )
}