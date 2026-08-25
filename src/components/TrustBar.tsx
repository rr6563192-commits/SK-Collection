import React from 'react';
import { Star, Gem, TrendingUp, MessageCircle } from 'lucide-react';
import { aggregateRating } from '../data/reviews';

const ITEMS = [
  { icon: Gem, label: 'Quality Collections' },
  { icon: TrendingUp, label: 'Trending Styles' },
  { icon: MessageCircle, label: 'Easy WhatsApp Ordering' },
];

const TrustBar: React.FC = () => {
  return (
    <section className="bg-bg-secondary border-y border-border py-6">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-text-primary text-sm font-medium">{aggregateRating.score} / 5</span>
          <span className="text-text-muted text-sm">· {aggregateRating.count}+ Google Reviews</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {ITEMS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-text-primary text-xs sm:text-sm tracking-wide">
              <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              {label.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
