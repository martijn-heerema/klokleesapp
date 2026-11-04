import React from 'react'
import { motion } from 'framer-motion'

export default function CamelSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="110" cy="175" rx="66" ry="38" fill="#d4a85c"/>
      {/* Hump */}
      <ellipse cx="110" cy="138" rx="38" ry="32" fill="#c49240"/>
      {/* Neck */}
      <path d="M 84 152 Q 78 124 80 100 L 106 100 Q 108 124 118 152 Z" fill="#d4a85c"/>
      {/* Head */}
      <ellipse cx="88" cy="82" rx="24" ry="30" fill="#d4a85c"/>
      {/* Ear */}
      <ellipse cx="76" cy="58" rx="8" ry="14" fill="#c49240"/>
      <ellipse cx="100" cy="56" rx="8" ry="14" fill="#c49240"/>
      {/* Muzzle */}
      <ellipse cx="82" cy="96" rx="18" ry="12" fill="#c49240"/>
      {/* Animated blinking eye */}
      <circle cx="94" cy="74" r="10" fill="white"/>
      <motion.g
        animate={eating
          ? { scaleY: [1, 0.1, 1, 0.1, 1] }
          : { scaleY: [1, 0.1, 1] }}
        transition={eating
          ? { duration: 0.3, repeat: 3, delay: 0.1 }
          : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.5] }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx="94" cy="74" r="6" fill="#333"/>
        <circle cx="96" cy="72" r="2" fill="white"/>
      </motion.g>
      {/* Eyelid for blink */}
      <ellipse cx="94" cy="68" rx="10" ry="5" fill="#d4a85c" opacity="0"/>
      {/* Nostril */}
      <ellipse cx="76" cy="98" rx="5" ry="4" fill="#a07840"/>
      <ellipse cx="88" cy="100" rx="5" ry="4" fill="#a07840"/>
      {/* Smile */}
      <path d="M 70 100 Q 82 110 94 100" stroke="#a07840" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
