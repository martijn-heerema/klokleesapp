import React from 'react'
import { motion } from 'framer-motion'

export default function BearSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Left ear */}
      <circle cx="68" cy="72" r="26" fill="#5d4037"/>
      <circle cx="68" cy="72" r="16" fill="#8d6e63"/>
      {/* Right ear */}
      <circle cx="152" cy="72" r="26" fill="#5d4037"/>
      <circle cx="152" cy="72" r="16" fill="#8d6e63"/>
      {/* Body */}
      <ellipse cx="110" cy="168" rx="66" ry="50" fill="#6d4c41"/>
      {/* Animated belly breathing */}
      <motion.ellipse
        cx="110" cy="172" rx="40" ry="32"
        fill="#8d6e63"
        animate={eating
          ? { scaleY: [1, 1.2, 1, 1.2, 1] }
          : { scaleY: [1, 1.07, 1] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      {/* Head */}
      <circle cx="110" cy="108" r="58" fill="#6d4c41"/>
      {/* Muzzle */}
      <ellipse cx="110" cy="125" rx="28" ry="20" fill="#8d6e63"/>
      {/* Eyes */}
      <circle cx="88" cy="96" r="12" fill="white"/>
      <circle cx="132" cy="96" r="12" fill="white"/>
      <circle cx="89" cy="97" r="8" fill="#1a1a1a"/>
      <circle cx="133" cy="97" r="8" fill="#1a1a1a"/>
      <circle cx="91" cy="94" r="3" fill="white"/>
      <circle cx="135" cy="94" r="3" fill="white"/>
      {/* Nose */}
      <ellipse cx="110" cy="118" rx="12" ry="8" fill="#212121"/>
      <ellipse cx="110" cy="116" rx="6" ry="3" fill="#444" opacity="0.5"/>
      {/* Smile */}
      <path d="M 96 130 Q 110 142 124 130" stroke="#5d4037" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}
