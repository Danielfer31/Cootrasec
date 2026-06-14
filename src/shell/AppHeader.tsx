import { DemoLogo } from '../brand/DemoLogo'
import { demoBrand } from '../brand/demoBrand'
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
        <a
          aria-label={`${demoBrand.name} ${demoBrand.descriptor}, inicio`}
          className="app-brand"
          href={import.meta.env.BASE_URL}
        >
          <DemoLogo />
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
