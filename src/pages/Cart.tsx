import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Cart = () => {
  const { state, dispatch } = useApp();

  const updateQuantity = (productId: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_CART_QUANTITY',
      payload: { id: productId, quantity: newQuantity },
    });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (state.cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Start shopping to add items to your cart
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground mt-2">
            {state.cart.itemCount} {state.cart.itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.items.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.product.id}`}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-lg bg-secondary"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-semibold hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                          className="p-2 hover:bg-secondary transition-colors disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({state.cart.itemCount} items)</span>
                  <span>${state.cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-success">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(state.cart.total * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(state.cart.total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full btn-primary block text-center"
              >
                Proceed to Checkout
              </Link>

              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>🔒 Secure checkout guaranteed</p>
                <p>📦 Free shipping on orders over $100</p>
                <p>↩️ 30-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;