import React from 'react'
import { motion } from 'framer-motion'

export default function CrocodileSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Tail */}
      <path d="M 162 175 Q 196 168 208 150 Q 214 136 206 125" stroke="#558b2f"
            strokeWidth="24" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <ellipse cx="108" cy="172" rx="68" ry="38" fill="#689f38"/>
      {/* Back ridge bumps */}
      {[75, 92, 109, 126, 143].map((x, i) => (
        <ellipse key={i} cx={x} cy="138" rx="8" ry="10" fill="#33691e"/>
      ))}
      {/* Upper jaw */}
      <ellipse cx="80" cy="118" rx="56" ry="22" fill="#689f38"/>
      {/* Animated lower jaw */}
      <motion.g
        animate={eating
          ? { rotate: [0, -18, 0, -18, 0] }
          : { rotate: [0, -5, 0] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
      >
        <ellipse cx="80" cy="134" rx="54" ry="16" fill="#558b2f"/>
        {/* Teeth bottom */}
        {[40, 55, 70, 85, 100].map((x, i) => (
          <ellipse key={i} cx={x} cy="128" rx="5" ry="8" fill="#f5f5f5"/>
        ))}
      </motion.g>
      {/* Teeth top */}
      {[42, 57, 72, 87, 102].map((x, i) => (
        <ellipse key={i} cx={x} cy="126" rx="5" ry="8" fill="#fffde7"/>
      ))}
      {/* Eye bumps */}
      <ellipse cx="108" cy="104" rx="18" ry="12" fill="#558b2f"/>
      <ellipse cx="148" cy="104" rx="18" ry="12" fill="#558b2f"/>
      {/* Eye whites */}
      <circle cx="108" cy="102" r="11" fill="white"/>
      <circle cx="148" cy="102" r="11" fill="white"/>
      {/* Animated pupils */}
      <motion.g
        animate={eating
          ? { x: [0, 8, -8, 0] }
          : { x: [-5, 5, -5] }}
        transition={eating
          ? { duration: 0.4, repeat: 2 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="108" cy="102" r="7" fill="#1b5e20"/>
        <circle cx="108" cy="102" r="4" fill="#111"/>
        <circle cx="110" cy="100" r="1.5" fill="white"/>
        <circle cx="148" cy="102" r="7" fill="#1b5e20"/>
        <circle cx="148" cy="102" r="4" fill="#111"/>
        <circle cx="150" cy="100" r="1.5" fill="white"/>
      </motion.g>
    </svg>
  )
}
