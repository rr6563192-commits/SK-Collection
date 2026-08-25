import React, { useMemo } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { buildOrderMessage, buildWhatsAppUrl, generateOrderId } from '../utils/whatsapp';

const DELIVERY_FEE = 0; // arranged directly with the store

const OrderSummary: React.FC = () => {
  const { cart, customerDetails, cartTotal, clearCart } = useShop();
  const orderId = useMemo(() => generateOrderId(), []);

  if (cart.length === 0) return <Navigate to="/cart" replace />;
  if (!customerDetails.fullName) return <Navigate to="/checkout" replace />;

  const total = cartTotal + DELIVERY_FEE;
  const message = buildOrderMessage(cart, customerDetails, total, orderId);
  const whatsappUrl = buildWhatsAppUrl(message);

  const handleConfirm = () => {
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-10 py-14">
        <h1 className="heading-serif text-3xl sm:text-4xl text-text-primary mb-2">Review Your Order</h1>
        <p className="text-text-muted mb-8 text-sm">Order ID: {orderId}</p>

        <div className="flex flex-col gap-3 mb-8">
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex items-center gap-4 bg-bg-card border border-gold/20 p-4"
            >
              <img src={item.image} alt={item.name} className="w-16 h-20 object-cover" />
              <div className="flex-1">
                <p className="text-text-primary font-medium">{item.name}</p>
                <p className="text-text-muted text-xs">
                  {item.color} · Size {item.size} · Qty {item.quantity}
                </p>
              </div>
              <span className="text-gold font-semibold">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="gold-divider mb-6" />

        <div className="mb-8">
          <h2 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-4">Delivery To</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            {customerDetails.fullName} · {customerDetails.mobileNumber}
            <br />
            {customerDetails.houseNumber}, {customerDetails.streetArea}
            <br />
            {customerDetails.city}
            {customerDetails.district ? `, ${customerDetails.district}` : ''}, {customerDetails.state} -{' '}
            {customerDetails.pincode}
            {customerDetails.landmark ? (
              <>
                <br />
                Landmark: {customerDetails.landmark}
              </>
            ) : null}
          </p>
        </div>

        <div className="gold-divider mb-6" />

        <div className="mb-8">
          <h2 className="text-text-primary text-sm tracking-[0.15em] uppercase mb-3">Payment</h2>
          <p className="text-text-secondary text-sm">
            Payment will be arranged directly with SK COLLECTION.
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="text-text-secondary uppercase tracking-wide text-sm">Total</span>
          <span className="font-serif text-3xl text-gold">₹{total}</span>
        </div>

        <button onClick={handleConfirm} className="btn-gold-solid w-full">
          <MessageCircle className="w-4 h-4" /> Confirm & Order via WhatsApp
        </button>
        <p className="text-text-muted text-xs text-center mt-4">
          You'll be redirected to WhatsApp to send your order to SK COLLECTION.
        </p>
        <Link to="/shop" className="block text-center text-text-secondary text-sm mt-6 hover:text-gold">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
