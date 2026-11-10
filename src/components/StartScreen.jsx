import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSpeech } from '../hooks/useSpeech'

export default function StartScreen({ onStart }) {
  const { speak, cancel } = useSpeech()

  useEffect(() => {
    const t = setTimeout(
      () => speak('Hallo! Help jij Pim met de dieren? Start de ronde!'),
      400
    )
    return () => {
      clearTimeout(t)
      cancel()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex flex-col items-center justify-center min-h-full py-16 bg-gradient-to-b from-sky-200 to-green-200 overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-8 text-6xl opacity-40 animate-bounce" style={{ animationDuration: '3s' }}>☁️</div>
        <div className="absolute top-12 right-24 text-5xl opacity-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>☁️</div>
        <div className="absolute bottom-8 left-12 text-4xl opacity-50">🌿</div>
        <div className="absolute bottom-4 right-16 text-5xl opacity-50">🌳</div>
        <div className="absolute bottom-12 left-32 text-3xl opacity-40">🌸</div>
        <div className="absolute top-1/3 left-4 text-3xl opacity-30">🦋</div>
      </div>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center gap-5 sm:gap-6 z-10 px-6 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Pim the zookeeper */}
        <motion.div
          className="text-7xl sm:text-8xl"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          🧑‍🌾
        </motion.div>

        <div>
          <h1 className="font-black text-amber-900" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.2 }}>
            De Dierentuin
          </h1>
          <h1 className="font-black text-amber-900" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1.2 }}>
            van Pim
          </h1>
        </div>

        <p className="text-amber-800 font-bold text-xl max-w-xs">
          Help Pim de dieren verzorgen door de klok goed te zetten!
        </p>

        {/* Animal preview row */}
        <div className="flex gap-3 text-4xl">
          {['🐘', '🦁', '🐒', '🐧', '🦒', '🐻'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2, ease: 'easeInOut' }}
            >
              {e}
            </motion.span>
          ))}
        </div>

        <motion.button
          onClick={onStart}
          className="mt-4 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-amber-900 font-black rounded-3xl shadow-lg px-12 py-5 transition-colors"
          style={{ fontSize: 26, minHeight: 72, minWidth: 240 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Start de ronde! 🎯
        </motion.button>
      </motion.div>
    </div>
  )
}
