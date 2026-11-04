import { useCallback, useEffect, useRef, useState } from 'react'

const supported =
  typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice(voices) {
  // 1. nl-NL + female/Aria/Google in naam
  let v = voices.find(
    x => x.lang === 'nl-NL' && /female|aria|google/i.test(x.name)
  )
  // 2. nl-NL, elke stem
  if (!v) v = voices.find(x => x.lang === 'nl-NL')
  // 3. begint met 'nl'
  if (!v) v = voices.find(x => x.lang.startsWith('nl'))
  // 4. fallback: eerste beschikbare
  if (!v) v = voices[0] ?? null
  return v
}

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
    window.speechSynthesis.onvoiceschanged = load

    return () => {
      window.speechSynthesis.onvoiceschanged = null
      window.speechSynthesis.cancel()
    }
  }, [])

  const cancel = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  const speak = useCallback((text) => {
    if (!supported || !text) return Promise.resolve()
    window.speechSynthesis.cancel()

    return new Promise((resolve) => {
      const utt = new SpeechSynthesisUtterance(text)
      if (voiceRef.current) utt.voice = voiceRef.current
      utt.lang   = 'nl-NL'
      utt.rate   = 0.85
      utt.pitch  = 1.1
      utt.volume = 1

      utt.onstart = () => setIsSpeaking(true)
      utt.onend   = () => { setIsSpeaking(false); resolve() }
      utt.onerror = () => { setIsSpeaking(false); resolve() }

      window.speechSynthesis.speak(utt)
    })
  }, [])

  return { speak, cancel, isSpeaking, supported }
}
