import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
  error?: boolean;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selected, onSelect, error }) => {
  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-text-secondary uppercase mb-3">Select Size</p>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select size">
        {sizes.map((size) => {
          const isSelected = selected === size;
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(size)}
              className={`min-w-[3rem] px-3 py-2.5 text-sm border transition-all duration-200 ${
                isSelected
                  ? 'bg-gold text-bg-deep border-gold font-medium'
                  : 'bg-transparent text-text-primary border-border hover:border-gold'
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-gold-bright text-xs mt-2" role="alert">
          Please select a size.
        </p>
      )}
    </div>
  );
};

export default SizeSelector;
