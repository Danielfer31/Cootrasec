import { expect, test } from '@playwright/test'

test('commercial showroom keeps one renderer and transfers the bus to quote', async ({ page }) => {
  await page.goto('/#showroom')
  await page.getByRole('radio', { name: 'Ligera' }).check()

  const turntable = page.getByRole('application', { name: 'Vista 360 del bus' })
  await expect(turntable).toBeVisible()
  await turntable.press('ArrowRight')
  await expect(page.getByText(/cuadro 2\/24/)).toBeVisible()

  await page.getByRole('button', { name: 'Seguridad' }).click()
  await expect(page.getByRole('heading', { name: 'Seguridad', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Interior conceptual' }).click()
  await page.getByRole('button', { name: 'Luz de manana' }).click()

  await page.getByRole('link', { name: 'Cotizar este bus' }).click()
  await expect(page).toHaveURL(/#quote$/)
  await expect(page.locator('.showroom-stage canvas')).toHaveCount(0)
})
