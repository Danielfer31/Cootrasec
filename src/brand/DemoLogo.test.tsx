import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { demoBrand } from './demoBrand'
import { DemoLogo } from './DemoLogo'

describe('DemoLogo', () => {
  it('centralizes the public demo brand values', () => {
    expect(demoBrand).toEqual({
      name: 'Cootrasec',
      descriptor: 'Experiencia demo',
      notice: 'Experiencia demostrativa con recursos visuales propios.',
      whatsappFallback: '573000000000',
    })
  })

  it('renders an accessible demo brand', () => {
    const { container } = render(<DemoLogo />)

    expect(screen.getByRole('img', { name: 'Cootrasec Demo' })).toBeVisible()
    expect(screen.getByText('Cootrasec')).toBeVisible()
    expect(screen.getByText('Experiencia demo')).toBeVisible()
    expect(screen.getByText('Cootrasec').parentElement).toHaveStyle({
      display: 'inline-grid',
      gap: '2px',
    })
    expect(container.querySelector('circle')).toHaveAttribute('fill', '#d8a84e')
    expect(container.querySelector('path')).toHaveAttribute('stroke', '#0d241d')
  })
})
