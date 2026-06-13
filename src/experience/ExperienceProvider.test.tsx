import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { CapabilitySnapshot } from './capabilities'
import { ExperienceProvider, useExperience } from './ExperienceProvider'

const highCapabilities: CapabilitySnapshot = {
  reducedMotion: false,
  webgl: true,
  memoryGb: 16,
  cores: 12,
  mobile: false,
}

function Harness() {
  const { detectedTier, downgrade, experienceRevision, setTier, tier } = useExperience()
  return (
    <>
      <span>tier:{tier}</span>
      <span>detected:{detectedTier}</span>
      <span>revision:{experienceRevision}</span>
      <button type="button" onClick={() => setTier('lite')}>set-lite</button>
      <button type="button" onClick={downgrade}>downgrade</button>
    </>
  )
}

describe('ExperienceProvider', () => {
  beforeEach(() => sessionStorage.clear())

  it('selects its initial tier from detected capabilities', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><Harness /></ExperienceProvider>)
    expect(screen.getByText('tier:high')).toBeVisible()
    expect(screen.getByText('detected:high')).toBeVisible()
  })

  it('persists explicit user choices and increments the revision', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><Harness /></ExperienceProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'set-lite' }))
    expect(screen.getByText('tier:lite')).toBeVisible()
    expect(screen.getByText('revision:1')).toBeVisible()
    expect(sessionStorage.getItem('cootrasec-experience-tier')).toBe('lite')
  })

  it('forces reduced motion when the capability changes', () => {
    const { rerender } = render(
      <ExperienceProvider capabilities={highCapabilities}><Harness /></ExperienceProvider>,
    )
    rerender(
      <ExperienceProvider capabilities={{ ...highCapabilities, reducedMotion: true }}>
        <Harness />
      </ExperienceProvider>,
    )
    expect(screen.getByText('tier:reduced-motion')).toBeVisible()
  })

  it('downgrades without automatically upgrading', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><Harness /></ExperienceProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'downgrade' }))
    expect(screen.getByText('tier:balanced')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'downgrade' }))
    expect(screen.getByText('tier:lite')).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: 'downgrade' }))
    expect(screen.getByText('tier:lite')).toBeVisible()
  })
})
