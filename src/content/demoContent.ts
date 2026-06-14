import { publicAsset } from '../assets/publicAsset'
import { demoBrand } from '../brand/demoBrand'

export type ChapterId =
  | 'hero'
  | 'trust'
  | 'fleet'
  | 'reveal'
  | 'showroom'
  | 'quote'
  | 'closing'

export type VehicleId = 'prado' | 'sprinter' | 'paradiso'

export interface Chapter {
  id: ChapterId
  eyebrow: string
  title: string
  body: string
  cta?: string
}

export interface Hotspot {
  id: string
  label: string
  description: string
}

export interface Vehicle {
  id: VehicleId
  name: string
  category: string
  description: string
  image: string
  imageAlt: string
  features: string[]
  hotspots: Hotspot[]
}

export const demoContent = {
  chapters: [
    {
      id: 'hero',
      eyebrow: 'Transporte especial en Cordoba',
      title: 'El viaje que su empresa merece.',
      body: 'Transporte especial pensado para mover personas, equipos y grandes decisiones.',
      cta: 'Explorar experiencia',
    },
    {
      id: 'trust',
      eyebrow: 'Confianza en movimiento',
      title: 'Planeacion, puntualidad y seguridad en cada recorrido.',
      body: 'Conductores capacitados y monitoreo continuo acompañan una operacion diseñada para empresas.',
    },
    {
      id: 'fleet',
      eyebrow: 'Una flota para cada escala',
      title: 'Una solucion para cada equipo, evento y recorrido.',
      body: 'De la movilidad ejecutiva a los grandes grupos, cada servicio conserva comodidad y precision.',
    },
    {
      id: 'reveal',
      eyebrow: 'Gran capacidad',
      title: 'Cuando todos deben llegar bien, cada detalle importa.',
      body: 'El bus premium convierte los recorridos colectivos en una experiencia serena y confiable.',
    },
    {
      id: 'showroom',
      eyebrow: 'Exploracion interactiva',
      title: 'Conozca el bus protagonista.',
      body: 'Explore caracteristicas destacadas de comodidad, capacidad y seguridad.',
      cta: 'Cotizar este bus',
    },
    {
      id: 'quote',
      eyebrow: 'Cotizacion demo',
      title: 'Preparemos el proximo recorrido.',
      body: 'Comparta los datos esenciales y un asesor preparara una propuesta para su empresa.',
      cta: 'Solicitar propuesta',
    },
    {
      id: 'closing',
      eyebrow: 'Destino compartido',
      title: 'Cordoba se mueve con nosotros.',
      body: 'Una vision digital para conectar confianza, escala y nuevas oportunidades.',
      cta: 'Solicitar cotizacion',
    },
  ] satisfies Chapter[],
  vehicles: [
    {
      id: 'prado',
      name: 'Prado ejecutiva',
      category: 'Movilidad ejecutiva',
      description: 'Una alternativa para traslados directivos y recorridos de grupos pequeños.',
      image: publicAsset('/demo-assets/photography/executive.webp'),
      imageAlt: 'Vehículo ejecutivo marfil en una carretera tropical',
      features: ['Comodidad ejecutiva', 'Climatizacion', 'Equipaje protegido'],
      hotspots: [],
    },
    {
      id: 'sprinter',
      name: 'Sprinter corporativa',
      category: 'Equipos y eventos',
      description: 'Espacio flexible para equipos empresariales, invitados y operacion coordinada.',
      image: publicAsset('/demo-assets/photography/corporate.webp'),
      imageAlt: 'Vehículo corporativo marfil preparado para un traslado empresarial',
      features: ['Conectividad', 'Climatizacion', 'Espacio de equipaje'],
      hotspots: [],
    },
    {
      id: 'paradiso',
      name: 'Paradiso premium',
      category: 'Grandes grupos',
      description: 'El protagonista para recorridos colectivos de gran capacidad.',
      image: publicAsset('/demo-assets/photography/tourism.webp'),
      imageAlt: 'Bus de turismo marfil recorriendo un paisaje tropical',
      features: ['Capacidad', 'Comodidad', 'Entretenimiento', 'Seguridad'],
      hotspots: [
        { id: 'capacity', label: 'Capacidad', description: 'Configuracion para grandes grupos.' },
        { id: 'comfort', label: 'Comodidad', description: 'Cabina diseñada para un recorrido sereno.' },
        { id: 'climate', label: 'Climatizacion', description: 'Ambiente regulado durante todo el trayecto.' },
        { id: 'luggage', label: 'Equipaje', description: 'Espacio amplio y organizado para equipaje.' },
        { id: 'entertainment', label: 'Entretenimiento', description: 'Opciones para viajes largos.' },
        { id: 'safety', label: 'Seguridad', description: 'Caracteristicas orientadas a un viaje confiable.' },
      ],
    },
  ] satisfies Vehicle[],
  quote: {
    notice: demoBrand.notice,
    cta: 'Solicitar propuesta',
  },
} as const
