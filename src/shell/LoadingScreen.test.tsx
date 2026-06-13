import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LoadingScreen } from './LoadingScreen'

describe('LoadingScreen', () => {
  it('reports real progress and only permits entry when essentials are ready', () => {
    const onEnter = vi.fn()
    const { rerender } = render(
      <LoadingScreen essentialReady={false} loaded={2} onEnter={onEnter} total={5} />,
    )

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '40')
    expect(screen.getByRole('button', { name: 'Entrar a la experiencia' })).toBeDisabled()

    rerender(<LoadingScreen essentialReady loaded={3} onEnter={onEnter} total={5} />)
    fireEvent.click(screen.getByRole('button', { name: 'Entrar a la experiencia' }))

    expect(onEnter).toHaveBeenCalledOnce()
  })
})
