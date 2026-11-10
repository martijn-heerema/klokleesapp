// Gedeelde audio-hulpjes voor mobiel.
//
// iOS en Android staan geluid (Web Audio) en spraak (speechSynthesis) pas toe
// nadat de gebruiker op het scherm heeft getikt. Daarom:
//  - één gedeelde AudioContext i.p.v. een nieuwe per geluidje
//  - bij de eerste tik "ontgrendelen" we audio én spraak

let ctx = null
let unlocked = false

export function getAudioContext() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!ctx) {
    try { ctx = new Ctx() } catch (_) { return null }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

export function unlockAudio() {
  if (typeof window === 'undefined') return

  // iOS 17+: speel geluid af, ook als de stille modus aan staat
  try {
    if (navigator.audioSession) navigator.audioSession.type = 'playback'
  } catch (_) {}

  const c = getAudioContext()
  if (c && !unlocked) {
    try {
      // Een stil buffertje afspelen binnen een tik ontgrendelt Web Audio op iOS
      const buffer = c.createBuffer(1, 1, 22050)
      const src = c.createBufferSource()
      src.buffer = buffer
      src.connect(c.destination)
      src.start(0)
    } catch (_) {}
  }

  if (!unlocked && 'speechSynthesis' in window) {
    try {
      // Een lege uitspraak binnen een tik ontgrendelt spraak op iOS/Android
      const u = new SpeechSynthesisUtterance(' ')
      u.volume = 0
      window.speechSynthesis.speak(u)
    } catch (_) {}
  }

  unlocked = true
}

export function isAudioUnlocked() {
  return unlocked
}

// Ontgrendel automatisch bij elke aanraking/klik tot het gelukt is.
// iOS telt alleen 'touchend' en 'click' als echte gebruikersactie.
if (typeof window !== 'undefined') {
  const events = ['touchend', 'click', 'keydown']
  const handler = () => {
    unlockAudio()
    events.forEach(e => window.removeEventListener(e, handler, true))
  }
  events.forEach(e => window.addEventListener(e, handler, true))
  // AudioContext ook hervatten na terugkeren naar de app
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && ctx && ctx.state !== 'running') {
      ctx.resume().catch(() => {})
    }
  })
}
