import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Form submitted:", formData);

  toast.success("Message sent! We'll reply soon.");

  setFormData({ name: "", email: "", subject: "", message: "" });
};


  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@ssef-shop.com',
      description: 'Send us an email anytime!',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Commerce Street',
      description: 'New York, NY 10001',
    },
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon - Fri: 8am - 5pm',
      description: 'Weekend: 10am - 2pm',
    },
  ];

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy for all products.',
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Free shipping on orders over $100.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs vary by location.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You\'ll receive a tracking number via email once your order ships.',
    },
  ];

  return (
    <div className="min-h-screen pt-8">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className="text-gradient-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:flex lg:gap-0 lg:space-x-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card"
            >
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="Your full name"
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
                      className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </motion.div>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-px bg-border mx-4"></div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Have questions about our products or need assistance? Our friendly support team 
                  is here to help you every step of the way.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      <p className="font-medium text-foreground mb-1">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </motion.div>
                  );
                })}
              </div>

             {/* Google Map Embed */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="rounded-lg overflow-hidden border border-border h-64"
>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.251878856412!2d-73.97219368459361!3d40.76143287932666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f2f7d8d51d%3A0x47612a7cf987bc9f!2sApple%20Store%20Fifth%20Ave!5e0!3m2!1sen!2sus!4v1694715678901!5m2!1sen!2sus"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quick answers to questions you may have. Can't find what you're looking for? 
              Contact our support team.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;