import React from 'react'
import { motion } from 'framer-motion'

export default function HedgehogSVG({ size = 220, eating = false }) {
  // Spine positions across the back
  const spines = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17
    const cx = 60 + t * 100
    const cy = 130 - Math.sin(t * Math.PI) * 24
    const angle = -80 + t * 20
    return { cx, cy, angle }
  })

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Spiny back */}
      {spines.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx="4" ry="14" fill="#5d4037"
          transform={`rotate(${s.angle} ${s.cx} ${s.cy})`}/>
      ))}
      {/* Body */}
      <ellipse cx="100" cy="164" rx="62" ry="40" fill="#8d6e63"/>
      {/* Belly */}
      <ellipse cx="100" cy="168" rx="42" ry="28" fill="#d7ccc8"/>
      {/* Animated snout */}
      <motion.g
        animate={eating
          ? { y: [0, -6, 4, -4, 0], x: [0, 3, -3, 2, 0] }
          : { y: [0, -4, 0], x: [0, 2, 0] }}
        transition={eating
          ? { duration: 0.3, repeat: 4 }
          : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Head */}
        <ellipse cx="52" cy="152" rx="34" ry="28" fill="#8d6e63"/>
        {/* Snout */}
        <ellipse cx="30" cy="158" rx="18" ry="12" fill="#a1887f"/>
        {/* Nose */}
        <ellipse cx="18" cy="156" rx="8" ry="6" fill="#212121"/>
        <ellipse cx="17" cy="155" rx="4" ry="3" fill="#555"/>
        {/* Eyes */}
        <circle cx="48" cy="144" r="10" fill="white"/>
        <circle cx="49" cy="145" r="6" fill="#212121"/>
        <circle cx="51" cy="143" r="2" fill="white"/>
        {/* Ear */}
        <ellipse cx="54" cy="130" rx="10" ry="14" fill="#6d4c41"/>
        <ellipse cx="54" cy="130" rx="6" ry="9" fill="#f48fb1" opacity="0.5"/>
      </motion.g>
      {/* Small legs */}
      <ellipse cx="72" cy="198" rx="14" ry="8" fill="#795548"/>
      <ellipse cx="100" cy="202" rx="14" ry="8" fill="#795548"/>
      <ellipse cx="128" cy="198" rx="14" ry="8" fill="#795548"/>
    </svg>
  )
}
