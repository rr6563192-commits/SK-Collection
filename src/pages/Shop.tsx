import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { ProductCategory } from '../types';

type FilterKey = 'all' | 'newArrival' | 'trending' | 'featured';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const filterParam = (searchParams.get('filter') as FilterKey | null) ?? 'all';

  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const setCategory = (cat: ProductCategory | null) => {
    const next = new URLSearchParams(searchParams);
    if (cat) next.set('category', cat);
    else next.delete('category');
    setSearchParams(next);
  };

  const setFilter = (filter: FilterKey) => {
    const next = new URLSearchParams(searchParams);
    if (filter === 'all') next.delete('filter');
    else next.set('filter', filter);
    setSearchParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (categoryParam) list = list.filter((p) => p.category === categoryParam);
    if (filterParam === 'newArrival') list = list.filter((p) => p.newArrival);
    if (filterParam === 'trending') list = list.filter((p) => p.trending);
    if (filterParam === 'featured') list = list.filter((p) => p.featured);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);

    return list;
  }, [categoryParam, filterParam, sort]);

  return (
    <div className="bg-bg-deep min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-14 pb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="heading-serif text-4xl sm:text-6xl text-text-primary mb-3">The Collection</h1>
          <p className="eyebrow">Curated For Your Style</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 border-y border-border py-5">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 text-xs tracking-wide uppercase border transition-colors ${
                !categoryParam ? 'bg-gold text-bg-deep border-gold' : 'border-border text-text-secondary hover:border-gold'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`px-4 py-2 text-xs tracking-wide uppercase border transition-colors ${
                  categoryParam === cat.name
                    ? 'bg-gold text-bg-deep border-gold'
                    : 'border-border text-text-secondary hover:border-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterParam}
              onChange={(e) => setFilter(e.target.value as FilterKey)}
              className="bg-bg-input border border-border-input text-text-primary text-xs uppercase tracking-wide px-3 py-2 outline-none focus:border-gold"
            >
              <option value="all">All Products</option>
              <option value="newArrival">New Arrivals</option>
              <option value="trending">Trending</option>
              <option value="featured">Featured</option>
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="bg-bg-input border border-border-input text-text-primary text-xs uppercase tracking-wide px-3 py-2 outline-none focus:border-gold"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <ProductGrid products={filtered} emptyMessage="No products match these filters." />
      </div>
    </div>
  );
};

export default Shop;
