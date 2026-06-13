import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { NarrativeSpike } from './NarrativeSpike'

describe('NarrativeSpike', () => {
  it('offers comparable sequence, video, and reduced-motion modes', () => {
    render(<NarrativeSpike />)

    expect(
      screen.getByRole('heading', { name: 'Spike A: narrativa' }),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Secuencia desktop' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Video sincronizado' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Movimiento reducido' })).toBeVisible()
  })
})
