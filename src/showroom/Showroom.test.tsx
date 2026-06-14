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
    expect(screen.getByRole('group', { name: 'Seleccionar vehiculo' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Prado ejecutivo' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Sprinter corporativa' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Paradiso turismo' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('selects Sprinter in the fallback and transfers it to the quote flow', () => {
    const selectVehicle = vi.fn()
    window.addEventListener('cootrasec:select-vehicle', selectVehicle)
    render(
      <ExperienceProvider capabilities={{ ...high, webgl: false }}>
        <Showroom />
      </ExperienceProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Sprinter corporativa' }))
    expect(screen.getByRole('button', { name: 'Sprinter corporativa' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('img', { name: 'Sprinter corporativa en vista 360' }))
      .toHaveAttribute('src', '/demo-assets/turntable/sprinter/frame-001.webp')

    fireEvent.click(screen.getByRole('button', { name: 'Seguridad' }))
    expect(screen.getByRole('heading', { name: 'Seguridad' })).toBeVisible()

    fireEvent.click(screen.getByRole('link', { name: 'Cotizar Sprinter corporativa' }))
    expect(window.location.hash).toBe('#quote')
    expect(selectVehicle).toHaveBeenCalledOnce()
    expect((selectVehicle.mock.calls[0][0] as CustomEvent).detail).toEqual({ vehicleId: 'sprinter' })
    window.removeEventListener('cootrasec:select-vehicle', selectVehicle)
  })
})
