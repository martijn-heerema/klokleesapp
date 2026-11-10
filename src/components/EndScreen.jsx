import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../hooks/useSpeech'

export default function EndScreen({ level, onRestart }) {
  const { speak, cancel } = useSpeech()

  useEffect(() => {
    const t = setTimeout(
      () => speak('Alle dieren zijn blij! Wat een goede dierenverzorger ben jij!'),
      600
    )
    return () => {
      clearTimeout(t)
      cancel()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-16 bg-gradient-to-b from-sky-200 to-green-300 overflow-hidden relative">

      {/* Confetti-like background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['⭐', '🌟', '✨', '🎉', '🎊'].map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{ left: `${15 + i * 17}%`, top: '-10%' }}
            animate={{ y: ['0vh', '115vh'], rotate: [0, 360] }}
            transition={{ duration: 3 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: 'linear' }}
          >
            {e}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex flex-col items-center gap-6 z-10 px-6 text-center"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.div
          className="text-7xl sm:text-8xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          🌟
        </motion.div>

        <div>
          <h1 className="font-black text-amber-900" style={{ fontSize: 'clamp(26px, 5vw, 40px)' }}>
            Alle dieren zijn blij!
          </h1>
          <p className="text-amber-800 font-bold text-lg mt-1">
            Pim is zo trots op jou! 🧑‍🌾
          </p>
        </div>

        {/* Alle dieren van dit niveau */}
        <div className="flex flex-wrap justify-center gap-3 max-w-xs">
          {level.animals.map((animal, i) => (
            <motion.div
              key={animal.id}
              className="flex flex-col items-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.12, type: 'spring', stiffness: 300 }}
            >
              <span className="text-5xl">{animal.emoji}</span>
              <span className="text-xs font-bold text-amber-800 mt-1 capitalize">
                {animal.name.replace('de ', '').replace('het ', '')}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.button
          onClick={onRestart}
          className="mt-2 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-900 font-black rounded-3xl shadow-lg px-10 py-5 transition-colors"
          style={{ fontSize: 22, minHeight: 68 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Nog een ronde doen! 🔄
        </motion.button>
      </motion.div>
    </div>
  )
}
