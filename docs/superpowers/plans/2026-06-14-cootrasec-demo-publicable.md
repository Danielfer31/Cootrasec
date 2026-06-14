# Cootrasec Demo Publicable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar una demo pública con identidad y recursos visuales propios, showroom para tres vehículos, solicitudes estructuradas por WhatsApp y despliegue en GitHub Pages.

**Architecture:** Mantener la aplicación React/Vite y su degradación adaptable. Centralizar identidad y rutas de recursos en módulos pequeños; generar los modelos GLB mediante el script reproducible existente; aislar validación, recomendación y construcción de WhatsApp del componente del formulario; publicar el artefacto estático mediante GitHub Actions.

**Tech Stack:** React 19, TypeScript, Vite 8, React Three Fiber, Three.js, Vitest, Testing Library, Playwright, Node.js, FFmpeg, GitHub Actions, GitHub Pages.

---

## File Structure

- Create: `src/brand/demoBrand.ts` — identidad demo, aviso y configuración de contacto.
- Create: `src/brand/DemoLogo.tsx` — logotipo SVG accesible y reutilizable.
- Create: `src/brand/DemoLogo.test.tsx` — contrato visible y accesible de la marca.
- Create: `src/assets/publicAsset.ts` — resolver rutas públicas bajo la base configurada.
- Create: `src/assets/publicAsset.test.ts` — probar rutas locales y de GitHub Pages.
- Modify: `src/shell/AppHeader.tsx` — usar el logotipo y rutas compatibles con Pages.
- Modify: `src/content/demoContent.ts` — retirar lenguaje conceptual del producto y centralizar rutas visuales por vehículo.
- Create: `src/showroom/vehicleAssets.ts` — resolver modelo y fallback de cada vehículo.
- Modify: `src/showroom/Showroom.tsx` — selector de tres vehículos y transferencia al cotizador.
- Modify: `src/showroom/BusCanvas.tsx` — cargar el modelo seleccionado.
- Modify: `src/showroom/TurntableFallback.tsx` — cargar fallback por vehículo.
- Modify: `src/showroom/Showroom.test.tsx` — verificar selección y transferencia.
- Modify: `scripts/build-demo-assets.mjs` — generar tres GLB ligeros y sus turntables.
- Modify: `public/demo-assets/manifest.json` — declarar fotografías, marca, modelos y fallbacks.
- Modify: `scripts/validate-assets.mjs` — conservar validación genérica para los nuevos grupos.
- Modify: `docs/production/asset-ledger.md` — registrar origen y limitaciones de los recursos.
- Create: `src/quote/whatsapp.ts` — normalizar número y construir mensaje/enlace.
- Create: `src/quote/whatsapp.test.ts` — probar formato y codificación.
- Modify: `src/quote/quoteRules.ts` — añadir contacto y validación de fecha.
- Modify: `src/quote/quoteRules.test.ts` — probar contacto y fecha pasada.
- Modify: `src/quote/QuoteSection.tsx` — flujo datos, revisión, edición y apertura de WhatsApp.
- Modify: `src/quote/QuoteSection.test.tsx` — probar el flujo completo.
- Modify: `src/quote/Quote.css` — estilos de pasos, revisión y estados.
- Modify: `e2e/demo-quote.spec.ts` — verificar revisión y enlace WhatsApp.
- Create: `.env.example` — documentar `VITE_WHATSAPP_NUMBER`.
- Modify: `vite.config.ts` — base configurable para GitHub Pages.
- Create: `.github/workflows/deploy-pages.yml` — build, validación y publicación.
- Modify: `README.md` — ejecución, configuración de WhatsApp y despliegue.
- Modify: `docs/production/presentation-runbook.md` — recorrido actualizado.

### Task 1: Demo Brand Foundation

**Files:**
- Create: `src/brand/demoBrand.ts`
- Create: `src/brand/DemoLogo.tsx`
- Create: `src/brand/DemoLogo.test.tsx`
- Create: `src/assets/publicAsset.ts`
- Create: `src/assets/publicAsset.test.ts`
- Modify: `src/shell/AppHeader.tsx`
- Modify: `src/content/demoContent.ts`

