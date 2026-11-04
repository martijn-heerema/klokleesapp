import React from 'react'
import { motion } from 'framer-motion'

export default function MonkeySVG({ size = 220, eating = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 220 220" fill="none"
      animate={eating ? { y: [0, -18, 0, -18, 0] } : { y: [0, -10, 0] }}
      transition={eating
        ? { duration: 0.4, repeat: 3 }
        : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Tail behind body */}
      <path d="M 148 175 Q 180 170 185 148 Q 190 128 170 122" stroke="#795548" strokeWidth="9"
            strokeLinecap="round" fill="none"/>
      {/* Body */}
      <ellipse cx="110" cy="160" rx="52" ry="46" fill="#8d6e63"/>
      {/* Belly */}
      <ellipse cx="110" cy="165" rx="34" ry="32" fill="#d7b59a"/>
      {/* Left ear */}
      <circle cx="62" cy="98" r="22" fill="#8d6e63"/>
      <circle cx="62" cy="98" r="13" fill="#d7b59a"/>
      {/* Right ear */}
      <circle cx="158" cy="98" r="22" fill="#8d6e63"/>
      <circle cx="158" cy="98" r="13" fill="#d7b59a"/>
      {/* Head */}
      <circle cx="110" cy="96" r="50" fill="#8d6e63"/>
      {/* Face oval */}
      <ellipse cx="110" cy="106" rx="32" ry="28" fill="#d7b59a"/>
      {/* Eyes */}
      <circle cx="94" cy="88" r="11" fill="white"/>
      <circle cx="126" cy="88" r="11" fill="white"/>
      <circle cx="95" cy="89" r="7" fill="#222"/>
      <circle cx="127" cy="89" r="7" fill="#222"/>
      <circle cx="97" cy="86" r="2.5" fill="white"/>
      <circle cx="129" cy="86" r="2.5" fill="white"/>
      {/* Nose */}
      <ellipse cx="110" cy="108" rx="10" ry="7" fill="#a1887f"/>
      <circle cx="106" cy="108" r="3" fill="#6d4c41"/>
      <circle cx="114" cy="108" r="3" fill="#6d4c41"/>
      {/* Smile */}
      <path d="M 96 118 Q 110 128 124 118" stroke="#6d4c41" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </motion.svg>
  )
}
