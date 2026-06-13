import { expect, test } from '@playwright/test'

test('commercial narrative supports scrolling, direct navigation, and quote CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'El viaje que su empresa merece.' })).toBeVisible()

  await page.getByRole('link', { name: 'Cotizar servicio' }).click()
  await expect(page).toHaveURL(/#quote$/)
  await expect(page.getByRole('heading', { name: 'Preparemos el proximo recorrido.' })).toBeVisible()

  await page.goto('/')
  await page.mouse.wheel(0, 2200)
  await page.mouse.wheel(0, -900)
  await page.getByRole('link', { name: 'Flota' }).click()
  await expect(page).toHaveURL(/#fleet$/)
})

test.describe('commercial narrative with reduced motion', () => {
  test('uses a linear flow without pinned elements', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByTestId('narrative-linear')).toBeVisible()
    await expect(page.locator('[data-pinned="true"]')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'Una solucion para cada equipo, evento y recorrido.' })).toBeVisible()
    await page.getByRole('link', { name: 'Seguridad' }).click()
    await expect(page).toHaveURL(/#safety$/)
  })
})
