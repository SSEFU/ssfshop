import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';
import sara from '@/assets/sara-ceo.jpg';
import michael from '@/assets/Michael.jpg';
import emily from '@/assets/emily.jpg';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional experiences.',
    },
    {
      icon: Target,
      title: 'Quality Focus',
      description: 'Every product is carefully selected and tested to meet our high standards of excellence.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We continuously seek innovative solutions to enhance your shopping experience.',
    },
    {
      icon: Heart,
      title: 'Sustainability',
      description: 'Committed to responsible practices that protect our planet for future generations.',
    },
  ];

  const stats = [
    { number: '2019', label: 'Founded' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                About <span className="text-gradient-primary">SSF SHOP</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're passionate about bringing you premium products that enhance your lifestyle. 
                Since 2019, we've been committed to quality, innovation, and exceptional customer service.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to make premium shopping accessible to everyone, while maintaining 
                the highest standards of product quality and customer satisfaction.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038="
                alt="ShopFlow Team"
                className="w-full h-auto rounded-2xl shadow-card-hover"
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and help us deliver exceptional experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
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
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl opacity-90 leading-relaxed mb-8">
              To democratize access to premium products while maintaining uncompromising 
              quality standards. We believe everyone deserves exceptional products that 
              enhance their daily lives, delivered with outstanding service and care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/shop"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="border border-primary-foreground/30 hover:bg-primary-foreground/10 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind ShopFlow, dedicated to bringing you the best products and service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'CEO & Founder', image: sara },
              { name: 'Michael Chen', role: 'Head of Products', image: michael },
              { name: 'Emily Davis', role: 'Customer Success', image: emily },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden bg-secondary">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;