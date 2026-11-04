import React from 'react'
import { motion } from 'framer-motion'

export default function ButterflySVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Animated wings */}
      <motion.g
        animate={eating
          ? { scaleX: [1, 0.15, 1, 0.15, 1] }
          : { scaleX: [1, 0.2, 1] }}
        transition={eating
          ? { duration: 0.4, repeat: 3 }
          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
      >
        {/* Upper left wing */}
        <ellipse cx="64" cy="88" rx="54" ry="62" fill="#ce93d8"/>
        <ellipse cx="64" cy="88" rx="38" ry="46" fill="#ab47bc" opacity="0.6"/>
        <circle cx="56" cy="80" r="14" fill="#f3e5f5" opacity="0.6"/>
        <circle cx="72" cy="108" r="10" fill="#f3e5f5" opacity="0.5"/>
        {/* Upper right wing */}
        <ellipse cx="156" cy="88" rx="54" ry="62" fill="#ce93d8"/>
        <ellipse cx="156" cy="88" rx="38" ry="46" fill="#ab47bc" opacity="0.6"/>
        <circle cx="164" cy="80" r="14" fill="#f3e5f5" opacity="0.6"/>
        <circle cx="148" cy="108" r="10" fill="#f3e5f5" opacity="0.5"/>
        {/* Lower left wing */}
        <ellipse cx="70" cy="158" rx="44" ry="46" fill="#f48fb1"/>
        <ellipse cx="70" cy="158" rx="30" ry="32" fill="#e91e63" opacity="0.5"/>
        <circle cx="62" cy="158" r="12" fill="#f8bbd0" opacity="0.6"/>
        {/* Lower right wing */}
        <ellipse cx="150" cy="158" rx="44" ry="46" fill="#f48fb1"/>
        <ellipse cx="150" cy="158" rx="30" ry="32" fill="#e91e63" opacity="0.5"/>
        <circle cx="158" cy="158" r="12" fill="#f8bbd0" opacity="0.6"/>
      </motion.g>
      {/* Body */}
      <ellipse cx="110" cy="120" rx="10" ry="64" fill="#212121"/>
      {/* Head */}
      <circle cx="110" cy="52" r="16" fill="#212121"/>
      {/* Eyes */}
      <circle cx="104" cy="48" r="6" fill="white"/>
      <circle cx="116" cy="48" r="6" fill="white"/>
      <circle cx="104" cy="49" r="4" fill="#333"/>
      <circle cx="116" cy="49" r="4" fill="#333"/>
      <circle cx="105" cy="48" r="1.5" fill="white"/>
      <circle cx="117" cy="48" r="1.5" fill="white"/>
      {/* Antennae */}
      <path d="M 104 38 Q 94 20 86 12" stroke="#212121" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="84" cy="11" r="5" fill="#ab47bc"/>
      <path d="M 116 38 Q 126 20 134 12" stroke="#212121" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="136" cy="11" r="5" fill="#ab47bc"/>
    </svg>
  )
}
