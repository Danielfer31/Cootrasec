# Cootrasec Demo Inmersiva Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una demo comercial inmersiva que traduzca la direccion visual Viaje luminoso en una narrativa web estable, un showroom interactivo del bus y un cotizador conceptual.

**Architecture:** La aplicacion conserva React + Vite + TypeScript y reutiliza el gestor de capacidades validado en los spikes. La experiencia final se divide en modulos aislados para shell, narrativa prerenderizada, showroom cargado bajo demanda, cotizador y telemetria de rendimiento; el contenido y los recursos se describen como datos para que cada tier comunique el mismo mensaje sin duplicar la interfaz.

**Tech Stack:** React 19, Vite 8, TypeScript 6, CSS moderno, GSAP + ScrollTrigger, React Three Fiber, Drei, Three.js, Vitest, Testing Library y Playwright.

---

## Alcance Y Decisiones Bloqueadas

Este plan implementa la demo comercial aprobada, no el sitio operativo definitivo de Cootrasec.

- Direccion visual: fotorealismo publicitario, prestigio sereno y Viaje luminoso.
- Paleta: marfil perlado, verdes tropicales profundos, neutros claros, grafito y reflejos solares calidos.
- Tipografia: exclusivamente sans-serif corporativa moderna.
- Narrativa high: secuencia de imagenes controlada por scroll nativo.
- Narrativa balanced/lite: video sincronizado o imagenes clave.
- Movimiento reducido: recorrido lineal sin escenas fijadas.
- Showroom principal: R3F con `frameloop="demand"`.
- Showroom lite o sin WebGL: vista 360 con los mismos hotspots.
- Cotizador: simulacion local sin precios ni promesas de disponibilidad real.
- Los vehiculos no tendran marcas, emblemas ni placas legibles.
- La calidad solo puede reducirse automaticamente; nunca aumentar durante la sesion.

La implementacion completa queda bloqueada hasta superar la validacion de recursos de la Tarea 1. Es valido construir shell y componentes con recursos temporales mientras se completa esa compuerta, pero no integrar todas las escenas ni declarar estabilidad de presentacion.

## Estructura De Archivos Planeada

```text
src/
├── app/
│   ├── App.tsx
│   ├── App.css
│   ├── DemoApp.tsx
│   └── DemoApp.test.tsx
├── content/
│   ├── demoContent.ts
│   └── demoContent.test.ts
├── experience/
│   ├── capabilities.ts
│   ├── ExperienceProvider.tsx
│   ├── PerformanceMonitor.tsx
│   └── PerformanceMonitor.test.tsx
├── shell/
│   ├── AppHeader.tsx
│   ├── AppHeader.test.tsx
│   ├── LoadingScreen.tsx
│   ├── QualityControl.tsx
│   └── Shell.css
├── narrative/
│   ├── Narrative.tsx
│   ├── Narrative.test.tsx
│   ├── Narrative.css
│   ├── sceneManifest.ts
│   ├── sceneManifest.test.ts
│   ├── HighNarrative.tsx
│   ├── VideoNarrative.tsx
│   └── LinearNarrative.tsx
├── showroom/
│   ├── Showroom.tsx
│   ├── Showroom.test.tsx
│   ├── Showroom.css
│   ├── BusCanvas.tsx
│   ├── TurntableFallback.tsx
│   └── hotspots.ts
├── quote/
│   ├── QuoteSection.tsx
│   ├── QuoteSection.test.tsx
│   ├── quoteRules.ts
│   ├── quoteRules.test.ts
│   └── Quote.css
└── test/
    └── setup.ts
public/
└── demo-assets/
    ├── manifest.json
    ├── narrative/
    ├── showroom/
    ├── turntable/
    └── backup/
scripts/
└── validate-assets.mjs
e2e/
├── demo-narrative.spec.ts
├── demo-showroom.spec.ts
├── demo-quote.spec.ts
└── demo-adaptive.spec.ts
docs/
├── production/
│   ├── asset-ledger.md
│   └── presentation-runbook.md
└── qa/
    └── final-verification.md
```

Los componentes bajo `src/spikes/` permanecen como laboratorio de referencia y no se importan en la ruta final.

### Task 1: Crear La Compuerta De Recursos De Produccion

**Files:**
- Create: `public/demo-assets/manifest.json`
- Create: `scripts/validate-assets.mjs`
- Create: `docs/production/asset-ledger.md`
- Modify: `package.json`

