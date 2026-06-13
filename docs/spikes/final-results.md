# Cootrasec Technical Spike Results

## Executive Summary

The three technical spikes produced clear implementation choices:

- Use image sequences for the desktop cinematic transformation, with video and
  still-image fallbacks.
- Use React Three Fiber for the primary showroom and a 360 turntable without
  WebGL as the required fallback.
- Select quality from device capabilities, respect reduced motion absolutely,
  and only downgrade quality automatically.

Planning for the full demo may begin. Production assembly must remain gated by
testing the final transformation assets and candidate GLB on the actual
presentation computer and a representative mid-range phone.

## Measured Results

| Area | Primary result | Fallback result | Verification |
|---|---|---|---|
| Narrative | 48-frame desktop sequence, `2.72 MB` | Desktop video `0.38 MB`; lite video `0.11 MB`; reduced-motion still | Forward, reverse, mobile, and reduced-motion browser tests pass |
| Showroom | R3F demand rendering | 24-frame 360 turntable, `0.9 MB` | R3F, direct Three.js, and 360 switch cleanly with one active renderer |
| Adaptive quality | Capability-based initial tier and executable downgrade thresholds | Explicit user tier and 360 WebGL fallback | Desktop, mobile, reduced-motion, and WebGL-failure simulations pass |

## Locked Technical Choices

- React + Vite + TypeScript laboratory patterns remain appropriate for the demo.
- GSAP ScrollTrigger controls the high-tier narrative with native scroll.
- Desktop cinematic transformation uses an image sequence within a `4 MB` target.
- Balanced/lite variants prefer synchronized video when seeking is stable.
- Primary showroom uses R3F with `frameloop="demand"`.
- Lite and WebGL-failure showroom uses the 360 implementation.
- High-tier model target remains below `8 MB`.
- Reduced motion overrides every stored or detected tier.
- Runtime quality can only move downward automatically.

## Risks Remaining

- The procedural bus validates runtime behavior, not final GLB quality or weight.
- Final FPS and memory measurements require the actual presentation computer.
- Production-generated vehicle transformation assets may seek differently from
  the representative camera-motion sequence.
- The shared Three.js runtime is the largest JavaScript chunk and must remain
  lazy-loaded outside the initial narrative experience.

## Full-Demo Planning Inputs

- Produce and validate the final scene concepts before generating all assets.
- Treat the narrative, showroom, capability manager, and quote flow as isolated
  modules with explicit cleanup.
- Keep the showroom and Three.js runtime lazy-loaded.
- Include a production-asset validation gate before integrating all scenes.
- Include a presentation-device performance pass and video backup deliverable.
