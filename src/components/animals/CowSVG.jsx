import React from 'react'
import { motion } from 'framer-motion'

export default function CowSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="110" cy="162" rx="70" ry="48" fill="#f5f5f5"/>
      {/* Black spots */}
      <ellipse cx="82" cy="155" rx="22" ry="18" fill="#212121" opacity="0.85"/>
      <ellipse cx="140" cy="170" rx="18" ry="14" fill="#212121" opacity="0.85"/>
      <ellipse cx="118" cy="143" rx="14" ry="10" fill="#212121" opacity="0.7"/>
      {/* Udder */}
      <ellipse cx="110" cy="204" rx="28" ry="12" fill="#f48fb1"/>
      {/* Animated tail */}
      <motion.g
        animate={eating
          ? { rotate: [-40, 40, -40, 40, 0] }
          : { rotate: [-20, 20, -20] }}
        transition={eating
          ? { duration: 0.3, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'left top' }}
      >
        <path d="M 168 165 Q 190 150 195 128 Q 198 110 190 100" stroke="#f5f5f5"
              strokeWidth="10" strokeLinecap="round" fill="none"/>
        <ellipse cx="190" cy="98" rx="12" ry="10" fill="#bdbdbd"/>
      </motion.g>
      {/* Neck */}
      <ellipse cx="96" cy="120" rx="26" ry="30" fill="#f5f5f5"/>
      {/* Head */}
      <ellipse cx="88" cy="84" rx="42" ry="38" fill="#f5f5f5"/>
      {/* Horns */}
      <path d="M 68 62 Q 58 44 64 36" stroke="#d4a85c" strokeWidth="7" strokeLinecap="round" fill="none"/>
      <path d="M 108 58 Q 118 40 116 32" stroke="#d4a85c" strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* Ear */}
      <ellipse cx="54" cy="76" rx="14" ry="18" fill="#f5f5f5"/>
      <ellipse cx="54" cy="76" rx="8" ry="11" fill="#f48fb1" opacity="0.6"/>
      <ellipse cx="124" cy="72" rx="14" ry="18" fill="#f5f5f5"/>
      <ellipse cx="124" cy="72" rx="8" ry="11" fill="#f48fb1" opacity="0.6"/>
      {/* Head spot */}
      <ellipse cx="96" cy="80" rx="16" ry="12" fill="#212121" opacity="0.6"/>
      {/* Eyes */}
      <circle cx="74" cy="78" r="11" fill="white"/>
      <circle cx="104" cy="76" r="11" fill="white"/>
      <circle cx="75" cy="79" r="7" fill="#333"/>
      <circle cx="105" cy="77" r="7" fill="#333"/>
      <circle cx="77" cy="77" r="2.5" fill="white"/>
      <circle cx="107" cy="75" r="2.5" fill="white"/>
      {/* Muzzle */}
      <ellipse cx="88" cy="102" rx="26" ry="18" fill="#f8bbd0"/>
      {/* Nostrils */}
      <circle cx="80" cy="106" r="6" fill="#e91e63" opacity="0.5"/>
      <circle cx="96" cy="106" r="6" fill="#e91e63" opacity="0.5"/>
    </svg>
  )
}
