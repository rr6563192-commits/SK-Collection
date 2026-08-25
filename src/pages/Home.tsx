import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import CategorySection from '../components/CategorySection';
import ProductGrid from '../components/ProductGrid';
import AboutSection from '../components/AboutSection';
import ReviewsSection from '../components/ReviewsSection';
import LocationSection from '../components/LocationSection';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div>
      <Hero />
      <TrustBar />
      <CategorySection />

      <section className="bg-bg-deep py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow mb-3">Featured</p>
              <h2 className="heading-serif text-3xl sm:text-5xl text-text-primary">Trending This Season</h2>
            </div>
            <Link to="/shop" className="btn-gold-outline">
              View All
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <div id="about">
        <AboutSection />
      </div>
      <ReviewsSection />
      <LocationSection />
    </div>
  );
};

export default Home;
