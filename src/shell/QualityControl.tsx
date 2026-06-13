import type { ExperienceTier } from '../experience/capabilities'
import { useExperience } from '../experience/ExperienceProvider'

const options: Array<{ label: string; tier: Exclude<ExperienceTier, 'reduced-motion'> }> = [
  { label: 'Alta', tier: 'high' },
  { label: 'Equilibrada', tier: 'balanced' },
  { label: 'Ligera', tier: 'lite' },
]

export function QualityControl() {
  const { capabilities, setTier, tier } = useExperience()
  const reducedMotion = capabilities.reducedMotion || tier === 'reduced-motion'

  return (
    <fieldset className="quality-control">
      <legend>Calidad visual</legend>
      {reducedMotion && <span>Movimiento reducido activo</span>}
      {options.map((option) => (
        <label key={option.tier}>
          <input
            checked={tier === option.tier}
            disabled={reducedMotion}
            name="visual-quality"
            onChange={() => setTier(option.tier)}
            type="radio"
            value={option.tier}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  )
}
