import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { AppHeader } from './AppHeader'

describe('AppHeader', () => {
  it('offers direct navigation, a skip link and quality control', () => {
    render(
      <ExperienceProvider
        capabilities={{
          reducedMotion: false,
          webgl: true,
          memoryGb: 8,
          cores: 8,
          mobile: false,
        }}
      >
        <AppHeader />
      </ExperienceProvider>,
    )

    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toHaveAttribute(
      'href',
      '#main-content',
    )
    for (const label of ['Flota', 'Experiencia', 'Seguridad', 'Cotizar']) {
      expect(screen.getByRole('link', { name: label })).toBeVisible()
    }
    expect(screen.getByRole('group', { name: 'Calidad visual' })).toBeVisible()
  })
})
