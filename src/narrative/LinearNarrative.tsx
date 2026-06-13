import { demoContent } from '../content/demoContent'
import { sceneManifest } from './sceneManifest'

export function LinearNarrative() {
  return (
    <section className="narrative narrative--linear" data-testid="narrative-linear">
      {sceneManifest.map((scene, index) => {
        const chapter = demoContent.chapters.find((item) => item.id === scene.id)
        if (!chapter) return null
        const Heading = index === 0 ? 'h1' : 'h2'
        return (
          <article className="linear-scene" id={scene.id} key={scene.id}>
            {scene.id === 'trust' && <span className="linear-scene__alias" id="safety" />}
            {scene.id === 'reveal' && <span className="linear-scene__alias" id="experience" />}
            <img alt={scene.alt} src={scene.asset} />
            <div className="chapter-copy">
              <p className="eyebrow">{chapter.eyebrow}</p>
              <Heading>{chapter.title}</Heading>
              <p>{chapter.body}</p>
              {scene.id === 'hero' && (
                <div className="hero-actions">
                  <a className="button-link button-link--primary" href="#experience">{chapter.cta}</a>
                  <a className="button-link" href="#quote">Cotizar servicio</a>
                </div>
              )}
            </div>
          </article>
        )
      })}
    </section>
  )
}
