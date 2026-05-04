import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Error sending message.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-primary-500 mb-4 block">Get in Touch</span>
          <h1 className="heading-serif mb-6">We'd Love to <br />Hear From You</h1>
          <p className="text-lg text-rosewood/70">
            Have questions about a service? Or just want to say hi? Reach out using the form below or visit our studio in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info & Form */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-luxury p-8 flex flex-col items-center text-center">
                <div className="p-4 bg-blush rounded-full text-primary-500 mb-6">
                  <Phone size={24} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Call Us</h4>
                <p className="text-rosewood/70">(903) 555-0123</p>
              </div>
              <div className="card-luxury p-8 flex flex-col items-center text-center">
                <div className="p-4 bg-blush rounded-full text-primary-500 mb-6">
                  <Mail size={24} />
                </div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Email Us</h4>
                <p className="text-rosewood/70 leading-tight break-all">hello@sugarsugarhaus.com</p>
              </div>
            </div>

            <div className="card-luxury p-10 md:p-16 bg-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-serif italic text-3xl mb-8">Send a Message</h3>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary-50 text-primary-600 p-8 rounded-3xl text-center"
                  >
                    <MessageSquare size={40} className="mx-auto mb-4" />
                    <p className="font-bold mb-2 uppercase tracking-widest text-xs">Message Received!</p>
                    <p className="text-sm opacity-80 mb-6">We'll get back to you within 24 business hours.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary-600 underline text-xs font-bold uppercase tracking-widest"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-40">Your Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="Elizabeth Bennett"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-40">Email Address</label>
                      <input 
                        required
                        type="email"
                        placeholder="elizabeth@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold opacity-40">Message</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="How can we help you today?"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-blush/30 border border-primary-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary w-full py-5 flex items-center justify-center group"
                    >
                      {loading ? 'Sending...' : (
                        <>
                          Send Message <Send size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-30" />
            </div>
          </div>

          {/* Map & Address */}
          <div className="space-y-8 h-full flex flex-col">
            <div className="card-luxury p-10 flex-grow h-[400px] lg:h-[auto] relative overflow-hidden flex flex-col">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-blush rounded-2xl text-primary-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-rosewood uppercase tracking-widest text-xs">Our Location</h4>
                  <p className="text-rosewood/70">456 Beauty Way, Longview, TX 75601</p>
                </div>
              </div>
              
              <div className="flex-grow rounded-3xl overflow-hidden min-h-[300px]">
                {GOOGLE_MAPS_API_KEY ? (
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY} version="weekly">
                    <Map
                      defaultCenter={{ lat: 32.5007, lng: -94.7405 }}
                      defaultZoom={15}
                      mapId="SALON_MAP"
                      disableDefaultUI={true}
                      style={{ width: '100%', height: '100%' }}
                      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    >
                      <AdvancedMarker position={{ lat: 32.5007, lng: -94.7405 }}>
                        <Pin background="#5e1d1d" glyphColor="#fdf2f2" borderColor="#5e1d1d" />
                      </AdvancedMarker>
                    </Map>
                  </APIProvider>
                ) : (
                  <div className="w-full h-full bg-primary-50 flex items-center justify-center p-8 text-center">
                    <div className="max-w-xs">
                      <MapPin size={48} className="text-rosewood/20 mx-auto mb-4" />
                      <p className="text-rosewood/50 font-medium italic">Maps API configuration required in settings.</p>
                      <p className="text-rosewood/30 text-xs mt-2 uppercase tracking-widest mt-4">Longview, Texas Area</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-primary-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-1 opacity-50">Studio Hours</h4>
                <div className="text-sm space-y-1">
                  <p className="flex justify-between w-48"><span>Mon - Fri</span> <span className="font-bold">9am - 7pm</span></p>
                  <p className="flex justify-between w-48"><span>Sat</span> <span className="font-bold">10am - 4pm</span></p>
                  <p className="flex justify-between w-48"><span>Sun</span> <span className="font-bold">Closed</span></p>
                </div>
              </div>
              <SparkleIcon className="text-primary-200 hidden md:block" size={64} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparkleIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}
