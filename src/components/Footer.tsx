import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-deep">
      <div className="gold-divider" />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex flex-col leading-none mb-3">
            <span className="font-serif text-2xl tracking-[0.2em] text-gold">SK</span>
            <span className="text-xs tracking-[0.35em] text-text-primary mt-1">COLLECTION</span>
          </div>
          <p className="text-text-muted text-sm">Premium men's fashion, Sattur.</p>
        </div>

        <div>
          <h4 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-4">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-secondary">
            <li><Link to="/shop?category=Shirts" className="hover:text-gold transition-colors">Shirts</Link></li>
            <li><Link to="/shop?category=T-Shirts" className="hover:text-gold transition-colors">T-Shirts</Link></li>
            <li><Link to="/shop?category=Jeans" className="hover:text-gold transition-colors">Jeans</Link></li>
            <li><Link to="/shop?category=Pants" className="hover:text-gold transition-colors">Pants</Link></li>
            <li><Link to="/shop?filter=newArrival" className="hover:text-gold transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-4">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-secondary">
            <li><a href="/#about" className="hover:text-gold transition-colors">About</a></li>
            <li><a href="/#location" className="hover:text-gold transition-colors">Contact</a></li>
            <li><a href="/#location" className="hover:text-gold transition-colors">Store Location</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-4">Connect</h4>
          <ul className="flex flex-col gap-3 text-sm text-text-secondary">
            <li>
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-gold" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:+${STORE_WHATSAPP_NUMBER}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" /> +91 86081 09013
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/search/?api=1&query=SK+Collection+Sattur"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <MapPin className="w-4 h-4 text-gold" /> Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-text-muted text-xs">
        © 2026 SK COLLECTION. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
