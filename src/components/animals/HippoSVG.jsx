import React from 'react'
import { motion } from 'framer-motion'

export default function HippoSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="110" cy="172" rx="78" ry="44" fill="#78909c"/>
      {/* Upper head */}
      <ellipse cx="110" cy="102" rx="70" ry="44" fill="#90a4ae"/>
      {/* Ear bumps */}
      <circle cx="52" cy="82" r="18" fill="#78909c"/>
      <circle cx="168" cy="82" r="18" fill="#78909c"/>
      <circle cx="52" cy="82" r="10" fill="#f48fb1" opacity="0.5"/>
      <circle cx="168" cy="82" r="10" fill="#f48fb1" opacity="0.5"/>
      {/* Eyes on top of head (hippo style) */}
      <circle cx="84" cy="76" r="14" fill="white"/>
      <circle cx="136" cy="76" r="14" fill="white"/>
      <circle cx="85" cy="77" r="9" fill="#333"/>
      <circle cx="137" cy="77" r="9" fill="#333"/>
      <circle cx="88" cy="74" r="3" fill="white"/>
      <circle cx="140" cy="74" r="3" fill="white"/>
      {/* Nostrils on top of snout */}
      <ellipse cx="96" cy="98" rx="10" ry="7" fill="#607d8b"/>
      <ellipse cx="124" cy="98" rx="10" ry="7" fill="#607d8b"/>
      {/* Animated lower jaw */}
      <motion.g
        animate={eating
          ? { rotate: [0, 22, 0, 22, 0] }
          : { rotate: [0, 8, 0] }}
        transition={eating
          ? { duration: 0.4, repeat: 3 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
      >
        <ellipse cx="110" cy="122" rx="64" ry="28" fill="#78909c"/>
        {/* Teeth */}
        <ellipse cx="86" cy="118" rx="10" ry="16" fill="#fffde7" transform="rotate(-5 86 118)"/>
        <ellipse cx="134" cy="118" rx="10" ry="16" fill="#fffde7" transform="rotate(5 134 118)"/>
        {/* Pink inside mouth hint */}
        <ellipse cx="110" cy="124" rx="38" ry="14" fill="#e91e63" opacity="0.25"/>
      </motion.g>
    </svg>
  )
}
