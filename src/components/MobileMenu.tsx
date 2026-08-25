import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, MessageCircle, Phone } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop All', to: '/shop' },
  { label: 'Shirts', to: '/shop?category=Shirts' },
  { label: 'T-Shirts', to: '/shop?category=T-Shirts' },
  { label: 'Jeans', to: '/shop?category=Jeans' },
  { label: 'Pants', to: '/shop?category=Pants' },
  { label: 'New Arrivals', to: '/shop?filter=newArrival' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Contact', to: '/#location' },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className={`absolute top-0 left-0 h-full w-[82%] max-w-xs bg-bg-secondary border-r border-border
          transition-transform duration-300 ease-out flex flex-col ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-border">
          <span className="font-serif text-xl tracking-[0.2em] text-gold">SK COLLECTION</span>
          <button aria-label="Close menu" onClick={onClose} className="text-text-primary hover:text-gold">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col px-5 py-6 gap-1 overflow-y-auto" aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={onClose}
              className="py-3 text-sm tracking-[0.1em] uppercase text-text-secondary hover:text-gold border-b border-border/60 flex items-center justify-between"
            >
              {link.label}
              {link.label === 'Wishlist' && <Heart className="w-4 h-4" />}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-5 py-6 border-t border-border flex flex-col gap-3">
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-solid w-full"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <a href={`tel:+${STORE_WHATSAPP_NUMBER}`} className="btn-gold-outline w-full">
            <Phone className="w-4 h-4" /> Call Store
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
