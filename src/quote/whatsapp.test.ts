import { describe, expect, it } from 'vitest'
import { buildWhatsAppMessage, buildWhatsAppUrl, normalizeWhatsAppNumber } from './whatsapp'
import type { QuoteData } from './quoteRules'

const quote: QuoteData = {
  name: 'Ana Perez',
  phone: '+57 300 123 4567',
  passengers: 14,
  serviceType: 'corporate',
  origin: 'Monteria',
  destination: 'Cartagena',
  date: '2026-07-10',
  vehicleId: 'sprinter',
}

describe('WhatsApp quote request', () => {
  it('normalizes a formatted WhatsApp number to digits', () => {
    expect(normalizeWhatsAppNumber('+57 300 123 4567')).toBe('573001234567')
  })

  it.each(['', '   ', undefined, null])('handles empty number %s safely', (number) => {
    expect(normalizeWhatsAppNumber(number)).toBe('')
  })

  it('builds the exact readable Spanish quote message', () => {
    expect(buildWhatsAppMessage(quote)).toBe([
      'Hola, quiero solicitar una cotizacion.',
      'Nombre: Ana Perez',
      'Telefono: +57 300 123 4567',
      'Servicio: Corporativo',
      'Pasajeros: 14',
      'Origen: Monteria',
      'Destino: Cartagena',
      'Fecha: 2026-07-10',
      'Vehiculo recomendado: Sprinter corporativa',
    ].join('\n'))
  })

  it('uses readable labels for every service and vehicle type', () => {
    expect(buildWhatsAppMessage({ ...quote, serviceType: 'executive', vehicleId: 'prado' }))
      .toContain('Servicio: Ejecutivo\n')
    expect(buildWhatsAppMessage({ ...quote, serviceType: 'event', vehicleId: 'paradiso' }))
      .toContain('Servicio: Evento\n')
    expect(buildWhatsAppMessage({ ...quote, vehicleId: 'prado' }))
      .toContain('Vehiculo recomendado: Prado ejecutiva')
    expect(buildWhatsAppMessage({ ...quote, vehicleId: 'paradiso' }))
      .toContain('Vehiculo recomendado: Paradiso premium')
  })

  it('builds a properly encoded wa.me URL', () => {
    const url = buildWhatsAppUrl('+57 300 123 4567', quote)

    expect(url).toBe(`https://wa.me/573001234567?text=${encodeURIComponent(buildWhatsAppMessage(quote))}`)
    expect(decodeURIComponent(url.split('?text=')[1])).toBe(buildWhatsAppMessage(quote))
  })

  it('builds a safe URL when the configured number is empty', () => {
    expect(buildWhatsAppUrl('', quote)).toBe(
      `https://wa.me/?text=${encodeURIComponent(buildWhatsAppMessage(quote))}`,
    )
  })
})
