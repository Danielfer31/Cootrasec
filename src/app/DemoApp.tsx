import { lazy, Suspense } from 'react'
import { demoContent, type ChapterId } from '../content/demoContent'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { AppHeader } from '../shell/AppHeader'
import './DemoApp.css'

const ShowroomPreview = lazy(() => import('./DemoShowroomPreview'))

function chapter(id: ChapterId) {
  const content = demoContent.chapters.find((item) => item.id === id)
  if (!content) throw new Error(`Missing demo chapter: ${id}`)
  return content
}

function ChapterCopy({ id, level = 2 }: { id: ChapterId; level?: 1 | 2 }) {
  const content = chapter(id)
  const Heading = level === 1 ? 'h1' : 'h2'

  return (
    <div className="chapter-copy">
      <p className="eyebrow">{content.eyebrow}</p>
      <Heading>{content.title}</Heading>
      <p>{content.body}</p>
    </div>
  )
}

export function DemoApp() {
  const trust = chapter('trust')
  const hero = chapter('hero')
  const showroom = chapter('showroom')
  const quote = chapter('quote')
  const closing = chapter('closing')

  return (
    <ExperienceProvider>
      <AppHeader />
      <main className="demo-app" id="main-content">
        <section className="demo-hero" id="hero">
          <ChapterCopy id="hero" level={1} />
          <div className="hero-actions">
            <a className="button-link button-link--primary" href="#experience">{hero.cta}</a>
            <a className="button-link" href="#quote">Cotizar servicio</a>
          </div>
          <div className="visual-placeholder visual-placeholder--hero" aria-hidden="true">
            <span>Viaje luminoso</span>
          </div>
        </section>

        <section className="demo-section" id="safety">
          <ChapterCopy id="trust" />
          <ul className="trust-grid" aria-label={trust.title}>
            {['Puntualidad', 'Monitoreo', 'Conductores capacitados', 'Planeacion'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="demo-section" id="fleet">
          <ChapterCopy id="fleet" />
          <div className="fleet-grid">
            {demoContent.vehicles.map((vehicle) => (
              <article key={vehicle.id}>
                <p className="eyebrow">{vehicle.category}</p>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="demo-section demo-reveal" id="experience">
          <ChapterCopy id="reveal" />
          <div className="visual-placeholder" aria-hidden="true">
            <span>Sinu tropical idealizado</span>
          </div>
        </section>

        <section className="demo-section demo-showroom" id="showroom">
          <div>
            <ChapterCopy id="showroom" />
            <a className="button-link button-link--primary" href="#quote">{showroom.cta}</a>
          </div>
          <div className="showroom-shell">
            <Suspense fallback={<p className="showroom-status">Preparando vista interactiva...</p>}>
              <ShowroomPreview />
            </Suspense>
            <p className="showroom-status">
              La exploracion interactiva conservara puntos de interes y cotizacion en HTML.
            </p>
          </div>
        </section>

        <section className="demo-section demo-quote" id="quote">
          <ChapterCopy id="quote" />
          <div className="quote-preview">
            <p>{demoContent.quote.notice}</p>
            <a className="button-link button-link--primary" href="mailto:comercial@cootrasec.co">
              {quote.cta}
            </a>
          </div>
        </section>

        <section className="demo-closing" id="closing">
          <ChapterCopy id="closing" />
          <a className="button-link button-link--primary" href="#quote">{closing.cta}</a>
        </section>
      </main>
    </ExperienceProvider>
  )
}
