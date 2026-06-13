# Cootrasec Spike Decisions

## Showroom

**Decision:** React Three Fiber (R3F) for the primary interactive showroom.

**Evidence:**

| Variant | Representative asset/runtime size | Rendering behavior | Browser verification | Visual score |
|---|---:|---|---|---:|
| R3F | `173 KB` implementation chunk plus shared Three.js runtime | `frameloop="demand"` | One canvas, clean switching, no console warnings | 4/5 |
| Direct Three.js | `22 KB` implementation chunk plus shared Three.js runtime | Explicit render-on-demand lifecycle | One canvas, clean switching, no console warnings | 4/5 |
| 360 | `0.9 MB` across 24 WebP frames and less than `1 KB` implementation chunk | No WebGL or continuous renderer | Keyboard and pointer interaction pass on desktop and mobile | 4/5 |

R3F and direct Three.js produced equivalent perceived quality and stable browser
behavior with the representative procedural bus. Direct Three.js reduced
framework-specific JavaScript, but required substantially more code for renderer,
camera, controls, resize, render scheduling, and disposal. That complexity did
not produce a visible or measured interaction advantage in this spike.

R3F keeps the showroom implementation smaller at the application-code level,
supports demand rendering directly, and makes the planned model, lighting, and
hotspot iterations easier to isolate. The shared Three.js runtime remains the
dominant WebGL download in both approaches, so direct Three.js does not remove
that cost.

**Fallback:** Use the 360 implementation whenever WebGL fails, the selected
experience tier is `lite`, or the target device cannot maintain the accepted
interactive performance. The fallback exposes the same hotspot buttons,
descriptions, and selected-vehicle behavior outside WebGL.

**Rejected options:**

- **Direct Three.js:** rejected as the primary implementation because its extra
  lifecycle ownership did not improve visual quality or switching stability.
  Keep it as a reference if later profiling reveals a concrete R3F bottleneck.
- **360 as primary:** rejected because it cannot provide true camera, lighting,
  or material exploration. It remains the most reliable fallback.

**Remaining production validation:** Replace the procedural vehicle with the
candidate optimized GLB and measure FPS, memory, and first-interaction time on
the actual presentation computer before locking the final model budget.