- [ ] **Step 1: Registrar el inventario inicial de recursos**

Crear `public/demo-assets/manifest.json` con rutas estables, presupuestos y estado explicito:

```json
{
  "narrative": {
    "hero": { "path": "/demo-assets/narrative/hero.webp", "maxBytes": 700000 },
    "transformationHigh": { "path": "/demo-assets/narrative/transformation/frame-{frame}.webp", "frames": 48, "maxBytes": 4000000 },
    "transformationVideo": { "path": "/demo-assets/narrative/transformation.mp4", "maxBytes": 1500000 },
    "reveal": { "path": "/demo-assets/narrative/reveal.webp", "maxBytes": 900000 },
    "convoy": { "path": "/demo-assets/narrative/convoy.webp", "maxBytes": 900000 }
  },
  "showroom": {
    "model": { "path": "/demo-assets/showroom/paradiso.glb", "maxBytes": 8000000 },
    "turntable": { "path": "/demo-assets/turntable/frame-{frame}.webp", "frames": 24, "maxBytes": 1500000 }
  }
}
```

- [ ] **Step 2: Escribir el validador de existencia y presupuesto**

Crear `scripts/validate-assets.mjs` para leer el manifiesto, expandir secuencias, comprobar archivos y fallar cuando un grupo supere su presupuesto. El reporte debe imprimir `PASS`, `MISSING` o `OVER BUDGET` por recurso y terminar con codigo distinto de cero ante un fallo.

- [ ] **Step 3: Agregar el comando de validacion**

Agregar a `package.json`:

```json
"validate:assets": "node scripts/validate-assets.mjs"
```

- [ ] **Step 4: Documentar licencias y validacion visual**

Crear `docs/production/asset-ledger.md` con una fila por recurso: origen, licencia, estado sin marca, peso, dimensiones, responsable y resultado en computador de presentacion/telefono medio. Marcar como bloqueantes el GLB, la secuencia final y el video final.

- [ ] **Step 5: Ejecutar la compuerta**

Run: `npm run validate:assets`

Expected inicialmente: `MISSING` para los recursos aun no producidos. Antes de integrar todas las escenas, el resultado esperado es `All production assets pass`.

- [ ] **Step 6: Commit**

```powershell
git add package.json public/demo-assets/manifest.json scripts/validate-assets.mjs docs/production/asset-ledger.md
git commit -m "build: add production asset validation gate"
```

### Task 2: Definir Contenido, Tokens Y Shell Accesible

**Files:**
- Create: `src/content/demoContent.ts`
- Create: `src/content/demoContent.test.ts`
- Create: `src/shell/AppHeader.tsx`
- Create: `src/shell/AppHeader.test.tsx`
- Create: `src/shell/QualityControl.tsx`
- Create: `src/shell/LoadingScreen.tsx`
- Create: `src/shell/Shell.css`
- Modify: `src/app/App.css`

- [ ] **Step 1: Escribir la prueba de contenido obligatorio**

Crear `src/content/demoContent.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { demoContent } from './demoContent'

describe('demoContent', () => {
  it('contains every commercial chapter and quote vehicle', () => {
    expect(demoContent.chapters.map((chapter) => chapter.id)).toEqual([
      'hero', 'trust', 'fleet', 'reveal', 'showroom', 'quote', 'closing',
    ])
    expect(demoContent.vehicles.map((vehicle) => vehicle.id)).toEqual([
      'prado', 'sprinter', 'paradiso',
    ])
  })
})
```

- [ ] **Step 2: Verificar que la prueba falle**

Run: `npm test -- src/content/demoContent.test.ts`

Expected: FAIL porque `demoContent.ts` no existe.

- [ ] **Step 3: Crear el modelo de contenido**

Crear `src/content/demoContent.ts` con tipos `Chapter`, `Vehicle` y `Hotspot`. Incluir los textos aprobados, avisos de demo conceptual, caracteristicas selectivas y CTA. Ningun componente visual debe contener copy comercial duplicado.

- [ ] **Step 4: Crear pruebas del encabezado**

La prueba debe verificar navegacion a `Flota`, `Experiencia`, `Seguridad` y `Cotizar`, un enlace para saltar al contenido y el control de calidad.

- [ ] **Step 5: Implementar shell y tokens**

En `src/app/App.css`, reemplazar los estilos del laboratorio por tokens:

