import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Calendar, Clock, User, Phone, Mail, Sparkles } from 'lucide-react';
import { SERVICES } from '../constants';

export function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-primary-50"
        >
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8 text-primary-500">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="heading-serif mb-4 text-3xl">Booking Requested!</h2>
          <p className="text-rosewood/70 leading-relaxed mb-10">
            Thank you, {formData.fullName.split(' ')[0]}! We've received your request for {formData.service} on {formData.date}. Our team will contact you shortly to confirm.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="btn-primary w-full"
          >
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-blush/50">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-primary-500 mb-4 block">Reservation</span>
              <h1 className="heading-serif mb-6 text-5xl">Book Your <br />Haus Experience</h1>
              <p className="text-lg text-rosewood/70 leading-relaxed">
                Step into a world of soft luxury. Fill out the form to request your preferred service and time.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-2xl text-primary-500 shadow-sm">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-rosewood mb-1">Expert Artistry</h4>
                  <p className="text-sm text-rosewood/60">Services performed by certified master artists.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-2xl text-primary-500 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-rosewood mb-1">Personalized Time</h4>
                  <p className="text-sm text-rosewood/60">We never rush. Quality takes time and dedication.</p>
                </div>
              </div>
            </div>

            <div className="card-luxury bg-rosewood text-blush p-10">
              <h4 className="font-serif italic text-2xl mb-4">Reminder</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Please arrive 10 minutes early for your first appointment to fill out a skin consultation form. We have a 24-hour cancellation policy.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 card-luxury p-10 md:p-16"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <User size={12} className="mr-2" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <Mail size={12} className="mr-2" /> Email Address
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <Phone size={12} className="mr-2" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(903) 555-0123"
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <Sparkles size={12} className="mr-2" /> Select Service
                  </label>
                  <select
                    required
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all appearance-none"
                  >
                    <option value="">Choose a treatment</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.name}>{s.name} - {s.price}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="date" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <Calendar size={12} className="mr-2" /> Preferred Date
                  </label>
                  <input
                    required
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="time" className="text-xs uppercase tracking-widest font-bold opacity-50 flex items-center">
                    <Clock size={12} className="mr-2" /> Preferred Time
                  </label>
                  <input
                    required
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn-primary w-full py-5 text-lg mt-4 flex items-center justify-center"
              >
                {loading ? 'Processing...' : (
                  <>
                    Request Appointment <ChevronRight size={20} className="ml-2" />
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-rosewood/40">
                By submitting, you agree to our booking and cancellation policies.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
