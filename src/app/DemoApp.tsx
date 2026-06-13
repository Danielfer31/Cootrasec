import { lazy, Suspense } from 'react'
import { demoContent, type ChapterId } from '../content/demoContent'
import { ExperienceProvider } from '../experience/ExperienceProvider'
import { Narrative } from '../narrative/Narrative'
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
  const showroom = chapter('showroom')
  const quote = chapter('quote')
  const closing = chapter('closing')

  return (
    <ExperienceProvider>
      <AppHeader />
      <main className="demo-app" id="main-content">
        <Narrative />

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
