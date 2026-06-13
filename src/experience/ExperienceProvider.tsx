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
  capabilities: CapabilitySnapshot
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
  const effectiveTier = snapshot.reducedMotion ? 'reduced-motion' : tier

  useEffect(() => {
    if (capabilities) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setDetectedCapabilities(detectCapabilities())
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [capabilities])

  const value = useMemo<ExperienceContextValue>(
    () => ({
      capabilities: snapshot,
      tier: effectiveTier,
      detectedTier,
      experienceRevision,
      setTier: (nextTier) => {
        if (snapshot.reducedMotion) return
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
    [detectedTier, effectiveTier, experienceRevision, snapshot],
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

// The provider and its colocated hook form one public context API.
// eslint-disable-next-line react-refresh/only-export-components
export function useExperience() {
  const context = useContext(ExperienceContext)
  if (!context) throw new Error('useExperience must be used within ExperienceProvider')
  return context
}
