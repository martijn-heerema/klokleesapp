import React from 'react'
import { motion } from 'framer-motion'

export default function SlothSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Branch */}
      <rect x="20" y="52" width="180" height="16" rx="8" fill="#8d6e63"/>
      {/* Long left arm hanging from branch */}
      <path d="M 64 60 Q 56 88 54 120 Q 52 148 60 168" stroke="#9e9e68" strokeWidth="18" strokeLinecap="round" fill="none"/>
      {/* Long right arm */}
      <path d="M 156 60 Q 164 88 166 120 Q 168 148 160 168" stroke="#9e9e68" strokeWidth="18" strokeLinecap="round" fill="none"/>
      {/* Body hanging */}
      <ellipse cx="110" cy="150" rx="52" ry="44" fill="#9e9e68"/>
      {/* Belly */}
      <ellipse cx="110" cy="154" rx="34" ry="30" fill="#bcbc94"/>
      {/* Head */}
      <circle cx="110" cy="106" r="46" fill="#9e9e68"/>
      {/* Face mask */}
      <ellipse cx="110" cy="112" rx="34" ry="28" fill="#bcbc94"/>
      {/* Dark eye rings */}
      <ellipse cx="92" cy="100" rx="18" ry="14" fill="#5d5d40" opacity="0.8"/>
      <ellipse cx="128" cy="100" rx="18" ry="14" fill="#5d5d40" opacity="0.8"/>
      {/* Whites */}
      <circle cx="92" cy="100" r="10" fill="white"/>
      <circle cx="128" cy="100" r="10" fill="white"/>
      {/* Animated lazy pupils */}
      <motion.g
        animate={eating
          ? { x: [0, 8, -8, 0], y: [0, -3, 3, 0] }
          : { x: [-4, 4, -4], y: [0, 2, 0] }}
        transition={eating
          ? { duration: 0.5, repeat: 2 }
          : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="92" cy="100" r="7" fill="#4e342e"/>
        <circle cx="128" cy="100" r="7" fill="#4e342e"/>
        <circle cx="94" cy="98" r="2.5" fill="white"/>
        <circle cx="130" cy="98" r="2.5" fill="white"/>
      </motion.g>
      {/* Sleepy half-closed eyelids */}
      <ellipse cx="92" cy="95" rx="10" ry="5" fill="#9e9e68" opacity="0.7"/>
      <ellipse cx="128" cy="95" rx="10" ry="5" fill="#9e9e68" opacity="0.7"/>
      {/* Claws */}
      {[54, 64, 74].map((x, i) => (
        <path key={i} d={`M ${x} 168 Q ${x-4} 178 ${x} 184`} stroke="#5d5d40" strokeWidth="4" strokeLinecap="round" fill="none"/>
      ))}
      {[146, 156, 166].map((x, i) => (
        <path key={i} d={`M ${x} 168 Q ${x+4} 178 ${x} 184`} stroke="#5d5d40" strokeWidth="4" strokeLinecap="round" fill="none"/>
      ))}
    </svg>
  )
}
