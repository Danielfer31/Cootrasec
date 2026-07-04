import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { publicAsset } from '../assets/publicAsset'
import { demoContent } from '../content/demoContent'
import { preloadFrames, progressToFrame } from '../spikes/narrative/imageSequence'
import { sceneManifest } from './sceneManifest'

gsap.registerPlugin(ScrollTrigger)

const usableFrames = [
  ...Array.from({ length: 10 }, (_, index) => index + 1),
  ...Array.from({ length: 7 }, (_, index) => index + 15),
  ...Array.from({ length: 24 }, (_, index) => index + 25),
]

export function HighNarrative() {
  const rootRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const urls = useMemo(
    () => usableFrames.map(
      (frame) => publicAsset(`/demo-assets/narrative/transformation/frame-${String(frame).padStart(3, '0')}.webp`),
    ),
    [],
  )

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!root || !canvas || !context) return

    const controller = new AbortController()
    void preloadFrames(urls, () => undefined, controller.signal)

    const draw = (progress: number) => {
      const image = new Image()
      image.onload = () => {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
        context.drawImage(image, 0, 0)
      }
      image.src = urls[progressToFrame(progress, urls.length)]
      root.style.setProperty('--narrative-progress', String(progress))
    }

    draw(0)
    const gsapContext = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=2800',
        pin: root.querySelector('.narrative-stage'),
        scrub: 0.35,
        onUpdate: ({ progress }) => draw(progress),
      })
    }, root)

    return () => {
      controller.abort()
      gsapContext.revert()
    }
  }, [urls])

  return (
    <section className="narrative narrative--high" data-testid="narrative-high" ref={rootRef}>
      <NarrativeAnchors />
      <div className="narrative-stage" data-pinned="true">
        <canvas
          aria-label="Transformacion luminosa de la flota"
          className="narrative-media"
          ref={canvasRef}
        />
        <NarrativeCopy />
        <NarrativeRoute />
        <NarrativeProgress label="Secuencia cinematografica" />
      </div>
    </section>
  )
}

function NarrativeAnchors() {
  return (
    <div className="narrative-anchors" aria-hidden="true">
      {sceneManifest.map((scene) => (
        <span id={scene.id} key={scene.id} style={{ top: `${scene.progress.start * 100}%` }} />
      ))}
      <span id="safety" style={{ top: '25%' }} />
      <span id="experience" style={{ top: '75%' }} />
    </div>
  )
}

function NarrativeCopy({ activeSceneId }: { activeSceneId?: string }) {
  return (
    <div className="narrative-copy-stack">
      {sceneManifest.map((scene, index) => {
        const chapter = demoContent.chapters.find((item) => item.id === scene.id)
        if (!chapter) return null
        const Heading = index === 0 ? 'h1' : 'h2'
        const className = scene.id === activeSceneId ? 'narrative-copy is-active' : 'narrative-copy'
        return (
          <article className={className} data-scene={scene.id} key={scene.id}>
            <p className="eyebrow">{chapter.eyebrow}</p>
            <Heading>{chapter.title}</Heading>
            <p>{chapter.body}</p>
            {scene.id === 'hero' && (
              <div className="hero-actions">
                <a className="button-link button-link--primary" href="#experience">{chapter.cta}</a>
                <a className="button-link" href="#quote">Cotizar servicio</a>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}

const routeLabels = ['Inicio', 'Control', 'Flota', 'Llegada']

function NarrativeRoute() {
  return (
    <div className="narrative-route" aria-hidden="true">
      <div className="narrative-route__track">
        <span className="narrative-route__vehicle" />
      </div>
      <ol>
        {routeLabels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
    </div>
  )
}

function NarrativeProgress({ label }: { label: string }) {
  return (
    <div className="narrative-progress" aria-hidden="true">
      <span>{label}</span>
      <i />
    </div>
  )
}

export { NarrativeAnchors, NarrativeCopy, NarrativeProgress, NarrativeRoute }
