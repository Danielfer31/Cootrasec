import type { VehicleId } from '../content/demoContent'

export type ServiceType = 'executive' | 'corporate' | 'event'

export interface QuoteData {
  name: string
  phone: string
  passengers: number
  serviceType: ServiceType
  origin: string
  destination: string
  date: string
  vehicleId: VehicleId
}

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>

export function recommendVehicle(input: Pick<QuoteData, 'passengers' | 'serviceType'>): VehicleId {
  if (input.passengers <= 6 || input.serviceType === 'executive') return 'prado'
  if (input.passengers <= 20) return 'sprinter'
  return 'paradiso'
}

function normalizeToday(today: Date | string): string {
  if (typeof today === 'string') return today.match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? ''

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function validateQuote(data: QuoteData, today: Date | string = new Date()): QuoteErrors {
  const errors: QuoteErrors = {}
  if (!data.name?.trim()) errors.name = 'Ingrese su nombre.'
  if (!data.phone?.trim()) errors.phone = 'Ingrese su telefono.'
  if (data.passengers < 1) errors.passengers = 'Ingrese al menos un pasajero.'
  if (!data.origin.trim()) errors.origin = 'Ingrese el origen.'
  if (!data.destination.trim()) errors.destination = 'Ingrese el destino.'
  if (!data.date) errors.date = 'Seleccione una fecha aproximada.'
  else if (data.date <= normalizeToday(today)) errors.date = 'Seleccione una fecha futura.'
  return errors
}
