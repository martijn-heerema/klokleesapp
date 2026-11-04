import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#fb923c']
const COUNT = 40

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

export default function Confetti({ active }) {
  if (!active) return null

  const pieces = Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(5, 95),
    color: COLORS[i % COLORS.length],
    size: randomBetween(8, 18),
    delay: randomBetween(0, 0.4),
    duration: randomBetween(1.2, 2.2),
    rotate: randomBetween(-180, 180),
    shape: i % 3 === 0 ? 'circle' : i % 3 === 1 ? 'square' : 'star',
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.shape !== 'star' ? p.color : 'transparent',
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '0',
            fontSize: p.shape === 'star' ? p.size + 4 : undefined,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [1, 1, 0],
            rotate: [0, p.rotate * 3],
            x: [0, randomBetween(-60, 60)],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        >
          {p.shape === 'star' ? '⭐' : null}
        </motion.div>
      ))}
    </div>
  )
}