```css
:root {
  --ivory: #f4f0e6;
  --ivory-soft: #ebe5d7;
  --forest: #15382d;
  --forest-deep: #0d241d;
  --graphite: #181c1b;
  --solar: #d8a84e;
  --action: #70a67c;
  --glass: rgba(244, 240, 230, 0.12);
  --content-width: 1200px;
  color: var(--ivory);
  background: var(--forest-deep);
  font-family: Inter, ui-sans-serif, system-ui, sans-serif;
}
```

Implementar `AppHeader`, `QualityControl` y una precarga expresiva en `LoadingScreen` con HTML semantico, foco visible, reflejo solar animado, estado de carga real y mensajes sin depender del canvas. La precarga debe permitir entrar cuando los recursos esenciales esten listos, sin esperar toda la demo.

- [ ] **Step 6: Verificar**

Run: `npm test -- src/content/demoContent.test.ts src/shell/AppHeader.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/content src/shell src/app/App.css
git commit -m "feat: add demo content and accessible shell"
```

### Task 3: Ensamblar La Aplicacion Final Sin Eliminar El Laboratorio

**Files:**
- Create: `src/app/DemoApp.tsx`
- Create: `src/app/DemoApp.test.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Escribir la prueba de enrutamiento**

Probar que `/` renderiza el titular `El viaje que su empresa merece`, mientras `/?spike=narrative`, `/?spike=showroom` y `/?spike=adaptive` siguen abriendo los laboratorios.

- [ ] **Step 2: Verificar que la prueba falle**

Run: `npm test -- src/app/DemoApp.test.tsx`

Expected: FAIL porque la raiz aun muestra el laboratorio.

- [ ] **Step 3: Crear `DemoApp`**

Componer el proveedor de experiencia, encabezado, `main`, regiones narrativas, showroom, cotizador y cierre. Mantener imports diferidos para el showroom:

```tsx
const Showroom = lazy(() => import('../showroom/Showroom'))
```

Usar un fallback textual y visual que preserve el flujo cuando el chunk falle.

- [ ] **Step 4: Conservar rutas de spikes**

Modificar `App.tsx` para que los query params de spikes mantengan su comportamiento actual y la ruta sin query entregue `DemoApp`.

- [ ] **Step 5: Verificar**

Run: `npm test -- src/app/DemoApp.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/app/App.tsx src/app/DemoApp.tsx src/app/DemoApp.test.tsx
git commit -m "feat: add final demo application shell"
```

### Task 4: Implementar La Narrativa Adaptable

**Files:**
- Create: `src/narrative/sceneManifest.ts`
- Create: `src/narrative/sceneManifest.test.ts`
- Create: `src/narrative/Narrative.tsx`
- Create: `src/narrative/Narrative.test.tsx`
- Create: `src/narrative/HighNarrative.tsx`
- Create: `src/narrative/VideoNarrative.tsx`
- Create: `src/narrative/LinearNarrative.tsx`
- Create: `src/narrative/Narrative.css`
- Create: `e2e/demo-narrative.spec.ts`
- Modify: `src/app/DemoApp.tsx`

- [ ] **Step 1: Probar la seleccion de variante**

La prueba de `Narrative` debe afirmar:

```tsx
expect(screen.getByTestId('narrative-high')).toBeVisible()
expect(screen.queryByTestId('narrative-video')).not.toBeInTheDocument()
```

Repetir para `balanced`, `lite` y `reduced-motion`, comprobando que solo exista una variante.

- [ ] **Step 2: Probar el manifiesto de escenas**

Verificar que cada escena tenga `id`, recurso principal, texto alternativo, ancla y rango de progreso; comprobar que los rangos high sean continuos y terminen en `1`.

- [ ] **Step 3: Implementar `Narrative`**

Seleccionar una unica variante segun `tier` y usar `experienceRevision` como `key` para forzar limpieza completa:

```tsx
export function Narrative() {
  const { experienceRevision, tier } = useExperience()
  const Variant = tier === 'high'
    ? HighNarrative
    : tier === 'reduced-motion'
      ? LinearNarrative
      : VideoNarrative
  return <Variant key={`${tier}-${experienceRevision}`} />
}
```

- [ ] **Step 4: Implementar narrativa high**

Adaptar el helper validado de `src/spikes/narrative/imageSequence.ts`. Usar GSAP ScrollTrigger con scroll nativo, fijaciones breves y limpieza mediante `gsap.context().revert()`. La transformacion debe usar una unica secuencia y no mostrar tres vehiculos simultaneos como escena final.

- [ ] **Step 5: Implementar variantes video y lineal**

`VideoNarrative` sincroniza `currentTime` y ofrece imagen clave si falla el video. `LinearNarrative` muestra todos los mensajes y CTA en flujo normal, sin pinning ni autoplay.

- [ ] **Step 6: Agregar prueba E2E**

`e2e/demo-narrative.spec.ts` debe recorrer hacia adelante y atras, usar navegacion directa, comprobar el CTA de cotizacion y verificar que movimiento reducido no genere elementos fijados.

- [ ] **Step 7: Verificar**

Run: `npm test -- src/narrative`

Expected: PASS.

Run: `npx playwright test e2e/demo-narrative.spec.ts`

Expected: PASS en viewport desktop y movil.

- [ ] **Step 8: Commit**

```powershell
git add src/narrative src/app/DemoApp.tsx e2e/demo-narrative.spec.ts
git commit -m "feat: build adaptive cinematic narrative"
```

### Task 5: Integrar El Showroom Con Fallback 360

**Files:**
- Create: `src/showroom/hotspots.ts`
- Create: `src/showroom/Showroom.tsx`
- Create: `src/showroom/Showroom.test.tsx`
- Create: `src/showroom/BusCanvas.tsx`
- Create: `src/showroom/TurntableFallback.tsx`
- Create: `src/showroom/Showroom.css`
- Create: `e2e/demo-showroom.spec.ts`
- Modify: `src/app/DemoApp.tsx`

- [ ] **Step 1: Escribir pruebas de contrato compartido**

Comprobar que R3F y 360 exponen los mismos hotspots: capacidad, comodidad, climatizacion, equipaje, entretenimiento y seguridad. Probar que lite usa 360 y high/balanced usan R3F cuando WebGL esta disponible. Probar tambien el cambio exterior/interior conceptual y la variacion de iluminacion.

- [ ] **Step 2: Implementar datos de hotspots**

Crear `hotspots.ts` con identificadores, etiquetas, descripciones y posiciones 3D/indices 360. El contenido debe provenir de `demoContent`.

- [ ] **Step 3: Implementar `BusCanvas`**

Partir del patron validado en `src/spikes/showroom/R3FShowroom.tsx`. Usar `Canvas frameloop="demand"`, limites de rotacion/zoom, iluminacion marfil-verde, carga diferida del GLB y un error boundary que active el fallback. Implementar controles discretos para exterior/interior conceptual y variacion de iluminacion; el interior sera una vista guiada, no navegacion libre.

- [ ] **Step 4: Implementar `TurntableFallback`**

Adaptar `src/spikes/showroom/Turntable360.tsx`, conservando teclado, puntero, texto alternativo y botones de hotspots fuera de la imagen.

- [ ] **Step 5: Conectar seleccion al cotizador**

El CTA `Cotizar este bus` debe actualizar el vehiculo seleccionado a `paradiso` y mover el foco al inicio del formulario.

- [ ] **Step 6: Agregar prueba E2E**

Verificar rotacion, zoom limitado, apertura/cierre de hotspot, cambio exterior/interior, variacion de iluminacion, fallback 360 sin WebGL, un solo canvas activo y transferencia del bus al cotizador.

- [ ] **Step 7: Verificar**

Run: `npm test -- src/showroom`

Expected: PASS.

Run: `npx playwright test e2e/demo-showroom.spec.ts`

Expected: PASS sin errores de consola.

- [ ] **Step 8: Commit**

```powershell
git add src/showroom src/app/DemoApp.tsx e2e/demo-showroom.spec.ts
git commit -m "feat: integrate lazy showroom and 360 fallback"
```

### Task 6: Construir El Cotizador Conceptual

**Files:**
- Create: `src/quote/quoteRules.ts`
- Create: `src/quote/quoteRules.test.ts`
- Create: `src/quote/QuoteSection.tsx`
- Create: `src/quote/QuoteSection.test.tsx`
- Create: `src/quote/Quote.css`
- Create: `e2e/demo-quote.spec.ts`
- Modify: `src/app/DemoApp.tsx`

- [ ] **Step 1: Escribir las reglas fallidas**

Crear pruebas para recomendar:

```ts
expect(recommendVehicle({ passengers: 4, serviceType: 'executive' })).toBe('prado')
expect(recommendVehicle({ passengers: 14, serviceType: 'corporate' })).toBe('sprinter')
expect(recommendVehicle({ passengers: 45, serviceType: 'event' })).toBe('paradiso')
```

Tambien probar limites invalidos: pasajeros menores a `1`, origen vacio, destino vacio y fecha ausente.

- [ ] **Step 2: Implementar reglas locales**

Crear una funcion pura `recommendVehicle` y validacion de campos. No calcular precio ni disponibilidad real.

- [ ] **Step 3: Probar el formulario accesible**

Verificar etiquetas, errores asociados, preservacion de valores, resumen, aviso `Demostracion conceptual` y CTA `Solicitar propuesta`.

- [ ] **Step 4: Implementar el flujo**

El formulario recoge tipo de servicio, pasajeros, origen, destino, fecha y vehiculo. Al enviar, muestra resumen, recomendacion y mensaje de que un asesor preparara la propuesta. La simulacion debe funcionar sin animacion y sin backend.

- [ ] **Step 5: Agregar prueba E2E**

Completar el flujo desde el CTA inicial y desde `Cotizar este bus`; comprobar validacion, resumen y ausencia de precio.

- [ ] **Step 6: Verificar**

Run: `npm test -- src/quote`

Expected: PASS.

Run: `npx playwright test e2e/demo-quote.spec.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/quote src/app/DemoApp.tsx e2e/demo-quote.spec.ts
git commit -m "feat: add conceptual quote flow"
```

### Task 7: Activar Degradacion, Recuperacion Y Monitoreo

**Files:**
- Create: `src/experience/PerformanceMonitor.tsx`
- Create: `src/experience/PerformanceMonitor.test.tsx`
- Create: `e2e/demo-adaptive.spec.ts`
- Modify: `src/experience/ExperienceProvider.tsx`
- Modify: `src/shell/QualityControl.tsx`
- Modify: `src/app/DemoApp.tsx`

- [ ] **Step 1: Probar downgrade automatico**

Simular una ventana de rendimiento que cumpla `shouldDowngrade` y comprobar que high pasa a balanced y balanced pasa a lite; comprobar que lite y reduced-motion permanecen estables.

- [ ] **Step 2: Implementar `PerformanceMonitor`**

Muestrear `requestAnimationFrame` solo durante narrativa activa/showroom activo, resumir una ventana representativa y llamar `downgrade()` una sola vez por revision. No guardar cada frame en estado React.

- [ ] **Step 3: Endurecer el control manual**

`QualityControl` permite elegir high, balanced o lite durante la sesion; si `prefers-reduced-motion` esta activo, mostrar la razon del bloqueo y mantener reduced-motion.

- [ ] **Step 4: Implementar recuperacion visible**

Ante fallo de imagen/video, mostrar imagen clave y continuar. Ante fallo de GLB/WebGL, activar 360. Ante fallo de chunk del showroom, conservar hotspots y CTA de cotizacion en HTML.

- [ ] **Step 5: Agregar prueba E2E adaptable**

Cubrir desktop high, telefono balanced, WebGL fallido lite, reduced-motion, cambio de tier y ausencia de runtimes duplicados.

- [ ] **Step 6: Verificar**

Run: `npm test -- src/experience src/shell`

Expected: PASS.

Run: `npx playwright test e2e/demo-adaptive.spec.ts`

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/experience src/shell src/app/DemoApp.tsx e2e/demo-adaptive.spec.ts
git commit -m "feat: add adaptive performance and recovery"
```

