import { expect, test } from '@playwright/test'

test('showroom variants share controls and clean up while switching', async ({ page }) => {
  await page.goto('/?spike=showroom')
  await expect(page.getByRole('heading', { name: 'Spike B: showroom' })).toBeVisible()
  await expect(page.locator('[data-renderer="360"]')).toHaveCount(1)

  await page.getByRole('application', { name: 'Vista 360 del bus' }).press('ArrowRight')
  await expect(page.getByText(/cuadro 2\/24/)).toBeVisible()

  await page.getByRole('button', { name: 'Seguridad' }).click()
  await expect(page.getByRole('heading', { name: 'Seguridad' })).toBeVisible()

  await page.getByRole('button', { name: 'R3F' }).click()
  await expect(page.locator('[data-renderer="r3f"] canvas')).toHaveCount(1)

  await page.getByRole('button', { name: 'Three.js' }).click()
  await expect(page.locator('[data-renderer="three"] canvas')).toHaveCount(1)
  await expect(page.locator('.showroom-stage canvas')).toHaveCount(1)

  await page.getByRole('button', { name: '360' }).click()
  await expect(page.locator('[data-renderer="360"]')).toHaveCount(1)
  await expect(page.locator('.showroom-stage canvas')).toHaveCount(0)
})
