// components/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">⭐</span>
          </div>
          <h1 className="text-xl font-bold">AstroVedika</h1>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-400 transition-colors">Daily Horoscope</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Kundli</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Compatibility</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Tarot</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Numerology</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Ask Astrologer</a>
        </nav>
        
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
            Sign up
          </button>
          <button className="border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;