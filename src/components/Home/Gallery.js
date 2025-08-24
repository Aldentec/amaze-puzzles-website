import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

// Import your puzzle images here
import CompletedPuzzle from '../../assets/images/puzzle-2.jpg';
import TrayAssortedPieces from '../../assets/images/puzzle-3.jpg';
import CompletedPuzzleVisibleDots from '../../assets/images/puzzle-4.jpg';
import GreenCompletedPuzzle from '../../assets/images/green-completed-puzzle.jpg';
import AssortedPieces from '../../assets/images/assorted-puzzle-pieces.jpg';
import BlackTray from '../../assets/images/black-puzzle-tray.jpg';
import GreenPieces from '../../assets/images/green-pieces-together.jpg';
import BlackAndBlueTrays from '../../assets/images/black-and-blue-trays.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    {
      img: CompletedPuzzle,
      title: 'Completed Braille Skills Puzzle',
      description: 'White puzzle tray with red puzzle pieces featuring raised geometric shapes and braille dots for tactile discrimination.',
      category: 'complete'
    },
    {
      img: TrayAssortedPieces,
      title: 'Braille Skills Puzzle Trays',
      description: 'Tray and puzzle pieces both feature braille dots for enhanced learning.',
      category: 'components'
    },
    {
      img: BlackAndBlueTrays,
      title: 'Black and Blue Puzzle Trays',
      description: 'High-contrast black and blue trays designed for visual accessibility.',
      category: 'trays'
    },
    {
      img: CompletedPuzzleVisibleDots,
      title: 'High-Visibility Braille Puzzle',
      description: 'Completed puzzle with highly visible braille dots for easier recognition.',
      category: 'complete'
    },
    {
      img: BlackTray,
      title: 'Black Puzzle Tray',
      description: 'Sleek black tray designed for maximum contrast and visibility.',
      category: 'trays'
    },
    {
      img: AssortedPieces,
      title: 'Assorted Puzzle Pieces',
      description: 'Multicolored collection of Braille puzzle pieces for varied learning experiences.',
      category: 'pieces'
    },
    {
      img: GreenPieces,
      title: 'Green Braille Set',
      description: 'Complete green puzzle set with raised geometric shapes for tactile learning.',
      category: 'complete'
    },
    {
      img: GreenCompletedPuzzle,
      title: 'Green Transparent Pieces',
      description: 'Transparent green puzzle pieces with raised shapes and Braille dots arranged in learning formation.',
      category: 'pieces'
    }
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(galleryItems[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryItems[newIndex]);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Braille Puzzles</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover our innovative collection of tactile learning tools designed to make Braille education engaging and accessible for all learners.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">{item.description}</p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-5 h-5 text-slate-700" />
                </div>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 capitalize">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 text-white"
              aria-label="Close gallery"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200 text-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="max-w-5xl max-h-[90vh] mx-4">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              
              {/* Image Info */}
              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-white/80 max-w-2xl mx-auto">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-white/60">
                  {currentIndex + 1} / {galleryItems.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Gallery;