import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { CapabilitySnapshot, ExperienceTier } from '../experience/capabilities'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { Narrative } from './Narrative'

const capabilitiesByTier: Record<ExperienceTier, CapabilitySnapshot> = {
  high: { reducedMotion: false, webgl: true, memoryGb: 8, cores: 8, mobile: false },
  balanced: { reducedMotion: false, webgl: true, memoryGb: 4, cores: 4, mobile: false },
  lite: { reducedMotion: false, webgl: false, memoryGb: 4, cores: 4, mobile: false },
  'reduced-motion': { reducedMotion: true, webgl: true, memoryGb: 8, cores: 8, mobile: false },
}

function renderTier(tier: ExperienceTier) {
  render(
    <ExperienceProvider capabilities={capabilitiesByTier[tier]}>
      <Narrative />
    </ExperienceProvider>,
  )
}

describe('Narrative', () => {
  it('renders the journey narrative for high tier', () => {
    renderTier('high')

    expect(screen.getByTestId('journey-narrative')).toBeVisible()
    expect(screen.queryByTestId('narrative-high')).not.toBeInTheDocument()
    expect(screen.queryByTestId('narrative-linear')).not.toBeInTheDocument()
    expect(screen.queryByTestId('narrative-video')).not.toBeInTheDocument()
  })

  it.each(['balanced', 'lite'] satisfies ExperienceTier[])(
    'renders only the journey narrative for %s tier',
    (tier) => {
      renderTier(tier)

      expect(screen.getByTestId('journey-narrative')).toBeVisible()
      expect(screen.queryByTestId('narrative-high')).not.toBeInTheDocument()
      expect(screen.queryByTestId('narrative-linear')).not.toBeInTheDocument()
      expect(screen.queryByTestId('narrative-video')).not.toBeInTheDocument()
    },
  )

  it('renders only the linear narrative for reduced motion', () => {
    renderTier('reduced-motion')

    expect(screen.getByTestId('narrative-linear')).toBeVisible()
    expect(screen.queryByTestId('narrative-high')).not.toBeInTheDocument()
    expect(screen.queryByTestId('narrative-video')).not.toBeInTheDocument()
  })
})
