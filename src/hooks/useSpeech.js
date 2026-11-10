import { useCallback, useEffect, useRef, useState } from 'react'
import '../utils/audio'

const supported =
  typeof window !== 'undefined' && 'speechSynthesis' in window

// Android geeft talen soms als 'nl_NL' terug
const norm = (lang = '') => lang.replace('_', '-').toLowerCase()

function pickVoice(voices) {
  // 1. nl-NL + female/Aria/Google in naam
  let v = voices.find(
    x => norm(x.lang) === 'nl-nl' && /female|aria|google|xander|claire/i.test(x.name)
  )
  // 2. nl-NL, elke stem
  if (!v) v = voices.find(x => norm(x.lang) === 'nl-nl')
  // 3. begint met 'nl'
  if (!v) v = voices.find(x => norm(x.lang).startsWith('nl'))
  // 4. geen Nederlandse stem: laat de browser kiezen op basis van utt.lang
  return v ?? null
}

// iOS ruimt een uitspraak soms op voordat 'onend' komt; bewaar hem daarom.
let currentUtterance = null // eslint-disable-line no-unused-vars

export function useSpeech() {
  const voiceRef = useRef(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (!supported) return

    const load = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length) voiceRef.current = pickVoice(voices)
    }

    load()
    window.speechSynthesis.addEventListener?.('voiceschanged', load)

    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', load)
      window.speechSynthesis.cancel()
    }
  }, [])

  const cancel = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  // Geeft een Promise die ALTIJD afloopt: ook als de telefoon de spraak
  // blokkeert of nooit 'onend' stuurt. Zo loopt het spel nooit vast.
  const speak = useCallback((text) => {
    if (!supported || !text) return Promise.resolve()

    return new Promise((resolve) => {
      let done = false
      let fallback = null
      const finish = () => {
        if (done) return
        done = true
        clearTimeout(fallback)
        setIsSpeaking(false)
        resolve()
      }

      // Ruime schatting van hoe lang de zin duurt (rate 0.85)
      const maxMs = 2500 + text.length * 110
      fallback = setTimeout(finish, maxMs)

      try {
        const synth = window.speechSynthesis
        if (synth.speaking || synth.pending) synth.cancel()
        if (!voiceRef.current) {
          const voices = synth.getVoices()
          if (voices.length) voiceRef.current = pickVoice(voices)
        }

        const utt = new SpeechSynthesisUtterance(text)
        if (voiceRef.current) utt.voice = voiceRef.current
        utt.lang   = 'nl-NL'
        utt.rate   = 0.85
        utt.pitch  = 1.1
        utt.volume = 1

        utt.onstart = () => setIsSpeaking(true)
        utt.onend   = finish
        utt.onerror = finish

        currentUtterance = utt
        synth.speak(utt)
        // Chrome/Android kan na cancel() blijven hangen in 'paused'
        if (synth.paused) synth.resume()
      } catch (_) {
        finish()
      }
    })
  }, [])

  return { speak, cancel, isSpeaking, supported }
}
