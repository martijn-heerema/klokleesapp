import React from 'react'
import { motion } from 'framer-motion'

export default function TurtleSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Shell dome */}
      <ellipse cx="110" cy="130" rx="72" ry="58" fill="#388e3c"/>
      {/* Shell pattern */}
      <ellipse cx="110" cy="122" rx="48" ry="36" fill="#2e7d32"/>
      {/* Shell hex pattern */}
      <ellipse cx="110" cy="108" rx="24" ry="18" fill="#1b5e20" opacity="0.6"/>
      <ellipse cx="80" cy="122" rx="18" ry="14" fill="#1b5e20" opacity="0.5"/>
      <ellipse cx="140" cy="122" rx="18" ry="14" fill="#1b5e20" opacity="0.5"/>
      <ellipse cx="92" cy="144" rx="16" ry="12" fill="#1b5e20" opacity="0.5"/>
      <ellipse cx="128" cy="144" rx="16" ry="12" fill="#1b5e20" opacity="0.5"/>
      {/* Legs */}
      <ellipse cx="58" cy="148" rx="18" ry="12" fill="#558b2f" transform="rotate(-20 58 148)"/>
      <ellipse cx="162" cy="148" rx="18" ry="12" fill="#558b2f" transform="rotate(20 162 148)"/>
      <ellipse cx="64" cy="175" rx="16" ry="10" fill="#558b2f" transform="rotate(15 64 175)"/>
      <ellipse cx="156" cy="175" rx="16" ry="10" fill="#558b2f" transform="rotate(-15 156 175)"/>
      {/* Tail */}
      <ellipse cx="110" cy="184" rx="10" ry="14" fill="#558b2f"/>
      {/* Animated neck + head */}
      <motion.g
        animate={eating
          ? { y: [0, -20, 0, -20, 0] }
          : { y: [0, -12, 0] }}
        transition={eating
          ? { duration: 0.6, repeat: 3 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Neck */}
        <ellipse cx="110" cy="90" rx="18" ry="22" fill="#558b2f"/>
        {/* Head */}
        <ellipse cx="110" cy="68" rx="28" ry="24" fill="#558b2f"/>
        {/* Eyes */}
        <circle cx="98" cy="60" r="9" fill="white"/>
        <circle cx="122" cy="60" r="9" fill="white"/>
        <circle cx="99" cy="61" r="6" fill="#1b5e20"/>
        <circle cx="123" cy="61" r="6" fill="#1b5e20"/>
        <circle cx="101" cy="59" r="2" fill="white"/>
        <circle cx="125" cy="59" r="2" fill="white"/>
        {/* Smile */}
        <path d="M 98 74 Q 110 82 122 74" stroke="#33691e" strokeWidth="3" strokeLinecap="round" fill="none"/>
      </motion.g>
    </svg>
  )
}
