import { type RefObject, useEffect, useState } from 'react'

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function useScrollProgress(rootRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number | null = null

    const measure = () => {
      const root = rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      const scrollableDistance = Math.max(1, root.offsetHeight - window.innerHeight)
      const nextProgress = clamp(-rect.top / scrollableDistance)
      const progressValue = String(nextProgress)

      root.style.setProperty('--journey-progress', progressValue)
      root.style.setProperty('--narrative-progress', progressValue)
      setProgress(nextProgress)
    }

    const schedule = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = null
        measure()
      })
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [rootRef])

  return progress
}
