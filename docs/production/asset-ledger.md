# Production Asset Ledger

Los recursos finales de esta demo fueron producidos internamente a partir de los conceptos visuales aprobados y recursos procedurales propios. Se pueden regenerar con `npm run build:assets`.

| Recurso | Origen | Licencia | Sin marca | Peso | Dimensiones | Estado |
|---|---|---|---|---:|---|---|
| Hero de amanecer | Concepto aprobado 01 | Propio para la demo | Verificado | 60,848 B | 1920x1080 | Aprobado |
| Secuencia de transformacion | Conceptos aprobados 01, 02 y 03 + FFmpeg | Propio para la demo | Verificado | 3,791,504 B | 48 cuadros, 1920x1080 | Aprobado |
| Video de transformacion | Derivado de la secuencia | Propio para la demo | Verificado | 682,227 B | 1920x1080, 4 s, sin audio | Aprobado |
| Revelacion junto al Sinu | Concepto aprobado 03 | Propio para la demo | Verificado | 177,882 B | 1920x1080 | Aprobado |
| Convoy final | Concepto aprobado 05 | Propio para la demo | Verificado | 123,246 B | 1920x1080 | Aprobado |
| Capa journey montanas | SVG procedural propio | Propio para la demo | Verificado | <= 12,000 B | Vector 1440x360 | Aprobado |
| Capa journey palmeras | SVG procedural propio | Propio para la demo | Verificado | <= 12,000 B | Vector 1440x420 | Aprobado |
| Foto oficial equipo/flota | Sitio oficial COOTRASEC `cootrasecweb/img/public1.jpg` | Sitio oficial de la marca | Marca visible | 279,899 B | JPG | Aprobado |
| Foto oficial buses servicio | Sitio oficial COOTRASEC `cootrasecweb/img/ninos.jpg` | Sitio oficial de la marca | Marca visible | 419,991 B | JPG | Aprobado |
| Foto oficial buses Cartagena | Sitio oficial COOTRASEC `cootrasecweb/img/cartagenab.jpg` | Sitio oficial de la marca | Marca visible | 296,974 B | JPG | Aprobado |
| Foto oficial cliente/vehiculo | Sitio oficial COOTRASEC `cootrasecweb/img/clientes.jpg` | Sitio oficial de la marca | Marca visible | 271,364 B | JPG | Aprobado |
| Foto oficial servicio escolar | Sitio oficial COOTRASEC `cootrasecweb/img/clientes2.jpg` | Sitio oficial de la marca | Marca visible | 156,574 B | JPG | Aprobado |
| Foto oficial cotizacion | Sitio oficial COOTRASEC `cootrasecweb/img/cotiza.jpg` | Sitio oficial de la marca | Marca visible | 182,411 B | JPG | Aprobado |
| Foto oficial flota estacionada | Sitio oficial COOTRASEC `cootrasecweb/img/about-2.jpg` | Sitio oficial de la marca | Marca visible | 59,443 B | JPG | Aprobado |
| Bus generico GLB | Geometria procedural propia | Propio para la demo | Verificado | 26,460 B | N/A | Aprobado |
| Secuencia 360 del bus | Recurso procedural validado en spike | Propio para la demo | Verificado | 903,254 B | 24 cuadros | Aprobado |
| Video de respaldo | Derivado de hero, reveal y convoy | Propio para la demo | Verificado | 3,869,020 B | 1920x1080, 120 s, sin audio | Aprobado |

## Validacion

- `npm run validate:assets`: aprobado.
- Todos los recursos respetan los presupuestos del manifiesto.
- No se incorporaron archivos externos con licencias desconocidas.
- No se incorporaron logotipos, placas legibles ni identidad inventada.
- La transformacion utiliza fundidos y una banda solar, no mecanismos.

## Limitaciones De Demo

- La secuencia usa transiciones entre conceptos; no es una simulacion fisica continua.
- El GLB es un bus generico geometrico y ligero, creado para demostrar la interaccion.
- El video de respaldo presenta el arco visual, no una captura completa de todas las interacciones.
