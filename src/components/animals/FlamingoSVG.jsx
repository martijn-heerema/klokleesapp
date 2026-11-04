import React from 'react'
import { motion } from 'framer-motion'

export default function FlamingoSVG({ size = 220, eating = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 220 220" fill="none"
      animate={eating
        ? { x: [-6, 6, -6, 6, 0] }
        : { x: [-4, 4, -4] }}
      transition={eating
        ? { duration: 0.35, repeat: 3 }
        : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Body */}
      <ellipse cx="110" cy="158" rx="48" ry="40" fill="#f48fb1"/>
      {/* Wing detail */}
      <ellipse cx="120" cy="155" rx="32" ry="28" fill="#f06292"/>
      {/* S-curved neck */}
      <path d="M 108 122 Q 96 100 102 78 Q 108 58 118 44"
            stroke="#f48fb1" strokeWidth="18" fill="none" strokeLinecap="round"/>
      {/* Head */}
      <circle cx="120" cy="38" r="24" fill="#f48fb1"/>
      {/* Eye */}
      <circle cx="128" cy="32" r="9" fill="white"/>
      <circle cx="129" cy="33" r="6" fill="#222"/>
      <circle cx="131" cy="31" r="2" fill="white"/>
      {/* Beak — bent downward */}
      <path d="M 136 42 Q 148 46 150 55 Q 148 62 140 58 Q 138 50 130 50 Z" fill="#e91e63"/>
      <path d="M 136 42 Q 148 46 150 55" stroke="#880e4f" strokeWidth="2" fill="none"/>
      {/* One standing leg */}
      <rect x="107" y="194" width="8" height="26" rx="4" fill="#f48fb1"/>
      {/* Knee bend */}
      <ellipse cx="111" cy="194" rx="6" ry="5" fill="#f06292"/>
      {/* Foot */}
      <path d="M 104 218 L 111 218 L 118 212" stroke="#f48fb1" strokeWidth="4" strokeLinecap="round" fill="none"/>
    </motion.svg>
  )
}
