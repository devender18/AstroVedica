// components/NorthIndianChart.jsx
import React from 'react';

const ZODIAC_ORDER = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const SIGN_ABBREVIATIONS = {
  Aries: "Ari",
  Taurus: "Tau", 
  Gemini: "Gem",
  Cancer: "Can",
  Leo: "Leo",
  Virgo: "Vir",
  Libra: "Lib",
  Scorpio: "Sco",
  Sagittarius: "Sag",
  Capricorn: "Cap",
  Aquarius: "Aqu",
  Pisces: "Pis"
};

const PLANET_ABBREVIATIONS = {
  Sun: "Su",
  Moon: "Mo", 
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke"
};

const NorthIndianChart = ({ chart, ascendant, title }) => {
  // North Indian chart house positions (fixed positions for houses 1-12)
  // House 1 (Ascendant) is always at the top-left position
  const getHousePosition = (houseNumber) => {
    const positions = {
      1: { x: 100, y: 80, width: 80, height: 60 },   // Top-left
      2: { x: 180, y: 40, width: 80, height: 60 },   // Top-center
      3: { x: 260, y: 80, width: 80, height: 60 },   // Top-right
      4: { x: 300, y: 160, width: 60, height: 80 },  // Right-center
      5: { x: 260, y: 240, width: 80, height: 60 },  // Bottom-right
      6: { x: 180, y: 280, width: 80, height: 60 },  // Bottom-center
      7: { x: 100, y: 240, width: 80, height: 60 },  // Bottom-left
      8: { x: 40, y: 160, width: 60, height: 80 },   // Left-center
      9: { x: 100, y: 160, width: 80, height: 60 },  // Center-left
      10: { x: 180, y: 120, width: 80, height: 60 }, // Center-top
      11: { x: 260, y: 160, width: 80, height: 60 }, // Center-right
      12: { x: 180, y: 200, width: 80, height: 60 }  // Center-bottom
    };
    return positions[houseNumber];
  };

  // Calculate which zodiac sign is in which house based on ascendant
  const getSignInHouse = (houseNumber) => {
    // Find ascendant sign index
    const ascendantSignIndex = ZODIAC_ORDER.findIndex(sign => sign === ascendant);
    // Calculate which sign is in this house
    const signIndex = (ascendantSignIndex + houseNumber - 1) % 12;
    return ZODIAC_ORDER[signIndex];
  };

  // Get planets in a specific house
  const getPlanetsInHouse = (houseNumber) => {
    const signInHouse = getSignInHouse(houseNumber);
    return chart[signInHouse] || [];
  };

  const formatPlanetName = (planet) => {
    return PLANET_ABBREVIATIONS[planet] || planet;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="relative">
        <svg viewBox="0 0 400 360" width="400" height="360" className="border-2 border-gray-600 bg-gradient-to-br from-yellow-50 to-orange-50">
          {/* Main diamond outline */}
          <polygon 
            points="200,20 360,180 200,340 40,180" 
            fill="none" 
            stroke="#8B4513" 
            strokeWidth="3"
          />
          
          {/* Inner cross lines */}
          <line x1="40" y1="180" x2="360" y2="180" stroke="#8B4513" strokeWidth="2" />
          <line x1="200" y1="20" x2="200" y2="340" stroke="#8B4513" strokeWidth="2" />
          
          {/* Diagonal lines */}
          <line x1="120" y1="100" x2="280" y2="260" stroke="#8B4513" strokeWidth="2" />
          <line x1="280" y1="100" x2="120" y2="260" stroke="#8B4513" strokeWidth="2" />
          
          {/* Additional inner lines for better house separation */}
          <line x1="120" y1="100" x2="200" y2="20" stroke="#8B4513" strokeWidth="1" />
          <line x1="280" y1="100" x2="200" y2="20" stroke="#8B4513" strokeWidth="1" />
          <line x1="280" y1="100" x2="360" y2="180" stroke="#8B4513" strokeWidth="1" />
          <line x1="280" y1="260" x2="360" y2="180" stroke="#8B4513" strokeWidth="1" />
          <line x1="280" y1="260" x2="200" y2="340" stroke="#8B4513" strokeWidth="1" />
          <line x1="120" y1="260" x2="200" y2="340" stroke="#8B4513" strokeWidth="1" />
          <line x1="120" y1="260" x2="40" y2="180" stroke="#8B4513" strokeWidth="1" />
          <line x1="120" y1="100" x2="40" y2="180" stroke="#8B4513" strokeWidth="1" />

          {/* House numbers and content */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(houseNumber => {
            const position = getHousePosition(houseNumber);
            const signInHouse = getSignInHouse(houseNumber);
            const planetsInHouse = getPlanetsInHouse(houseNumber);
            
            return (
              <g key={houseNumber}>
                {/* House number */}
                <text
                  x={position.x + position.width/2}
                  y={position.y + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#8B4513"
                  fontWeight="bold"
                >
                  {houseNumber}
                </text>
                
                {/* Sign abbreviation */}
                <text
                  x={position.x + position.width/2}
                  y={position.y + 30}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#B8860B"
                  fontWeight="bold"
                >
                  {SIGN_ABBREVIATIONS[signInHouse]}
                </text>
                
                {/* Ascendant marker */}
                {houseNumber === 1 && (
                  <text
                    x={position.x + position.width/2}
                    y={position.y + 45}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#FF6B35"
                    fontWeight="bold"
                  >
                    ASC
                  </text>
                )}
                
                {/* Planets */}
                {planetsInHouse.map((planet, index) => (
                  <text
                    key={`${houseNumber}-${planet}-${index}`}
                    x={position.x + position.width/2}
                    y={position.y + 50 + (index * 12)}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#2C3E50"
                    fontWeight="bold"
                  >
                    {formatPlanetName(planet)}
                  </text>
                ))}
              </g>
            );
          })}
          
          {/* Chart title in the center */}
          <text
            x="200"
            y="185"
            textAnchor="middle"
            fontSize="14"
            fill="#8B4513"
            fontWeight="bold"
            opacity="0.7"
          >
            {title.includes('Lagna') ? 'D1' : 'D9'}
          </text>
        </svg>
        
        {/* Legend */}
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="font-semibold text-sm mb-2">Legend:</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex flex-wrap gap-1">
              {Object.entries(PLANET_ABBREVIATIONS).map(([full, abbr]) => (
                <span key={full} className="bg-white px-2 py-1 rounded border">
                  {abbr} = {full}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NorthIndianChart;