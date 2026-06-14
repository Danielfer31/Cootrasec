# Cootrasec: Produccion Autonoma De Recursos Para La Demo

**Fecha:** 2026-06-14  
**Estado:** Aprobado por el usuario  
**Objetivo:** Completar todos los recursos requeridos por la demo sin proveedores externos ni produccion 3D compleja.

## Enfoque aprobado

- Reutilizar los cinco conceptos visuales aprobados como fuentes propias.
- Crear derivados web con FFmpeg a partir de esas fuentes.
- Construir la transformacion mediante transiciones luminosas entre conceptos coherentes.
- Reservar el 3D para un bus geometrico simple, generico y sin marca.
- Reutilizar el turntable procedural validado durante los spikes.
- Crear un video silencioso de respaldo con los mismos recursos.

## Recursos fuente

1. `01-amanecer-prado.png`: hero.
2. `02-transformacion-flota.png`: centro de la transformacion.
3. `03-paradiso-sinu.png`: revelacion.
4. `04-showroom-interfaz.png`: referencia del showroom.
5. `05-convoy-final.png`: cierre.

## Entregables

- Hero WebP.
- Secuencia de transformacion de 48 WebP.
- Video MP4 de transformacion.
- Reveal WebP.
- Convoy WebP.
- Bus generico GLB simple.
- Turntable de 24 WebP.
- Video silencioso de respaldo de 2 minutos.

## Reglas

- Resolucion maestra y de video: `1920x1080`.
- Vehiculos y elementos esenciales dentro de la zona central segura.
- Sin marcas, placas legibles, audio, neon ni transformacion mecanica.
- Mantener los presupuestos definidos en `public/demo-assets/manifest.json`.
- El generador debe ser reproducible mediante un comando local.

## Limitaciones aceptadas

Los conceptos generados contienen una representacion visual de alta calidad, pero la transformacion no busca continuidad fisica perfecta. Para esta demo comercial se priorizan coherencia, ligereza, estabilidad y facilidad de presentacion.
