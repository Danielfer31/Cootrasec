import { expect, test } from '@playwright/test'

test('commercial narrative supports scrolling, direct navigation, and quote CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'La flota se mueve con su empresa.' })).toBeVisible()
  await expect(page.getByTestId('journey-narrative')).toBeVisible()
  await expect(page.getByTestId('journey-bus')).toBeVisible()
  await expect(page.getByTestId('journey-route')).toBeVisible()

  await page.getByRole('link', { name: 'Cotizar servicio' }).click()
  await expect(page).toHaveURL(/#quote$/)
  await expect(page.getByRole('heading', { name: 'Preparemos el proximo recorrido.' })).toBeVisible()

  await page.goto('/')
  await page.mouse.wheel(0, 2200)
  await page.mouse.wheel(0, -900)
  await page.getByRole('link', { name: 'Flota' }).click()
  await expect(page).toHaveURL(/#fleet$/)
})

test('journey bus progress follows forward and reverse scroll', async ({ page }) => {
  await page.goto('/')
  const journey = page.getByTestId('journey-narrative')
  const bus = page.getByTestId('journey-bus')

  await expect(journey).toBeVisible()
  const startProgress = Number(await journey.getAttribute('data-progress'))
  const startBox = await bus.boundingBox()
  const startImage = await bus.locator('img').getAttribute('src')

  await page.mouse.wheel(0, 1600)
  await expect.poll(async () => Number(await journey.getAttribute('data-progress'))).toBeGreaterThan(startProgress)
  const forwardProgress = Number(await journey.getAttribute('data-progress'))
  const forwardBox = await bus.boundingBox()
  const forwardImage = await bus.locator('img').getAttribute('src')

  await page.mouse.wheel(0, -900)
  await expect.poll(async () => Number(await journey.getAttribute('data-progress'))).toBeLessThan(forwardProgress)
  const reverseBox = await bus.boundingBox()

  expect(startBox).not.toBeNull()
  expect(forwardBox).not.toBeNull()
  expect(reverseBox).not.toBeNull()
  expect(startImage).toContain('/demo-assets/official/')
  expect(forwardImage).toContain('/demo-assets/official/')
  expect(forwardProgress).toBeGreaterThan(startProgress)
})

test('commercial narrative honors direct section URLs on first load', async ({ page }) => {
  await page.goto('/#fleet')

  await expect(page.getByRole('heading', {
    name: 'El vehiculo correcto aparece en el momento correcto.',
  })).toBeVisible()
})

test.describe('commercial narrative with reduced motion', () => {
  test('uses a linear flow without pinned elements', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    await expect(page.getByTestId('narrative-linear')).toBeVisible()
    await expect(page.locator('[data-pinned="true"]')).toHaveCount(0)
    await expect(page.getByRole('heading', { name: 'El vehiculo correcto aparece en el momento correcto.' })).toBeVisible()
    await page.getByRole('link', { name: 'Seguridad' }).click()
    await expect(page).toHaveURL(/#safety$/)
  })
})
