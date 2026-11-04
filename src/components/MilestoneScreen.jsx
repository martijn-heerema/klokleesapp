import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from './Confetti'
import { useSpeech } from '../hooks/useSpeech'

const MILESTONE_DATA = {
  6: {
    emoji: '🌟',
    title: 'Wauw, 6 dieren geholpen!',
    subtitle: 'Je bent een echte dierenverzorger!',
    speech: 'Wauw, geweldig! Je hebt al zes dieren geholpen! Je bent een echte dierenverzorger!',
    bg: 'from-sky-300 to-emerald-300',
  },
  12: {
    emoji: '🏆',
    title: 'Halftime! 12 dieren blij!',
    subtitle: 'Je bent al halverwege — ga zo door!',
    speech: 'Fantastisch! Twaalf dieren zijn blij! Je bent al halverwege, ga zo door!',
    bg: 'from-amber-300 to-orange-300',
  },
  18: {
    emoji: '🚀',
    title: 'Bijna klaar! 18 dieren!',
    subtitle: 'Nog maar 6 dieren te gaan!',
    speech: 'Super goed! Achttien dieren geholpen! Nog maar zes dieren te gaan, je kunt het!',
    bg: 'from-purple-300 to-pink-300',
  },
}

export default function MilestoneScreen({ milestone, onContinue }) {
  const { speak, cancel } = useSpeech()
  const data = MILESTONE_DATA[milestone] ?? MILESTONE_DATA[6]

  useEffect(() => {
    const t = setTimeout(() => speak(data.speech), 600)
    return () => {
      clearTimeout(t)
      cancel()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`flex flex-col items-center justify-center h-full bg-gradient-to-b ${data.bg} overflow-hidden relative`}>
      <Confetti active />

      <motion.div
        className="flex flex-col items-center gap-6 z-10 px-6 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Groot emoji */}
        <motion.div
          className="text-9xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.5 }}
        >
          {data.emoji}
        </motion.div>

        {/* Mijlpaalteller */}
        <motion.div
          className="flex gap-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 280 }}
        >
          {Array.from({ length: milestone }, (_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-white shadow"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 + i * 0.04 }}
            />
          ))}
        </motion.div>

        {/* Titel + ondertitel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1
            className="font-black text-white drop-shadow-md"
            style={{ fontSize: 'clamp(24px, 5.5vw, 38px)', lineHeight: 1.2 }}
          >
            {data.title}
          </h1>
          <p className="mt-2 text-white/90 font-bold text-lg drop-shadow">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Doorgaan-knop */}
        <motion.button
          onClick={onContinue}
          className="mt-2 bg-white hover:bg-white/90 active:bg-white/80 font-black rounded-3xl shadow-xl px-10 py-5 transition-colors"
          style={{ fontSize: 22, minHeight: 68, color: '#92400e' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 260 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Doorgaan! ▶
        </motion.button>
      </motion.div>
    </div>
  )
}
