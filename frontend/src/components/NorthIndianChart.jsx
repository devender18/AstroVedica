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

const CHART_POSITIONS = [
  10, 11, 0,
  9, -1, 1,
  8, 7, 2,
  6, 5, 4,
  3
];

const BOX_COORDS = [
  [150, 10],   // Top center
  [230, 50],   // Top right
  [270, 130],  // Right
  [230, 210],  // Bottom right
  [150, 250],  // Bottom center
  [70, 210],   // Bottom left
  [30, 130],   // Left
  [70, 50],    // Top left
  [150, 130],  // Center
];

const NorthIndianChart = ({ chart, ascendant, title }) => {
  const ascIndex = ZODIAC_ORDER.indexOf(ascendant);
  const signs = Array(12).fill(null);

  for (let i = 0; i < 12; i++) {
    const zodiacIndex = (ascIndex + i) % 12;
    signs[i] = {
      name: SIGN_ABBREVIATIONS[ZODIAC_ORDER[zodiacIndex]],
      index: (ascIndex + i) % 12 + 1,
      planets: chart[ZODIAC_ORDER[zodiacIndex]] || []
    };
  }

  const layoutSigns = CHART_POSITIONS.map(pos =>
    pos === -1 ? signs[0] : signs[pos % 12]
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <svg viewBox="0 0 300 300" width="300" height="300" className="border border-gray-400">
        {/* Diamond layout */}
        <polygon points="150,10 270,130 150,250 30,130" fill="white" stroke="orange" strokeDasharray="4" />
        <line x1="30" y1="130" x2="270" y2="130" stroke="orange" strokeDasharray="4" />
        <line x1="150" y1="10" x2="150" y2="250" stroke="orange" strokeDasharray="4" />
        <line x1="70" y1="50" x2="230" y2="210" stroke="orange" strokeDasharray="4" />
        <line x1="230" y1="50" x2="70" y2="210" stroke="orange" strokeDasharray="4" />

        {BOX_COORDS.map(([x, y], idx) => (
          <g key={idx}>
            {layoutSigns[idx] && (
              <>
                <text x={x} y={y - 16} textAnchor="middle" fontSize="12" fill="brown" fontWeight="bold">
                  {layoutSigns[idx].name}
                </text>
                <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fill="gray">
                  {layoutSigns[idx].index}
                </text>
                {layoutSigns[idx].planets.map((planet, i) => (
                  <text
                    key={i}
                    x={x}
                    y={y + 10 + i * 12}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#2a2a2a"
                  >
                    {planet}
                  </text>
                ))}
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NorthIndianChart;
