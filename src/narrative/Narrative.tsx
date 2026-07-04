import { useExperience } from '../experience/ExperienceProvider'
import { JourneyNarrative } from './JourneyNarrative'
import { LinearNarrative } from './LinearNarrative'
import './Narrative.css'

export function Narrative() {
  const { experienceRevision, tier } = useExperience()

  if (tier === 'reduced-motion') {
    return <LinearNarrative key={`${tier}-${experienceRevision}`} />
  }

  return <JourneyNarrative key={`${tier}-${experienceRevision}`} tier={tier} />
}