### Task 8: Integrar Recursos Finales Y Afinar La Direccion Visual

**Files:**
- Modify: `public/demo-assets/manifest.json`
- Modify: `docs/production/asset-ledger.md`
- Modify: `src/narrative/sceneManifest.ts`
- Modify: `src/narrative/Narrative.css`
- Modify: `src/showroom/Showroom.css`
- Modify: `src/shell/Shell.css`
- Modify: `src/quote/Quote.css`

- [ ] **Step 1: Validar recursos finales fuera de la experiencia**

Confirmar licencias, ausencia de marcas, continuidad de vehiculos, direccion de luz, temperatura de color, peso y dimensiones. Rechazar cualquier recurso que muestre transformacion mecanica, neon invasivo o emblemas.

- [ ] **Step 2: Ejecutar la compuerta**

Run: `npm run validate:assets`

Expected: `All production assets pass`.

- [ ] **Step 3: Integrar por capitulos**

Integrar en este orden y verificar despues de cada grupo: hero/amanecer, confianza, transformacion, revelacion, showroom, convoy. Mantener texto esencial fuera de las imagenes y preservar espacio editorial.

- [ ] **Step 4: Comparar contra conceptos aprobados**

Usar las cinco referencias en `.superpowers/visual-assets/fase-2-scenes/` para comprobar composicion, escala, luz, atmosfera y jerarquia. Registrar desviaciones justificadas en `docs/production/asset-ledger.md`.

