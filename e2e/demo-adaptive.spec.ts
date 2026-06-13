import { expect, test } from '@playwright/test'

test('commercial demo switches tiers without duplicate narrative or showroom runtimes', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('radio', { name: 'Ligera' }).check()
  await expect(page.getByTestId('narrative-video')).toHaveCount(1)
  await expect(page.getByRole('application', { name: 'Vista 360 del bus' })).toHaveCount(1)
  await expect(page.locator('.showroom-stage canvas')).toHaveCount(0)
})

test('missing WebGL activates lite narrative and 360 fallback', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null
  })
  await page.goto('/')

  await expect(page.getByTestId('narrative-video')).toHaveCount(1)
  await expect(page.getByRole('application', { name: 'Vista 360 del bus' })).toHaveCount(1)
})

test('reduced motion locks controls and avoids pinned narratives', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByTestId('narrative-linear')).toHaveCount(1)
  await expect(page.getByText('Movimiento reducido activo')).toBeVisible()
  await expect(page.getByRole('radio', { name: 'Alta' })).toBeDisabled()
  await expect(page.locator('[data-pinned="true"]')).toHaveCount(0)
})
