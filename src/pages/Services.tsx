import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

export function ServicesPage() {
  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  return (
    <div className="pt-32 pb-24">
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-primary-500 mb-4 block">Our Offerings</span>
          <h1 className="heading-serif mb-6">Expertise & Elegance</h1>
          <p className="text-lg text-rosewood/70 leading-relaxed">
            Our services are meticulously curated to provide maximum impact with minimal downtime. Explore our menu of beauty enhancements.
          </p>
        </div>

        <div className="space-y-32">
          {categories.map((category, catIdx) => (
            <div key={category}>
              <div className="flex items-center space-x-6 mb-12">
                <h2 className="font-serif italic text-4xl text-rosewood">{category}</h2>
                <div className="flex-grow h-[1px] bg-primary-100" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES.filter(s => s.category === category).map((service, idx) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="card-luxury overflow-hidden p-0 flex flex-col"
                  >
                    <div className="h-64 relative overflow-hidden group">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-rosewood/20 group-hover:bg-rosewood/10 transition-colors" />
                    </div>
                    <div className="p-10">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="font-serif italic text-2xl leading-tight">{service.name}</h3>
                        <span className="text-primary-500 font-bold tracking-widest">{service.price}</span>
                      </div>
                      <p className="text-rosewood/70 text-sm leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <Link to="/booking" className="btn-primary py-2 w-full text-center text-sm">
                        Request Booking
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-24 mt-20">
        <div className="section-container">
          <div className="bg-blush rounded-[3rem] p-12 md:p-24 text-center">
            <h2 className="heading-serif mb-6 text-3xl md:text-5xl">Not sure what's right for you?</h2>
            <p className="text-lg text-rosewood/70 mb-10 max-w-2xl mx-auto">
              We offer complimentary consultations for all our services. Let's create a custom beauty plan tailored just for you.
            </p>
            <Link to="/contact" className="btn-outline">
              Contact Us for a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
