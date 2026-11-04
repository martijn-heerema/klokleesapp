import React from 'react'
import { motion } from 'framer-motion'

export default function ZebraSVG({ size = 220, eating = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 220 220" fill="none">
      {/* Body */}
      <ellipse cx="112" cy="170" rx="62" ry="42" fill="#f5f5f5"/>
      {/* Body stripes */}
      <path d="M 68 158 Q 72 148 78 155 Q 82 162 76 172" fill="#212121" opacity="0.8"/>
      <path d="M 86 152 Q 90 140 96 148 Q 100 156 94 168" fill="#212121" opacity="0.8"/>
      <path d="M 106 148 Q 110 136 116 144 Q 120 152 114 165" fill="#212121" opacity="0.8"/>
      <path d="M 126 150 Q 130 140 136 148 Q 140 156 134 168" fill="#212121" opacity="0.8"/>
      <path d="M 144 156 Q 148 148 154 156 Q 156 164 150 172" fill="#212121" opacity="0.8"/>
      {/* Neck */}
      <path d="M 90 140 Q 84 112 88 88 L 116 88 Q 118 112 128 140 Z" fill="#f5f5f5"/>
      <path d="M 88 128 Q 84 112 88 96 L 96 88" stroke="#212121" strokeWidth="8" fill="none" opacity="0.7"/>
      <path d="M 110 88 Q 116 108 118 128" stroke="#212121" strokeWidth="8" fill="none" opacity="0.7"/>
      {/* Mane */}
      <path d="M 88 88 Q 80 96 78 108 Q 76 122 80 134"
            stroke="#212121" strokeWidth="10" fill="none" strokeLinecap="round"/>
      {/* Head */}
      <ellipse cx="100" cy="68" rx="28" ry="38" fill="#f5f5f5"/>
      {/* Head stripes */}
      <path d="M 78 60 Q 82 52 88 58 Q 90 64 86 70" fill="#212121" opacity="0.7"/>
      <path d="M 92 52 Q 96 44 102 50 Q 104 56 100 64" fill="#212121" opacity="0.7"/>
      <path d="M 108 54 Q 112 46 118 52 Q 120 60 116 68" fill="#212121" opacity="0.7"/>
      {/* Eye */}
      <circle cx="90" cy="62" r="10" fill="white"/>
      <circle cx="91" cy="63" r="7" fill="#333"/>
      <circle cx="93" cy="61" r="2.5" fill="white"/>
      {/* Ear */}
      <ellipse cx="86" cy="36" rx="9" ry="16" fill="#f5f5f5"/>
      <ellipse cx="86" cy="36" rx="5" ry="10" fill="#f48fb1" opacity="0.5"/>
      <ellipse cx="114" cy="34" rx="9" ry="16" fill="#f5f5f5"/>
      <ellipse cx="114" cy="34" rx="5" ry="10" fill="#f48fb1" opacity="0.5"/>
      {/* Muzzle */}
      <ellipse cx="100" cy="86" rx="20" ry="14" fill="#e0e0e0"/>
      <ellipse cx="92" cy="90" rx="6" ry="4" fill="#bdbdbd"/>
      <ellipse cx="108" cy="90" rx="6" ry="4" fill="#bdbdbd"/>
      {/* Animated tail */}
      <motion.g
        animate={eating
          ? { rotate: [-35, 35, -35, 35, 0] }
          : { rotate: [-18, 18, -18] }}
        transition={eating
          ? { duration: 0.3, repeat: 3 }
          : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'left top' }}
      >
        <path d="M 162 170 Q 184 160 190 142 Q 194 126 184 114" stroke="#f5f5f5"
              strokeWidth="10" strokeLinecap="round" fill="none"/>
        <path d="M 162 170 Q 184 160 190 142 Q 194 126 184 114" stroke="#212121"
              strokeWidth="4" strokeLinecap="round" fill="none" strokeDasharray="6 4"/>
        <ellipse cx="184" cy="112" rx="10" ry="10" fill="#212121"/>
      </motion.g>
    </svg>
  )
}
