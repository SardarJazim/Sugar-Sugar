import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Instagram } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-serif italic text-2xl md:text-3xl text-rosewood font-bold tracking-tight">
            Sugar Sugar
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium tracking-widest uppercase transition-colors hover:text-primary-500',
                location.pathname === link.path ? 'text-primary-500' : 'text-rosewood'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/booking" className="btn-primary py-2 px-6 text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-rosewood"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white mt-4 rounded-3xl"
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'text-lg font-serif italic transition-colors',
                location.pathname === link.path ? 'text-primary-500' : 'text-rosewood'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setIsOpen(false)}
            className="btn-primary text-center"
          >
            Book Now
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 px-4 md:px-8 border-t border-primary-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-serif italic text-3xl text-rosewood font-bold mb-6 block">
              Sugar Sugar
            </span>
            <p className="text-rosewood/70 max-w-sm mb-6 leading-relaxed">
              Providing premium beauty services in Longview, Texas. We specialize in enhancing your natural beauty with a touch of soft luxury.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-blush rounded-full text-rosewood hover:scale-110 transition-transform">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium uppercase text-xs tracking-widest mb-6 opacity-50">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm hover:text-primary-500 transition-colors">Our Story</Link></li>
              <li><Link to="/services" className="text-sm hover:text-primary-500 transition-colors">Services</Link></li>
              <li><Link to="/booking" className="text-sm hover:text-primary-500 transition-colors">Book Now</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium uppercase text-xs tracking-widest mb-6 opacity-50">Location</h4>
            <address className="not-italic text-sm text-rosewood/80 space-y-2">
              <p>456 Beauty Way</p>
              <p>Longview, TX 75601</p>
              <p className="pt-2 font-medium">903-555-0123</p>
              <p>hello@sugarsugarhaus.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-primary-50 pt-10 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase opacity-40">
          <p>© 2026 Sugar Sugar Beauty Haus. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
