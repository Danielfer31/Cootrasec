# Investigacion: paginas dinamicas con buses en scroll

Fecha: 2026-07-03

## Objetivo

Recopilar referencias y estructura tecnica para crear un home donde buses se muevan por la escena mientras la persona hace scroll. La experiencia buscada es de viaje continuo: el bus parece transitar, la camara o el paisaje se desplaza, y el contenido aparece en momentos narrativos.

## Referencias visuales y de transporte

### Ford M-Sport Raptor T1+

- URL: https://www.awwwards.com/sites/ford-m-sport-raptor-t1
- Sitio real: https://www.msport-raptor.com
- Por que sirve: experiencia automotriz de alto impacto, con intro, overlay, menu y animacion de scroll.
- Tecnicas reportadas por Awwwards: 3D, animacion, scrolling, sonido, interaction design.
- Lectura estructural: el vehiculo no es solo una imagen decorativa; funciona como objeto principal del relato. El scroll controla la tension visual, los overlays y los momentos de detalle.

### The Test Center by Volvo Cars

- URL: https://www.awwwards.com/sites/the-test-center-by-volvo-cars
- Sitio real listado: https://thetestcenter.no
- Por que sirve: mezcla automocion, interaccion, juegos, parallax, WebGL y GSAP.
- Tecnicas reportadas: Fullscreen, Parallax, Responsive, HTML5, WebGL, GSAP, Hammer.JS, Webpack, Craft CMS.
- Lectura estructural: cada tramo de scroll activa una prueba o una pieza interactiva. Es buena referencia para convertir beneficios de transporte, seguridad y comodidad en escenas.

### S-2K, tribute Honda S2000

- URL: https://www.awwwards.com/sites/s-2k
- Sitio real: https://s-2k.webflow.io
- Por que sirve: usa scroll horizontal, blueprint reveal y microinteracciones para contar la historia de un vehiculo.
- Tecnicas reportadas: Scrolling, Single page, Storytelling, Interaction Design, Microinteractions, GSAP, Webflow, Figma.
- Lectura estructural: sirve como referencia para una ruta horizontal tipo carretera, donde la pagina vertical empuja un movimiento lateral.

### Club Transit

- URL: https://www.awwwards.com/inspiration/homepage-scroll-animation-club-transit-1
- Por que sirve: referencia directa del sector transit/transporte con animacion de home y scroll.
- Tecnicas reportadas: scroll animation, homepage animation, geometric, flat design.
- Lectura estructural: util para una version mas grafica/ilustrada si no se quiere depender de 3D pesado.

### LODISNA Transport & Logistics

- URL: https://www.awwwards.com/inspiration/animated-scroll-60
- Por que sirve: referencia de transporte/logistica con scroll 3D animado.
- Tecnicas reportadas: scroll, 3D, animated, business & corporate.
- Lectura estructural: buena pista para una marca de movilidad que necesita verse seria, no solo espectacular.

### PORSCHEvolution

- Referencia recopilada por Creative Bloq: https://www.creativebloq.com/web-design/parallax-scrolling-1131762
- Por que sirve: timeline automotriz con parallax para contar evolucion de vehiculos.
- Lectura estructural: muy aplicable si Cootrasec quiere mostrar historia, flota, rutas, comodidad y confianza como capitulos de una misma carretera.

## Tutoriales y repositorios utiles

### GSAP ScrollTrigger

- Docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Uso clave: `pin`, `scrub`, `snap`, `onUpdate`, `start`, `end`.
- Estructura tipica:
  - se crea una seccion alta, por ejemplo `390vh`;
  - adentro hay una escena `position: sticky; top: 0; height: 100vh`;
  - ScrollTrigger fija la escena y convierte el avance del scroll en progreso de `0` a `1`;
  - ese progreso mueve el bus, cambia fondos, sincroniza video/canvas o avanza una camara 3D.

### CSS scroll-driven animations

- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- Can I Use: https://caniuse.com/mdn-css_properties_animation-timeline_scroll
- Uso clave: `animation-timeline: scroll()` y `scroll-timeline`.
- Estado actual: util para efectos CSS progresivos, pero aun conviene tener fallback porque Firefox lo mantiene desactivado por defecto y la cobertura global no es total.
- Recomendacion: usar CSS nativo para detalles ligeros, barras de progreso y capas simples; usar GSAP para la narrativa principal.

### Motion for React

- Docs: https://motion.dev/docs/react-scroll-animations
- Uso clave: `useScroll`, `useTransform`, `useSpring`, `whileInView`.
- Por que sirve: alternativa mas React para mapear progreso de scroll a posiciones, opacidad, filtros o desplazamientos.
- Recomendacion: util para microinteracciones y componentes aislados; para una escena cinematografica con pinning fuerte, GSAP sigue siendo mas directo.

