import React from 'react'
import { motion } from 'framer-motion'

export default function BeeSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Animated wings */}
      <motion.g
        animate={eating
          ? { scaleX: [1, 1.3, 1], scaleY: [1, 0.7, 1] }
          : { scaleY: [1, 0.4, 1], scaleX: [1, 1.2, 1] }}
        transition={eating
          ? { duration: 0.12, repeat: 20 }
          : { duration: 0.18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
      >
        {/* Left wing */}
        <ellipse cx="70" cy="88" rx="40" ry="24" fill="#b3e5fc" opacity="0.85"/>
        {/* Right wing */}
        <ellipse cx="150" cy="88" rx="40" ry="24" fill="#b3e5fc" opacity="0.85"/>
        {/* Upper left wing */}
        <ellipse cx="72" cy="68" rx="30" ry="18" fill="#e1f5fe" opacity="0.7"/>
        {/* Upper right wing */}
        <ellipse cx="148" cy="68" rx="30" ry="18" fill="#e1f5fe" opacity="0.7"/>
      </motion.g>
      {/* Abdomen stripes */}
      <ellipse cx="110" cy="168" rx="44" ry="34" fill="#fdd835"/>
      <ellipse cx="110" cy="154" rx="44" ry="14" fill="#212121"/>
      <ellipse cx="110" cy="140" rx="44" ry="14" fill="#fdd835"/>
      <ellipse cx="110" cy="178" rx="44" ry="10" fill="#212121"/>
      {/* Stinger */}
      <path d="M 104 198 L 110 210 L 116 198" fill="#e65100"/>
      {/* Thorax */}
      <ellipse cx="110" cy="122" rx="34" ry="28" fill="#fdd835"/>
      {/* Head */}
      <circle cx="110" cy="88" r="30" fill="#fdd835"/>
      {/* Eyes */}
      <circle cx="96" cy="82" r="11" fill="white"/>
      <circle cx="124" cy="82" r="11" fill="white"/>
      <circle cx="97" cy="83" r="7" fill="#212121"/>
      <circle cx="125" cy="83" r="7" fill="#212121"/>
      <circle cx="99" cy="81" r="2.5" fill="white"/>
      <circle cx="127" cy="81" r="2.5" fill="white"/>
      {/* Antennae */}
      <path d="M 100 62 Q 90 44 82 36" stroke="#212121" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="82" cy="36" r="6" fill="#212121"/>
      <path d="M 120 62 Q 130 44 138 36" stroke="#212121" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="138" cy="36" r="6" fill="#212121"/>
      {/* Smile */}
      <path d="M 98 96 Q 110 106 122 96" stroke="#e65100" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
