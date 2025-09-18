import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import ProductGrid from '@/components/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = state.products.find(p => p.id === id);
  const relatedProducts = state.products
    .filter(p => p.id !== id && p.category === product?.category)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/shop')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $100' },
    { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
    { icon: RotateCcw, title: 'Easy Returns', description: '30-day return policy' },
  ];

  return (
    <div className="min-h-screen pt-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
          <div className="text-sm text-muted-foreground">
            <span>Shop</span>
            <span className="mx-2">/</span>
            <span>{product.category}</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground uppercase tracking-wide">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-accent fill-current'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
                    Save {discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-success' : 'bg-destructive'}`}></div>
              <span className="text-sm">
                {product.stock > 0 ? (
                  product.stock < 10 ? (
                    `Only ${product.stock} left in stock`
                  ) : (
                    'In Stock'
                  )
                ) : (
                  'Out of Stock'
                )}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 hover:bg-secondary transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <ProductGrid
              products={relatedProducts}
              title="Related Products"
              subtitle="You might also like these products"
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;