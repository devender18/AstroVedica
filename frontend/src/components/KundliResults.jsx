// components/KundliResults.jsx
import React from 'react';
import NorthIndianChart from './NorthIndianChart';

const KundliResults = ({ kundliData }) => {
  if (!kundliData) return null;
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {kundliData.name}'s Cosmic Profile
            </h2>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full">
              <span className="font-semibold">Ascendant: {kundliData.ascendant}</span>
            </div>
            {kundliData.birth_info && (
              <p className="text-gray-300 mt-4">
                Born on {kundliData.birth_info.date} at {kundliData.birth_info.time} 
                <span className="text-gray-400"> ({kundliData.birth_info.timezone})</span>
              </p>
            )}
          </div>
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 border border-gray-600">
              <NorthIndianChart
                chart={kundliData.d1_chart}
                ascendant={kundliData.ascendant}
                title="Lagna Chart (D1)"
              />
            </div>
            
            <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 border border-gray-600">
              <NorthIndianChart
                chart={kundliData.d9_chart}
                ascendant={kundliData.ascendant}
                title="Navamsa Chart (D9)"
              />
            </div>
          </div>
          
          {/* Information Panel */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 border border-blue-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">📚</span>
              Chart Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-200">
              <div>
                <h4 className="font-semibold text-lg mb-2 text-blue-300">
                  Lagna Chart (D1)
                </h4>
                <p className="text-sm leading-relaxed">
                  The main birth chart showing your core personality, life themes, 
                  general characteristics, and overall life path. This is the foundation 
                  of your astrological profile.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2 text-purple-300">
                  Navamsa Chart (D9)
                </h4>
                <p className="text-sm leading-relaxed">
                  The divisional chart for marriage and spirituality. It reveals 
                  your inner strength, spiritual inclinations, and compatibility 
                  factors for relationships.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Detailed Report
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Consultation
            </button>
            <button className="border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KundliResults;