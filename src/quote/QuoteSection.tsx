import { useEffect, useRef, useState, type FormEvent } from 'react'
import { demoContent, type VehicleId } from '../content/demoContent'
import {
  recommendVehicle,
  validateQuote,
  type QuoteData,
  type QuoteErrors,
  type ServiceType,
} from './quoteRules'
import './Quote.css'

const initialData: QuoteData = {
  passengers: 1,
  serviceType: 'corporate',
  origin: '',
  destination: '',
  date: '',
  vehicleId: 'sprinter',
}

export function QuoteSection() {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const firstFieldRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const selectVehicle = (event: Event) => {
      const vehicleId = (event as CustomEvent<{ vehicleId: VehicleId }>).detail.vehicleId
      setData((current) => ({ ...current, vehicleId }))
      firstFieldRef.current?.focus()
    }
    window.addEventListener('cootrasec:select-vehicle', selectVehicle)
    return () => window.removeEventListener('cootrasec:select-vehicle', selectVehicle)
  }, [])

  const update = <Key extends keyof QuoteData>(key: Key, value: QuoteData[Key]) => {
    setData((current) => ({ ...current, [key]: value }))
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validateQuote(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setData((current) => ({
      ...current,
      vehicleId: recommendVehicle(current),
    }))
    setSubmitted(true)
  }

  const selectedVehicle = demoContent.vehicles.find((vehicle) => vehicle.id === data.vehicleId)

  return (
    <div className="quote-layout">
      <form className="quote-form" noValidate onSubmit={submit}>
        <label>
          Tipo de servicio
          <select
            onChange={(event) => update('serviceType', event.target.value as ServiceType)}
            ref={firstFieldRef}
            value={data.serviceType}
          >
            <option value="executive">Ejecutivo</option>
            <option value="corporate">Corporativo</option>
            <option value="event">Evento</option>
          </select>
        </label>
        <label>
          Numero de pasajeros
          <input
            aria-describedby={errors.passengers ? 'passengers-error' : undefined}
            min="1"
            onChange={(event) => update('passengers', Number(event.target.value))}
            type="number"
            value={data.passengers}
          />
          {errors.passengers && <span className="field-error" id="passengers-error">{errors.passengers}</span>}
        </label>
        <label>
          Origen
          <input
            aria-describedby={errors.origin ? 'origin-error' : undefined}
            onChange={(event) => update('origin', event.target.value)}
            value={data.origin}
          />
          {errors.origin && <span className="field-error" id="origin-error">{errors.origin}</span>}
        </label>
        <label>
          Destino
          <input
            aria-describedby={errors.destination ? 'destination-error' : undefined}
            onChange={(event) => update('destination', event.target.value)}
            value={data.destination}
          />
          {errors.destination && <span className="field-error" id="destination-error">{errors.destination}</span>}
        </label>
        <label>
          Fecha aproximada
          <input
            aria-describedby={errors.date ? 'date-error' : undefined}
            onChange={(event) => update('date', event.target.value)}
            type="date"
            value={data.date}
          />
          {errors.date && <span className="field-error" id="date-error">{errors.date}</span>}
        </label>
        <label>
          Vehiculo seleccionado
          <select onChange={(event) => update('vehicleId', event.target.value as VehicleId)} value={data.vehicleId}>
            {demoContent.vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
            ))}
          </select>
        </label>
        <p className="quote-notice">{demoContent.quote.notice}</p>
        <button className="button-link button-link--primary" type="submit">{demoContent.quote.cta}</button>
      </form>
      <aside className="quote-summary" aria-live="polite">
        {submitted ? (
          <>
            <p className="eyebrow">Proximo paso</p>
            <h3>Resumen conceptual</h3>
            <p><strong>{selectedVehicle?.name}</strong> para {data.passengers} pasajeros.</p>
            <p>{data.origin} → {data.destination} · {data.date}</p>
            <p>Un asesor preparara una propuesta con disponibilidad y condiciones reales.</p>
          </>
        ) : (
          <p>Complete los datos para recibir una recomendacion conceptual.</p>
        )}
      </aside>
    </div>
  )
}
