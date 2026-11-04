import React from 'react'
import { motion } from 'framer-motion'

export default function PenguinSVG({ size = 220, eating = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 220 220" fill="none"
      animate={eating
        ? { rotate: [-18, 18, -18, 18, 0] }
        : { rotate: [-8, 8, -8] }}
      transition={eating
        ? { duration: 0.3, repeat: 3 }
        : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
    >
      {/* Body */}
      <ellipse cx="110" cy="148" rx="62" ry="66" fill="#1a237e"/>
      {/* White belly */}
      <ellipse cx="110" cy="155" rx="40" ry="52" fill="#eceff1"/>
      {/* Left wing */}
      <ellipse cx="60" cy="145" rx="18" ry="36" fill="#1a237e" transform="rotate(-15 60 145)"/>
      {/* Right wing */}
      <ellipse cx="160" cy="145" rx="18" ry="36" fill="#1a237e" transform="rotate(15 160 145)"/>
      {/* Head */}
      <circle cx="110" cy="90" r="46" fill="#1a237e"/>
      {/* White face patches */}
      <ellipse cx="96" cy="88" rx="16" ry="18" fill="#eceff1"/>
      <ellipse cx="124" cy="88" rx="16" ry="18" fill="#eceff1"/>
      {/* Eyes */}
      <circle cx="96" cy="82" r="11" fill="white"/>
      <circle cx="124" cy="82" r="11" fill="white"/>
      <circle cx="97" cy="83" r="7" fill="#111"/>
      <circle cx="125" cy="83" r="7" fill="#111"/>
      <circle cx="99" cy="80" r="2.5" fill="white"/>
      <circle cx="127" cy="80" r="2.5" fill="white"/>
      {/* Beak */}
      <path d="M 100 100 L 110 114 L 120 100 Z" fill="#ff8f00"/>
      {/* Feet */}
      <ellipse cx="90" cy="208" rx="18" ry="8" fill="#ff8f00"/>
      <ellipse cx="130" cy="208" rx="18" ry="8" fill="#ff8f00"/>
    </motion.svg>
  )
}
