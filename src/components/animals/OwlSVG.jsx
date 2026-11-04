import React from 'react'
import { motion } from 'framer-motion'

export default function OwlSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="110" cy="162" rx="60" ry="54" fill="#8d6e63"/>
      {/* Wing stripes */}
      <ellipse cx="72" cy="160" rx="26" ry="44" fill="#795548" opacity="0.7"/>
      <ellipse cx="148" cy="160" rx="26" ry="44" fill="#795548" opacity="0.7"/>
      {/* Belly feathers */}
      <ellipse cx="110" cy="168" rx="38" ry="40" fill="#d7ccc8"/>
      {/* Feather texture */}
      {[-18, -6, 6, 18].map((x, i) => (
        <ellipse key={i} cx={110 + x} cy={155 + Math.abs(x) * 0.5} rx="10" ry="7"
          fill="#bcaaa4" opacity="0.6"/>
      ))}
      {/* Animated head */}
      <motion.g
        animate={eating
          ? { rotate: [-25, 25, -25, 25, 0] }
          : { rotate: [-20, 20, -20] }}
        transition={eating
          ? { duration: 0.5, repeat: 3 }
          : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center bottom' }}
      >
        {/* Head */}
        <circle cx="110" cy="96" r="52" fill="#8d6e63"/>
        {/* Ear tufts */}
        <path d="M 82 52 L 74 28 L 90 44 Z" fill="#6d4c41"/>
        <path d="M 138 52 L 146 28 L 130 44 Z" fill="#6d4c41"/>
        {/* Big eye discs */}
        <circle cx="88" cy="96" r="24" fill="#fff8e1"/>
        <circle cx="132" cy="96" r="24" fill="#fff8e1"/>
        <circle cx="88" cy="96" r="18" fill="#ff8f00"/>
        <circle cx="132" cy="96" r="18" fill="#ff8f00"/>
        <circle cx="88" cy="96" r="11" fill="#111"/>
        <circle cx="132" cy="96" r="11" fill="#111"/>
        <circle cx="92" cy="92" r="4" fill="white"/>
        <circle cx="136" cy="92" r="4" fill="white"/>
        {/* Beak */}
        <path d="M 100 108 L 110 120 L 120 108 Z" fill="#ff8f00"/>
        {/* Forehead stripe */}
        <path d="M 94 68 Q 110 62 126 68" stroke="#6d4c41" strokeWidth="4" fill="none"/>
      </motion.g>
    </svg>
  )
}
