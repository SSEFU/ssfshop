import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  maxItems?: number;
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  title,
  subtitle,
  maxItems,
  className = '',
}) => {
  const displayProducts = maxItems ? products.slice(0, maxItems) : products;

  if (products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse our featured products.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {displayProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* Loading skeleton for future use */}
      {false && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-secondary aspect-square rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4"></div>
                <div className="h-4 bg-secondary rounded w-1/2"></div>
                <div className="h-4 bg-secondary rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;