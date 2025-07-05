// components/HeroSection.jsx
import React from 'react';

const HeroSection = ({ onGenerateKundli }) => {
  return (
   
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Background cosmic effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 text-center text-white px-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Unlock Your Cosmic Blueprint
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Discover your unique astrological profile with our precise horoscope calculator. 
          Enter your birth details to reveal insights into your personality, relationships, and life path.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <div className="flex items-center bg-gray-800 rounded-lg px-6 py-4 max-w-md mx-auto sm:mx-0">
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
            />
          </div>
          <button
            onClick={onGenerateKundli}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Calculate Horoscope
          </button>
        </div>
        
        <div className="text-sm text-gray-400">
          <p>✨ Get detailed birth chart analysis ✨</p>
        </div>
      </div>
      
      {/* Floating cosmic elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
    </section>
  );
 
};

export default HeroSection;