- [ ] **Step 1: Write the failing brand test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DemoLogo } from './DemoLogo'

describe('DemoLogo', () => {
  it('identifies the demo brand accessibly', () => {
    render(<DemoLogo />)
    expect(screen.getByRole('img', { name: 'Cootrasec Demo' })).toBeVisible()
    expect(screen.getByText('Cootrasec')).toBeVisible()
    expect(screen.getByText('Experiencia demo')).toBeVisible()
  })
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- src/brand/DemoLogo.test.tsx`  
Expected: FAIL because `DemoLogo` does not exist.

- [ ] **Step 3: Implement centralized brand data and logo**

Create `demoBrand` with:

```ts
export const demoBrand = {
  name: 'Cootrasec',
  descriptor: 'Experiencia demo',
  notice: 'Experiencia demostrativa con recursos visuales propios.',
  whatsappFallback: '573000000000',
} as const
```

Implement `DemoLogo` as an inline SVG mark plus the two visible text labels. Replace the letter-only mark in `AppHeader` and change the home link to `import.meta.env.BASE_URL`. Update visible copy in `demoContent` so the experience says “demo” where disclosure is needed and no longer describes vehicle features as “conceptuales”.

- [ ] **Step 4: Add a public asset path resolver**

Implement:

```ts
export function publicAsset(path: string, base = import.meta.env.BASE_URL) {
  return `${base.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`
}
```

Test that `publicAsset('/demo-assets/a.webp', '/')` returns `/demo-assets/a.webp` and `publicAsset('/demo-assets/a.webp', '/cootrasec-demo/')` returns `/cootrasec-demo/demo-assets/a.webp`.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- src/brand/DemoLogo.test.tsx src/assets/publicAsset.test.ts src/shell/AppHeader.test.tsx src/content/demoContent.test.ts`  
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/brand src/assets src/shell/AppHeader.tsx src/content/demoContent.ts src/shell/AppHeader.test.tsx src/content/demoContent.test.ts
git commit -m "feat: add centralized demo brand"
```

### Task 2: Produce And Register Demo Photography

**Files:**
- Create: `public/demo-assets/photography/executive.webp`
- Create: `public/demo-assets/photography/corporate.webp`
- Create: `public/demo-assets/photography/tourism.webp`
- Create: `public/demo-assets/photography/convoy.webp`
- Modify: `public/demo-assets/manifest.json`
- Modify: `src/content/demoContent.ts`
- Modify: `src/narrative/sceneManifest.ts`
- Modify: `src/narrative/sceneManifest.test.ts`
- Modify: `src/app/DemoApp.tsx`
- Modify: `docs/production/asset-ledger.md`

- [ ] **Step 1: Extend the manifest test before adding files**

Add assertions that the narrative manifest exposes `/demo-assets/photography/executive.webp`, `/corporate.webp`, `/tourism.webp`, and `/convoy.webp`.

- [ ] **Step 2: Run the focused test and asset validator**

Run: `npm test -- src/narrative/sceneManifest.test.ts; npm run validate:assets`  
Expected: FAIL because the photography resources are not registered or present.

- [ ] **Step 3: Generate four coherent demo photographs**

Create four 16:9 photorealistic advertising images with ivory vehicles, tropical daylight, no third-party logos, no legible plates, no invented official claims, and composition-safe central subjects. Export each as WebP at 1920x1080 under `public/demo-assets/photography/`.

- [ ] **Step 4: Register and integrate photography**

Add a `photography` group to `manifest.json`, each image with `maxBytes: 900000`. Point narrative scenes, vehicle content, and the closing image to the new photographs through `publicAsset(...)` while preserving reduced-motion behavior.

- [ ] **Step 5: Validate and test**

Run: `npm run validate:assets; npm test -- src/narrative/sceneManifest.test.ts src/content/demoContent.test.ts src/app/DemoApp.test.tsx`  
Expected: all PASS.

- [ ] **Step 6: Document and commit**

Record each image as “Recurso propio generado para la demo” in the asset ledger.

```powershell
git add public/demo-assets/photography public/demo-assets/manifest.json src/content/demoContent.ts src/narrative src/app/DemoApp.tsx docs/production/asset-ledger.md
git commit -m "feat: integrate demo photography"
```

### Task 3: Generate Three Vehicle Models And Fallbacks

**Files:**
- Create: `src/showroom/vehicleAssets.ts`
- Create: `src/showroom/vehicleAssets.test.ts`
- Modify: `scripts/build-demo-assets.mjs`
- Modify: `public/demo-assets/manifest.json`
- Modify: `src/showroom/BusCanvas.tsx`
- Modify: `src/showroom/TurntableFallback.tsx`
- Modify: `src/showroom/Showroom.tsx`
- Modify: `src/showroom/Showroom.test.tsx`

- [ ] **Step 1: Write failing vehicle asset resolver tests**

```ts
import { describe, expect, it } from 'vitest'
import { vehicleAssets } from './vehicleAssets'

describe('vehicleAssets', () => {
  it('defines a model and turntable for every vehicle', () => {
    expect(Object.keys(vehicleAssets)).toEqual(['prado', 'sprinter', 'paradiso'])
    expect(vehicleAssets.prado.model).toBe('/demo-assets/showroom/prado.glb')
    expect(vehicleAssets.sprinter.turntable).toContain('/demo-assets/turntable/sprinter/')
  })
})
```

- [ ] **Step 2: Run the resolver test**

Run: `npm test -- src/showroom/vehicleAssets.test.ts`  
Expected: FAIL because the resolver does not exist.

- [ ] **Step 3: Implement the resolver and selectable showroom**

Define model paths, turntable patterns, scale, and camera distance for each `VehicleId`, resolving browser-facing paths through `publicAsset(...)`. Add three accessible vehicle selector buttons to `Showroom`; pass the selected ID to `BusCanvas` and `TurntableFallback`; transfer that selected ID to the quote event.

- [ ] **Step 4: Extend the asset generator**

Refactor the existing procedural model block into `createVehicleModel(vehicleId)` and generate:

```text
public/demo-assets/showroom/prado.glb
public/demo-assets/showroom/sprinter.glb
public/demo-assets/showroom/paradiso.glb
public/demo-assets/turntable/prado/frame-001.webp ... frame-024.webp
public/demo-assets/turntable/sprinter/frame-001.webp ... frame-024.webp
public/demo-assets/turntable/paradiso/frame-001.webp ... frame-024.webp
```

Use distinct proportions: compact executive SUV, long corporate van, and high-capacity coach. Preserve ivory bodywork and green glass/accent materials.

- [ ] **Step 5: Register resources and regenerate**

Add all three models and three turntables to `manifest.json`, then run: `npm run build:assets; npm run validate:assets`  
Expected: all model and turntable resources PASS budget validation.

- [ ] **Step 6: Test showroom behavior**

Run: `npm test -- src/showroom/vehicleAssets.test.ts src/showroom/Showroom.test.tsx`  
Expected: PASS, including selection and transfer of `sprinter`.

- [ ] **Step 7: Commit**

```powershell
git add scripts/build-demo-assets.mjs public/demo-assets/manifest.json public/demo-assets/showroom public/demo-assets/turntable src/showroom
git commit -m "feat: add three-vehicle interactive showroom"
```

### Task 4: Build WhatsApp Request Domain

**Files:**
- Create: `src/quote/whatsapp.ts`
- Create: `src/quote/whatsapp.test.ts`
- Modify: `src/quote/quoteRules.ts`
- Modify: `src/quote/quoteRules.test.ts`
- Create: `.env.example`

- [ ] **Step 1: Write failing WhatsApp and validation tests**

Test these exact behaviors:

```ts
expect(normalizeWhatsAppNumber('+57 300 123 4567')).toBe('573001234567')
expect(buildWhatsAppUrl('573001234567', validRequest)).toContain('https://wa.me/573001234567?text=')
expect(decodeURIComponent(buildWhatsAppUrl('573001234567', validRequest))).toContain('Nombre: Ana Torres')
expect(validateQuote(pastDateRequest, '2026-06-14').date).toBe('Seleccione una fecha futura.')
expect(validateQuote(requestWithoutName, '2026-06-14').name).toBe('Ingrese su nombre.')
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm test -- src/quote/whatsapp.test.ts src/quote/quoteRules.test.ts`  
Expected: FAIL because contact fields and WhatsApp helpers do not exist.

- [ ] **Step 3: Implement request types and WhatsApp builder**

Extend `QuoteData` with `name` and `phone`. Make `validateQuote(data, today)` validate required contact fields and reject dates `<= today`. Implement `normalizeWhatsAppNumber`, `buildWhatsAppMessage`, and `buildWhatsAppUrl`. Message fields must be: greeting, name, phone, service, passengers, origin, destination, date, and recommended vehicle.

- [ ] **Step 4: Add environment example**

```dotenv
VITE_WHATSAPP_NUMBER=573000000000
VITE_BASE_PATH=/
```

- [ ] **Step 5: Run focused tests and commit**

Run: `npm test -- src/quote/whatsapp.test.ts src/quote/quoteRules.test.ts`  
Expected: PASS.

```powershell
git add src/quote/whatsapp.ts src/quote/whatsapp.test.ts src/quote/quoteRules.ts src/quote/quoteRules.test.ts .env.example
git commit -m "feat: add whatsapp quote request domain"
```

### Task 5: Convert Quote UI Into Review And Send Flow

**Files:**
- Modify: `src/quote/QuoteSection.tsx`
- Modify: `src/quote/QuoteSection.test.tsx`
- Modify: `src/quote/Quote.css`
- Modify: `src/content/demoContent.ts`
- Modify: `e2e/demo-quote.spec.ts`

- [ ] **Step 1: Replace component tests with the real flow contract**

Test:

```text
empty submit -> accessible errors
valid data -> review screen
review screen -> edit returns to populated form
send -> window.open called with wa.me URL
fallback number -> visible demo-number notice
showroom selection -> preserved in form and message
```

- [ ] **Step 2: Run component tests and verify failure**

Run: `npm test -- src/quote/QuoteSection.test.tsx`  
Expected: FAIL because the current component has no contact, review, edit, or send states.

- [ ] **Step 3: Implement two-stage quote UI**

Use `step: 'details' | 'review'`. On details submit, validate and recommend a vehicle. On review, show every field, “Editar solicitud”, and “Abrir WhatsApp”. Resolve the number from `import.meta.env.VITE_WHATSAPP_NUMBER || demoBrand.whatsappFallback`; call `window.open(url, '_blank', 'noopener,noreferrer')`; show an actionable inline error if opening returns `null`.

- [ ] **Step 4: Style and update disclosure copy**

Add clear step indicator, compact review definition list, visible demo-number notice, send error state, and mobile single-column behavior. Change the quote notice to explain that WhatsApp opens a prepared message and the user completes the send.

- [ ] **Step 5: Update E2E flow**

Intercept the popup or assert the generated link target. Use a future date generated relative to the test runtime rather than the fixed `2026-07-10`.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- src/quote; npm run test:e2e -- e2e/demo-quote.spec.ts`  
Expected: PASS.

```powershell
git add src/quote src/content/demoContent.ts e2e/demo-quote.spec.ts
git commit -m "feat: send quote requests through whatsapp"
```

### Task 6: Configure GitHub Pages Deployment

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`
- Modify: `src/narrative/VideoNarrative.tsx`
- Modify: `src/narrative/HighNarrative.tsx`
- Modify: `src/narrative/LinearNarrative.tsx`

- [ ] **Step 1: Add base-path build behavior**

Set:

```ts
base: process.env.VITE_BASE_PATH || '/',
```

Keep all test configuration unchanged.

- [ ] **Step 2: Remove remaining root-relative browser asset paths**

Use `publicAsset(...)` for every browser-facing image, video, GLB, turntable frame, and preload URL. Verify with:

Run: `rg -n "src=[\"']\/|useGLTF\\(['\"]\/|preload\\(['\"]\/|new URL\\(['\"]\/" src`  
Expected: no browser-facing root-relative asset paths remain.

- [ ] **Step 3: Add deployment workflow**

Create a workflow triggered on pushes to `main` and manual dispatch. It must:

```text
checkout
setup Node 24 with npm cache
npm ci
npm run lint
npm test
npm run validate:assets
VITE_BASE_PATH=/${{ github.event.repository.name }}/ npm run build
upload-pages-artifact from dist
deploy-pages
```

Set `pages: write`, `id-token: write`, and `contents: read` permissions with the `github-pages` environment.

- [ ] **Step 4: Document local and public configuration**

Document `VITE_WHATSAPP_NUMBER`, `VITE_BASE_PATH`, GitHub Pages source “GitHub Actions”, and the disclosure that the fallback number is demonstrative.

- [ ] **Step 5: Verify production build**

Run: `$env:VITE_BASE_PATH='/cootrasec/'; npm run build; Remove-Item Env:VITE_BASE_PATH`  
Expected: PASS. Serve `dist` at `/cootrasec/` and verify generated asset requests use `/cootrasec/` without 404 responses.

- [ ] **Step 6: Commit**

```powershell
git add vite.config.ts .github/workflows/deploy-pages.yml README.md src/narrative src/showroom src/app
git commit -m "ci: deploy demo to github pages"
```

### Task 7: Configure Remote And Publish

**Files:**
- Modify only if required by GitHub: repository settings outside the worktree.

- [ ] **Step 1: Verify GitHub authentication and remote state**

Run: `gh auth status; git remote -v`  
Expected: authenticated GitHub account and either no `origin` or a known repository.

- [ ] **Step 2: Create or connect the repository**

If no `origin` exists, run:

```powershell
gh repo create cootrasec-demo --public --source . --remote origin
```

If `origin` exists, preserve it and verify it points to the intended repository.

- [ ] **Step 3: Push main and enable Pages**

Run: `git push -u origin main`  
Then ensure repository Pages uses GitHub Actions. Expected: deployment workflow starts.

- [ ] **Step 4: Verify workflow status**

Run: `gh run list --workflow deploy-pages.yml --limit 1`  
Expected: latest run completes successfully. If GitHub authentication is unavailable, record remote creation and push as the sole external blocker and continue local verification.

### Task 8: Final Verification And Runbook

**Files:**
- Modify: `docs/production/presentation-runbook.md`
- Modify: `docs/qa/final-verification.md`

- [ ] **Step 1: Run complete automated verification**

Run: `npm run lint; npm run validate:assets; npm run check`  
Expected: lint, assets, unit tests, build, and all E2E tests PASS.

- [ ] **Step 2: Verify the public or local production build visually**

Check desktop and mobile:

```text
brand disclosure visible
four new photographs load
three showroom vehicles selectable
WebGL and 360 fallback work
quote review is editable
WhatsApp link contains all request data
no horizontal overflow
no console errors
```

- [ ] **Step 3: Update operational documentation**

Update the presentation runbook with the new showroom and quote path. Record exact command results, public URL or authentication blocker, and remaining limitations in `docs/qa/final-verification.md`.

- [ ] **Step 4: Commit final verification**

```powershell
git add docs/production/presentation-runbook.md docs/qa/final-verification.md
git commit -m "docs: record public demo verification"
```

- [ ] **Step 5: Confirm clean delivery state**

Run: `git status --short --branch; git log --oneline -10`  
Expected: clean worktree, `main` tracking `origin/main` when publishing credentials are available, and all implementation commits present.
