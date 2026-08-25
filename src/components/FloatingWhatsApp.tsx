import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a
      href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
        'Hi SK COLLECTION, I have a question about your products.'
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SK COLLECTION on WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-gold text-bg-deep
        rounded-full shadow-goldSm animate-pulseGold
        sm:w-14 sm:h-14 sm:justify-center sm:px-0
        px-5 py-3.5"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-xs font-semibold tracking-wide sm:hidden">CHAT WITH US</span>
    </a>
  );
};

export default FloatingWhatsApp;
