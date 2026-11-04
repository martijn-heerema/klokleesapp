/**
 * formatTimeNL(hour, minute) → Nederlandse tijdformulering
 *
 * Voorbeelden:
 *   formatTimeNL(8,  0)  → "8 uur"
 *   formatTimeNL(12, 0)  → "12 uur"
 *   formatTimeNL(8, 30)  → "half 9"
 *   formatTimeNL(8, 15)  → "kwart over 8"
 *   formatTimeNL(8, 45)  → "kwart voor 9"
 *   formatTimeNL(8,  5)  → "5 over 8"
 *   formatTimeNL(8, 10)  → "10 over 8"
 *   formatTimeNL(8, 20)  → "10 voor half 9"
 *   formatTimeNL(8, 25)  → "5 voor half 9"
 *   formatTimeNL(8, 35)  → "5 over half 9"
 *   formatTimeNL(8, 40)  → "10 over half 9"
 *   formatTimeNL(8, 50)  → "10 voor 9"
 *   formatTimeNL(8, 55)  → "5 voor 9"
 *   formatTimeNL(19, 0)  → "7 uur"  (24-uurs → 12-uurs weergave)
 */
export function formatTimeNL(hour, minute) {
  const h = hour % 12 === 0 ? 12 : hour % 12
  const hNext = (h % 12) + 1

  if (minute === 0) return `${h} uur`
  if (minute === 15) return `kwart over ${h}`
  if (minute === 30) return `half ${hNext}`
  if (minute === 45) return `kwart voor ${hNext}`

  // Minuten 1-14: "X over H"
  if (minute > 0 && minute < 15) return `${minute} over ${h}`

  // Minuten 16-29: "X voor half H+1"
  if (minute > 15 && minute < 30) return `${30 - minute} voor half ${hNext}`

  // Minuten 31-44: "X over half H+1"
  if (minute > 30 && minute < 45) return `${minute - 30} over half ${hNext}`

  // Minuten 46-59: "X voor H+1"
  if (minute > 45 && minute < 60) return `${60 - minute} voor ${hNext}`

  return `${h}:${String(minute).padStart(2, '0')}`
}

/**
 * formatDigital(hour, minute) → "HH:MM"
 */
export function formatDigital(hour, minute) {
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}
