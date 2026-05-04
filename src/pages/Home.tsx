import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service, Testimonial } from '../types';
import { SERVICES, TESTIMONIALS } from '../constants';

export function HomePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Beauty Salon Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blush/90 via-blush/40 to-transparent" />
        </div>
        
        <div className="section-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs uppercase tracking-[0.3em] font-medium mb-4 text-primary-500">
              Welcome to Sugar Sugar
            </span>
            <h1 className="heading-serif mb-8">
              Glow with <br /> <span className="text-secondary-500">Confidence</span>
            </h1>
            <p className="text-lg text-rosewood/80 mb-10 leading-relaxed max-w-lg">
              Experience the finest lash artistry and skin treatments in our boutique studio. We believe in soft luxury and clinical results.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/booking" className="btn-primary">
                Book Your Appointment
              </Link>
              <Link to="/services" className="btn-outline">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-white py-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="heading-serif mb-4">Our Signature Services</h2>
              <p className="text-rosewood/70 text-lg">Indulge in our curated selection of beauty treatments designed for the modern woman.</p>
            </div>
            <Link to="/services" className="text-rosewood font-medium underline underline-offset-8 hover:text-primary-500 transition-colors">
              Explore All Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, idx) => (
              <ServiceCard key={service.id} service={service} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="bg-blush py-24 overflow-hidden">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-medium text-primary-500 mb-4 block">Kind Words</span>
            <h2 className="heading-serif">What Our Clients Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-luxury flex flex-col h-full"
              >
                <div className="flex space-x-1 mb-6 text-primary-300">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-rosewood/80 italic mb-8 flex-grow leading-relaxed">"{t.comment}"</p>
                <span className="font-serif font-bold text-lg">— {t.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="bg-white py-24">
        <div className="section-container">
          <div className="card-luxury bg-rosewood text-blush flex flex-col lg:flex-row items-center overflow-hidden p-0 rounded-[3rem]">
            <div className="w-full lg:w-1/2 h-[400px]">
              <img 
                src="/src/assets/images/regenerated_image_1777925806890.png" 
                alt="Spa Day" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full lg:w-1/2 p-12 md:p-20">
              <span className="text-xs uppercase tracking-widest mb-4 block opacity-60">Limited Time</span>
              <h2 className="font-serif italic text-4xl md:text-5xl mb-6">Signature Bridal Package</h2>
              <p className="text-blush/80 mb-8 text-lg leading-relaxed">
                Complete glow-up for your special day. Includes full set of lashes, custom facial, and brow sculpting.
              </p>
              <Link to="/booking" className="inline-block bg-blush text-rosewood px-10 py-4 rounded-full font-bold tracking-wide transition-transform hover:scale-105 active:scale-95">
                Reserve Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Instagram Gallery Mockup */}
      <section className="pb-24">
        <div className="section-container pb-10">
          <div className="text-center mb-16">
            <h2 className="heading-serif mb-2">Join the Haus</h2>
            <p className="text-rosewood/60 tracking-widest uppercase text-xs">@SUGARSUGARBEAUTYHAUS</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-2xl relative group cursor-pointer">
                <img 
                  src={`https://picsum.photos/seed/${i + 10}/800/800`} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-rosewood/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Star className="text-white" fill="white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="card-luxury p-0 overflow-hidden flex flex-col"
    >
      <div className="h-64 relative">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold tracking-widest text-primary-500">
          {service.price}
        </div>
      </div>
      <div className="p-8">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary-400 mb-2 block">
          {service.category}
        </span>
        <h3 className="font-serif italic text-2xl mb-4">{service.name}</h3>
        <p className="text-rosewood/70 text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <Link to="/booking" className="text-xs font-bold uppercase tracking-widest text-rosewood hover:text-primary-500 transition-colors flex items-center">
          Book Service
        </Link>
      </div>
    </motion.div>
  );
}
