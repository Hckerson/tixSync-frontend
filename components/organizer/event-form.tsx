'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Upload } from 'lucide-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

export function EventForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: undefined as Date | undefined,
    time: '',
    venue: '',
    location: '',
    image: '',
    capacity: '',
    startingPrice: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (!formData.venue.trim()) newErrors.venue = 'Venue is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.capacity) newErrors.capacity = 'Capacity is required'
    if (!formData.startingPrice) newErrors.startingPrice = 'Starting price is required'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to organizer dashboard
      router.push('/organizer')
    }
  }

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              className={errors.title ? 'border-red-500' : ''}
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your event..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="gaming">Gaming</SelectItem>
                  <SelectItem value="charity">Charity</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
            </div>

            <div>
              <Label htmlFor="capacity">Venue Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => updateField('capacity', e.target.value)}
                className={errors.capacity ? 'border-red-500' : ''}
                placeholder="e.g. 1000"
              />
              {errors.capacity && <p className="text-sm text-red-500 mt-1">{errors.capacity}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      errors.date ? 'border-red-500' : ''
                    } ${!formData.date ? 'text-muted-foreground' : ''}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => updateField('date', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <Label htmlFor="time">Event Time *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => updateField('time', e.target.value)}
                className={errors.time ? 'border-red-500' : ''}
              />
              {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="venue">Venue Name *</Label>
            <Input
              id="venue"
              value={formData.venue}
              onChange={(e) => updateField('venue', e.target.value)}
              className={errors.venue ? 'border-red-500' : ''}
              placeholder="e.g. Madison Square Garden"
            />
            {errors.venue && <p className="text-sm text-red-500 mt-1">{errors.venue}</p>}
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              className={errors.location ? 'border-red-500' : ''}
              placeholder="e.g. New York, NY"
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
          </div>

          <div>
            <Label htmlFor="startingPrice">Starting Price (USD) *</Label>
            <Input
              id="startingPrice"
              type="number"
              step="0.01"
              value={formData.startingPrice}
              onChange={(e) => updateField('startingPrice', e.target.value)}
              className={errors.startingPrice ? 'border-red-500' : ''}
              placeholder="e.g. 25.00"
            />
            {errors.startingPrice && <p className="text-sm text-red-500 mt-1">{errors.startingPrice}</p>}
          </div>

          <div>
            <Label htmlFor="image">Event Image</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => updateField('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Upload an image or provide a URL. Recommended size: 1200x600px
            </p>
          </div>

          <div className="border-t pt-6">
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Creating Event...' : 'Create Event'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/organizer')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}