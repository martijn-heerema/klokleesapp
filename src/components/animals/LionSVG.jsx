import React from 'react'
import { motion } from 'framer-motion'

export default function LionSVG({ size = 220, eating = false }) {
  // Mane points around the head
  const manePoints = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
    const r = 72
    const cx = 110 + r * Math.cos(angle)
    const cy = 100 + r * Math.sin(angle)
    return { cx, cy, angle }
  })

  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="110" cy="168" rx="58" ry="42" fill="#f9a825"/>
      {/* Mane blobs */}
      {manePoints.map((p, i) => (
        <ellipse key={i} cx={p.cx} cy={p.cy} rx="20" ry="26"
          fill={i % 2 === 0 ? '#e65100' : '#bf360c'}
          transform={`rotate(${(p.angle * 180) / Math.PI + 90} ${p.cx} ${p.cy})`}
          opacity="0.9"/>
      ))}
      {/* Head */}
      <circle cx="110" cy="100" r="54" fill="#ffca28"/>
      {/* Inner face */}
      <ellipse cx="110" cy="108" rx="36" ry="30" fill="#ffe082"/>
      {/* Eyes */}
      <circle cx="92" cy="90" r="11" fill="white"/>
      <circle cx="128" cy="90" r="11" fill="white"/>
      <circle cx="93" cy="91" r="7" fill="#33691e"/>
      <circle cx="129" cy="91" r="7" fill="#33691e"/>
      <circle cx="90" cy="88" r="3" fill="#222"/>
      <circle cx="126" cy="88" r="3" fill="#222"/>
      <circle cx="91" cy="87" r="1.5" fill="white"/>
      <circle cx="127" cy="87" r="1.5" fill="white"/>
      {/* Nose */}
      <ellipse cx="110" cy="110" rx="10" ry="7" fill="#e91e63"/>
      {/* Whisker dots */}
      <circle cx="88" cy="116" r="2.5" fill="#f9a825"/>
      <circle cx="98" cy="120" r="2.5" fill="#f9a825"/>
      <circle cx="122" cy="120" r="2.5" fill="#f9a825"/>
      <circle cx="132" cy="116" r="2.5" fill="#f9a825"/>
      {/* Smile */}
      <path d="M 96 120 Q 110 132 124 120" stroke="#e91e63" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Animated tail */}
      <motion.g
        animate={eating
          ? { rotate: [-40, 40, -40, 40, 0] }
          : { rotate: [-20, 20, -20] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'left top' }}
      >
        <path d="M 158 172 Q 178 160 185 145 Q 190 130 182 118" stroke="#f9a825"
              strokeWidth="10" strokeLinecap="round" fill="none"/>
        <circle cx="182" cy="115" r="12" fill="#e65100"/>
      </motion.g>
    </svg>
  )
}
