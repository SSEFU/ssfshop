import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Truck, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';

const Checkout = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    
    // Payment Information
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const steps = [
    { id: 1, name: 'Shipping', icon: Truck },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Review', icon: Check },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Simulate order processing
      dispatch({ type: 'CLEAR_CART' });
      navigate('/order-success');
    }
  };

  const orderTotal = state.cart.total * 1.08; // Including tax

  if (state.cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-8">
        <div className="container-custom">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">No Items to Checkout</h1>
            <p className="text-muted-foreground mb-8">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
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
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-success border-success text-success-foreground'
                        : isCurrent
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 ml-4 ${isCompleted ? 'bg-success' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Postal Code *</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Country *</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Payment Method</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'credit', name: 'Credit Card', icon: '💳' },
                          { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                          { id: 'apple-pay', name: 'Apple Pay', icon: '🍎' },
                        ].map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                              formData.paymentMethod === method.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:bg-secondary/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="text-primary"
                            />
                            <span className="text-2xl">{method.icon}</span>
                            <span className="font-medium">{method.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.paymentMethod === 'credit' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card border border-border rounded-lg p-6"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Review Your Order
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {state.cart.items.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium">{item.product.name}</h5>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <div className="font-medium">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="p-3 bg-secondary/30 rounded-lg text-sm">
                        <p>{formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state} {formData.postalCode}</p>
                        <p>{formData.country}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h4 className="font-medium mb-2">Payment Method</h4>
                      <div className="p-3 bg-secondary/30 rounded-lg text-sm">
                        <p className="capitalize">{formData.paymentMethod.replace('-', ' ')}</p>
                        {formData.paymentMethod === 'credit' && formData.cardNumber && (
                          <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                  disabled={currentStep === 1}
                >
                  Previous
                </button>
                
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {currentStep === 3 ? 'Place Order' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold">Order Summary</h3>
              
              <div className="space-y-3">
                {state.cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr className="border-border" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>Secure encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Free shipping included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;