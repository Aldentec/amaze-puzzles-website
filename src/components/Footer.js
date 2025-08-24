import React from 'react';
import { Facebook, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact Us" }
  ];

  const resources = [
    { name: "Braille Institute", url: "https://www.brailleinstitute.org/" },
    { name: "American Foundation for the Blind", url: "https://www.afb.org/" },
    { name: "National Braille Press", url: "https://www.nationalbraillepress.org/" },
    { name: "Hadley Institute", url: "https://www.hadley.edu/" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">Amaze Puzzles</span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Amaze Puzzles™ offers engaging and educational puzzles designed to enhance Braille literacy for all ages. 
              Our puzzles make learning Braille fun and accessible, supporting both beginners and those looking to improve their skills.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-slate-300 hover:text-white hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-6 text-white">Helpful Resources</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-200 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {resource.name}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 Amaze Puzzles™. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => alert('Privacy Policy modal would open here')}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => alert('Terms of Service modal would open here')}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;