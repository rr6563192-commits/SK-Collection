import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CustomerDetails } from '../types';
import { useToast } from './ToastContext';

const CART_KEY = 'sk_collection_cart';
const WISHLIST_KEY = 'sk_collection_wishlist';

const EMPTY_CUSTOMER: CustomerDetails = {
  fullName: '',
  mobileNumber: '',
  alternateNumber: '',
  houseNumber: '',
  streetArea: '',
  city: '',
  district: '',
  state: '',
  pincode: '',
  landmark: '',
  deliveryNotes: '',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

interface ShopContextValue {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  removeFromCart: (productId: string, color: string, size: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  customerDetails: CustomerDetails;
  setCustomerDetails: (details: CustomerDetails) => void;
}

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage(CART_KEY, [] as CartItem[]));
  const [wishlist, setWishlist] = useState<string[]>(() => loadFromStorage(WISHLIST_KEY, [] as string[]));
  const [isCartOpen, setCartOpen] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(EMPTY_CUSTOMER);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable — cart still works for this session */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
    showToast('Added to cart');
  };

  const updateQuantity = (productId: string, color: string, size: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.color === color && i.size === size
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: string, color: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.color === color && i.size === size)));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isIn = prev.includes(productId);
      showToast(isIn ? 'Removed from wishlist' : 'Added to wishlist');
      return isIn ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartTotal,
        customerDetails,
        setCustomerDetails,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
}
