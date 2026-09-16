import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product, WilayaTarif, CartItems } from '../types';

interface AppContextType {
  willayas: WilayaTarif[];
  wishlist: Product[];
  CartItems: CartItems[];
  userId: string | undefined;
  wishlistCount: number;
  cartItemCount: number;
  refreshWishlist: () => void;
  refreshCartItem: () => void;
  refreshCart:number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Thin wrapper - no state logic here, just passes value down
export function AppProvider({
  value,
  children,
}: {
  value: AppContextType;
  children: ReactNode;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}