### Three.js / React Three Fiber

- Fireship repo: https://github.com/fireship-io/threejs-scroll-animation-demo
- Tutorial 3D con scroll: https://sbcode.net/threejs/animate-on-scroll/
- 3D hero con Next, Three.js, GSAP y Lenis: https://dev.to/robinzon100/build-an-award-winning-3d-website-with-scroll-based-animations-nextjs-threejs-gsap-3630
- Uso clave:
  - una escena 3D vive dentro de un canvas;
  - el scroll mueve la camara, rota el modelo o cambia luces;
  - el render loop debe sincronizarse con el scroll;
  - hay que limpiar recursos WebGL al desmontar.

### Repos de car/scroll

- Scroll-driven car landing: https://github.com/Rajdeep2922/Scrool-Car-Web
- Stack reportado: Next.js, React, Tailwind, GSAP ScrollTrigger, Lenis.
- Valor: no necesariamente produccion madura, pero muestra la combinacion moderna tipica para landing automotriz con scroll suave.

### Tutoriales de YouTube a revisar

- Supercar con HTML, CSS, JS y ScrollTrigger: https://www.youtube.com/watch?v=33DEprMFi8U
- McLaren 570S con GSAP scroll animation: https://www.youtube.com/watch?v=gwqye__mjSg
- 3D model scroll animation con React, Three.js, R3F y Blender: https://www.youtube.com/watch?v=lrsB-4SN4us
- Three.js + GSAP + ScrollTrigger para modelos 3D: https://www.youtube.com/watch?v=rbIbvw6c53k
- Horizontal scroll con GSAP: https://www.youtube.com/watch?v=QlApLiVlLAw
- Curso/playlist ScrollTrigger: https://www.youtube.com/playlist?list=PLMPgoZdlPumexxtvuPUB3TY7LExI1N_Xp

## Como funcionan estructuralmente estas paginas

### 1. Scroll como linea de tiempo

La pagina no trata el scroll como simple desplazamiento. Lo convierte en una linea de tiempo:

```text
scroll top -> progress 0.00
mitad de escena -> progress 0.50
final de escena -> progress 1.00
```

Ese progreso controla:

- posicion del bus;
- velocidad relativa del fondo;
- opacidad de textos;
- cambio de escenas;
- frame actual de video o secuencia de imagenes;
- camara y luces en 3D;
- ruta, mapa o linea de progreso.

### 2. Seccion larga + escena fija

El patron mas comun:

```html
<section class="journey">
  <div class="journey-stage">
    <canvas />
    <div class="road-layers" />
    <article class="copy copy-hero" />
    <article class="copy copy-trust" />
  </div>
</section>
```

```css
.journey {
  min-height: 400vh;
}

.journey-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
```

La seccion da distancia de scroll. La escena sticky se queda visible. El usuario siente que avanza por la carretera aunque tecnicamente esta recorriendo una seccion alta.

### 3. Capas de profundidad

Para que parezca movimiento real, no basta con mover el bus. Se mueven varias capas a velocidades distintas:

- cielo o montanas: lento;
- carretera: medio/rapido;
- arboles o postes cercanos: rapido;
- bus: puede avanzar, vibrar sutilmente o mantenerse fijo mientras el entorno se mueve;
- sombras y luces: cambian segun el tramo.

Esto crea parallax: la profundidad nace de velocidades relativas.

### 4. Tecnicas posibles para el bus

#### Opcion A: SVG/HTML 2D

- Bus como SVG o PNG transparente.
- Carretera y paisaje por capas CSS.
- Movimiento con `transform: translate3d(...)`.
- Pros: rapido, ligero, facil de controlar.
- Contras: menos premium si los assets no son buenos.
- Ideal para: primera version funcional y responsive.

#### Opcion B: secuencia de imagenes en canvas

- Se exportan 40-120 frames del bus/carretera.
- El scroll escoge el frame actual.
- Pros: se ve cinematografico y controlado.
- Contras: peso alto, requiere preloading y versiones mobile.
- Ideal para: hero tipo Apple o automotriz premium.

#### Opcion C: video sincronizado al scroll

- Un video corto se pausa y se avanza con `currentTime = progress * duration`.
- Pros: muy visual y facil de producir con motion design.
- Contras: scrubbing puede variar por navegador/dispositivo; necesita fallback.
- Ideal para: experiencia balanceada.

#### Opcion D: Three.js / React Three Fiber

- Bus 3D GLB en canvas.
- Scroll mueve camara, luces y modelo.
- Pros: interactivo, reutilizable para showroom, sensacion premium.
- Contras: mas costo tecnico, optimizacion delicada en moviles.
- Ideal para: home + showroom si se quiere una experiencia fuerte de marca.

