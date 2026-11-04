import React, { useCallback, useRef } from 'react'
import { useDragRotation } from '../hooks/useDragRotation'
import { formatDigital } from '../utils/timeFormat'

const SIZE = 300
const CENTER = SIZE / 2

// Hand dimensions
const HOUR_W   = 12
const HOUR_H   = CENTER * 0.52   // ≈ 78 — visual length
const MIN_W    = 7
const MIN_H    = CENTER * 0.72   // ≈ 108 — visual length
const PIVOT    = 4               // px the hand extends BELOW the center

// Hit-area padding (invisible, surrounds the visual hand)
const HIT_SIDE = 32   // extra on each side
const HIT_TIP  = 16   // extra beyond the tip

// Pre-computed wrapper geometry so it always rotates around (CENTER, CENTER)
const hourWrap = {
  w:   HOUR_W + HIT_SIDE * 2,
  h:   HOUR_H + HIT_TIP,
  left: CENTER - HOUR_W / 2 - HIT_SIDE,
  top:  CENTER - HOUR_H + PIVOT - HIT_TIP,
  ox:   (HOUR_W + HIT_SIDE * 2) / 2,
  oy:   HOUR_H - PIVOT + HIT_TIP,   // pivot y inside wrapper
  // visual hand offset inside wrapper
  vLeft: HIT_SIDE,
  vTop:  HIT_TIP,
}

const minWrap = {
  w:   MIN_W + HIT_SIDE * 2,
  h:   MIN_H + HIT_TIP,
  left: CENTER - MIN_W / 2 - HIT_SIDE,
  top:  CENTER - MIN_H + PIVOT - HIT_TIP,
  ox:   (MIN_W + HIT_SIDE * 2) / 2,
  oy:   MIN_H - PIVOT + HIT_TIP,
  vLeft: HIT_SIDE,
  vTop:  HIT_TIP,
}

function playTick() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.05)
  } catch (_) {}
}

function snapToNearest(angle, snapMinutes) {
  const minuteFromAngle = angle / 6
  let best = snapMinutes[0]
  let bestDist = Infinity
  for (const m of snapMinutes) {
    const dist = Math.min(
      Math.abs(minuteFromAngle - m),
      Math.abs(minuteFromAngle - m + 60),
      Math.abs(minuteFromAngle - m - 60),
    )
    if (dist < bestDist) { bestDist = dist; best = m }
  }
  return best
}

