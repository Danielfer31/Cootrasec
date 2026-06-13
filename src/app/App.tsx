import { ExperienceProvider } from '../experience/ExperienceProvider'
import { AdaptiveSpike } from '../spikes/adaptive/AdaptiveSpike'
import { NarrativeSpike } from '../spikes/narrative/NarrativeSpike'
import { ShowroomSpike } from '../spikes/showroom/ShowroomSpike'
import { DemoApp } from './DemoApp'

type SpikeName = 'narrative' | 'showroom' | 'adaptive'

function selectedSpike(): SpikeName | null {
  const value = new URLSearchParams(window.location.search).get('spike')
  return value === 'narrative' || value === 'showroom' || value === 'adaptive'
    ? value
    : null
}

export default function App() {
  const spike = selectedSpike()
  if (spike === 'narrative') return <NarrativeSpike />
  if (spike === 'showroom') return <ShowroomSpike />
  if (spike === 'adaptive') {
    return <ExperienceProvider><AdaptiveSpike /></ExperienceProvider>
  }
  return <DemoApp />
}
