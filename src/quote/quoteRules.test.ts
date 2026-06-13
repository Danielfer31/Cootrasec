import { describe, expect, it } from 'vitest'
import { recommendVehicle, validateQuote } from './quoteRules'

describe('quote rules', () => {
  it('recommends a vehicle for each service scale', () => {
    expect(recommendVehicle({ passengers: 4, serviceType: 'executive' })).toBe('prado')
    expect(recommendVehicle({ passengers: 14, serviceType: 'corporate' })).toBe('sprinter')
    expect(recommendVehicle({ passengers: 45, serviceType: 'event' })).toBe('paradiso')
  })

  it('validates required trip details and passenger limits', () => {
    expect(validateQuote({
      passengers: 0,
      serviceType: 'corporate',
      origin: '',
      destination: '',
      date: '',
      vehicleId: 'sprinter',
    })).toEqual({
      passengers: 'Ingrese al menos un pasajero.',
      origin: 'Ingrese el origen.',
      destination: 'Ingrese el destino.',
      date: 'Seleccione una fecha aproximada.',
    })
  })
})
