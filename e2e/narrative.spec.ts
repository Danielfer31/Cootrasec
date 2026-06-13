import { expect, test } from '@playwright/test'

test('narrative remains usable forward, backward, and in reduced motion', async ({ page }) => {
  await page.goto('/?spike=narrative')
  await expect(page.getByRole('heading', { name: 'Spike A: narrativa' })).toBeVisible()
  await page.mouse.wheel(0, 1600)
  await expect(page.getByText('De recorridos ejecutivos a grandes movimientos empresariales.')).toBeVisible()
  await page.mouse.wheel(0, -1600)
  await page.getByRole('button', { name: 'Movimiento reducido' }).click()
  await expect(page.getByText('Una solución para cada equipo.')).toBeVisible()
  await expect(page.getByAltText('Bus conceptual en una carretera tropical')).toBeVisible()
})
