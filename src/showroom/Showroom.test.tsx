import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CapabilitySnapshot } from '../experience/capabilities'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { showroomHotspots } from './hotspots'
import { Showroom } from './Showroom'
import { selectShowroomVariant } from './showroomVariant'

const high: CapabilitySnapshot = {
  reducedMotion: false,
  webgl: true,
  memoryGb: 16,
  cores: 12,
  mobile: false,
}

describe('showroom contract', () => {
  beforeEach(() => {
    sessionStorage.clear()
    window.history.pushState({}, '', '/')
  })

  it('exposes every shared Paradiso hotspot', () => {
    expect(showroomHotspots.map((hotspot) => hotspot.id)).toEqual([
      'capacity',
      'comfort',
      'climate',
      'luggage',
      'entertainment',
      'safety',
    ])
  })

  it('selects R3F for high and balanced, and 360 for lite or missing WebGL', () => {
    expect(selectShowroomVariant('high', true)).toBe('r3f')
    expect(selectShowroomVariant('balanced', true)).toBe('r3f')
    expect(selectShowroomVariant('lite', true)).toBe('360')
    expect(selectShowroomVariant('high', false)).toBe('360')
  })

  it('keeps shared controls and hotspots available in the 360 fallback', () => {
    render(
      <ExperienceProvider capabilities={{ ...high, webgl: false }}>
        <Showroom />
      </ExperienceProvider>,
    )

    expect(screen.getByRole('application', { name: 'Vista 360 del bus' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Capacidad' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Seguridad' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Interior conceptual' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Luz de manana' })).toBeVisible()
  })

  it('opens a hotspot and transfers the bus to the quote flow', () => {
    const selectVehicle = vi.fn()
    window.addEventListener('cootrasec:select-vehicle', selectVehicle)
    render(
      <ExperienceProvider capabilities={{ ...high, webgl: false }}>
        <Showroom />
      </ExperienceProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Seguridad' }))
    expect(screen.getByRole('heading', { name: 'Seguridad' })).toBeVisible()

    fireEvent.click(screen.getByRole('link', { name: 'Cotizar este bus' }))
    expect(window.location.hash).toBe('#quote')
    expect(selectVehicle).toHaveBeenCalledOnce()
    window.removeEventListener('cootrasec:select-vehicle', selectVehicle)
  })
})
