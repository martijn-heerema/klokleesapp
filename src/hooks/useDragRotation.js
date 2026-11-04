import { useCallback, useRef } from 'react'

/**
 * Returns event handlers for dragging a clock hand (mouse + touch).
 * centerRef: ref to the clock center element (used to compute angle).
 * onAngle(angleDeg): called continuously while dragging.
 * onEnd(): called when drag ends.
 */
export function useDragRotation({ centerRef, onAngle, onEnd, disabled = false }) {
  const draggingRef = useRef(false)

  const getAngle = useCallback((clientX, clientY) => {
    if (!centerRef.current) return 0
    const rect = centerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = clientX - cx
    const dy = clientY - cy
    // atan2 gives angle from positive X axis; we want from 12 o'clock (top)
    let angle = Math.atan2(dx, -dy) * (180 / Math.PI)
    if (angle < 0) angle += 360
    return angle
  }, [centerRef])

  const onMouseDown = useCallback((e) => {
    if (disabled) return
    e.preventDefault()
    draggingRef.current = true

    const move = (ev) => {
      if (!draggingRef.current) return
      onAngle(getAngle(ev.clientX, ev.clientY))
    }
    const up = () => {
      draggingRef.current = false
      onEnd?.()
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }, [disabled, getAngle, onAngle, onEnd])

  const onTouchStart = useCallback((e) => {
    if (disabled) return
    e.preventDefault()
    draggingRef.current = true
    const touch = e.touches[0]

    const move = (ev) => {
      if (!draggingRef.current) return
      const t = ev.touches[0]
      onAngle(getAngle(t.clientX, t.clientY))
    }
    const end = () => {
      draggingRef.current = false
      onEnd?.()
      window.removeEventListener('touchmove', move)
      window.removeEventListener('touchend', end)
    }
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('touchend', end)
  }, [disabled, getAngle, onAngle, onEnd])

  return { onMouseDown, onTouchStart }
}
