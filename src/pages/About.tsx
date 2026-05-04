import { motion } from 'motion/react';
import { TEAM } from '../constants';

export function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Story Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-primary-500 mb-4 block">Our Story</span>
            <h2 className="heading-serif mb-8">The Haus of Sweet Confidence</h2>
            <div className="space-y-6 text-rosewood/80 text-lg leading-relaxed">
              <p>
                Founded in 2024, Sugar Sugar Beauty Haus began with a simple vision: to create a sanctuary where beauty meets luxury in the heart of Longview, Texas.
              </p>
              <p>
                Founder Sarah Johnson noticed a gap in East Texas for a studio that combined high-end clinical results with an aesthetic that felt like home. She set out to build a "Haus" where every detail—from the blush-toned walls to the personalized care—was designed to make you feel cherished.
              </p>
              <p>
                Our mission is to empower our clients to feel their absolute best. We don't just provide services; we provide confidence.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/src/assets/images/regenerated_image_1777925958404.png" 
                alt="Studio Atmosphere" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-100 rounded-full z-0 blur-3xl opacity-60" />
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-200 rounded-full z-0 blur-3xl opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white py-24">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h3 className="font-serif italic text-3xl mb-4">Our Values</h3>
              <p className="text-rosewood/70 leading-relaxed text-lg">
                We pride ourselves on using only premium, medical-grade products and maintaining the highest standards of hygiene and professionalism. Our team is constantly training on the latest techniques to ensure you receive the best possible care.
              </p>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <span className="font-serif italic text-2xl text-primary-500">Integrity</span>
                <p className="text-sm text-rosewood/60">Honest advice for your unique beauty needs.</p>
              </div>
              <div className="space-y-2">
                <span className="font-serif italic text-2xl text-primary-500">Artistry</span>
                <p className="text-sm text-rosewood/60">Every service is a custom work of art.</p>
              </div>
              <div className="space-y-2">
                <span className="font-serif italic text-2xl text-primary-500">Kindness</span>
                <p className="text-sm text-rosewood/60">A warm, welcoming space for everyone.</p>
              </div>
              <div className="space-y-2">
                <span className="font-serif italic text-2xl text-primary-500">Luxury</span>
                <p className="text-sm text-rosewood/60">Premium products and unmatched comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-medium text-primary-500 mb-4 block">Meet the Artists</span>
            <h2 className="heading-serif">The Talent Behind the Haus</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {TEAM.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="aspect-[3/4] rounded-full overflow-hidden mb-8 border-8 border-white shadow-xl max-w-[300px] mx-auto">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-serif italic text-3xl mb-1">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest text-primary-500 font-bold mb-4">{member.role}</p>
                <p className="text-rosewood/70 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
