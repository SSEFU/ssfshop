import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { state, dispatch } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    
    if (search.trim()) {
      dispatch({ type: 'SET_FILTERS', payload: { ...state.filters, search: search.trim() } });
      
      // Navigate to shop page if not already there
      if (location.pathname !== '/shop') {
        navigate('/shop');
      }
    }
    
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SSF</span>
            </div>
            <span className="text-xl font-bold text-gradient-primary">SHOP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="User menu"
              >
                <User className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
                  >
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center space-x-2">
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors flex items-center space-x-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </button>
                      <div className="border-t border-border my-1"></div>
                      <button className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors">
                        My Orders
                      </button>
                      <button className="w-full px-4 py-2 text-left hover:bg-secondary transition-colors">
                        Profile Settings
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {state.cart.itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                >
                  {state.cart.itemCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border"
            >
              <form onSubmit={handleSearch} className="py-4">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search products..."
                    defaultValue={state.filters.search || ''}
                     className="w-full max-w-md bg-secondary/50 backdrop-blur-sm rounded-xl pl-12 pr-16 py-4 
             text-foreground placeholder:text-muted-foreground focus:outline-none 
             focus:ring-2 focus:ring-primary/50 focus:bg-secondary transition-all duration-200 shadow-sm mx-auto block"
  autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Search
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <nav className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-3 px-4 rounded-lg font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;