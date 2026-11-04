import React from 'react'
import { motion } from 'framer-motion'

export default function HorseSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="112" cy="170" rx="62" ry="42" fill="#8d6e63"/>
      {/* Neck */}
      <path d="M 90 140 Q 84 110 88 88 L 116 88 Q 118 110 128 140 Z" fill="#8d6e63"/>
      {/* Mane */}
      <path d="M 88 88 Q 80 96 78 108 Q 76 120 80 132 Q 82 138 86 140"
            stroke="#4e342e" strokeWidth="8" fill="none" strokeLinecap="round"/>
      {/* Mane strands */}
      <path d="M 86 92 Q 74 98 72 112" stroke="#4e342e" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M 84 102 Q 72 108 71 122" stroke="#4e342e" strokeWidth="5" fill="none" strokeLinecap="round"/>
      {/* Animated head + neck nod */}
      <motion.g
        animate={eating
          ? { rotate: [0, 18, 0, 18, 0] }
          : { rotate: [0, -10, 0] }}
        transition={eating
          ? { duration: 0.4, repeat: 3 }
          : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
      >
        {/* Head */}
        <ellipse cx="100" cy="68" rx="28" ry="38" fill="#a1887f"/>
        {/* Ear */}
        <ellipse cx="86" cy="38" rx="9" ry="16" fill="#8d6e63"/>
        <ellipse cx="86" cy="38" rx="5" ry="10" fill="#f48fb1" opacity="0.5"/>
        <ellipse cx="114" cy="36" rx="9" ry="16" fill="#8d6e63"/>
        <ellipse cx="114" cy="36" rx="5" ry="10" fill="#f48fb1" opacity="0.5"/>
        {/* Eye */}
        <circle cx="90" cy="62" r="10" fill="white"/>
        <circle cx="91" cy="63" r="7" fill="#333"/>
        <circle cx="93" cy="61" r="2.5" fill="white"/>
        {/* Nostril */}
        <ellipse cx="88" cy="88" rx="7" ry="5" fill="#795548"/>
        <ellipse cx="112" cy="88" rx="7" ry="5" fill="#795548"/>
        {/* Muzzle */}
        <ellipse cx="100" cy="86" rx="20" ry="14" fill="#bcaaa4"/>
      </motion.g>
      {/* Tail */}
      <path d="M 165 168 Q 185 155 188 135 Q 190 115 180 105" stroke="#4e342e"
            strokeWidth="10" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
