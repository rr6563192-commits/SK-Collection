import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  label: string;
  image: string;
  to: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ label, image, to }) => {
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden bg-bg-card border border-border hover:border-gold
        transition-all duration-300 hover:-translate-y-1 aspect-[3/4]"
    >
      <img
        src={image}
        alt={label}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">SK Collection</p>
          <h3 className="text-text-primary font-serif text-xl tracking-wide">{label}</h3>
        </div>
        <ArrowUpRight className="w-5 h-5 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
};

export default CategoryCard;
