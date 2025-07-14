// src/components/Footer.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// ✅ Removed 'Insect', added 'WaspIcon'
import { Sparkles, Heart, Mail, Phone, MapPin } from 'lucide-react';
import WaspIcon from './WaspIcon'; // ✅ Import your WaspIcon component

const Footer = () => {
  const footerLinks = {
    Resources: ['Help Center', 'Learning Tips', 'Parent Guide', 'Safety'],
    Team: ['About Us', 'Careers', 'Partners', 'Blog'],
    Press: ['News', 'Media Kit', 'Testimonials', 'Research'],
    'Join Us': ['Subscribe', 'Newsletter', 'Community', 'Events'],
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 mt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <NavLink to="/" className="flex items-center space-x-2 mb-4">
              {/* ✅ Replaced Insect with WaspIcon */}
              <WaspIcon
                size={48} // Adjusted size for footer, feel free to change
                className="text-yellow-500" // Golden color from Tailwind CSS
              />
              <span className="text-2xl font-bold text-foreground">WhizBee</span>
            </NavLink>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Empowering young minds through engaging playful microlearning experiences.
              Making learning fun, interactive, and accessible for children everywhere.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-whiz-pink fill-current" />
              <span>for curious minds(By Anamitra Roy)</span>
            </div>
          </div>

          {/* Footer Links (rest of the content is unchanged) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">FAQs</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Support</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Get Involved</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Volunteer</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Donate</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Partner</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Join Us</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Our Story</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Team</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-whiz-orange transition-colors duration-300">Press</a></li>
              </ul>
            </div>

            <div className="flex justify-center lg:justify-start">
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 neuro-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-whiz-blue/20">
              <Mail className="w-5 h-5 text-whiz-blue" />
            </div>
            <div>
              <p className="font-medium">Email Us</p>
              <p className="text-sm text-muted-foreground">anamitraroy2206@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-whiz-green/20">
              <Phone className="w-5 h-5 text-whiz-green" />
            </div>
            <div>
              <p className="font-medium">Call Us</p>
              <p className="text-sm text-muted-foreground">+91 9674854571</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-whiz-purple/20">
              <MapPin className="w-5 h-5 text-whiz-purple" />
            </div>
            <div>
              <p className="font-medium">Visit Us</p>
              <p className="text-sm text-muted-foreground">https://www.linkedin.com/in/anamitra-roy-6937a42a5/</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WhizBee(A project by Anamitra Roy), Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;