import { Users, Calendar, MapPin, Star } from 'lucide-react'

const stats = [
  { label: 'Happy Customers', value: '2M+', icon: Users },
  { label: 'Events Hosted', value: '50K+', icon: Calendar },
  { label: 'Cities Covered', value: '200+', icon: MapPin },
  { label: 'Average Rating', value: '4.9', icon: Star },
]

export function Stats() {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Millions
          </h2>
          <p className="text-xl text-blue-100">
            Join the world's leading event platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}