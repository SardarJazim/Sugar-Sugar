export interface Booking {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  createdAt?: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
}
