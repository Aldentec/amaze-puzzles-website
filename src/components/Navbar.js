import React, { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cart = []; // Replace with your actual cart hook

  const navLinks = [
    { href: "/", label: "Home", title: "Go to the Home Page" },
    { href: "/about", label: "About Us", title: "Learn more about Amaze Puzzles" },
    { href: "/products", label: "Products", title: "View our Braille puzzles" },
    { href: "/blog", label: "Blog", title: "Read our Blog" },
    { href: "/contact", label: "Contact Us", title: "Get in touch with us" }
  ];

  return (
    <>
      {/* Fixed Modern Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-3 group">
              <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Amaze Puzzles
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              
              {/* Cart Icon */}
              <a
                href="/cart"
                title="View cart"
                className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t border-slate-200`}>
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                title={link.title}
                onClick={() => setIsOpen(false)}
                className="block text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Cart Link */}
            <a
              href="/cart"
              title="View cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cart.length})</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;