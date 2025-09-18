import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Product, Cart, CartItem, FilterOptions } from '@/types';
import { products } from '@/data/products';

interface AppState {
  products: Product[];
  filteredProducts: Product[];
  cart: Cart;
  filters: FilterOptions;
  isLoading: boolean;
}

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_FILTERED_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_FILTERS'; payload: FilterOptions }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AppState = {
  products: [],
  filteredProducts: [],
  cart: {
    items: [],
    total: 0,
    itemCount: 0,
  },
  filters: {},
  isLoading: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload,
      };

    case 'SET_FILTERED_PRODUCTS':
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case 'ADD_TO_CART': {
      const existingItem = state.cart.items.find(
        item => item.product.id === action.payload.id
      );

      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.cart.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.cart.items, { product: action.payload, quantity: 1 }];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(
        item => item.product.id !== action.payload
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case 'UPDATE_CART_QUANTITY': {
      const newItems = state.cart.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: { items: newItems, total, itemCount },
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: { items: [], total: 0, itemCount: 0 },
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize products on mount
  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }, []);

  // Apply filters whenever filters or products change
  useEffect(() => {
    let filtered = [...state.products];

    // Category filter
    if (state.filters.category && state.filters.category !== 'All') {
      filtered = filtered.filter(product => 
        product.category === state.filters.category
      );
    }

    // Search filter
    if (state.filters.search) {
      const searchTerm = state.filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Price filter
    if (state.filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.price >= state.filters.minPrice!);
    }
    if (state.filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.price <= state.filters.maxPrice!);
    }

    // Sort
    if (state.filters.sortBy) {
      switch (state.filters.sortBy) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Keep original order for newest
          break;
      }
    }

    dispatch({ type: 'SET_FILTERED_PRODUCTS', payload: filtered });
  }, [state.filters, state.products]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}