import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/products';

const CATEGORY_IMAGES: Record<string, string> = {
  Shirts: 'https://picsum.photos/seed/cat-shirts/700/900',
  'T-Shirts': 'https://picsum.photos/seed/cat-tshirts/700/900',
  Jeans: 'https://picsum.photos/seed/cat-jeans/700/900',
  Pants: 'https://picsum.photos/seed/cat-pants/700/900',
  'Casual Wear': 'https://picsum.photos/seed/cat-casual/700/900',
  'Formal Wear': 'https://picsum.photos/seed/cat-formal/700/900',
};

const CategorySection: React.FC = () => {
  return (
    <section className="bg-bg-deep py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-3">The Collection</p>
          <h2 className="heading-serif text-3xl sm:text-5xl text-text-primary">Find Your Signature Style</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.name}
              label={cat.label}
              image={CATEGORY_IMAGES[cat.name]}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
