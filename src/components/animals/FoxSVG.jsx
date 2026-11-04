import React from 'react'
import { motion } from 'framer-motion'

export default function FoxSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Bushy tail */}
      <path d="M 148 178 Q 182 168 194 144 Q 202 124 190 108" stroke="#e65100"
            strokeWidth="28" strokeLinecap="round" fill="none"/>
      {/* Tail white tip */}
      <circle cx="188" cy="105" r="18" fill="#f5f5f5"/>
      {/* Body */}
      <ellipse cx="104" cy="168" rx="56" ry="44" fill="#e64a19"/>
      {/* Chest */}
      <ellipse cx="98" cy="172" rx="32" ry="28" fill="#f5f5f5"/>
      {/* Neck */}
      <ellipse cx="96" cy="130" rx="24" ry="28" fill="#e64a19"/>
      {/* Head */}
      <ellipse cx="92" cy="96" rx="44" ry="40" fill="#e64a19"/>
      {/* Animated ears */}
      <motion.g
        animate={eating
          ? { y: [-6, 0, -6, 0, 0] }
          : { y: [0, -6, 0] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M 62 72 L 50 38 L 78 60 Z" fill="#e64a19"/>
        <path d="M 62 72 L 54 46 L 74 62 Z" fill="#f48fb1" opacity="0.7"/>
      </motion.g>
      <path d="M 118 68 L 112 36 L 134 58 Z" fill="#e64a19"/>
      <path d="M 118 68 L 114 44 L 130 60 Z" fill="#f48fb1" opacity="0.7"/>
      {/* White face markings */}
      <ellipse cx="80" cy="104" rx="18" ry="16" fill="#f5f5f5"/>
      <ellipse cx="104" cy="106" rx="18" ry="16" fill="#f5f5f5"/>
      {/* Eyes */}
      <circle cx="78" cy="90" r="10" fill="white"/>
      <circle cx="106" cy="90" r="10" fill="white"/>
      <circle cx="79" cy="91" r="7" fill="#333"/>
      <circle cx="107" cy="91" r="7" fill="#333"/>
      <circle cx="81" cy="89" r="2.5" fill="white"/>
      <circle cx="109" cy="89" r="2.5" fill="white"/>
      {/* Black nose */}
      <ellipse cx="92" cy="112" rx="10" ry="7" fill="#212121"/>
      {/* White muzzle */}
      <ellipse cx="92" cy="112" rx="18" ry="12" fill="#f5f5f5" opacity="0.8"/>
      <ellipse cx="92" cy="114" rx="9" ry="6" fill="#212121"/>
      {/* Smile */}
      <path d="M 80 118 Q 92 126 104 118" stroke="#c62828" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
