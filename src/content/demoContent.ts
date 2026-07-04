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
  features: string[]
  hotspots: Hotspot[]
}

export const demoContent = {
  chapters: [
    {
      id: 'hero',
      eyebrow: 'Transporte especial en Cordoba',
      title: 'La flota se mueve con su empresa.',
      body: 'Un recorrido continuo para ver como automoviles, vans y buses trabajan como un solo servicio.',
      cta: 'Ver la ruta',
    },
    {
      id: 'trust',
      eyebrow: 'Confianza en movimiento',
      title: 'Cada kilometro avanza con control.',
      body: 'Conductores capacitados y monitoreo conceptual acompañan una operacion diseñada para empresas.',
    },
    {
      id: 'fleet',
      eyebrow: 'Una flota para cada escala',
      title: 'El vehiculo correcto aparece en el momento correcto.',
      body: 'Automoviles ejecutivos, vans corporativas y buses premium conectan cada necesidad del recorrido.',
    },
    {
      id: 'reveal',
      eyebrow: 'Gran capacidad',
      title: 'La ruta termina con todos llegando bien.',
      body: 'El bus premium cierra el recorrido con capacidad, comodidad y una experiencia colectiva confiable.',
    },
    {
      id: 'showroom',
      eyebrow: 'Exploracion interactiva',
      title: 'Conozca el bus protagonista.',
      body: 'Explore caracteristicas conceptuales de comodidad, capacidad y seguridad.',
      cta: 'Cotizar este bus',
    },
    {
      id: 'quote',
      eyebrow: 'Cotizacion conceptual',
      title: 'Preparemos el proximo recorrido.',
      body: 'Comparta los datos esenciales y un asesor preparara una propuesta para su empresa.',
      cta: 'Solicitar propuesta',
    },
    {
      id: 'closing',
      eyebrow: 'Destino compartido',
      title: 'Su proximo recorrido empieza en movimiento.',
      body: 'Una vision digital para conectar confianza, escala y nuevas oportunidades en cada trayecto.',
      cta: 'Solicitar cotizacion',
    },
  ] satisfies Chapter[],
  vehicles: [
    {
      id: 'prado',
      name: 'Prado ejecutiva',
      category: 'Movilidad ejecutiva',
      description: 'Una alternativa conceptual para traslados directivos y recorridos de grupos pequeños.',
      features: ['Comodidad ejecutiva', 'Climatizacion', 'Equipaje protegido'],
      hotspots: [],
    },
    {
      id: 'sprinter',
      name: 'Sprinter corporativa',
      category: 'Equipos y eventos',
      description: 'Espacio flexible para equipos empresariales, invitados y operacion coordinada.',
      features: ['Conectividad', 'Climatizacion', 'Espacio de equipaje'],
      hotspots: [],
    },
    {
      id: 'paradiso',
      name: 'Paradiso premium',
      category: 'Grandes grupos',
      description: 'El protagonista conceptual para recorridos colectivos de gran capacidad.',
      features: ['Capacidad', 'Comodidad', 'Entretenimiento', 'Seguridad'],
      hotspots: [
        { id: 'capacity', label: 'Capacidad', description: 'Configuracion conceptual para grandes grupos.' },
        { id: 'comfort', label: 'Comodidad', description: 'Cabina diseñada para un recorrido sereno.' },
        { id: 'climate', label: 'Climatizacion', description: 'Ambiente regulado durante todo el trayecto.' },
        { id: 'luggage', label: 'Equipaje', description: 'Espacio amplio y organizado para equipaje.' },
        { id: 'entertainment', label: 'Entretenimiento', description: 'Opciones conceptuales para viajes largos.' },
        { id: 'safety', label: 'Seguridad', description: 'Caracteristicas orientadas a un viaje confiable.' },
      ],
    },
  ] satisfies Vehicle[],
  quote: {
    notice: 'Demostracion conceptual. No muestra precios ni disponibilidad real.',
    cta: 'Solicitar propuesta',
  },
} as const
