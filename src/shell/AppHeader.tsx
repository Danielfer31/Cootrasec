import { QualityControl } from './QualityControl'
import './Shell.css'

const navigation = [
  { href: '#fleet', label: 'Flota' },
  { href: '#experience', label: 'Experiencia' },
  { href: '#safety', label: 'Seguridad' },
  { href: '#quote', label: 'Cotizar' },
]

export function AppHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="app-header">
        <a className="app-brand" href="/" aria-label="Cootrasec, inicio">
          <span aria-hidden="true">C</span>
          <strong>Cootrasec</strong>
        </a>
        <nav aria-label="Navegacion principal">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>
        <QualityControl />
      </header>
    </>
  )
}
