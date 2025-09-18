import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

const OrderSuccess = () => {
  const orderNumber = `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div className="min-h-screen pt-8">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-success/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-success">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-lg p-6 mb-8"
          >
            <h3 className="font-semibold mb-4">Order Details</h3>
            <div className="text-left space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <span className="font-medium">3-5 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Method:</span>
                <span className="font-medium">Standard Shipping (Free)</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">Confirmation Email</h4>
              <p className="text-sm text-muted-foreground">Sent to your email address</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-medium mb-1">Order Processing</h4>
              <p className="text-sm text-muted-foreground">Your order is being prepared</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Truck className="w-6 h-6 text-success" />
              </div>
              <h4 className="font-medium mb-1">Fast Shipping</h4>
              <p className="text-sm text-muted-foreground">Free delivery in 3-5 days</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <Link
              to="/shop"
              className="btn-primary inline-block"
            >
              Continue Shopping
            </Link>
            
            <div className="text-sm text-muted-foreground">
              <p>Need help? <Link to="/contact" className="text-primary hover:underline">Contact our support team</Link></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;