export default function Clock({ hour, minute, snapMinutes, minuteFixed, onTimeChange }) {
  const centerRef = useRef(null)
  const lastTickRef = useRef({ h: hour, m: minute })
  const tickTimeout = useRef(null)

  const triggerTick = useCallback((h, m) => {
    if (m !== lastTickRef.current.m || h !== lastTickRef.current.h) {
      lastTickRef.current = { h, m }
      if (tickTimeout.current) clearTimeout(tickTimeout.current)
      tickTimeout.current = setTimeout(playTick, 0)
    }
  }, [])

  // ---- Minute hand ----
  const handleMinuteAngle = useCallback((angle) => {
    const snapped = snapToNearest(angle, snapMinutes)
    triggerTick(hour, snapped)
    onTimeChange(hour, snapped)
  }, [hour, snapMinutes, onTimeChange, triggerTick])

  const minuteDrag = useDragRotation({ centerRef, onAngle: handleMinuteAngle, disabled: minuteFixed })

  // ---- Hour hand ----
  const handleHourAngle = useCallback((angle) => {
    const minuteOffset = (minute / 60) * 30
    let pureHourAngle = ((angle - minuteOffset) % 360 + 360) % 360
    const hourRaw = ((pureHourAngle / 30) % 12 + 12) % 12
    let bestH = 0, bestDist = Infinity
    for (let h = 0; h < 12; h++) {
      const dist = Math.min(Math.abs(hourRaw - h), 12 - Math.abs(hourRaw - h))
      if (dist < bestDist) { bestDist = dist; bestH = h }
    }
    const snappedH12 = bestH === 0 ? 12 : bestH
    const isAM = hour < 12
    const newHour = snappedH12 === 12
      ? (isAM ? 0 : 12)
      : (isAM ? snappedH12 : snappedH12 + 12)
    triggerTick(newHour, minute)
    onTimeChange(newHour, minute)
  }, [minute, hour, onTimeChange, triggerTick])

  const hourDrag = useDragRotation({ centerRef, onAngle: handleHourAngle })

  const minuteAngle = minute * 6
  const hourAngle   = (hour % 12) * 30 + (minute / 60) * 30

  const hourMarkers   = Array.from({ length: 12 }, (_, i) => i + 1)
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className="flex flex-col items-center gap-3 no-select">
      {/* Analoge klok */}
      <div
        ref={centerRef}
        className="relative rounded-full bg-white shadow-2xl border-4 border-amber-400"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Minuut-streepjes */}
        {minuteMarkers.map(i => {
          const isMajor = i % 5 === 0
          const ang = i * 6
          const r = CENTER - (isMajor ? 12 : 8)
          const x = CENTER + r * Math.sin((ang * Math.PI) / 180)
          const y = CENTER - r * Math.cos((ang * Math.PI) / 180)
          return (
            <div key={i}
              className={`absolute rounded-full ${isMajor ? 'bg-amber-700' : 'bg-amber-300'}`}
              style={{
                width: isMajor ? 3 : 1.5, height: isMajor ? 10 : 6,
                left: x - (isMajor ? 1.5 : 0.75), top: y - (isMajor ? 5 : 3),
                transform: `rotate(${ang}deg)`, transformOrigin: 'center center',
              }}
            />
          )
        })}

        {/* Uur-cijfers */}
        {hourMarkers.map(n => {
          const ang = n * 30
          const r = CENTER - 30
          const x = CENTER + r * Math.sin((ang * Math.PI) / 180)
          const y = CENTER - r * Math.cos((ang * Math.PI) / 180)
          return (
            <div key={n}
              className="absolute flex items-center justify-center font-black text-amber-900"
              style={{ fontSize: 20, width: 28, height: 28, left: x - 14, top: y - 14 }}
            >
              {n}
            </div>
          )
        })}

        {/* ── UURWIJZER ──
            Brede transparante wrapper = het sleepdoel voor het kind.
            Visuele hand = smal gekleurde div daarbinnen (pointerEvents: none). */}
        <div
          className="absolute cursor-grab active:cursor-grabbing"
          style={{
            width:  hourWrap.w,
            height: hourWrap.h,
            left:   hourWrap.left,
            top:    hourWrap.top,
            transformOrigin: `${hourWrap.ox}px ${hourWrap.oy}px`,
            transform: `rotate(${hourAngle}deg)`,
            touchAction: 'none',
            background: 'transparent',
            zIndex: 2,
          }}
          {...hourDrag}
        >
          {/* Visuele uurwijzer */}
          <div
            style={{
              position: 'absolute',
              left:   hourWrap.vLeft,
              top:    hourWrap.vTop,
              width:  HOUR_W,
              height: HOUR_H,
              background: '#92400e',   /* amber-800 */
              borderRadius: '6px 6px 4px 4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ── MINUTENWIJZER ──
            Zelfde patroon: brede wrapper + smalle visuele hand. */}
        <div
          className={`absolute ${minuteFixed ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          style={{
            width:  minWrap.w,
            height: minWrap.h,
            left:   minWrap.left,
            top:    minWrap.top,
            transformOrigin: `${minWrap.ox}px ${minWrap.oy}px`,
            transform: `rotate(${minuteAngle}deg)`,
            touchAction: 'none',
            background: 'transparent',
            zIndex: 3,
          }}
          {...(minuteFixed ? {} : minuteDrag)}
        >
          {/* Visuele minutenwijzer */}
          <div
            style={{
              position: 'absolute',
              left:   minWrap.vLeft,
              top:    minWrap.vTop,
              width:  MIN_W,
              height: MIN_H,
              background: '#374151',   /* gray-700 */
              borderRadius: '4px 4px 3px 3px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Middelpunt — boven de wijzers */}
        <div
          className="absolute rounded-full bg-amber-600"
          style={{ width: 16, height: 16, left: CENTER - 8, top: CENTER - 8, zIndex: 4 }}
        />
      </div>

      {/* Digitale weergave */}
      <div className="bg-amber-50 border-4 border-amber-400 rounded-2xl px-8 py-3 shadow-lg">
        <span className="font-black text-amber-900 tabular-nums" style={{ fontSize: 48, letterSpacing: 4 }}>
          {formatDigital(hour, minute)}
        </span>
      </div>
    </div>
  )
}
