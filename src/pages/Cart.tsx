import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import QuantitySelector from '../components/QuantitySelector';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-bg-deep min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="heading-serif text-3xl text-text-primary mb-3">Your Cart is Empty</h1>
        <p className="text-text-secondary mb-8">Explore the collection and find something you'll love.</p>
        <Link to="/shop" className="btn-gold-solid">
          Shop Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-10 py-14">
        <h1 className="heading-serif text-3xl sm:text-4xl text-text-primary mb-10">Your Cart</h1>

        <div className="flex flex-col gap-4 mb-10">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex flex-col sm:flex-row gap-4 bg-bg-card border border-border p-4"
            >
              <img src={item.image} alt={item.name} className="w-full sm:w-24 h-40 sm:h-28 object-cover" />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-text-primary font-medium mb-1">{item.name}</h3>
                  <p className="text-text-muted text-sm">
                    {item.color} · Size {item.size}
                  </p>
                  <p className="text-gold font-medium mt-1 sm:hidden">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-6">
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(q) => updateQuantity(item.productId, item.color, item.size, q)}
                  />
                  <span className="hidden sm:inline text-gold font-semibold w-20 text-right">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item.productId, item.color, item.size)}
                    className="text-text-muted hover:text-gold"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col items-end gap-4">
          <div className="flex items-center gap-3">
            <span className="text-text-secondary uppercase tracking-wide text-sm">Grand Total</span>
            <span className="font-serif text-3xl text-gold">₹{cartTotal}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-gold-solid w-full sm:w-auto">
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
