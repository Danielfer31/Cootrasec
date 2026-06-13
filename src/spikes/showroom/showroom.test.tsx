import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ShowroomSpike } from './ShowroomSpike'

describe('ShowroomSpike', () => {
  it('offers all implementations with a shared hotspot contract', () => {
    render(<ShowroomSpike />)

    expect(screen.getByRole('button', { name: 'R3F' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Three.js' })).toBeVisible()
    expect(screen.getByRole('button', { name: '360' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Capacidad' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Climatización' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Seguridad' })).toBeVisible()
  })

  it('shows the same descriptive HTML panel for hotspot selection', () => {
    render(<ShowroomSpike />)

    fireEvent.click(screen.getByRole('button', { name: 'Seguridad' }))

    expect(screen.getByRole('heading', { name: 'Seguridad' })).toBeVisible()
    expect(screen.getByText(/monitoreo conceptual/i)).toBeVisible()
  })

  it('offers the 360 fallback after a WebGL error', () => {
    render(<ShowroomSpike initialImplementation="r3f" forceWebglError />)

    expect(screen.getByRole('button', { name: 'Usar vista 360' })).toBeVisible()
  })
})
