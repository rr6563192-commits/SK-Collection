import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { products } from '../data/products';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  return (
    <div
      className={`fixed inset-0 z-[60] bg-bg-deep transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <div className="max-w-2xl mx-auto px-6 pt-24 sm:pt-32">
        <div className="flex items-center justify-between mb-8">
          <span className="eyebrow">Search</span>
          <button aria-label="Close search" onClick={onClose} className="text-text-primary hover:text-gold">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-gold pb-4">
          <Search className="w-5 h-5 text-gold flex-shrink-0" />
          <input
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shirts, jeans, t-shirts..."
            className="w-full bg-transparent text-text-primary text-lg sm:text-2xl font-serif placeholder-text-muted outline-none"
          />
        </div>

        <div className="mt-8 flex flex-col divide-y divide-border">
          {results.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              onClick={onClose}
              className="flex items-center gap-4 py-4 group"
            >
              <img src={p.images[0]} alt={p.name} className="w-14 h-16 object-cover" />
              <div className="flex-1">
                <p className="text-text-primary group-hover:text-gold transition-colors">{p.name}</p>
                <p className="text-text-muted text-xs uppercase tracking-wide">{p.category}</p>
              </div>
              <span className="text-gold font-medium">₹{p.price}</span>
            </Link>
          ))}
          {query.trim() && results.length === 0 && (
            <p className="text-text-secondary py-6">No products match "{query}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
