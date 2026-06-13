# Cootrasec Spike Measurement Template

| Spike | Device | Browser | Variant | Initial bytes | Time to interactive | Avg FPS | Slow frames | Memory | Visual score 1-5 | Notes |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
| | | | | | | | | | | |
| Showroom | Desktop browser automation | Chromium | R3F | Shared Three.js + 173 KB implementation chunk | Passed interaction check | Not yet sampled | 0 observed | Not yet sampled | 4 | One canvas; clean switching; no console warnings |
| Showroom | Desktop browser automation | Chromium | Direct Three.js | Shared Three.js + 22 KB implementation chunk | Passed interaction check | Not yet sampled | 0 observed | Not yet sampled | 4 | One canvas; explicit cleanup; no console warnings |
| Showroom | Desktop and mobile automation | Chromium | 360 | 0.9 MB frames + <1 KB implementation chunk | Passed interaction check | Not applicable | 0 observed | No WebGL renderer | 4 | Keyboard and pointer fallback passed |

## Interaction Checks

- [ ] Fast forward scroll remains understandable.
- [ ] Reverse scroll does not reveal blank or broken frames.
- [ ] Resize or rotation leaves a usable scene.
- [ ] Keyboard controls expose all essential interactions.
- [ ] Reduced motion preserves all essential content.
- [ ] WebGL failure activates a functional fallback.
- [ ] Returning after navigation creates one clean runtime.
