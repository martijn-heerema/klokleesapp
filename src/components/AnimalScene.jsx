import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Clock from './Clock'
import Confetti from './Confetti'
import { formatTimeNL } from '../utils/timeFormat'
import { ANIMAL_COMPONENTS } from './animals/index'
import FeedingOverlay from './feeding/FeedingOverlay'
import { useSpeech } from '../hooks/useSpeech'
import { rewardPhrases } from '../data/rewardPhrases'

// Fases: 'solving' → 'celebrating' (confetti) → 'feeding' → next
const CONFETTI_MS = 1200
const FEEDING_MS  = 2400

function playSuccess() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      const t = ctx.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.18, t + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
      osc.start(t)
      osc.stop(t + 0.35)
    })
  } catch (_) {}
}

function randomStartTime(animal, snapMinutes) {
  const targetH12 = animal.hour % 12 === 0 ? 12 : animal.hour % 12
  const hourPool = [1,2,3,4,5,6,7,8,9,10,11,12].filter(h => h !== targetH12)
  const randomH12 = hourPool[Math.floor(Math.random() * hourPool.length)]
  const isAM = animal.hour < 12
  let startHour
  if (randomH12 === 12) startHour = isAM ? 0 : 12
  else startHour = isAM ? randomH12 : randomH12 + 12

  const minutePool = snapMinutes.filter(m => m !== animal.minute)
  const startMinute = minutePool.length > 0
    ? minutePool[Math.floor(Math.random() * minutePool.length)]
    : 0

  return { hour: startHour, minute: startMinute }
}

