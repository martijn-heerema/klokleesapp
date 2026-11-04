import React from 'react'
import { motion } from 'framer-motion'

export default function RoosterSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Tail feathers */}
      <ellipse cx="162" cy="155" rx="16" ry="36" fill="#e53935" transform="rotate(30 162 155)"/>
      <ellipse cx="172" cy="148" rx="14" ry="34" fill="#fdd835" transform="rotate(50 172 148)"/>
      <ellipse cx="155" cy="162" rx="14" ry="30" fill="#1e88e5" transform="rotate(15 155 162)"/>
      {/* Body */}
      <ellipse cx="106" cy="165" rx="52" ry="44" fill="#f5f5f0"/>
      {/* Wing detail */}
      <ellipse cx="102" cy="162" rx="36" ry="30" fill="#e0e0da"/>
      {/* Animated head + neck */}
      <motion.g
        animate={eating
          ? { y: [0, 12, 0, 12, 0] }
          : { y: [0, -8, 0] }}
        transition={eating
          ? { duration: 0.3, repeat: 4 }
          : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Neck */}
        <ellipse cx="96" cy="128" rx="22" ry="28" fill="#f5f5f0"/>
        {/* Wattle */}
        <ellipse cx="90" cy="118" rx="12" ry="18" fill="#e53935"/>
        {/* Head */}
        <circle cx="92" cy="90" r="34" fill="#f5f5f0"/>
        {/* Comb */}
        <path d="M 78 68 Q 84 52 88 68 Q 94 50 98 68 Q 104 52 108 68" fill="#e53935"/>
        {/* Beak */}
        <path d="M 62 92 L 76 86 L 76 98 Z" fill="#ff8f00"/>
        {/* Wattle under beak */}
        <ellipse cx="70" cy="102" rx="10" ry="14" fill="#e53935"/>
        {/* Eyes */}
        <circle cx="92" cy="84" r="10" fill="white"/>
        <circle cx="93" cy="85" r="6" fill="#222"/>
        <circle cx="95" cy="83" r="2" fill="white"/>
      </motion.g>
    </svg>
  )
}
