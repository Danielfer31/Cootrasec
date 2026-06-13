import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  chooseTier,
  detectCapabilities,
  type CapabilitySnapshot,
  type ExperienceTier,
} from './capabilities'

const storageKey = 'cootrasec-experience-tier'
const tiers: ExperienceTier[] = ['high', 'balanced', 'lite', 'reduced-motion']

export interface ExperienceContextValue {
  tier: ExperienceTier
  detectedTier: ExperienceTier
  experienceRevision: number
  setTier: (tier: ExperienceTier) => void
  downgrade: () => void
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null)

function storedTier(): ExperienceTier | null {
  const stored = sessionStorage.getItem(storageKey)
  return tiers.includes(stored as ExperienceTier) ? (stored as ExperienceTier) : null
}

function lowerTier(tier: ExperienceTier): ExperienceTier {
  if (tier === 'high') return 'balanced'
  if (tier === 'balanced') return 'lite'
  return tier
}

interface ExperienceProviderProps {
  children: ReactNode
  capabilities?: CapabilitySnapshot
}

export function ExperienceProvider({ children, capabilities }: ExperienceProviderProps) {
  const [detectedCapabilities, setDetectedCapabilities] = useState(() => capabilities ?? detectCapabilities())
  const snapshot = capabilities ?? detectedCapabilities
  const detectedTier = chooseTier(snapshot)
  const [tier, setCurrentTier] = useState<ExperienceTier>(() =>
    snapshot.reducedMotion ? 'reduced-motion' : storedTier() ?? detectedTier,
  )
  const [experienceRevision, setExperienceRevision] = useState(0)

  useEffect(() => {
    if (!snapshot.reducedMotion) return
    setCurrentTier((current) => {
      if (current === 'reduced-motion') return current
      setExperienceRevision((revision) => revision + 1)
      return 'reduced-motion'
    })
  }, [snapshot.reducedMotion])

  useEffect(() => {
    if (capabilities) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setDetectedCapabilities(detectCapabilities())
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [capabilities])

  const value = useMemo<ExperienceContextValue>(
    () => ({
      tier,
      detectedTier,
      experienceRevision,
      setTier: (nextTier) => {
        sessionStorage.setItem(storageKey, nextTier)
        setCurrentTier((current) => {
          if (current === nextTier) return current
          setExperienceRevision((revision) => revision + 1)
          return nextTier
        })
      },
      downgrade: () => {
        setCurrentTier((current) => {
          const nextTier = lowerTier(current)
          if (current === nextTier) return current
          setExperienceRevision((revision) => revision + 1)
          return nextTier
        })
      },
    }),
    [detectedTier, experienceRevision, tier],
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperience() {
  const context = useContext(ExperienceContext)
  if (!context) throw new Error('useExperience must be used within ExperienceProvider')
  return context
}
