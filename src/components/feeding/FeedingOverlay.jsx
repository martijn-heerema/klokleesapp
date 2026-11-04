import React from 'react'
import { motion } from 'framer-motion'
import { FEEDING_DATA } from './feedingData'

const FROM_START = {
  top:   { x: 0,   y: -120, opacity: 0 },
  right: { x: 120, y: 0,    opacity: 0 },
  left:  { x: -120, y: 0,   opacity: 0 },
}

/**
 * Voer-animatie overlay — geeft een voedselitem weer dat naar het dier beweegt,
 * daarna verkleint en verdwijnt (wordt "opgegeten").
 * De totale animatieduur is ~2.4s zodat de scene-timing klopt.
 */
export default function FeedingOverlay({ animalId }) {
  const data = FEEDING_DATA[animalId]
  if (!data) return null

  const startPos = FROM_START[data.from] ?? FROM_START.top

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Food item animatie */}
      <motion.div
        className="absolute"
        style={{ fontSize: 64, zIndex: 10 }}
        initial={{ ...startPos, scale: 1.4 }}
        animate={[
          // 1. Komt binnen (0.5s)
          { x: 0, y: -30, opacity: 1, scale: 1.4, transition: { duration: 0.5, ease: 'easeOut' } },
          // 2. Beweegt richting mond van het dier (0.6s)
          { x: 0, y: 20, opacity: 1, scale: 1.1, transition: { duration: 0.6, ease: 'easeIn', delay: 0.4 } },
          // 3. Wordt opgegeten: krimpt en verdwijnt (0.5s)
          { x: 0, y: 40, opacity: 0, scale: 0.2, transition: { duration: 0.5, ease: 'easeIn', delay: 0.2 } },
        ]}
      >
        {data.food}
      </motion.div>

      {/* Kleine hapjes-sterretjes rondom de mond */}
      {['✨', '⭐', '✨'].map((star, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ fontSize: 24, zIndex: 11 }}
          initial={{ opacity: 0, scale: 0, x: (i - 1) * 40, y: 20 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            y: [20, -20 - i * 10, -50],
          }}
          transition={{ duration: 0.8, delay: 1.0 + i * 0.1, ease: 'easeOut' }}
        >
          {star}
        </motion.div>
      ))}
    </div>
  )
}
