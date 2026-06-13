import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'
import { demoContent, type ChapterId } from '../content/demoContent'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { PerformanceMonitor } from '../experience/PerformanceMonitor'
import { Narrative } from '../narrative/Narrative'
import { QuoteSection } from '../quote/QuoteSection'
import { AppHeader } from '../shell/AppHeader'
import './DemoApp.css'

const Showroom = lazy(() => import('../showroom/Showroom'))

class ShowroomBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Showroom chunk failed', error, info)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="showroom-status" role="status">
        <p>La vista interactiva no pudo cargarse. Los puntos de interes y la cotizacion siguen disponibles.</p>
        <a className="button-link button-link--primary" href="#quote">Cotizar este bus</a>
      </div>
    )
  }
}

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
  const closing = chapter('closing')

  return (
    <ExperienceProvider>
      <PerformanceMonitor />
      <AppHeader />
      <main className="demo-app" id="main-content">
        <Narrative />

        <section className="demo-section demo-showroom" id="showroom">
          <div>
            <ChapterCopy id="showroom" />
          </div>
          <div className="showroom-shell">
            <ShowroomBoundary>
              <Suspense fallback={<p className="showroom-status">Preparando vista interactiva...</p>}>
                <Showroom />
              </Suspense>
            </ShowroomBoundary>
            <p className="showroom-status">
              La exploracion interactiva conservara puntos de interes y cotizacion en HTML.
            </p>
          </div>
        </section>

        <section className="demo-section demo-quote" id="quote">
          <ChapterCopy id="quote" />
          <QuoteSection />
        </section>

        <section className="demo-closing" id="closing">
          <ChapterCopy id="closing" />
          <a className="button-link button-link--primary" href="#quote">{closing.cta}</a>
        </section>
      </main>
    </ExperienceProvider>
  )
}
