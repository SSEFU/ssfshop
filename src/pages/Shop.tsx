import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/products';

const Shop = () => {
  const { state, dispatch } = useApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(state.filters);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' },
  ];

  useEffect(() => {
    setLocalFilters(state.filters);
  }, [state.filters]);

  const handleFilterChange = (newFilters: typeof localFilters) => {
    setLocalFilters(newFilters);
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const clearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    dispatch({ type: 'SET_FILTERS', payload: emptyFilters });
  };

  const hasActiveFilters = Object.keys(state.filters).some(key => 
    state.filters[key as keyof typeof state.filters] !== undefined && 
    state.filters[key as keyof typeof state.filters] !== ''
  );

  return (
    <div className="min-h-screen pt-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop</h1>
          <p className="text-xl text-muted-foreground">
            Discover our complete collection of premium products
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors w-full justify-center"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {hasActiveFilters && '(Active)'}
              </button>
            </div>

            {/* Filter Panel */}
            <motion.div
              initial={false}
              animate={{
                height: isFilterOpen || window.innerWidth >= 1024 ? 'auto' : 0,
                opacity: isFilterOpen || window.innerWidth >= 1024 ? 1 : 0,
              }}
              className="overflow-hidden lg:overflow-visible"
            >
              <div className="bg-card rounded-lg p-6 border border-border space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={localFilters.search || ''}
                      onChange={(e) =>
                        handleFilterChange({ ...localFilters, search: e.target.value })
                      }
                      className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-3">Category</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={localFilters.category === category || (!localFilters.category && category === 'All')}
                          onChange={(e) =>
                            handleFilterChange({
                              ...localFilters,
                              category: e.target.value === 'All' ? undefined : e.target.value,
                            })
                          }
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-3">Price Range</label>
                  <div className="space-y-3">
                    <div>
                      <input
                        type="number"
                        placeholder="Min price"
                        value={localFilters.minPrice || ''}
                        onChange={(e) =>
                          handleFilterChange({
                            ...localFilters,
                            minPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                          })
                        }
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max price"
                        value={localFilters.maxPrice || ''}
                        onChange={(e) =>
                          handleFilterChange({
                            ...localFilters,
                            maxPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                          })
                        }
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-3">Sort By</label>
                  <select
                    value={localFilters.sortBy || 'newest'}
                    onChange={(e) =>
                      handleFilterChange({
                        ...localFilters,
                        sortBy: e.target.value as any,
                      })
                    }
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear All Filters
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {state.filteredProducts.length} products
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">
                    Filtered
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={state.filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;