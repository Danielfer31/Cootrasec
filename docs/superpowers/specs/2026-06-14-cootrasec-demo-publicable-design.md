# Cootrasec: Demo Publicable Con Recursos Propios Y Solicitudes Por WhatsApp

**Fecha:** 2026-06-14  
**Estado:** Aprobado por el usuario  
**Objetivo:** Convertir la demo inmersiva actual en una experiencia publicable, con recursos visuales propios de mayor fidelidad y un cotizador que produzca solicitudes accionables por WhatsApp.

## Alcance Aprobado

- Mantener el producto como demo comercial, sin afirmar que sus fotografías, modelos 3D o identidad sean recursos oficiales de Cootrasec.
- Producir internamente fotografías publicitarias, modelos 3D ligeros y una marca demo coherente.
- Sustituir los recursos conceptuales visibles por los nuevos recursos producidos para la demo.
- Convertir el cotizador conceptual en un flujo que recopile datos de contacto y viaje, muestre una revisión y abra WhatsApp con la solicitud estructurada.
- Preparar el repositorio y el despliegue público mediante GitHub Pages.
- Usar un número de WhatsApp configurable y un valor demostrativo cuando no exista un número comercial definido.

## Enfoque

Se implementará una demo publicable autónoma. La prioridad será equilibrar impacto visual, estabilidad, facilidad de despliegue y buen rendimiento en móviles. Los recursos visuales estarán desacoplados de la interfaz mediante rutas y manifiestos, de modo que puedan reemplazarse posteriormente por recursos oficiales sin reconstruir la experiencia.

## Recursos Visuales

### Fotografías Publicitarias

Se producirán escenas fotorealistas coherentes con la dirección visual aprobada:

- Transporte ejecutivo en paisaje tropical luminoso.
- Operación corporativa y atención al cliente.
- Bus de turismo en carretera o destino regional.
- Flota coordinada para el cierre comercial.

Las imágenes no incluirán placas legibles, marcas de terceros ni afirmaciones visuales que puedan confundirse con documentación oficial.

### Modelos 3D

Se crearán modelos ligeros y estilizados para las tres categorías existentes:

- Vehículo ejecutivo.
- Van corporativa.
- Bus de turismo.

Los modelos priorizarán silueta reconocible, color e interacción fluida sobre detalle mecánico. Cada modelo tendrá fallback visual para equipos que no soporten correctamente el showroom 3D.

### Marca Demo

Se creará una identidad demostrativa coherente con la paleta marfil y verde tropical existente. La interfaz y los recursos indicarán su carácter demostrativo cuando sea necesario. La marca quedará centralizada para facilitar su reemplazo futuro.

## Flujo Del Cotizador

El cotizador tendrá tres momentos:

1. **Datos de solicitud:** nombre, teléfono, tipo de servicio, pasajeros, origen, destino, fecha y vehículo.
2. **Revisión:** recomendación del vehículo, resumen editable y aviso de que disponibilidad y precio serán confirmados por un asesor.
3. **Envío:** apertura de WhatsApp con un mensaje estructurado y codificado que incluya todos los datos de la solicitud.

El número de destino se leerá desde `VITE_WHATSAPP_NUMBER`. Si la variable no está configurada, la demo usará un número demostrativo claramente documentado. No se almacenarán datos personales ni se afirmará que el mensaje fue recibido hasta que el usuario complete el envío en WhatsApp.

## Arquitectura

- Mantener React, Vite, React Three Fiber y el sistema adaptable existente.
- Extender el manifiesto de recursos para registrar fotografías, modelos y fallbacks.
- Mantener las reglas de recomendación separadas de la presentación.
- Añadir un módulo aislado que construya y valide el enlace de WhatsApp.
- Incorporar el despliegue estático mediante GitHub Actions y GitHub Pages.
- Configurar correctamente la ruta base de Vite para funcionar desde un repositorio publicado.

## Estados Y Errores

- Validar campos obligatorios antes de mostrar la revisión.
- Impedir fechas anteriores al día actual.
- Mostrar un error accionable si no puede abrirse WhatsApp.
- Mantener la solicitud editable después de la revisión.
- Preservar fallbacks 360 y recursos ligeros cuando WebGL o rendimiento sean insuficientes.
- Mostrar una indicación clara si el número configurado es demostrativo.

## Verificación

- Pruebas unitarias para validación, recomendación y construcción del mensaje de WhatsApp.
- Pruebas de componente para datos, revisión, edición y envío.
- Pruebas E2E del flujo completo en escritorio y móvil.
- Validación automatizada de existencia y presupuesto de recursos.
- Build de producción con ruta base de GitHub Pages.
- Revisión visual del sitio publicado y comprobación de que no existan errores de consola ni desbordamiento horizontal.

## Despliegue

El repositorio quedará preparado para GitHub Pages mediante un workflow de GitHub Actions. Se intentará crear y configurar el repositorio remoto usando las credenciales disponibles en el entorno. Si no hay autenticación, el proyecto quedará listo localmente y la creación del remoto será la única acción externa pendiente.

## Fuera De Alcance

- Backend propio, CRM, base de datos o almacenamiento de solicitudes.
- Confirmación automática de recepción por parte de Cootrasec.
- Precios, disponibilidad o reservas en tiempo real.
- Afirmar que los recursos producidos son oficiales.
- Modelos 3D de precisión industrial o réplicas exactas de vehículos comerciales.
