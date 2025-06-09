import React from 'react';
import { Character } from '../data/characters';

interface RadarChartProps {
  character: Character;
  size?: number;
  className?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ character, size = 200, className = '' }) => {
  const center = size / 2;
  const radius = size * 0.4;
  const stats = character.databook_stats;
  
  // Define the stats in order for the radar chart
  const statOrder = [
    { key: 'ninjutsu', label: 'NIN' },
    { key: 'taijutsu', label: 'TAI' },
    { key: 'genjutsu', label: 'GEN' },
    { key: 'intelligence', label: 'INT' },
    { key: 'strength', label: 'STR' },
    { key: 'speed', label: 'SPD' },
    { key: 'stamina', label: 'STA' },
    { key: 'hand_seals', label: 'SEALS' }
  ];

  // Calculate points for the polygon
  const points = statOrder.map((stat, index) => {
    const angle = (index * 2 * Math.PI) / statOrder.length - Math.PI / 2;
    const value = (stats[stat.key as keyof typeof stats] as number) / 5; // Normalize to 0-1
    const x = center + Math.cos(angle) * radius * value;
    const y = center + Math.sin(angle) * radius * value;
    return { x, y, value: stats[stat.key as keyof typeof stats] as number };
  });

  // Calculate label positions
  const labelPoints = statOrder.map((stat, index) => {
    const angle = (index * 2 * Math.PI) / statOrder.length - Math.PI / 2;
    const labelRadius = radius * 1.2;
    const x = center + Math.cos(angle) * labelRadius;
    const y = center + Math.sin(angle) * labelRadius;
    return { x, y, label: stat.label };
  });

  // Create grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map(scale => ({
    radius: radius * scale,
    opacity: scale === 1.0 ? 0.3 : 0.1
  }));

  // Create grid lines
  const gridLines = statOrder.map((_, index) => {
    const angle = (index * 2 * Math.PI) / statOrder.length - Math.PI / 2;
    const x2 = center + Math.cos(angle) * radius;
    const y2 = center + Math.sin(angle) * radius;
    return { x1: center, y1: center, x2, y2 };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridCircles.map((circle, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={circle.radius}
            fill="none"
            stroke="#64748b"
            strokeWidth="1"
            opacity={circle.opacity}
          />
        ))}
        
        {/* Grid lines */}
        {gridLines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#64748b"
            strokeWidth="1"
            opacity="0.1"
          />
        ))}
        
        {/* Character stats polygon */}
        <polygon
          points={polygonPoints}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#22c55e"
            stroke="white"
            strokeWidth="2"
            className="drop-shadow"
          />
        ))}
        
        {/* Labels */}
        {labelPoints.map((label, index) => (
          <text
            key={index}
            x={label.x}
            y={label.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-slate-700"
          >
            {label.label}
          </text>
        ))}
      </svg>
      
      {/* Character name */}
      <div className="mt-2 text-center">
        <h3 className="text-sm font-semibold text-slate-800">{character.name}</h3>
        <p className="text-xs text-slate-600">{character.basic_info.rank}</p>
      </div>
    </div>
  );
};

export default RadarChart;