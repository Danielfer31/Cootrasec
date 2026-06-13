import { expect, test } from '@playwright/test'

test('quote flow validates, recommends, and never presents a price', async ({ page }) => {
  await page.goto('/#quote')
  await page.getByRole('button', { name: 'Solicitar propuesta' }).click()
  await expect(page.getByText('Ingrese el origen.')).toBeVisible()

  await page.getByLabel('Numero de pasajeros').fill('45')
  await page.getByLabel('Origen').fill('Monteria')
  await page.getByLabel('Destino').fill('Cartagena')
  await page.getByLabel('Fecha aproximada').fill('2026-07-10')
  await page.getByRole('button', { name: 'Solicitar propuesta' }).click()

  await expect(page.getByRole('heading', { name: 'Resumen conceptual' })).toBeVisible()
  await expect(page.getByRole('complementary').getByText(/Paradiso premium/)).toBeVisible()
  await expect(page.getByText('Demostracion conceptual. No muestra precios ni disponibilidad real.')).toBeVisible()
  await expect(page.locator('.quote-summary')).not.toContainText('$')
})

test('showroom CTA preselects the bus before quoting', async ({ page }) => {
  await page.goto('/#showroom')
  await page.getByRole('radio', { name: 'Ligera' }).check()
  await page.getByRole('link', { name: 'Cotizar este bus' }).click()

  await expect(page).toHaveURL(/#quote$/)
  await expect(page.getByLabel('Vehiculo seleccionado')).toHaveValue('paradiso')
})
