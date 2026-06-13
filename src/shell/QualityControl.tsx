import type { ExperienceTier } from '../experience/capabilities'
import { useExperience } from '../experience/ExperienceProvider'

const options: Array<{ label: string; tier: Exclude<ExperienceTier, 'reduced-motion'> }> = [
  { label: 'Alta', tier: 'high' },
  { label: 'Equilibrada', tier: 'balanced' },
  { label: 'Ligera', tier: 'lite' },
]

export function QualityControl() {
  const { setTier, tier } = useExperience()

  return (
    <fieldset className="quality-control">
      <legend>Calidad visual</legend>
      {options.map((option) => (
        <label key={option.tier}>
          <input
            checked={tier === option.tier}
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
