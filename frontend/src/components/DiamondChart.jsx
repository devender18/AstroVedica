// components/DiamondChart.jsx
import React from 'react';

const ZODIAC_ORDER = [
  1, 12, 11,
  2, 0, 10,
  3, 4, 5,
  6, 7, 8,
  9
];

const DiamondChart = ({ chartData, title }) => {
  const boxCoords = [
    [150, 0],   // 0 Aries
    [225, 75],  // 1 Taurus
    [300, 150], // 2 Gemini
    [225, 225], // 3 Cancer
    [150, 300], // 4 Leo
    [75, 225],  // 5 Virgo
    [0, 150],   // 6 Libra
    [75, 75],   // 7 Scorpio
    [150, 150], // 8 Center - Asc
    [150, 150], // 9 Sagittarius (special case)
    [150, 150], // 10 Capricorn
    [150, 150], // 11 Aquarius
    [150, 150]  // 12 Pisces
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="text-lg font-bold">{title}</h3>
      <svg viewBox="0 0 300 300" width="300" height="300">
        {/* Outer Diamond */}
        <polygon points="150,0 300,150 150,300 0,150" fill="white" stroke="black" />

        {/* Inner diagonals */}
        <line x1="0" y1="150" x2="300" y2="150" stroke="black" />
        <line x1="150" y1="0" x2="150" y2="300" stroke="black" />
        <line x1="75" y1="75" x2="225" y2="225" stroke="black" />
        <line x1="225" y1="75" x2="75" y2="225" stroke="black" />

        {/* Planet Labels */}
        {Object.entries(chartData).map(([sign, planets], index) => {
          const signIndex = ZODIAC_ORDER[index];
          const [x, y] = boxCoords[signIndex];
          return (
            <text
              key={sign}
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="10"
              fill="black"
              dy=".35em"
            >
              {planets.join(", ")}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default DiamondChart;
