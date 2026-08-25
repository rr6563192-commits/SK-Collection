import React from 'react';

const COLOR_SWATCH: Record<string, string> = {
  Black: '#111111',
  White: '#F5F5F5',
  Blue: '#2E4A7A',
  Maroon: '#5C1F2A',
};

interface ColorSelectorProps {
  colors: string[];
  selected: string;
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selected, onSelect }) => {
  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-text-secondary uppercase mb-3">Select Color</p>
      <div className="flex gap-3" role="radiogroup" aria-label="Select color">
        {colors.map((color) => {
          const isSelected = selected === color;
          return (
            <button
              key={color}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(color)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                isSelected ? 'border-gold shadow-gold' : 'border-border'
              }`}
              title={color}
            >
              <span
                className="w-7 h-7 rounded-full"
                style={{ backgroundColor: COLOR_SWATCH[color] ?? '#333' }}
              />
            </button>
          );
        })}
      </div>
      <p className="text-xs text-text-muted mt-2">{selected}</p>
    </div>
  );
};

export default ColorSelector;
