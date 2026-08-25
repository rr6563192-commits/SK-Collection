import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import QuantitySelector from './QuantitySelector';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } = useShop();

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isCartOpen}
    >
      <div className="absolute inset-0 bg-black/70" onClick={() => setCartOpen(false)} />
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-bg-cart border-l border-border
          flex flex-col transition-transform duration-300 ease-out ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-border">
          <h2 className="font-serif text-xl text-text-primary tracking-wide">Your Cart</h2>
          <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="text-text-primary hover:text-gold">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-16">
              <p className="text-text-secondary">Your cart is empty.</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-gold-outline">
                Shop Collection
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.productId}-${item.color}-${item.size}`}
                className="flex gap-4 bg-bg-card border border-border p-3"
              >
                <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0" />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm text-text-primary font-medium line-clamp-1">{item.name}</h3>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.productId, item.color, item.size)}
                      className="text-text-muted hover:text-gold flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-text-muted mt-1">
                    {item.color} · Size {item.size}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <QuantitySelector
                      quantity={item.quantity}
                      onChange={(q) => updateQuantity(item.productId, item.color, item.size, q)}
                    />
                    <span className="text-gold font-semibold text-sm">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border px-5 py-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-text-secondary text-sm uppercase tracking-wide">Subtotal</span>
              <span className="font-serif text-2xl text-gold">₹{cartTotal}</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="btn-gold-solid w-full"
            >
              Proceed to Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
