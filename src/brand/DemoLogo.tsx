import { demoBrand } from './demoBrand'

export function DemoLogo() {
  return (
    <>
      <svg
        aria-label="Cootrasec Demo"
        height="32"
        role="img"
        viewBox="0 0 32 32"
        width="32"
      >
        <circle cx="16" cy="16" fill="#d8a84e" r="16" />
        <path
          d="M22 10.5a8 8 0 1 0 0 11"
          fill="none"
          stroke="#0d241d"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <div style={{ display: 'inline-grid', gap: '2px' }}>
        <strong>{demoBrand.name}</strong>
        <small>{demoBrand.descriptor}</small>
      </div>
    </>
  )
}
