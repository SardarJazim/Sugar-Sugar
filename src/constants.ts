import { Service, TeamMember, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'lashes-1',
    name: 'Classic Full Set',
    description: 'A natural, elegant enhancement to your existing lashes. High-quality extensions applied individually.',
    price: '$120',
    category: 'Lashes',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'lashes-2',
    name: 'Volume Full Set',
    description: 'Dramatic and full lashes using our premium volume technique for a glamorous look.',
    price: '$150',
    category: 'Lashes',
    image: '/src/assets/images/regenerated_image_1777925811648.png'
  },
  {
    id: 'facials-1',
    name: 'Signature Glow Facial',
    description: 'Deep cleansing, exfoliation, and hydration tailored to your specific skin needs.',
    price: '$95',
    category: 'Facials',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'brows-1',
    name: 'Brow Lamination & Tint',
    description: 'Get the perfect brow shape and color with our lamination and hybrid tint service.',
    price: '$75',
    category: 'Brows',
    image: 'https://images.unsplash.com/photo-1522337094846-8a818192de1f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'waxing-1',
    name: 'Full Body Wax',
    description: 'Professional waxing services using our gentle but effective hard and soft waxes.',
    price: '$180',
    category: 'Waxing',
    image: '/src/assets/images/regenerated_image_1777926070524.png'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Sarah Johnson',
    role: 'Founder & Lead Esthetician',
    bio: 'With over 10 years of experience, Sarah founded Sugar Sugar to bring a new level of luxury to Longview.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'team-2',
    name: 'Elena Rodriguez',
    role: 'Senior Lash Artist',
    bio: 'Elena is a certified volume lash expert known for her precision and artistry.',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=800'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Jessica M.',
    comment: 'The best lash experience I\'ve ever had! The studio is so beautiful and relaxing.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Ashley R.',
    comment: 'Sarah is a miracle worker with my skin. My face has never looked so clear and glowing!',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Michelle K.',
    comment: 'Love the aesthetic and the level of service here. Unmatched in East Texas.',
    rating: 5
  }
];
