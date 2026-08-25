import React from 'react';
import { Star } from 'lucide-react';
import { sampleReviews, aggregateRating } from '../data/reviews';

const ReviewsSection: React.FC = () => {
  return (
    <section className="bg-bg-deep py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-4">
          <p className="eyebrow mb-3">Reviews</p>
          <h2 className="heading-serif text-3xl sm:text-5xl text-text-primary mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-text-primary text-sm">{aggregateRating.score} / 5</span>
            <span className="text-text-muted text-sm">· {aggregateRating.count} Google Reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {sampleReviews.map((review) => (
            <div key={review.id} className="card-surface p-6">
              <div className="flex text-gold mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{review.text}</p>
              <p className="text-text-primary text-sm font-medium">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
