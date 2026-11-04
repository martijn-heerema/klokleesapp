import React from 'react'
import { motion } from 'framer-motion'

export default function ElephantSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Left ear */}
      <ellipse cx="58" cy="118" rx="34" ry="44" fill="#b0bec5"/>
      <ellipse cx="58" cy="118" rx="22" ry="30" fill="#f48fb1" opacity="0.5"/>
      {/* Right ear */}
      <ellipse cx="162" cy="118" rx="34" ry="44" fill="#b0bec5"/>
      <ellipse cx="162" cy="118" rx="22" ry="30" fill="#f48fb1" opacity="0.5"/>
      {/* Body */}
      <ellipse cx="110" cy="162" rx="66" ry="48" fill="#c5d0d5"/>
      {/* Head */}
      <circle cx="110" cy="108" r="56" fill="#c5d0d5"/>
      {/* Eyes */}
      <circle cx="88" cy="96" r="11" fill="white"/>
      <circle cx="132" cy="96" r="11" fill="white"/>
      <circle cx="89" cy="97" r="7" fill="#222"/>
      <circle cx="133" cy="97" r="7" fill="#222"/>
      <circle cx="92" cy="94" r="2.5" fill="white"/>
      <circle cx="136" cy="94" r="2.5" fill="white"/>
      {/* Smile */}
      <path d="M 92 118 Q 110 130 128 118" stroke="#90a4ae" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Tusks */}
      <ellipse cx="94" cy="136" rx="9" ry="4" fill="#fffde7" transform="rotate(-25 94 136)"/>
      <ellipse cx="126" cy="136" rx="9" ry="4" fill="#fffde7" transform="rotate(25 126 136)"/>
      {/* Animated trunk */}
      <motion.g
        animate={eating
          ? { rotate: [-30, 30, -30], transition: { duration: 0.5, repeat: 4 } }
          : { rotate: [0, 12, 0, -6, 0] }}
        transition={eating ? {} : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
      >
        <path d="M 98 128 Q 90 150 88 172 Q 86 185 98 188 Q 112 192 120 178 Q 128 162 124 140"
              fill="#c5d0d5" stroke="#b0bec5" strokeWidth="1.5"/>
        <ellipse cx="105" cy="188" rx="13" ry="8" fill="#b0bec5"/>
      </motion.g>
    </svg>
  )
}
