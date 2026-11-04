import React from 'react'
import { motion } from 'framer-motion'

export default function BatSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Animated wings */}
      <motion.g
        animate={eating
          ? { scaleX: [1, 0.2, 1, 0.2, 1] }
          : { scaleX: [1, 0.25, 1] }}
        transition={eating
          ? { duration: 0.4, repeat: 3 }
          : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
      >
        {/* Left wing */}
        <path d="M 96 118 Q 60 80 28 68 Q 14 72 18 86 Q 36 88 52 106 Q 64 120 74 136 Z"
              fill="#4a148c"/>
        {/* Left wing membrane */}
        <path d="M 96 118 Q 60 80 28 68" stroke="#6a1b9a" strokeWidth="3" fill="none"/>
        <path d="M 96 118 Q 52 106 18 86" stroke="#6a1b9a" strokeWidth="2" fill="none"/>
        <path d="M 96 118 Q 64 120 52 148" stroke="#6a1b9a" strokeWidth="2" fill="none"/>
        {/* Right wing */}
        <path d="M 124 118 Q 160 80 192 68 Q 206 72 202 86 Q 184 88 168 106 Q 156 120 146 136 Z"
              fill="#4a148c"/>
        {/* Right wing membrane */}
        <path d="M 124 118 Q 160 80 192 68" stroke="#6a1b9a" strokeWidth="3" fill="none"/>
        <path d="M 124 118 Q 168 106 202 86" stroke="#6a1b9a" strokeWidth="2" fill="none"/>
        <path d="M 124 118 Q 156 120 168 148" stroke="#6a1b9a" strokeWidth="2" fill="none"/>
      </motion.g>
      {/* Body */}
      <ellipse cx="110" cy="130" rx="38" ry="50" fill="#6a1b9a"/>
      {/* Head */}
      <circle cx="110" cy="92" r="36" fill="#7b1fa2"/>
      {/* Ear */}
      <path d="M 82 72 L 70 42 L 96 62 Z" fill="#6a1b9a"/>
      <path d="M 82 72 L 74 50 L 92 64 Z" fill="#e91e63" opacity="0.4"/>
      <path d="M 138 72 L 150 42 L 124 62 Z" fill="#6a1b9a"/>
      <path d="M 138 72 L 146 50 L 128 64 Z" fill="#e91e63" opacity="0.4"/>
      {/* Eyes */}
      <circle cx="96" cy="86" r="11" fill="#ff6f00"/>
      <circle cx="124" cy="86" r="11" fill="#ff6f00"/>
      <circle cx="96" cy="86" r="7" fill="#111"/>
      <circle cx="124" cy="86" r="7" fill="#111"/>
      <circle cx="98" cy="84" r="2.5" fill="white"/>
      <circle cx="126" cy="84" r="2.5" fill="white"/>
      {/* Snout */}
      <ellipse cx="110" cy="104" rx="16" ry="10" fill="#6a1b9a"/>
      {/* Nose */}
      <ellipse cx="110" cy="102" rx="8" ry="5" fill="#4a148c"/>
      {/* Fangs */}
      <path d="M 104 112 L 101 122" stroke="#f5f5f5" strokeWidth="4" strokeLinecap="round"/>
      <path d="M 116 112 L 119 122" stroke="#f5f5f5" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  )
}