- [ ] **Step 5: Verificar responsive y movimiento**

Revisar 1440x900, 1280x720, 390x844 y 360x800. Confirmar lectura inmediata, sin recortes de CTA, sin texto sobre zonas ruidosas y sin cambios bruscos.

- [ ] **Step 6: Commit**

```powershell
git add public/demo-assets docs/production/asset-ledger.md src/narrative src/showroom src/shell src/quote
git commit -m "feat: integrate approved production visuals"
```

### Task 9: Ejecutar QA Completo Y Preparar La Presentacion

**Files:**
- Create: `docs/qa/final-verification.md`
- Create: `docs/production/presentation-runbook.md`
- Create: `public/demo-assets/backup/cootrasec-demo-backup.mp4`
- Modify: `README.md`

- [ ] **Step 1: Ejecutar verificacion automatica**

Run:

```powershell
npm run lint
npm run test
npm run build
npm run test:e2e
npm run validate:assets
```

Expected: todos los comandos terminan con codigo `0`.

- [ ] **Step 2: Verificar presupuestos de entrega**

Confirmar primer contenido visible menor a `2.5 s` en conexion razonable, recursos esenciales iniciales cercanos o inferiores a `4 MB`, GLB inferior a `8 MB`, showroom diferido, cero errores relevantes de consola y cero bloqueos.

