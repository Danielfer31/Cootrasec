import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { CapabilitySnapshot } from '../../experience/capabilities'
import { ExperienceProvider } from '../../experience/ExperienceProvider'
import { AdaptiveSpike } from './AdaptiveSpike'

const highCapabilities: CapabilitySnapshot = {
  reducedMotion: false,
  webgl: true,
  memoryGb: 16,
  cores: 12,
  mobile: false,
}

describe('AdaptiveSpike', () => {
  beforeEach(() => sessionStorage.clear())

  it('exposes all tiers and one clean runtime for each experience', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><AdaptiveSpike /></ExperienceProvider>)
    expect(screen.getByRole('button', { name: 'High' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Balanced' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Lite' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Reduced motion' })).toBeVisible()
    expect(screen.getByText('Narrativas activas: 1')).toBeVisible()
    expect(screen.getByText('Showrooms activos: 1')).toBeVisible()
  })

  it('downgrades after simulated low performance', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><AdaptiveSpike /></ExperienceProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Simular bajo rendimiento' }))
    expect(screen.getByText('Nivel activo: balanced')).toBeVisible()
  })

  it('uses lite after simulated WebGL failure', () => {
    render(<ExperienceProvider capabilities={highCapabilities}><AdaptiveSpike /></ExperienceProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Simular fallo WebGL' }))
    expect(screen.getByText('Nivel activo: lite')).toBeVisible()
    expect(screen.getByText('Fallback 360 activo')).toBeVisible()
  })
})
