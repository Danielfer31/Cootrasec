import { useExperience } from '../experience/ExperienceProvider'
import { HighNarrative } from './HighNarrative'
import { LinearNarrative } from './LinearNarrative'
import { VideoNarrative } from './VideoNarrative'
import './Narrative.css'

export function Narrative() {
  const { experienceRevision, tier } = useExperience()
  const Variant = tier === 'high'
    ? HighNarrative
    : tier === 'reduced-motion'
      ? LinearNarrative
      : VideoNarrative

  return <Variant key={`${tier}-${experienceRevision}`} />
}
