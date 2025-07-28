export interface Booking {
  id?: string
  name: string
  email: string
  phone: string
  message?: string
  checkIn: string
  checkOut: string
  guests: number
  createdAt: Date | { toDate(): Date } | any
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export interface Testimonial {
  id: string
  name: string
  country: string
  rating: number
  score: string
  comment: string
  date: string
  nights: string
  type: string
  featured?: boolean
}

export interface Service {
  id: string
  titleKey: string
  descriptionKey: string
  icon: any
}