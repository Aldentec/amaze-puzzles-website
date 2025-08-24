import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const response = await fetch(
        'https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/newsletter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        }
      );
      
      if (response.ok) {
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
      }
    } catch (error) {
      console.error('Error subscribing:', error);
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
    <>
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-medium ${
            notification.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {notification.message}
          </span>
        </div>
      )}

      {/* Newsletter Section */}
      <section className="relative py-24 px-6 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mb-12">
            {/* Icon */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
              <Mail className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Sign up for our newsletter to receive the latest updates on Amaze Puzzles™.
            </p>
          </div>

          <div onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-6 py-4 rounded-xl bg-white/95 backdrop-blur-sm text-slate-900 placeholder-slate-500 border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30 ${
                  emailError 
                    ? 'border-red-400 focus:border-red-500' 
                    : 'border-transparent focus:border-white'
                }`}
              />
              {emailError && (
                <p className="mt-2 flex items-center space-x-2 text-white/90 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {/* Consent Checkbox */}
            <div className="text-left">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-2 border-white/50 bg-white/20 checked:bg-white checked:border-white transition-all duration-200 cursor-pointer"
                />
                <span className="text-white/90 text-sm leading-relaxed">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => alert('Terms of Service modal would open here')}
                    className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors"
                  >
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button
                    type="button"
                    onClick={() => alert('Privacy Policy modal would open here')}
                    className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {consentError && (
                <p className="mt-2 ml-8 flex items-center space-x-2 text-white/90 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{consentError}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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

          <p className="mt-8 text-white/70 text-sm">
            Join thousands of educators and parents who trust Amaze Puzzles for innovative learning solutions.
          </p>
        </div>
      </section>
    </>
  );
};

export default NewsletterSignup;