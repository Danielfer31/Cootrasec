import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuoteSection } from './QuoteSection'

describe('QuoteSection', () => {
  it('shows accessible validation and preserves entered values', () => {
    render(<QuoteSection />)

    fireEvent.change(screen.getByLabelText('Origen'), { target: { value: 'Monteria' } })
    fireEvent.click(screen.getByRole('button', { name: 'Solicitar propuesta' }))

    expect(screen.getByLabelText('Origen')).toHaveValue('Monteria')
    expect(screen.getByText('Ingrese el destino.')).toBeVisible()
    expect(screen.getByText('Demostracion conceptual. No muestra precios ni disponibilidad real.')).toBeVisible()
  })

  it('shows a recommendation and summary without a price', () => {
    render(<QuoteSection />)

    fireEvent.change(screen.getByLabelText('Numero de pasajeros'), { target: { value: '45' } })
    fireEvent.change(screen.getByLabelText('Origen'), { target: { value: 'Monteria' } })
    fireEvent.change(screen.getByLabelText('Destino'), { target: { value: 'Cartagena' } })
    fireEvent.change(screen.getByLabelText('Fecha aproximada'), { target: { value: '2026-07-10' } })
    fireEvent.click(screen.getByRole('button', { name: 'Solicitar propuesta' }))

    expect(screen.getByRole('heading', { name: 'Resumen conceptual' })).toBeVisible()
    expect(within(screen.getByRole('complementary')).getByText(/Paradiso premium/)).toBeVisible()
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument()
  })
})
