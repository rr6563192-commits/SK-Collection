import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { products } from '../data/products';
import ColorSelector from '../components/ColorSelector';
import SizeSelector from '../components/SizeSelector';
import QuantitySelector from '../components/QuantitySelector';
import { useShop } from '../context/ShopContext';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';
import { aggregateRating } from '../data/reviews';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isWishlisted } = useShop();

  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const handleAddToCart = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color,
      size,
      quantity,
    });
  };

  const whatsappMessage = `Hi SK COLLECTION, I'm interested in the ${product.name} (Color: ${color}${
    size ? `, Size: ${size}` : ''
  }). Is it available?`;

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 sm:py-16">
        <nav className="text-xs text-text-muted mb-8 tracking-wide">
          <Link to="/" className="hover:text-gold">Home</Link> /{' '}
          <Link to="/shop" className="hover:text-gold">Shop</Link> /{' '}
          <span className="text-text-secondary">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="aspect-[3/4] bg-bg-card border border-border overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 border overflow-hidden transition-colors ${
                    activeImage === i ? 'border-gold' : 'border-border'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="eyebrow mb-2">{product.category}</p>
            <div className="flex items-start justify-between gap-4">
              <h1 className="heading-serif text-3xl sm:text-4xl text-text-primary mb-3">{product.name}</h1>
              <button
                aria-label="Toggle wishlist"
                onClick={() => toggleWishlist(product.id)}
                className="flex-shrink-0 mt-2"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isWishlisted(product.id) ? 'fill-gold text-gold' : 'text-text-secondary hover:text-gold'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-text-primary text-sm">{aggregateRating.score}</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-gold font-serif text-3xl">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-text-muted line-through text-lg">₹{product.originalPrice}</span>
                  <span className="bg-gold text-bg-deep text-xs font-semibold px-2 py-1">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>

            <div className="gold-divider mb-6" />

            <div className="flex flex-col gap-6 mb-8">
              <ColorSelector colors={product.colors} selected={color} onSelect={setColor} />
              <SizeSelector
                sizes={product.sizes}
                selected={size}
                onSelect={(s) => {
                  setSize(s);
                  setSizeError(false);
                }}
                error={sizeError}
              />
              <div>
                <p className="text-xs tracking-[0.15em] text-text-secondary uppercase mb-3">Quantity</p>
                <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={handleAddToCart} className="btn-gold-solid flex-1">
                Add to Cart
              </button>
              <a
                href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold-outline flex-1"
              >
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp
              </a>
            </div>

            <div className="gold-divider my-8" />

            <div>
              <h3 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-4">Specifications</h3>
              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt className="text-text-muted">{key}</dt>
                    <dd className="text-text-secondary">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
