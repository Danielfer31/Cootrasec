import { describe, expect, it } from 'vitest'
import { recommendVehicle, validateQuote } from './quoteRules'

describe('quote rules', () => {
  const validQuote = {
    name: 'Ana Perez',
    phone: '+57 300 123 4567',
    passengers: 14,
    serviceType: 'corporate' as const,
    origin: 'Monteria',
    destination: 'Cartagena',
    date: '2026-07-10',
    vehicleId: 'sprinter' as const,
  }

  it('recommends a vehicle for each service scale', () => {
    expect(recommendVehicle({ passengers: 4, serviceType: 'executive' })).toBe('prado')
    expect(recommendVehicle({ passengers: 14, serviceType: 'corporate' })).toBe('sprinter')
    expect(recommendVehicle({ passengers: 45, serviceType: 'event' })).toBe('paradiso')
  })

  it('validates required contact and trip details and passenger limits', () => {
    expect(validateQuote({
      name: ' ',
      phone: '',
      passengers: 0,
      serviceType: 'corporate',
      origin: '',
      destination: ' ',
      date: '',
      vehicleId: 'sprinter',
    }, new Date('2026-06-14T12:00:00'))).toEqual({
      name: 'Ingrese su nombre.',
      phone: 'Ingrese su telefono.',
      passengers: 'Ingrese al menos un pasajero.',
      origin: 'Ingrese el origen.',
      destination: 'Ingrese el destino.',
      date: 'Seleccione una fecha aproximada.',
    })
  })

  it.each(['2026-06-13', '2026-06-14'])('rejects non-future date %s', (date) => {
    expect(validateQuote(
      { ...validQuote, date },
      new Date('2026-06-14T12:00:00'),
    )).toEqual({ date: 'Seleccione una fecha futura.' })
  })

  it('accepts a future date', () => {
    expect(validateQuote(validQuote, new Date('2026-06-14T12:00:00'))).toEqual({})
  })

  it('accepts an ISO date string as the injectable today value', () => {
    expect(validateQuote(
      { ...validQuote, date: '2026-06-14' },
      '2026-06-14',
    )).toEqual({ date: 'Seleccione una fecha futura.' })
  })

  it('handles legacy data with missing contact fields safely', () => {
    const legacyQuote = { ...validQuote } as Partial<typeof validQuote>
    delete legacyQuote.name
    delete legacyQuote.phone

    expect(validateQuote(
      legacyQuote as typeof validQuote,
      new Date('2026-06-14T12:00:00'),
    )).toMatchObject({
      name: 'Ingrese su nombre.',
      phone: 'Ingrese su telefono.',
    })
  })
})
