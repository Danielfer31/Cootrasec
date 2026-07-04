import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuoteSection } from './QuoteSection'

describe('QuoteSection', () => {
  it('shows accessible validation and preserves entered values', () => {
    render(<QuoteSection />)

    fireEvent.change(screen.getByLabelText('Origen'), { target: { value: 'Monteria' } })
    fireEvent.click(screen.getByRole('button', { name: 'Solicitar propuesta' }))

    expect(screen.getByLabelText('Origen')).toHaveValue('Monteria')
    expect(screen.getByText('Ingrese su nombre.')).toBeVisible()
    expect(screen.getByText('Ingrese su telefono.')).toBeVisible()
    expect(screen.getByText('Ingrese el destino.')).toBeVisible()
    expect(screen.getByText('Experiencia demostrativa con recursos visuales propios.')).toBeVisible()
  })

  it('shows a recommendation and summary without a price', () => {
    render(<QuoteSection />)

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Perez' } })
    fireEvent.change(screen.getByLabelText('Telefono'), { target: { value: '+57 300 123 4567' } })
    fireEvent.change(screen.getByLabelText('Numero de pasajeros'), { target: { value: '45' } })
    fireEvent.change(screen.getByLabelText('Origen'), { target: { value: 'Monteria' } })
    fireEvent.change(screen.getByLabelText('Destino'), { target: { value: 'Cartagena' } })
    fireEvent.change(screen.getByLabelText('Fecha aproximada'), { target: { value: '2026-07-10' } })
    fireEvent.click(screen.getByRole('button', { name: 'Solicitar propuesta' }))

    expect(screen.getByRole('heading', { name: 'Resumen conceptual' })).toBeVisible()
    expect(within(screen.getByRole('complementary')).getByText(/Paradiso premium/)).toBeVisible()
    expect(screen.getByRole('link', { name: 'Enviar por WhatsApp' })).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/573000000000?text='),
    )
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })
})
