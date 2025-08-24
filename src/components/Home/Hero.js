import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  const handleLearnMore = () => {
    // Replace with your navigation logic
    window.location.href = '/products';
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Logo with animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative">
            <div className="w-72 h-72 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🧩</span>
              </div>
            </div>
            {/* Floating animation dots */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
          <span className="block mb-2">Through the power of</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            puzzles & play-based learning
          </span>
          <span className="block mt-2 text-4xl md:text-5xl text-slate-700">
            Amaze Puzzles™ helps visually impaired and diverse learners develop essential life skills
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Enhance Braille literacy with our fun, engaging puzzles.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button
            onClick={handleLearnMore}
            className="group bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Learn More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group bg-white text-slate-700 px-8 py-4 rounded-2xl text-lg font-semibold border-2 border-slate-200 hover:border-blue-300 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105">
            <Play className="w-5 h-5 text-blue-600" />
            <span>Watch Demo</span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">1000+</div>
              <div className="text-slate-600 text-sm">Students Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-slate-600 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">50+</div>
              <div className="text-slate-600 text-sm">Schools Partner</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">4.9★</div>
              <div className="text-slate-600 text-sm">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;