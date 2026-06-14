import { demoContent, type VehicleId } from '../content/demoContent'
import type { QuoteData, ServiceType } from './quoteRules'

const serviceLabels: Record<ServiceType, string> = {
  executive: 'Ejecutivo',
  corporate: 'Corporativo',
  event: 'Evento',
}

const vehicleLabels: Record<VehicleId, string> = Object.fromEntries(
  demoContent.vehicles.map((vehicle) => [vehicle.id, vehicle.name]),
) as Record<VehicleId, string>

export function normalizeWhatsAppNumber(number: string | null | undefined): string {
  return number?.replace(/\D/g, '') ?? ''
}

export function buildWhatsAppMessage(data: QuoteData): string {
  return [
    'Hola, quiero solicitar una cotizacion.',
    `Nombre: ${data.name}`,
    `Telefono: ${data.phone}`,
    `Servicio: ${serviceLabels[data.serviceType]}`,
    `Pasajeros: ${data.passengers}`,
    `Origen: ${data.origin}`,
    `Destino: ${data.destination}`,
    `Fecha: ${data.date}`,
    `Vehiculo recomendado: ${vehicleLabels[data.vehicleId]}`,
  ].join('\n')
}

export function buildWhatsAppUrl(number: string | null | undefined, data: QuoteData): string {
  return `https://wa.me/${normalizeWhatsAppNumber(number)}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`
}
