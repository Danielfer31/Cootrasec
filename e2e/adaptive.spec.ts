import { expect, test } from '@playwright/test'

test('adaptive spike switches tiers without duplicate runtimes', async ({ page }) => {
  await page.goto('/?spike=adaptive')
  await expect(page.getByRole('heading', { name: 'Spike C: calidad adaptable' })).toBeVisible()

  for (const tier of ['High', 'Balanced', 'Lite', 'Reduced motion']) {
    await page.getByRole('button', { name: tier }).click()
    await expect(page.getByText('Narrativas activas: 1')).toHaveCount(1)
    await expect(page.getByText('Showrooms activos: 1')).toHaveCount(1)
  }

  await page.getByRole('button', { name: 'Simular fallo WebGL' }).click()
  await expect(page.getByText('Nivel activo: lite')).toBeVisible()
  await expect(page.getByText('Fallback 360 activo')).toBeVisible()
})

test.describe('reduced motion preference', () => {
  test('selects reduced motion on initial entry', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/?spike=adaptive')
    await expect(page.getByText('Nivel activo: reduced-motion')).toBeVisible()
    await expect(page.getByText('Contenido lineal y estable')).toBeVisible()
  })
})
