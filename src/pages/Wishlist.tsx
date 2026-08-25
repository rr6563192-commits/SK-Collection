import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const Wishlist: React.FC = () => {
  const { wishlist } = useShop();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <h1 className="heading-serif text-3xl sm:text-4xl text-text-primary mb-2">Your Wishlist</h1>
        <p className="text-text-secondary mb-10">Pieces you've saved for later.</p>

        {items.length === 0 ? (
          <div className="text-center py-20 border border-border">
            <p className="text-text-secondary mb-6">Your wishlist is empty.</p>
            <Link to="/shop" className="btn-gold-outline">
              Shop Collection
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
