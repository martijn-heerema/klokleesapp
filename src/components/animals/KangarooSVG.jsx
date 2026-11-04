import React from 'react'
import { motion } from 'framer-motion'

export default function KangarooSVG({ size = 220, eating = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 220 220" fill="none"
      animate={eating
        ? { y: [0, -22, 0, -22, 0] }
        : { y: [0, -12, 0] }}
      transition={eating
        ? { duration: 0.38, repeat: 3 }
        : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Tail */}
      <path d="M 140 196 Q 172 190 184 168 Q 192 148 180 132" stroke="#c49240"
            strokeWidth="20" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <ellipse cx="108" cy="162" rx="52" ry="50" fill="#d4a85c"/>
      {/* Pouch */}
      <path d="M 78 170 Q 78 192 108 194 Q 138 192 138 170 Q 124 178 108 178 Q 92 178 78 170 Z"
            fill="#c49240"/>
      {/* Tiny joey face in pouch */}
      <circle cx="108" cy="182" r="10" fill="#d4a85c"/>
      <circle cx="104" cy="179" r="3" fill="#333"/>
      <circle cx="112" cy="179" r="3" fill="#333"/>
      {/* Neck */}
      <ellipse cx="96" cy="118" rx="22" ry="30" fill="#d4a85c"/>
      {/* Head */}
      <ellipse cx="88" cy="84" rx="32" ry="40" fill="#d4a85c"/>
      {/* Ear */}
      <ellipse cx="72" cy="52" rx="10" ry="22" fill="#c49240"/>
      <ellipse cx="72" cy="52" rx="6" ry="14" fill="#f48fb1" opacity="0.5"/>
      <ellipse cx="96" cy="46" rx="10" ry="22" fill="#c49240"/>
      <ellipse cx="96" cy="46" rx="6" ry="14" fill="#f48fb1" opacity="0.5"/>
      {/* Eye */}
      <circle cx="80" cy="78" r="11" fill="white"/>
      <circle cx="81" cy="79" r="7" fill="#333"/>
      <circle cx="83" cy="77" r="2.5" fill="white"/>
      {/* Muzzle */}
      <ellipse cx="88" cy="104" rx="18" ry="12" fill="#c49240"/>
      <ellipse cx="82" cy="108" rx="5" ry="4" fill="#a07840"/>
      <ellipse cx="94" cy="108" rx="5" ry="4" fill="#a07840"/>
      {/* Front arms */}
      <path d="M 78 148 Q 64 162 60 178" stroke="#c49240" strokeWidth="12" strokeLinecap="round" fill="none"/>
      <path d="M 118 148 Q 134 162 136 178" stroke="#c49240" strokeWidth="12" strokeLinecap="round" fill="none"/>
    </motion.svg>
  )
}
