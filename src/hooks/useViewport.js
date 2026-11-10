import { useEffect, useState } from 'react'

// Huidige zichtbare schermgrootte (houdt rekening met adresbalk op mobiel)
function read() {
  if (typeof window === 'undefined') return { w: 400, h: 800 }
  return { w: window.innerWidth, h: window.innerHeight }
}

export function useViewport() {
  const [size, setSize] = useState(read)
  useEffect(() => {
    const update = () => setSize(read())
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    window.visualViewport?.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [])
  return size
}
