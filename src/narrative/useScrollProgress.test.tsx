import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useRef } from 'react'
import { useScrollProgress } from './useScrollProgress'

function ProgressHarness() {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(rootRef)

  return (
    <section data-testid="scroll-root" ref={rootRef}>
      <output data-testid="progress">{progress.toFixed(2)}</output>
    </section>
  )
}

describe('useScrollProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      return window.setTimeout(() => callback(performance.now()), 16)
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id)
    })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 500 })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('clamps progress between 0 and 1 and exposes it as a CSS variable', () => {
    render(<ProgressHarness />)
    const root = screen.getByTestId('scroll-root')

    Object.defineProperty(root, 'offsetHeight', { configurable: true, value: 1500 })
    vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      bottom: 0,
      height: 1500,
      left: 0,
      right: 0,
      top: -2500,
      width: 1000,
      x: 0,
      y: -2500,
      toJSON: () => undefined,
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      vi.runOnlyPendingTimers()
    })

    expect(screen.getByTestId('progress')).toHaveTextContent('1.00')
    expect(root).toHaveStyle({ '--journey-progress': '1' })
  })

  it('updates monotonically as the scroll position advances', () => {
    render(<ProgressHarness />)
    const root = screen.getByTestId('scroll-root')
    const rect = vi.spyOn(root, 'getBoundingClientRect')

    Object.defineProperty(root, 'offsetHeight', { configurable: true, value: 1500 })
    rect.mockReturnValue({
      bottom: 0,
      height: 1500,
      left: 0,
      right: 0,
      top: -250,
      width: 1000,
      x: 0,
      y: -250,
      toJSON: () => undefined,
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      vi.runOnlyPendingTimers()
    })
    const first = Number(screen.getByTestId('progress').textContent)

    rect.mockReturnValue({
      bottom: 0,
      height: 1500,
      left: 0,
      right: 0,
      top: -750,
      width: 1000,
      x: 0,
      y: -750,
      toJSON: () => undefined,
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      vi.runOnlyPendingTimers()
    })

    expect(Number(screen.getByTestId('progress').textContent)).toBeGreaterThan(first)
  })
})
