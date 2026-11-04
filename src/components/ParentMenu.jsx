import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LEVELS } from '../data/levels'

export default function ParentMenu({ open, currentLevel, onSelectLevel, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-2xl font-bold transition-colors"
                aria-label="Sluiten"
              >
                ×
              </button>

              <h2 className="text-2xl font-black text-amber-800 mb-2 text-center">
                Kies een niveau
              </h2>
              <p className="text-center text-gray-500 text-sm mb-6">
                (ouder-instellingen)
              </p>

              <div className="flex flex-col gap-3">
                {LEVELS.map(level => (
                  <button
                    key={level.id}
                    onClick={() => {
                      onSelectLevel(level.id)
                      onClose()
                    }}
                    className={`w-full py-4 px-5 rounded-2xl text-left font-bold text-lg transition-all
                      ${currentLevel === level.id
                        ? 'bg-amber-400 text-amber-900 shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border-2 border-amber-200'
                      }`}
                    style={{ minHeight: 64 }}
                  >
                    <span className="block">{level.description}</span>
                    {currentLevel === level.id && (
                      <span className="text-sm font-normal text-amber-700">✓ Huidig niveau</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
