import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StartScreen from './components/StartScreen'
import AnimalScene from './components/AnimalScene'
import EndScreen from './components/EndScreen'
import MilestoneScreen from './components/MilestoneScreen'
import ParentMenu from './components/ParentMenu'
import { LEVELS } from './data/levels'
import { unlockAudio } from './utils/audio'

const MILESTONES = [6, 12, 18]

const STORAGE_KEY = 'dierentuin_level'

function loadLevel() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const id = parseInt(saved, 10)
    if (id >= 1 && id <= 4) return id
  } catch (_) {}
  return 1
}

function saveLevel(id) {
  try { localStorage.setItem(STORAGE_KEY, String(id)) } catch (_) {}
}

export default function App() {
  const [screen, setScreen] = useState('start') // 'start' | 'animal' | 'milestone' | 'end'
  const [levelId, setLevelId] = useState(loadLevel)
  const [animalIndex, setAnimalIndex] = useState(0)
  const [milestone, setMilestone] = useState(6)
  const [parentMenuOpen, setParentMenuOpen] = useState(false)

  const level = LEVELS.find(l => l.id === levelId) ?? LEVELS[0]

  const handleStart = useCallback(() => {
    unlockAudio()
    setAnimalIndex(0)
    setScreen('animal')
  }, [])

  const handleNext = useCallback(() => {
    const nextIndex = animalIndex + 1
    if (nextIndex >= level.animals.length) {
      setScreen('end')
    } else {
      setAnimalIndex(nextIndex)
      if (MILESTONES.includes(nextIndex)) {
        setMilestone(nextIndex)
        setScreen('milestone')
      }
    }
  }, [animalIndex, level.animals.length])

  const handleMilestoneContinue = useCallback(() => {
    setScreen('animal')
  }, [])

  const handleRestart = useCallback(() => {
    setAnimalIndex(0)
    setScreen('animal')
  }, [])

  const handleGoHome = useCallback(() => {
    setAnimalIndex(0)
    setScreen('start')
  }, [])

  const handleSelectLevel = useCallback((id) => {
    setLevelId(id)
    saveLevel(id)
    setScreen('start')
    setAnimalIndex(0)
  }, [])

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  }

  return (
    <div className="w-full h-full relative overflow-hidden no-select">

      {/* Persistent top-right overlay: home + settings */}
      <div className="absolute top-3 right-3 z-50 flex gap-2">
        {screen !== 'start' && (
          <button
            onClick={handleGoHome}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 hover:bg-white active:scale-95 text-xl shadow-md transition-all"
            aria-label="Terug naar hoofdmenu"
            title="Hoofdmenu"
          >
            🏠
          </button>
        )}
        <button
          onClick={() => setParentMenuOpen(true)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 hover:bg-white active:scale-95 text-xl shadow-md transition-all"
          aria-label="Ouderinstellingen"
          title="Niveau kiezen"
        >
          ⚙️
        </button>
      </div>

      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <motion.div
            key="start"
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-area"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <StartScreen onStart={handleStart} />
          </motion.div>
        )}

        {screen === 'animal' && (
          <motion.div
            key={`animal-${animalIndex}`}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-area"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <AnimalScene
              animal={level.animals[animalIndex]}
              level={level}
              animalIndex={animalIndex}
              totalAnimals={level.animals.length}
              onNext={handleNext}
            />
          </motion.div>
        )}

        {screen === 'milestone' && (
          <motion.div
            key={`milestone-${milestone}`}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-area"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <MilestoneScreen
              milestone={milestone}
              onContinue={handleMilestoneContinue}
            />
          </motion.div>
        )}

        {screen === 'end' && (
          <motion.div
            key="end"
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-area"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <EndScreen level={level} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>

      <ParentMenu
        open={parentMenuOpen}
        currentLevel={levelId}
        onSelectLevel={handleSelectLevel}
        onClose={() => setParentMenuOpen(false)}
      />
    </div>
  )
}
