import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

function visit(search = '') {
  window.history.pushState({}, '', `/${search}`)
  return render(<App />)
}

describe('App routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
    sessionStorage.clear()
  })

  it('renders the commercial demo at the root', () => {
    visit()

    expect(
      screen.getByRole('heading', { name: 'El viaje que su empresa merece.' }),
    ).toBeVisible()
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
  })

  it.each([
    ['narrative', 'Spike A: narrativa'],
    ['showroom', 'Spike B: showroom'],
    ['adaptive', 'Spike C: calidad adaptable'],
  ])('keeps the %s spike available', (spike, heading) => {
    visit(`?spike=${spike}`)

    expect(screen.getByRole('heading', { name: heading })).toBeVisible()
  })
})
