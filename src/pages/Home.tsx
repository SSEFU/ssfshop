import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { useApp } from '@/context/AppContext';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const { state } = useApp();
  const featuredProducts = state.products.filter(product => product.featured);

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure and encrypted payments',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
    },
    {
      icon: ShoppingBag,
      title: 'Easy Returns',
      description: '30-day hassle-free returns',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-10"></div>
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="hero-title"
                >
                  Discover Premium
                  <span className="text-gradient-primary block">Products</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-xl text-muted-foreground mt-6 max-w-lg"
                >
                  Experience exceptional quality and modern design with our carefully curated 
                  collection of premium products for your lifestyle.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/shop" className="btn-primary flex items-center justify-center gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-lg border border-border hover:bg-secondary transition-colors font-medium text-center"
                >
                  Learn More
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="Premium Products"
                  className="w-full h-auto rounded-2xl shadow-card-hover"
                />
                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  New Arrivals
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  Free Shipping
                </motion.div>
              </div>
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-primary opacity-20 rounded-2xl blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <ProductGrid
            products={featuredProducts}
            title="Featured Products"
            subtitle="Discover our most popular and highly-rated products"
            maxItems={8}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/shop" className="btn-accent inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied customers and discover premium products 
              that enhance your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Products
              </Link>
              <Link
                to="/contact"
                className="border border-primary-foreground/30 hover:bg-primary-foreground/10 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;