#### Opcion E: Lottie/Rive

- Animacion vectorial exportada desde After Effects o Rive.
- Scroll controla progreso.
- Pros: liviano para ilustraciones.
- Contras: menos realista para bus premium.
- Ideal para: iconografia, rutas, mapas, elementos secundarios.

## Recomendacion para Cootrasec

El proyecto ya tiene React, Vite, GSAP, Three.js y React Three Fiber. Tambien ya existe una base narrativa con:

- `src/narrative/HighNarrative.tsx`: ScrollTrigger + canvas + secuencia de imagenes.
- `src/narrative/VideoNarrative.tsx`: video sincronizado con scroll.
- `src/narrative/Narrative.css`: seccion alta, escena sticky, progreso y ruta visual.
- `src/showroom/BusCanvas.tsx`: bus 3D GLB con React Three Fiber.

Por eso la ruta mas sensata no es empezar de cero. Conviene evolucionar lo existente hacia una escena de viaje:

1. Mantener el patron de seccion alta + stage sticky.
2. Reemplazar el progreso simple por una ruta mas expresiva.
3. Crear capas de carretera/paisaje con parallax.
4. Usar el bus como protagonista:
   - version ligera: SVG/PNG animado;
   - version alta: canvas/image sequence o modelo 3D;
   - fallback: video o narrativa lineal.
5. Dividir la experiencia por escenas:
   - salida / hero;
   - seguridad y monitoreo;
   - comodidad de flota;
   - llegada / llamado a cotizar.

## Arquitectura recomendada

```text
src/home-journey/
  JourneyHome.tsx
  JourneyHome.css
  useScrollProgress.ts
  layers.ts
  scenes.ts
  BusLayer.tsx
  RoadLayer.tsx
  CopyLayer.tsx
  JourneyFallback.tsx
```

### Responsabilidades

- `JourneyHome.tsx`: compone la escena y conecta el progreso.
- `useScrollProgress.ts`: normaliza scroll a `0..1`; puede usar GSAP ScrollTrigger.
- `scenes.ts`: define capitulos, rangos y textos.
- `layers.ts`: define velocidad, escala y opacidad de cada capa.
- `BusLayer.tsx`: renderiza bus 2D o 3D segun capacidad.
- `RoadLayer.tsx`: renderiza carretera, horizonte, postes, senales y sombras.
- `CopyLayer.tsx`: muestra textos segun progreso.
- `JourneyFallback.tsx`: experiencia reducida para `prefers-reduced-motion` y equipos debiles.

## Modelo mental del movimiento

La sensacion de desplazamiento se logra con esta formula:

```text
valorVisual = interpolar(progress, rangoEntrada, rangoSalida)
```

Ejemplos:

- bus X: `progress 0..1 => -10vw..70vw`
- carretera X: `progress 0..1 => 0..-180vw`
- montanas X: `progress 0..1 => 0..-25vw`
- texto 2 opacidad: `progress 0.25..0.42 => 0..1..0`
- camara 3D Z: `progress 0..1 => 8..4`

## Rendimiento y accesibilidad

- Animar principalmente `transform` y `opacity`.
- Evitar animar `top`, `left`, `width`, `height` en scroll.
- Usar `requestAnimationFrame` si se calcula manualmente.
- Pre-cargar frames criticos, no todos a la vez en mobile.
- Usar `prefers-reduced-motion`.
- Mantener contenido real en HTML para SEO y accesibilidad.
- Evitar bloquear scroll nativo salvo que sea imprescindible.
- Medir FPS, peso de assets, LCP y memoria GPU.
- Tener fallback: imagen estatica o narrativa lineal.

## Decision tecnica sugerida

Para Cootrasec, la mejor relacion impacto/riesgo es:

1. Base: GSAP ScrollTrigger + escena sticky.
2. Visual principal: bus 2D/PNG/SVG con parallax de carretera.
3. Mejora premium: reutilizar el bus GLB de `BusCanvas` para un tramo 3D o showroom posterior.
4. Fallback: `VideoNarrative` o `LinearNarrative`, que ya existen en el proyecto.

Esta ruta permite construir primero una experiencia fluida y confiable, y luego subir el nivel visual sin romper la arquitectura.

## Checklist para construir el home

- Definir storyboard de 4 escenas.
- Conseguir/crear assets: bus lateral, carretera, fondo, postes, senales, sombras.
- Implementar progreso de scroll.
- Crear capas parallax.
- Sincronizar textos con rangos de progreso.
- Agregar version mobile con menos capas.
- Agregar reduced-motion.
- Probar Chrome, Safari, Firefox y mobile.
- Medir rendimiento con Playwright/Lighthouse.
- Ajustar compresion de imagenes y video.

