import { useRef, useCallback } from 'react'

/**
 * Detects 3 taps/clicks within 2 seconds on the returned handler.
 * Calls onTripleTap() when triggered.
 */
export function useTripleTap(onTripleTap) {
  const tapsRef = useRef([])

  const handleTap = useCallback(() => {
    const now = Date.now()
    tapsRef.current.push(now)
    // Keep only taps within the last 2 seconds
    tapsRef.current = tapsRef.current.filter(t => now - t < 2000)
    if (tapsRef.current.length >= 3) {
      tapsRef.current = []
      onTripleTap()
    }
  }, [onTripleTap])

  return handleTap
}
