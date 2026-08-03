import React, { useId } from 'react';
import { motion } from 'motion/react';

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  trackColor?: string;
}

/**
 * The "ember ring" — this app's signature visual element. As consistency
 * builds through the month, the arc fills with a warm amber gradient,
 * evoking a glow that grows brighter the more it's tended.
 */
export function ProgressRing({ radius, stroke, progress, trackColor = '#EAE6DB' }: ProgressRingProps) {
  const gradientId = useId();
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="-rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C08A4E" />
            <stop offset="100%" stopColor="#2A2420" />
          </linearGradient>
        </defs>
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke={`url(#${gradientId})`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
