import React from 'react'
import { motion } from 'framer-motion'

export default function ParrotSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Tail feathers */}
      <ellipse cx="110" cy="196" rx="10" ry="28" fill="#1565c0"/>
      <ellipse cx="94" cy="194" rx="8" ry="26" fill="#0d47a1" transform="rotate(-10 94 194)"/>
      <ellipse cx="126" cy="194" rx="8" ry="26" fill="#0d47a1" transform="rotate(10 126 194)"/>
      {/* Body */}
      <ellipse cx="110" cy="158" rx="50" ry="48" fill="#43a047"/>
      {/* Wing */}
      <ellipse cx="148" cy="155" rx="28" ry="44" fill="#388e3c" transform="rotate(8 148 155)"/>
      <ellipse cx="66" cy="155" rx="28" ry="44" fill="#388e3c" transform="rotate(-8 66 155)"/>
      {/* Wing highlight */}
      <ellipse cx="148" cy="160" rx="16" ry="30" fill="#fdd835" transform="rotate(8 148 160)"/>
      {/* Head */}
      <circle cx="110" cy="96" r="46" fill="#43a047"/>
      {/* Animated head tilt */}
      <motion.g
        animate={eating
          ? { rotate: [-20, 20, -20, 20, 0] }
          : { rotate: [-15, 15, -15] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
      >
        {/* Red face patch */}
        <circle cx="110" cy="96" r="46" fill="#43a047"/>
        <ellipse cx="110" cy="106" rx="28" ry="20" fill="#e53935" opacity="0.7"/>
        {/* Eyes */}
        <circle cx="88" cy="84" r="12" fill="white"/>
        <circle cx="132" cy="84" r="12" fill="white"/>
        <circle cx="89" cy="85" r="8" fill="#222"/>
        <circle cx="133" cy="85" r="8" fill="#222"/>
        <circle cx="91" cy="83" r="3" fill="white"/>
        <circle cx="135" cy="83" r="3" fill="white"/>
        {/* Eye ring */}
        <circle cx="88" cy="84" r="12" fill="none" stroke="#fdd835" strokeWidth="3"/>
        <circle cx="132" cy="84" r="12" fill="none" stroke="#fdd835" strokeWidth="3"/>
        {/* Curved beak */}
        <path d="M 96 106 Q 88 114 94 122 Q 100 128 110 124 Q 120 120 124 112 Q 128 104 120 102 Z"
              fill="#ff8f00"/>
        <path d="M 96 106 Q 104 108 110 112 Q 116 108 124 106" stroke="#e65100" strokeWidth="2" fill="none"/>
      </motion.g>
    </svg>
  )
}
