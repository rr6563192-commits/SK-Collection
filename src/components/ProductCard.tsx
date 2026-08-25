import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isWishlisted } = useShop();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group card-surface">
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-elevated">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-gold text-bg-deep text-[11px] font-semibold px-2.5 py-1 tracking-wide">
            {product.discount}% OFF
          </span>
        )}

        <button
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-gold text-gold' : 'text-white'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <p className="text-[11px] tracking-[0.15em] text-text-muted uppercase mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-text-primary text-sm sm:text-base font-medium mb-2 hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-gold font-semibold text-base">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-text-muted text-sm line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
