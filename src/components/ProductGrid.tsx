import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, emptyMessage }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-24 border border-border">
        <p className="text-text-secondary">{emptyMessage ?? 'No products found.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="opacity-0 animate-fadeUp"
          style={{ animationDelay: `${Math.min(i, 8) * 0.06}s` }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
