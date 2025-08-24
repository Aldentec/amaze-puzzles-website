import React, { useState } from 'react';
import './modern-styles.css'; // Import the CSS file
import { 
  Menu, 
  X, 
  ShoppingCart, 
  ArrowRight, 
  Play, 
  Eye, 
  Heart, 
  Users, 
  Zap, 
  Award, 
  Shield,
  ZoomIn,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  ExternalLink
} from 'lucide-react';

const HomePage = () => {
  // Navbar state
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Gallery state
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Newsletter state
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState('');

  const cart = []; // Replace with your actual cart

  // Navigation links
  const navLinks = [
    { href: "/", label: "Home", title: "Go to the Home Page" },
    { href: "/about", label: "About Us", title: "Learn more about Amaze Puzzles" },
    { href: "/products", label: "Products", title: "View our Braille puzzles" },
    { href: "/blog", label: "Blog", title: "Read our Blog" },
    { href: "/contact", label: "Contact Us", title: "Get in touch with us" }
  ];

  // Features data
  const features = [
    {
      icon: Eye,
      title: 'Accessibility',
      description: 'Ensuring that all users, regardless of ability, can easily engage with our puzzles.',
      whyItApplies: 'Our products are designed with features like tactile feedback, making them accessible and usable for individuals with visual impairments, including those learning Braille.',
      color: 'icon-gradient-blue'
    },
    {
      icon: Heart,
      title: 'Engaging',
      description: 'Our puzzles are designed to capture and retain interest, making learning an enjoyable and captivating experience.',
      whyItApplies: 'With interactive elements and challenging tasks, our puzzles keep learners engaged, boosting retention and making learning fun.',
      color: 'icon-gradient-pink'
    },
    {
      icon: Users,
      title: 'Entertaining',
      description: 'Ensuring learning is not just educational but also fun, enhancing the overall experience.',
      whyItApplies: 'We blend educational goals with playful design, ensuring that while learners gain skills, they are also entertained, making education enjoyable.',
      color: 'icon-gradient-purple'
    },
    {
      icon: Zap,
      title: 'Empowerment',
      description: 'Equipping learners with tools to succeed and gain independence through enhanced educational outcomes.',
      whyItApplies: 'Our puzzles do more than entertain; they build confidence and critical life skills, empowering users to navigate the world more effectively. This includes learning essential skills like Braille.',
      color: 'icon-gradient-yellow'
    },
    {
      icon: Award,
      title: 'Gamification',
      description: 'Transforming learning into an engaging challenge through puzzle-solving elements and tactile exploration.',
      whyItApplies: 'Our puzzles incorporate game-like features such as shape matching and spatial problem-solving. These elements make learning an interactive adventure, motivating users to improve their skills.',
      color: 'icon-gradient-green'
    },
    {
      icon: Shield,
      title: 'Inclusivity',
      description: 'Creating products that cater to a diverse range of learners, promoting equal learning opportunities.',
      whyItApplies: 'Amaze Puzzles embraces differences, designing tools that adapt to various learning needs and abilities, helping every user feel included.',
      color: 'icon-gradient-teal'
    }
  ];

  // Gallery images (replace with your actual images)
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop',
      title: 'Completed Braille skills puzzle',
      description: 'White puzzle tray with red puzzle pieces. Puzzle pieces have raised geometric shapes and braille dots for easy tactile discrimination.'
    },
    {
      src: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
      title: 'Braille skills puzzle trays and assorted pieces',
      description: 'Tray and puzzle pieces both have braille dots.'
    },
    {
      src: 'https://images.unsplash.com/photo-1559311470-ec4f7c73fe69?w=400&h=300&fit=crop',
      title: 'Braille skills puzzle black and blue trays',
      description: 'Braille skills puzzle black and blue trays'
    },
    {
      src: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop',
      title: 'Completed Braille skills puzzle with highly visible braille dots',
      description: 'Completed Braille skills puzzle with highly visible braille dots'
    },
    {
      src: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
      title: 'Braille skills puzzle black tray',
      description: 'Braille skills puzzle black tray'
    },
    {
      src: 'https://images.unsplash.com/photo-1559311470-ec4f7c73fe69?w=400&h=300&fit=crop',
      title: 'Assorted Braille puzzle pieces',
      description: 'Multicolored collection of Braille puzzle pieces'
    }
  ];

  // Newsletter functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNewsletterSubmit = async () => {
    setEmailError('');
    setConsentError('');

    if (!email) {
      setEmailError('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setConsentError('You must agree to the terms to subscribe.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Replace with your actual API call
      // const response = await axios.post('your-api-endpoint', { email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setNotification({ 
        show: true, 
        message: 'Subscribed successfully!', 
        type: 'success' 
      });
      setEmail('');
      setConsent(false);
      
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      
    } catch (error) {
      setNotification({ 
        show: true, 
        message: 'Failed to subscribe, please try again later.', 
        type: 'error' 
      });
      
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="nav-container fixed w-full top-0 z-50 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                Amaze Puzzles
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="nav-link"
                >
                  {link.label}
                </a>
              ))}
              
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

            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isNavOpen ? 'open' : 'closed'}`}>
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsNavOpen(false)}
                className="block text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cart"
              onClick={() => setIsNavOpen(false)}
              className="flex items-center space-x-2 text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({cart.length})</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16"></div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="decorative-blob-1"></div>
        <div className="decorative-blob-2"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="logo-container">
            <div className="logo-main">
              <div className="logo-inner">
                <span className="text-8xl">🧩</span>
              </div>
            </div>
            <div className="logo-dot-1"></div>
            <div className="logo-dot-2"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            <span className="block mb-2">Through the power of</span>
            <span className="gradient-text">
              puzzles & play-based learning
            </span>
            <span className="block mt-2 text-4xl md:text-5xl text-slate-700">
              Amaze Puzzles™ helps visually impaired and diverse learners develop essential life skills
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Enhance Braille literacy with our fun, engaging puzzles.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a href="/products" className="btn-primary">
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <button className="btn-secondary">
              <Play className="w-5 h-5 text-blue-600" />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="trust-indicator">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="trust-stat">
                <div className="trust-number">1000+</div>
                <div className="trust-label">Students Helped</div>
              </div>
              <div className="trust-stat">
                <div className="trust-number">95%</div>
                <div className="trust-label">Success Rate</div>
              </div>
              <div className="trust-stat">
                <div className="trust-number">50+</div>
                <div className="trust-label">Schools Partner</div>
              </div>
              <div className="trust-stat">
                <div className="trust-number">4.9★</div>
                <div className="trust-label">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-mouse">
              <div className="scroll-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Key Features of Our
              <span className="block gradient-text">
                Braille Puzzle
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Discover what makes our educational puzzles uniquely effective for enhancing Braille literacy and supporting diverse learners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className={`feature-icon ${feature.color}`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="feature-title">{feature.title}</h3>

                <p className="feature-description">
                  {feature.description}
                </p>

                <div className="feature-applies">
                  <p className="feature-applies-label">Why it applies:</p>
                  <p className="feature-applies-text">
                    {feature.whyItApplies}{' '}
                    <a href="/products" className="text-blue-600 hover:text-blue-700 font-medium underline decoration-blue-200 hover:decoration-blue-300 transition-colors">
                      Learn more on our products page
                    </a>
                    {feature.title === 'Inclusivity' && (
                      <>
                        {' '}
                        <a href="/about" className="text-blue-600 hover:text-blue-700 font-medium underline decoration-blue-200 hover:decoration-blue-300 transition-colors">
                          Learn more about us
                        </a>
                      </>
                    )}
                    .
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="/products" className="btn-primary">
              <span>Explore Our Products</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-bg py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              <span className="gradient-text">
                Braille Skills Puzzle
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Explore our innovative puzzle design through this visual gallery showcasing the tactile learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="gallery-item"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.description}
                  className="gallery-image"
                />
                
                <div className="gallery-overlay">
                  <ZoomIn className="gallery-zoom-icon" />
                </div>

                <div className="gallery-title-overlay">
                  <h3 className="gallery-title">{image.title}</h3>
                  <p className="gallery-description">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Modal */}
          {selectedImage && (
            <div 
              className="modal-backdrop fixed inset-0 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                
                <img
                  src={selectedImage.src}
                  alt={selectedImage.description}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white font-bold text-lg mb-2">{selectedImage.title}</h3>
                  <p className="text-white/90 text-sm">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-bg py-24 px-6 newsletter-container">
        <div className="newsletter-bg-blob-1"></div>
        <div className="newsletter-bg-blob-2"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="newsletter-icon-container">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Sign up for our newsletter to receive the latest updates on Amaze Puzzles™.
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`form-input ${emailError ? 'error' : ''}`}
              />
              {emailError && (
                <p className="error-text">
                  <AlertCircle className="w-4 h-4" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            <div className="text-left">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="text-white/80 text-sm leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => alert('Terms of Service modal would open here')}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => alert('Privacy Policy modal would open here')}
                    className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {consentError && (
                <p className="error-text">
                  <AlertCircle className="w-4 h-4" />
                  <span>{consentError}</span>
                </p>
              )}
            </div>

            <button
              onClick={handleNewsletterSubmit}
              disabled={isLoading}
              className="btn-gradient"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-slate-400 text-sm">
            Join thousands of educators and parents who trust Amaze Puzzles for innovative learning solutions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-bg text-white relative overflow-hidden">
        <div className="footer-bg-blob-1"></div>
        <div className="footer-bg-blob-2"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="footer-logo-container">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold">Amaze Puzzles</span>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                Amaze Puzzles™ offers engaging and educational puzzles designed to enhance Braille literacy for all ages. 
                Our puzzles make learning Braille fun and accessible, supporting both beginners and those looking to improve their skills.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Navigation</h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold mb-6 text-white">Helpful Resources</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href="https://www.brailleinstitute.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  <span>Braille Institute</span>
                  <ExternalLink className="external-link-icon" />
                </a>
                <a
                  href="https://www.afb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  <span>American Foundation for the Blind</span>
                  <ExternalLink className="external-link-icon" />
                </a>
                <a
                  href="https://www.nationalbraillepress.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  <span>National Braille Press</span>
                  <ExternalLink className="external-link-icon" />
                </a>
                <a
                  href="https://www.hadley.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                >
                  <span>Hadley Institute</span>
                  <ExternalLink className="external-link-icon" />
                </a>
              </div>
            </div>
          </div>

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
    </div>
  );
};

export default HomePage;