- [ ] **Step 3: Probar dispositivos objetivo**

Recorrer la demo completa en el computador real de presentacion y en un telefono medio. Registrar FPS, memoria, tiempo a primera interaccion, tier elegido y cualquier downgrade en `docs/qa/final-verification.md`.

- [ ] **Step 4: Ejecutar revision accesible y visual**

Comprobar teclado, foco, contraste, movimiento reducido, formulario sin animacion, fallback sin WebGL y comparacion de cada escena contra la direccion aprobada.

- [ ] **Step 5: Crear respaldo y runbook**

Exportar un video continuo a `public/demo-assets/backup/cootrasec-demo-backup.mp4`. Crear `presentation-runbook.md` con navegador, resolucion, tier recomendado, recorrido de 2 a 4 minutos, mensajes clave, CTA final y procedimiento para abrir el video de respaldo.

- [ ] **Step 6: Actualizar README**

Documentar instalacion, comandos, ruta final, rutas de spikes, tiers, compuerta de recursos y preparacion para presentacion.

- [ ] **Step 7: Verificacion final**

Run: `npm run check`

Expected: PASS y demo recorrible de principio a fin sin asistencia tecnica.

- [ ] **Step 8: Commit**

```powershell
git add docs/qa docs/production/presentation-runbook.md public/demo-assets/backup README.md
git commit -m "docs: prepare verified commercial presentation"
```

## Orden De Ejecucion Y Paralelismo

- Tarea 1 comienza primero y permanece como compuerta durante la produccion.
- Tareas 2 y produccion de recursos de Tarea 1 pueden avanzar en paralelo.
- Tarea 3 depende de Tarea 2.
- Tareas 4, 5 y 6 pueden ejecutarse en paralelo despues de Tarea 3, evitando editar simultaneamente `DemoApp.tsx`.
- Tarea 7 depende de narrativa y showroom funcionales.
- Tarea 8 depende de que la compuerta de recursos pase.
- Tarea 9 requiere todas las tareas anteriores.

## Criterios De Aprobacion

- La propuesta de valor se entiende en los primeros 15 segundos.
- Las cinco escenas aprobadas forman un recorrido continuo y luminoso.
- La transformacion es luminica, no mecanica.
- El showroom se carga bajo demanda, responde con fluidez y siempre tiene fallback 360.
- El cotizador completa el flujo sin precio ni disponibilidad ficticia.
- Los cuatro tiers preservan contenido, navegacion y CTA.
- Movimiento reducido y teclado permiten recorrer toda la demo.
- No hay marcas inventadas, errores relevantes de consola ni runtimes duplicados.
- Existe evidencia de rendimiento en el equipo de presentacion y un video de respaldo.
