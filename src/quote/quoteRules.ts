import type { VehicleId } from '../content/demoContent'

export type ServiceType = 'executive' | 'corporate' | 'event'

export interface QuoteData {
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

export function validateQuote(data: QuoteData): QuoteErrors {
  const errors: QuoteErrors = {}
  if (data.passengers < 1) errors.passengers = 'Ingrese al menos un pasajero.'
  if (!data.origin.trim()) errors.origin = 'Ingrese el origen.'
  if (!data.destination.trim()) errors.destination = 'Ingrese el destino.'
  if (!data.date) errors.date = 'Seleccione una fecha aproximada.'
  return errors
}
