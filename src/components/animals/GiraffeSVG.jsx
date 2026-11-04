import React from 'react'
import { motion } from 'framer-motion'

export default function GiraffeSVG({ size = 220, eating = false }) {
  const spots = [
    { cx: 110, cy: 170, rx: 14, ry: 10 }, { cx: 136, cy: 152, rx: 10, ry: 8 },
    { cx: 84, cy: 155, rx: 11, ry: 9 }, { cx: 120, cy: 190, rx: 9, ry: 7 },
    { cx: 94, cy: 185, rx: 10, ry: 8 }, { cx: 110, cy: 126, rx: 8, ry: 6 },
  ]
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Ossicones (horns) */}
      <rect x="98" y="22" width="7" height="22" rx="3" fill="#a1887f"/>
      <circle cx="101" cy="21" r="5" fill="#8d6e63"/>
      <rect x="115" y="20" width="7" height="22" rx="3" fill="#a1887f"/>
      <circle cx="118" cy="19" r="5" fill="#8d6e63"/>
      {/* Neck */}
      <path d="M 92 100 Q 88 130 88 160 L 132 160 Q 132 130 128 100 Z" fill="#ffb300"/>
      {/* Neck spots */}
      <ellipse cx="108" cy="115" rx="7" ry="5" fill="#8d6e63" opacity="0.7"/>
      <ellipse cx="113" cy="135" rx="6" ry="5" fill="#8d6e63" opacity="0.7"/>
      {/* Body */}
      <ellipse cx="110" cy="182" rx="56" ry="38" fill="#ffb300"/>
      {/* Body spots */}
      {spots.map((s, i) => (
        <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill="#8d6e63" opacity="0.65"/>
      ))}
      {/* Head */}
      <ellipse cx="110" cy="70" rx="38" ry="30" fill="#ffca28"/>
      {/* Ears */}
      <ellipse cx="74" cy="68" rx="12" ry="18" fill="#ffb300"/>
      <ellipse cx="146" cy="68" rx="12" ry="18" fill="#ffb300"/>
      <ellipse cx="74" cy="68" rx="7" ry="11" fill="#f48fb1" opacity="0.6"/>
      <ellipse cx="146" cy="68" rx="7" ry="11" fill="#f48fb1" opacity="0.6"/>
      {/* Eyes */}
      <circle cx="94" cy="60" r="10" fill="white"/>
      <circle cx="126" cy="60" r="10" fill="white"/>
      <circle cx="95" cy="61" r="6" fill="#4e342e"/>
      <circle cx="127" cy="61" r="6" fill="#4e342e"/>
      <circle cx="97" cy="59" r="2" fill="white"/>
      <circle cx="129" cy="59" r="2" fill="white"/>
      {/* Animated lower jaw / muzzle chewing */}
      <motion.g
        animate={eating
          ? { y: [0, 8, 0, 8, 0] }
          : { y: [0, 3, 0] }}
        transition={eating
          ? { duration: 0.35, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="110" cy="84" rx="20" ry="10" fill="#ffb300"/>
        <ellipse cx="110" cy="84" rx="14" ry="7" fill="#e65100" opacity="0.3"/>
        <ellipse cx="110" cy="88" rx="18" ry="6" fill="#ffa000"/>
      </motion.g>
      {/* Nostrils */}
      <circle cx="104" cy="82" r="3" fill="#e65100" opacity="0.6"/>
      <circle cx="116" cy="82" r="3" fill="#e65100" opacity="0.6"/>
    </svg>
  )
}
