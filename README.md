# Cootrasec Demo Inmersiva

Demo comercial adaptable construida con React, Vite, GSAP y React Three Fiber.

## Inicio

```powershell
npm install
npm run dev
```

La demo final está disponible en `/`. Los laboratorios técnicos permanecen en:

- `/?spike=narrative`
- `/?spike=showroom`
- `/?spike=adaptive`

## Recursos

Todos los recursos de la demo pueden regenerarse localmente:

```powershell
npm run build:assets
npm run validate:assets
```

El generador reutiliza los conceptos aprobados, produce los derivados narrativos, crea un bus GLB geométrico, prepara el turntable y exporta un video silencioso de respaldo.

## Calidad Adaptable

- `high`: secuencia completa y showroom R3F.
- `balanced`: video sincronizado y showroom R3F.
- `lite`: video ligero y showroom 360.
- `reduced-motion`: narrativa lineal y showroom 360.

## Verificación

```powershell
npm run lint
npm run check
npm run validate:assets
```

Consulta `docs/production/presentation-runbook.md` para presentar la demo.
