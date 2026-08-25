import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-end overflow-hidden bg-bg-deep">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/seed/sk-hero-main/1920/1200"
          alt="Man in premium tailored clothing"
          className="w-full h-full object-cover object-center scale-105 animate-[heroZoom_18s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-bg-deep/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/80 via-transparent to-transparent" />
        {/* subtle gold glow */}
        <div className="absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-10 pb-16 sm:pb-24">
        <p className="eyebrow mb-4 opacity-0 animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          SATTUR
        </p>
        <h1
          className="heading-serif text-5xl sm:text-7xl lg:text-8xl leading-[0.95] text-text-primary opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.3s' }}
        >
          
          SK
          <br />
          <span className="text-gold">COLLECTION</span>
        </h1>

        <div className="w-24 h-[1px] bg-gold opacity-0 animate-fadeUp my-6" style={{ animationDelay: '0.55s' }} />

        <p
          className="text-text-secondary text-base sm:text-lg max-w-md opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.7s' }}
        >
          Premium men's fashion. Timeless style. Effortless confidence.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 mt-9 opacity-0 animate-fadeUp"
          style={{ animationDelay: '0.9s' }}
        >
          <Link to="/shop" className="btn-gold-outline">
            Shop Collection <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hi SK COLLECTION, I would like to know more about your latest arrivals.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold-solid"
          >
            <MessageCircle className="w-4 h-4" /> Order via WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
