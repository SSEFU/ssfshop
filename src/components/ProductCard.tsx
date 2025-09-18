import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-card group-hover:shadow-card-hover">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                  Featured
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
                  -{discountPercentage}%
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add wishlist functionality here
              }}
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Quick Add Button */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary flex items-center justify-center gap-2 text-sm py-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>

            {/* Stock Indicator */}
            {product.stock < 10 && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-destructive/20 text-destructive px-2 py-1 rounded-md text-xs font-medium">
                  Only {product.stock} left
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
              {product.category}
            </p>

            {/* Name */}
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent fill-current'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-1">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;