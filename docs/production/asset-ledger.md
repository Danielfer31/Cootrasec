# Production Asset Ledger

Los recursos finales de esta demo fueron producidos internamente a partir de fotografias fuente generadas para la demo, conceptos visuales aprobados y recursos procedurales propios. Las fotografias fuente y sus conversiones WebP estan comprometidas en el repositorio; no se regeneran con `npm run build:assets`.

| Recurso | Origen | Licencia | Sin marca | Peso | Dimensiones | Estado |
|---|---|---|---|---:|---|---|
| Hero de amanecer | Concepto aprobado 01 | Propio para la demo | Verificado | 60,848 B | 1920x1080 | Aprobado |
| Secuencia de transformacion | Conceptos aprobados 01, 02 y 03 + FFmpeg | Propio para la demo | Verificado | 3,791,504 B | 48 cuadros, 1920x1080 | Aprobado |
| Video de transformacion | Derivado de la secuencia | Propio para la demo | Verificado | 682,227 B | 1920x1080, 4 s, sin audio | Aprobado |
| Revelacion junto al Sinu | Concepto aprobado 03 | Propio para la demo | Verificado | 177,882 B | 1920x1080 | Aprobado |
| Convoy final | Concepto aprobado 05 | Propio para la demo | Verificado | 123,246 B | 1920x1080 | Aprobado |
| Fotografia ejecutiva | Recurso propio generado para la demo | Generacion de imagen integrada + conversion web; no oficial ni de terceros | Verificado | 183,192 B | 1920x1080 | Aprobado |
| Fotografia corporativa | Recurso propio generado para la demo | Generacion de imagen integrada + conversion web; no oficial ni de terceros | Verificado | 181,472 B | 1920x1080 | Aprobado |
| Fotografia de turismo | Recurso propio generado para la demo | Generacion de imagen integrada + conversion web; no oficial ni de terceros | Verificado | 195,822 B | 1920x1080 | Aprobado |
| Fotografia de convoy | Recurso propio generado para la demo | Generacion de imagen integrada + conversion web; no oficial ni de terceros | Verificado | 210,078 B | 1920x1080 | Aprobado |
| Bus generico GLB | Geometria procedural propia | Propio para la demo | Verificado | 26,460 B | N/A | Aprobado |
| Secuencia 360 del bus | Recurso procedural validado en spike | Propio para la demo | Verificado | 903,254 B | 24 cuadros | Aprobado |
| Video de respaldo | Derivado de hero, reveal y convoy | Propio para la demo | Verificado | 3,869,020 B | 1920x1080, 120 s, sin audio | Aprobado |

## Regeneracion

- `npm run build:assets` regenera los recursos procedurales y los derivados narrativos a partir de sus fuentes disponibles.
- Las cuatro fotografias creadas mediante generacion de imagen integrada son fuentes comprometidas y sus WebP son derivados comprometidos; el comando no recrea esas fotografias fuente.

## Validacion

- `npm run validate:assets`: aprobado.
- Todos los recursos respetan los presupuestos del manifiesto.
- No se incorporaron archivos externos con licencias desconocidas.
- No se incorporaron logotipos, placas legibles ni identidad inventada.
- Las fotografias se crearon con generacion de imagen integrada y conversion web; no son recursos oficiales ni de terceros.
- La transformacion utiliza fundidos y una banda solar, no mecanismos.

## Limitaciones De Demo

- La secuencia usa transiciones entre conceptos; no es una simulacion fisica continua.
- El GLB es un bus generico geometrico y ligero, creado para demostrar la interaccion.
- El video de respaldo presenta el arco visual, no una captura completa de todas las interacciones.
