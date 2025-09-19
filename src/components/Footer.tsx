import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/shop' },
        { name: 'Electronics', href: '/shop?category=Electronics' },
        { name: 'Clothing', href: '/shop?category=Clothing' },
        { name: 'Accessories', href: '/shop?category=Accessories' },
        { name: 'Home', href: '/shop?category=Home' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Size Guide', href: '/size-guide' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Sustainability', href: '/sustainability' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
  ];

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SSF</span>
              </div>
              <span className="text-xl font-bold text-gradient-primary">SHOP</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover premium products with exceptional quality and modern design. 
              We're committed to delivering the best shopping experience.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <span>hello@ssf-shop.com</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-3 text-primary" />
                <span>123 Commerce St, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="p-2 rounded-lg bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
  {/* Left */}
  <p className="text-muted-foreground text-sm">
    © {currentYear} SSF SHOP. All rights reserved.
  </p>

  {/* Center */}
   
 <p className="text-muted-foreground text-sm my-4 md:my-0">
  made by{" "}
  <a
    href="https://ssefdev.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent transition-all duration-300 hover:brightness-125 hover:underline"
  >
    SSEFDEV
  </a>
</p>


  {/* Right */}
  <div className="flex space-x-6">
    <Link
      to="/privacy"
      className="text-muted-foreground hover:text-primary text-sm transition-colors"
    >
      Privacy Policy
    </Link>
    <Link
      to="/terms"
      className="text-muted-foreground hover:text-primary text-sm transition-colors"
    >
      Terms of Service
    </Link>
    <Link
      to="/cookies"
      className="text-muted-foreground hover:text-primary text-sm transition-colors"
    >
      Cookie Policy
    </Link>
  </div>
</div>

      </div>
    </footer>
  );
};

export default Footer;
