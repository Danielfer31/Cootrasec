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
    render(<DemoLogo />)

    expect(screen.getByRole('img', { name: 'Cootrasec Demo' })).toBeVisible()
    expect(screen.getByText('Cootrasec')).toBeVisible()
    expect(screen.getByText('Experiencia demo')).toBeVisible()
  })
})
