import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onChange, max = 10 }) => {
  return (
    <div className="inline-flex items-center border border-gold" role="group" aria-label="Quantity">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold hover:text-bg-deep transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-10 text-center text-text-primary text-sm font-medium">{quantity}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="w-10 h-10 flex items-center justify-center text-gold hover:bg-gold hover:text-bg-deep transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;
