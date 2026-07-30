import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">Quick Bite</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Smart canteen food ordering with zero waiting. Fresh food, fast pickup, and a seamless experience.
            </p>
            <div className="flex gap-3">
              {['📸', '🐦', '📘'].map((emoji, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors duration-200 text-base">
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Menu', 'Book a Table', 'Track Order', 'My Orders', 'Profile'].map(l => (
                <li key={l}><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Features', 'Privacy Policy', 'Terms of Service', 'FAQ'].map(l => (
                <li key={l}><a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                Canteen Block, Main Campus, College Road
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                hello@quickbite.cafe
              </li>
            </ul>
            {/* Newsletter */}
            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2">Get daily specials in your inbox</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500"
                />
                <button className="px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl text-sm font-medium hover:shadow-glow transition-all">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2024 Quick Bite. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for college students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