export default function AnimalScene({ animal, level, animalIndex, totalAnimals, onNext }) {
  const start = randomStartTime(animal, level.snapMinutes)
  const [hour, setHour] = useState(start.hour)
  const [minute, setMinute] = useState(start.minute)
  const [correct, setCorrect] = useState(false)
  // phase: 'solving' | 'celebrating' | 'feeding'
  const [phase, setPhase] = useState('solving')
  const timersRef = useRef([])

  const { speak, cancel, isSpeaking, supported } = useSpeech()
  // Houdt per dier bij welke beloningszin als volgende aan de beurt is
  const phraseIndexRef = useRef({})
  // Vlag om een lopende async overgang te annuleren bij cleanup / navigatie
  const nextCancelledRef = useRef(false)

  // Platte instructietekst (geen ** markdown) voor spraak
  const timeLabel = formatTimeNL(animal.hour, animal.minute)
  const instructionPlain = animal.instruction.replace('{tijd}', timeLabel)
  // Gemarkeerde versie voor de tekstballon
  const instruction = animal.instruction.replace('{tijd}', `**${timeLabel}**`)
  const parts = instruction.split('**')

  // Cleanup timers on unmount / animal change.
  // Zet ook nextCancelledRef zodat een lopende async overgang stopt.
  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    nextCancelledRef.current = true
  }, [])

  // Reset state + start automatische uitspraak bij nieuw dier
  useEffect(() => {
    const s = randomStartTime(animal, level.snapMinutes)
    setHour(s.hour)
    setMinute(s.minute)
    setCorrect(false)
    setPhase('solving')
    clearTimers()

    // Spreek de opdracht uit na korte vertraging (wacht op scherm-overgang)
    const speechTimer = setTimeout(() => speak(instructionPlain), 600)

    return () => {
      clearTimeout(speechTimer)
      clearTimers()
      cancel()
    }
  }, [animal.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTimeChange = useCallback((h, m) => {
    setHour(h)
    setMinute(m)
    const targetH12 = animal.hour % 12 === 0 ? 12 : animal.hour % 12
    const currentH12 = h % 12 === 0 ? 12 : h % 12
    setCorrect(currentH12 === targetH12 && m === animal.minute)
  }, [animal.hour, animal.minute])

  const handleConfirm = useCallback(() => {
    if (!correct || phase !== 'solving') return

    // Beloningszin — kies de volgende zin uit de cyclus van 5
    const phrases = rewardPhrases[animal.id] ?? []
    const idx = phraseIndexRef.current[animal.id] ?? 0
    const celebText = phrases.length
      ? phrases[idx % phrases.length]
      : `Goed zo! ${animal.name.charAt(0).toUpperCase() + animal.name.slice(1)} is heel blij!`
    phraseIndexRef.current[animal.id] = (idx + 1) % (phrases.length || 1)

    playSuccess()
    setPhase('celebrating')
    clearTimers()
    nextCancelledRef.current = false   // klaar voor nieuwe overgang

    // Confetti loopt gewoon mee — hoeft niet te wachten
    const t1 = setTimeout(() => setPhase('feeding'), CONFETTI_MS)
    timersRef.current = [t1]

    // Overgang naar volgend dier: wacht tot spraak klaar is + 500 ms extra
    ;(async () => {
      await speak(celebText)
      await new Promise(r => {
        const t = setTimeout(r, 500)
        timersRef.current.push(t)
      })
      if (!nextCancelledRef.current) onNext()
    })()
  }, [correct, phase, onNext, clearTimers, speak, animal.id, animal.name])

  const AnimalSVG = ANIMAL_COMPONENTS[animal.id]
  const isEating = phase === 'feeding'

  return (
    <div className={`flex flex-col h-full bg-gradient-to-b ${animal.bg} overflow-hidden relative`}>
      <Confetti active={phase === 'celebrating'} />

      {/* Progress bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1 shrink-0">
        <div className="flex gap-2">
          {Array.from({ length: totalAnimals }, (_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${
              i < animalIndex ? 'bg-green-500' : i === animalIndex ? 'bg-amber-500' : 'bg-white/50'
            }`}/>
          ))}
        </div>
        <span className="text-sm font-bold text-white/80">{animalIndex + 1} / {totalAnimals}</span>
      </div>

      {/* Animal + scene */}
      <div className="flex flex-col items-center px-4 shrink-0">
        {/* SVG dier */}
        <div className="relative flex items-center justify-center" style={{ height: 200 }}>
          <motion.div
            animate={isEating ? { x: [0, 8, -4, 0], y: [0, -6, 0] } : {}}
            transition={isEating ? { duration: 0.5, repeat: 2 } : {}}
          >
            {AnimalSVG
              ? <AnimalSVG size={200} eating={isEating} />
              : <span style={{ fontSize: 96 }}>{animal.emoji}</span>
            }
          </motion.div>

          <AnimatePresence>
            {isEating && <FeedingOverlay key="feed" animalId={animal.id} />}
          </AnimatePresence>
        </div>

        {/* Pim */}
        <div className="absolute top-12 right-6">
          <motion.div
            className="text-4xl"
            animate={phase !== 'solving' ? { rotate: [-10, 10, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            🧑‍🌾
          </motion.div>
        </div>

        {/* Tekstballon + herhaalknop */}
        <div className="w-full max-w-sm flex items-start gap-2 mt-1">
          <AnimatePresence mode="wait">
            {phase === 'solving' ? (
              <motion.div
                key="instruction"
                className="flex-1 bg-white rounded-3xl px-5 py-3 shadow-lg text-center relative"
                style={{ minHeight: 64 }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{ borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '12px solid white' }}
                />
                <p className="text-amber-900 font-bold" style={{ fontSize: 17, lineHeight: 1.4 }}>
                  {parts.map((part, i) =>
                    i % 2 === 1
                      ? <strong key={i} className="text-amber-600">{part}</strong>
                      : <span key={i}>{part}</span>
                  )}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="celebration"
                className="flex-1 bg-green-400 rounded-3xl px-5 py-3 shadow-lg text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <p className="text-white font-black" style={{ fontSize: 18 }}>
                  Goed zo! 🌟 {animal.celebration}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🔊 Herhaalknop — alleen tijdens 'solving' en als spraak ondersteund */}
          {supported && phase === 'solving' && (
            <motion.button
              onClick={() => speak(instructionPlain)}
              className="shrink-0 flex items-center justify-center rounded-full bg-white/80 hover:bg-white active:scale-95 shadow-md transition-colors"
              style={{ width: 56, height: 56, fontSize: 28 }}
              animate={isSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={isSpeaking ? { repeat: Infinity, duration: 0.8 } : {}}
              aria-label="Opnieuw afspelen"
              title="Nogmaals horen"
            >
              🔊
            </motion.button>
          )}
        </div>
      </div>

      {/* Klok + bevestig-knop */}
      <div className="flex flex-col items-center justify-center flex-1 gap-3 py-2">
        <Clock
          hour={hour}
          minute={minute}
          snapMinutes={level.snapMinutes}
          minuteFixed={level.minuteFixed}
          onTimeChange={handleTimeChange}
          levelId={level.id}
        />

        <motion.button
          onClick={handleConfirm}
          disabled={!correct || phase !== 'solving'}
          className={`font-black rounded-3xl px-12 py-4 shadow-lg transition-all
            ${correct && phase === 'solving'
              ? 'bg-green-400 hover:bg-green-500 active:bg-green-600 text-white cursor-pointer'
              : 'bg-white/40 text-white/60 cursor-not-allowed'
            }`}
          style={{ fontSize: 22, minHeight: 64, minWidth: 200 }}
          whileTap={correct && phase === 'solving' ? { scale: 0.95 } : {}}
          animate={correct && phase === 'solving' ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={correct && phase === 'solving' ? { repeat: Infinity, duration: 1.5 } : {}}
        >
          Klaar! ✓
        </motion.button>
      </div>
    </div>
  )
}
