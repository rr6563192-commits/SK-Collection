import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { STORE_WHATSAPP_NUMBER } from '../utils/whatsapp';

const NAV_LINKS = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/shop' },
  { label: 'SHIRTS', to: '/shop?category=Shirts' },
  { label: 'T-SHIRTS', to: '/shop?category=T-Shirts' },
  { label: 'JEANS', to: '/shop?category=Jeans' },
  { label: 'PANTS', to: '/shop?category=Pants' },
  { label: 'NEW ARRIVALS', to: '/shop?filter=newArrival' },
  { label: 'CONTACT', to: '/#location' },
];

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenMobileMenu }) => {
  const { cartCount, wishlist, setCartOpen } = useShop();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname + location.search === to || (to === '/shop' && location.pathname === '/shop');
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-bg-deep border-b border-border transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 h-20">
        {/* Mobile menu button */}
        <button
          aria-label="Open menu"
          className="lg:hidden text-text-primary hover:text-gold transition-colors"
          onClick={onOpenMobileMenu}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center leading-none group">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-gold group-hover:text-gold-bright transition-colors">
            SK
          </span>
          <span className="text-[10px] sm:text-xs tracking-[0.4em] text-text-primary mt-0.5">
            COLLECTION ✨
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-xs tracking-[0.15em] transition-colors duration-200 relative pb-1 ${
                isActive(link.to) ? 'text-gold' : 'text-text-secondary hover:text-gold'
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute left-0 -bottom-[1px] w-full h-[1px] bg-gold" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="text-text-primary hover:text-gold transition-colors"
          >
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative text-text-primary hover:text-gold transition-colors hidden sm:inline-flex"
          >
            <Heart className="w-5 h-5" strokeWidth={1.5} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-bg-deep text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative text-text-primary hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-bg-deep text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp us"
            className="hidden sm:inline-flex text-text-primary hover:text-gold transition-colors"
          >
            <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
