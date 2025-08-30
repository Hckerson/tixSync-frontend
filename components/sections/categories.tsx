import { Music, Trophy, Palette, Gamepad, Heart, GraduationCap } from 'lucide-react'
import Link from 'next/link'

const categories = [
  { name: 'Music', icon: Music, href: '/events?category=music', color: 'bg-purple-500' },
  { name: 'Sports', icon: Trophy, href: '/events?category=sports', color: 'bg-green-500' },
  { name: 'Arts & Culture', icon: Palette, href: '/events?category=arts', color: 'bg-pink-500' },
  { name: 'Gaming', icon: Gamepad, href: '/events?category=gaming', color: 'bg-blue-500' },
  { name: 'Charity', icon: Heart, href: '/events?category=charity', color: 'bg-red-500' },
  { name: 'Education', icon: GraduationCap, href: '/events?category=education', color: 'bg-indigo-500' },
]

export function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600">
            Find events that match your interests
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <category.icon className="w-8 h-8 text-white" />
              </div>
              <span className="font-medium text-gray-900 text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}