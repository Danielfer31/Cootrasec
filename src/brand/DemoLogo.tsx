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
        <circle cx="16" cy="16" fill="currentColor" r="16" />
        <path
          d="M22 10.5a8 8 0 1 0 0 11"
          fill="none"
          stroke="white"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <div>
        <strong>{demoBrand.name}</strong>
        <small>{demoBrand.descriptor}</small>
      </div>
    </>
  )
}
