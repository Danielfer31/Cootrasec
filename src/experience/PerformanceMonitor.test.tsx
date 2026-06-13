import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { CapabilitySnapshot } from './capabilities'
import { ExperienceProvider, useExperience } from './ExperienceProvider'
import { PerformanceMonitor } from './PerformanceMonitor'

const high: CapabilitySnapshot = {
  reducedMotion: false,
  webgl: true,
  memoryGb: 16,
  cores: 12,
  mobile: false,
}

function Harness() {
  const { tier } = useExperience()
  return <span>tier:{tier}</span>
}

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.restoreAllMocks()
  })

  it('downgrades high once after a sustained slow frame window', () => {
    const callbacks: FrameRequestCallback[] = []
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callbacks.push(callback)
      return callbacks.length
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => undefined)

    render(
      <ExperienceProvider capabilities={high}>
        <PerformanceMonitor sampleSize={6} />
        <Harness />
      </ExperienceProvider>,
    )

    act(() => {
      ;[0, 50, 100, 150, 200, 250, 300].forEach((timestamp) => callbacks.shift()?.(timestamp))
    })

    expect(screen.getByText('tier:balanced')).toBeVisible()
  })
})
