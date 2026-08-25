import React from 'react';
import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const ADDRESS = '64/2, Bypass Rd, near Nellai Bus Stop, Junction, Sattur, Tamil Nadu 626203';

const LocationSection: React.FC = () => {
  return (
    <section id="location" className="bg-bg-secondary py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="eyebrow mb-3">Visit Us</p>
          <h2 className="heading-serif text-3xl sm:text-5xl text-text-primary mb-6">Visit SK Collection</h2>
          <p className="text-text-secondary leading-relaxed mb-8 max-w-md">{ADDRESS}</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-solid"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </a>
            <a href={`tel:+${STORE_WHATSAPP_NUMBER}`} className="btn-gold-outline">
              <Phone className="w-4 h-4" /> Call Now
            </a>
            <a
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold-outline"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>

        <div className="relative aspect-video lg:aspect-[4/3] bg-bg-card border border-border overflow-hidden">
          <iframe
            title="SK Collection location map"
            className="w-full h-full grayscale contrast-125 opacity-80"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
