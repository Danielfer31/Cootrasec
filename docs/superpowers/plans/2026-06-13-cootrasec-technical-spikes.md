# Cootrasec Technical Spikes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and evaluate three isolated browser experiments that decide the narrative rendering method, showroom technology, and adaptive-quality rules for the Cootrasec demo.

**Architecture:** A single React + Vite + TypeScript laboratory will expose three independent spike routes and a shared diagnostics panel. Each spike owns its runtime and cleanup, while shared capability detection, metrics, and test helpers provide comparable evidence. The spikes produce a written decision record; they do not build the final landing page.

**Tech Stack:** React, Vite, TypeScript, Vitest, Testing Library, Playwright, GSAP + ScrollTrigger, Three.js, React Three Fiber, Drei, CSS.

---

## Scope And Exit Rules

This plan covers only:

1. Spike A: compare a scroll-controlled image sequence with a synchronized video-like canvas strategy.
2. Spike B: compare React Three Fiber, direct Three.js, and a 360-image fallback for the showroom.
3. Spike C: detect capabilities and switch safely among `high`, `balanced`, `lite`, and `reduced-motion`.
4. Record measurements and lock the technical choices for the full demo.

Do not begin production scenes, final visual assets, the quote form, or the complete landing page during this plan.

Each spike must be independently reachable, measurable, and removable. A spike passes only when its acceptance checklist is supported by measurements from the target presentation computer, a mid-range computer, and a mid-range phone or equivalent browser emulation.

## Planned File Structure

```text
.
├── package.json
├── vite.config.ts
├── playwright.config.ts
├── index.html
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── App.tsx
│   │   └── App.css
│   ├── diagnostics/
│   │   ├── DiagnosticsPanel.tsx
│   │   ├── metrics.ts
│   │   └── metrics.test.ts
│   ├── experience/
│   │   ├── capabilities.ts
│   │   ├── capabilities.test.ts
│   │   ├── ExperienceProvider.tsx
│   │   └── ExperienceProvider.test.tsx
│   ├── spikes/
│   │   ├── narrative/
│   │   │   ├── NarrativeSpike.tsx
│   │   │   ├── NarrativeSpike.css
│   │   │   ├── imageSequence.ts
│   │   │   ├── imageSequence.test.ts
│   │   │   └── VideoNarrative.tsx
│   │   ├── showroom/
│   │   │   ├── ShowroomSpike.tsx
│   │   │   ├── ShowroomSpike.css
│   │   │   ├── R3FShowroom.tsx
│   │   │   ├── ThreeShowroom.tsx
│   │   │   ├── Turntable360.tsx
│   │   │   └── showroom.test.tsx
│   │   └── adaptive/
│   │       ├── AdaptiveSpike.tsx
│   │       └── AdaptiveSpike.test.tsx
│   └── test/
│       └── setup.ts
├── e2e/
│   ├── narrative.spec.ts
│   ├── showroom.spec.ts
│   └── adaptive.spec.ts
├── public/
│   └── spike-assets/
│       ├── narrative/
│       ├── showroom/
│       └── turntable/
└── docs/
    └── spikes/
        ├── measurement-template.md
        └── technical-decisions.md
```

## Task 1: Initialize The Spike Laboratory

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `playwright.config.ts`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.css`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Initialize the application and install dependencies**

Run:

```powershell
npm init -y
git init
npm create vite@latest . -- --template react-ts
npm install
npm install gsap three @react-three/fiber @react-three/drei
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @playwright/test
npx playwright install chromium
```

Expected: Vite application dependencies and Chromium install successfully.

If Vite warns because `docs/` already exists, keep the existing `docs/` directory and allow Vite to create only its application files.

- [ ] **Step 2: Add test and verification scripts**

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "check": "npm run test && npm run build && npm run test:e2e"
  }
}
```

- [ ] **Step 3: Configure Vitest**

Add to `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Create the route-by-query spike shell**

Implement `src/app/App.tsx` so `?spike=narrative`, `?spike=showroom`, and `?spike=adaptive` render isolated spike screens. The default screen must show three links and clearly label the project as a technical laboratory, not the final demo.

Use this routing boundary:

```tsx
type SpikeName = "narrative" | "showroom" | "adaptive";

function selectedSpike(): SpikeName | null {
  const value = new URLSearchParams(window.location.search).get("spike");
  return value === "narrative" || value === "showroom" || value === "adaptive"
    ? value
    : null;
}
```

- [ ] **Step 5: Configure Playwright**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
```

- [ ] **Step 6: Verify the empty laboratory**

Run:

```powershell
npm run test
npm run build
```

Expected: both commands pass with no TypeScript or build errors.

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json vite.config.ts playwright.config.ts index.html src
git commit -m "chore: initialize technical spike laboratory"
```

## Task 2: Add Shared Capability Detection

**Files:**
- Create: `src/experience/capabilities.ts`
- Create: `src/experience/capabilities.test.ts`

- [ ] **Step 1: Write failing capability-selection tests**

Create tests for these exact outcomes:

```ts
import { describe, expect, it } from "vitest";
import { chooseTier } from "./capabilities";

describe("chooseTier", () => {
  it("prioritizes reduced motion", () => {
    expect(chooseTier({ reducedMotion: true, webgl: true, memoryGb: 16, cores: 8, mobile: false }))
      .toBe("reduced-motion");
  });

  it("uses lite without WebGL", () => {
    expect(chooseTier({ reducedMotion: false, webgl: false, memoryGb: 8, cores: 8, mobile: false }))
      .toBe("lite");
  });

  it("uses high for a capable desktop", () => {
    expect(chooseTier({ reducedMotion: false, webgl: true, memoryGb: 8, cores: 8, mobile: false }))
      .toBe("high");
  });

  it("uses balanced for a capable phone", () => {
    expect(chooseTier({ reducedMotion: false, webgl: true, memoryGb: 8, cores: 8, mobile: true }))
      .toBe("balanced");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npx vitest run src/experience/capabilities.test.ts
```

Expected: FAIL because `chooseTier` does not exist.

- [ ] **Step 3: Implement the capability contract**

Create these public types and functions:

```ts
export type ExperienceTier = "high" | "balanced" | "lite" | "reduced-motion";

export interface CapabilitySnapshot {
  reducedMotion: boolean;
  webgl: boolean;
  memoryGb: number | null;
  cores: number;
  mobile: boolean;
}

export function chooseTier(capabilities: CapabilitySnapshot): ExperienceTier {
  if (capabilities.reducedMotion) return "reduced-motion";
  if (!capabilities.webgl) return "lite";
  if (capabilities.mobile) return "balanced";
  if ((capabilities.memoryGb ?? 4) >= 8 && capabilities.cores >= 8) return "high";
  return "balanced";
}
```

Also implement `detectCapabilities(window)` using `matchMedia`, a temporary canvas WebGL context, `navigator.hardwareConcurrency`, `navigator.deviceMemory` when available, and a coarse-pointer/mobile media query.

- [ ] **Step 4: Run the test to verify it passes**

Run:

```powershell
npx vitest run src/experience/capabilities.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/experience
git commit -m "feat: add experience capability detection"
```

## Task 3: Add Comparable Runtime Metrics

**Files:**
- Create: `src/diagnostics/metrics.ts`
- Create: `src/diagnostics/metrics.test.ts`
- Create: `src/diagnostics/DiagnosticsPanel.tsx`
- Create: `docs/spikes/measurement-template.md`

- [ ] **Step 1: Write failing frame-metric tests**

Test a pure `summarizeFrames(samples)` function:

```ts
expect(summarizeFrames([16, 16, 17, 50])).toEqual({
  averageFps: 40,
  slowFrames: 1,
  sampleCount: 4,
});
```

The function must treat frames above `34ms` as slow and round average FPS to an integer.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
npx vitest run src/diagnostics/metrics.test.ts
```

Expected: FAIL because the metrics module does not exist.

- [ ] **Step 3: Implement metrics and the diagnostics panel**

Implement:

```ts
export interface FrameSummary {
  averageFps: number;
  slowFrames: number;
  sampleCount: number;
}

export function summarizeFrames(samples: number[]): FrameSummary {
  if (samples.length === 0) return { averageFps: 0, slowFrames: 0, sampleCount: 0 };
  const total = samples.reduce((sum, value) => sum + value, 0);
  return {
    averageFps: Math.round(1000 / (total / samples.length)),
    slowFrames: samples.filter((value) => value > 34).length,
    sampleCount: samples.length,
  };
}
```

`DiagnosticsPanel` must show current tier, active implementation, asset bytes when known, average FPS, slow frames, and a button that downloads the current measurement as JSON.

- [ ] **Step 4: Create the manual measurement template**

Create `docs/spikes/measurement-template.md` with a table containing:

```markdown
| Spike | Device | Browser | Variant | Initial bytes | Time to interactive | Avg FPS | Slow frames | Memory | Visual score 1-5 | Notes |
|---|---|---|---|---:|---:|---:|---:|---:|---:|---|
```

Include checklists for fast forward scroll, reverse scroll, resize, keyboard use, reduced motion, WebGL failure, and returning to the spike after navigation.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npx vitest run src/diagnostics/metrics.test.ts
npm run build
```

Expected: PASS.

```powershell
git add src/diagnostics docs/spikes/measurement-template.md
git commit -m "feat: add shared spike diagnostics"
```

## Task 4: Build Spike A Image-Sequence Narrative

**Files:**
- Create: `src/spikes/narrative/imageSequence.ts`
- Create: `src/spikes/narrative/imageSequence.test.ts`
- Create: `src/spikes/narrative/NarrativeSpike.tsx`
- Create: `src/spikes/narrative/NarrativeSpike.css`
- Create: `src/spikes/narrative/VideoNarrative.tsx`
- Create: `public/spike-assets/narrative/`

- [ ] **Step 1: Prepare a representative sequence**

Produce a short 48-frame, 16:9 WebP sequence showing one recognizable vehicle silhouette changing scale or form across a tropical-road composition. Export two variants:

```text
public/spike-assets/narrative/desktop/frame-001.webp ... frame-048.webp
public/spike-assets/narrative/lite/frame-001.webp ... frame-016.webp
public/spike-assets/narrative/desktop/transformation.mp4
public/spike-assets/narrative/lite/transformation.mp4
```

Constraints:

- Desktop sequence total: at most `4 MB`.
- Lite sequence total: at most `1.5 MB`.
- Frame dimensions: desktop at most `1600x900`; lite at most `960x540`.
- MP4 variants must use the same source composition and duration as their corresponding sequences.
- No text embedded in frames.

- [ ] **Step 2: Write failing frame-index tests**

```ts
import { describe, expect, it } from "vitest";
import { progressToFrame } from "./imageSequence";

describe("progressToFrame", () => {
  it("clamps progress and returns a zero-based frame", () => {
    expect(progressToFrame(-1, 48)).toBe(0);
    expect(progressToFrame(0.5, 48)).toBe(24);
    expect(progressToFrame(2, 48)).toBe(47);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```powershell
npx vitest run src/spikes/narrative/imageSequence.test.ts
```

Expected: FAIL because `progressToFrame` does not exist.

- [ ] **Step 4: Implement frame selection and loading**

Implement `progressToFrame(progress, frameCount)`, `frameUrl(tier, index)`, and `preloadFrames(urls, onProgress, signal)`. Loading must support cancellation and must resolve even when individual frames fail, returning successful and failed URLs separately.

- [ ] **Step 5: Implement the pinned narrative**

Build `NarrativeSpike` with:

- Native document scroll.
- One pinned section driven by GSAP ScrollTrigger.
- Canvas rendering of the selected frame.
- Two HTML text layers that appear at different progress ranges.
- Explicit `desktop sequence`, `lite sequence`, and `reduced motion` controls.
- Visible loading progress.
- Proper ScrollTrigger cleanup on variant switch and unmount.
- A `video` comparison mode that maps scroll progress to `video.currentTime`.
- Video metadata and seek errors must produce a visible fallback button that returns to the image sequence.

Text layers:

```text
Una solución para cada equipo.
De recorridos ejecutivos a grandes movimientos empresariales.
```

- [ ] **Step 6: Implement the synchronized video comparison**

Create `VideoNarrative.tsx` with a muted, inline video. After `loadedmetadata`, map normalized progress to `currentTime = progress * duration`. Throttle seeks through `requestAnimationFrame`, cancel the pending frame during cleanup, and expose `onReady`, `onError`, and `onFrame` callbacks so the same diagnostics panel can compare it with the image sequence.

- [ ] **Step 7: Verify unit tests and build**

Run:

```powershell
npx vitest run src/spikes/narrative/imageSequence.test.ts
npm run build
```

Expected: PASS and no build errors.

- [ ] **Step 8: Commit**

```powershell
git add src/spikes/narrative public/spike-assets/narrative
git commit -m "feat: add scroll narrative spike"
```

## Task 5: Verify Spike A Behavior

**Files:**
- Create: `e2e/narrative.spec.ts`
- Modify: `docs/spikes/measurement-template.md`

- [ ] **Step 1: Write the narrative browser test**

Cover:

```ts
import { expect, test } from "@playwright/test";

test("narrative remains usable forward, backward, and in reduced motion", async ({ page }) => {
  await page.goto("/?spike=narrative");
  await expect(page.getByRole("heading", { name: "Spike A: narrativa" })).toBeVisible();
  await page.mouse.wheel(0, 1600);
  await expect(page.getByText("grandes movimientos empresariales")).toBeVisible();
  await page.mouse.wheel(0, -1600);
  await page.getByRole("button", { name: "Movimiento reducido" }).click();
  await expect(page.getByText("Una solución para cada equipo.")).toBeVisible();
});
```

- [ ] **Step 2: Run the browser test**

Run:

```powershell
npx playwright test e2e/narrative.spec.ts
```

Expected: PASS on desktop and mobile projects.

- [ ] **Step 3: Perform and record manual measurements**

On each target device:

1. Test slow, fast, and reverse scrolling.
2. Resize or rotate during the pinned section.
3. Record bytes, first frame time, FPS, slow frames, and visual score.
4. Confirm the lite sequence communicates the same transformation.
5. Repeat the measurements with synchronized video.
6. Confirm reduced motion shows all essential text without pinning.

Acceptance:

- No visible blank frame after initial entry.
- No broken canvas after reverse scroll or resize.
- Desktop target is close to `60 FPS`.
- Balanced target remains at or above stable `30 FPS`.
- Lite assets stay within the defined asset budget.
- The selected narrative technique has better measured trade-offs than its rejected alternative.

- [ ] **Step 4: Commit**

```powershell
git add e2e/narrative.spec.ts docs/spikes/measurement-template.md
git commit -m "test: verify narrative spike behavior"
```

## Task 6: Build Spike B Showroom Comparisons

**Files:**
- Create: `src/spikes/showroom/ShowroomSpike.tsx`
- Create: `src/spikes/showroom/ShowroomSpike.css`
- Create: `src/spikes/showroom/R3FShowroom.tsx`
- Create: `src/spikes/showroom/ThreeShowroom.tsx`
- Create: `src/spikes/showroom/Turntable360.tsx`
- Create: `src/spikes/showroom/showroom.test.tsx`
- Create: `public/spike-assets/showroom/`
- Create: `public/spike-assets/turntable/`

- [ ] **Step 1: Prepare one representative vehicle asset**

Use a licensed or generated bus-like GLB and a matching 24-frame turntable. Record the asset source and license in `public/spike-assets/showroom/LICENSE.md`.

Constraints:

- Optimized GLB: ideally below `8 MB`.
- Maximum texture size: `2048x2048`.
- Turntable total: at most `3 MB`.
- Use the same three hotspot labels in all implementations: `Capacidad`, `Climatización`, `Seguridad`.

- [ ] **Step 2: Write failing shared-behavior tests**

The `ShowroomSpike` test must verify:

- The user can select `R3F`, `Three.js`, or `360`.
- All three variants expose the same hotspot names.
- Selecting a hotspot shows the same descriptive HTML panel.
- Loading or WebGL errors expose a button labeled `Usar vista 360`.

- [ ] **Step 3: Run the tests to verify they fail**

Run:

```powershell
npx vitest run src/spikes/showroom/showroom.test.tsx
```

Expected: FAIL because the showroom components do not exist.

- [ ] **Step 4: Implement the R3F version**

Requirements:

- Lazy-load the GLB only after the spike route is open.
- Use `frameloop="demand"`.
- Limit orbit controls; disable panning.
- Use HTML controls and hotspot panels outside the canvas.
- Invalidate rendering only during interaction, camera changes, or lighting changes.
- Dispose loaded resources on unmount.

- [ ] **Step 5: Implement the direct Three.js version**

Requirements:

- Own renderer, scene, camera, controls, animation lifecycle, resize listener, and disposal.
- Render on demand rather than continuously.
- Match the same camera limits and hotspot interface as the R3F version.
- Report initialization time and approximate renderer memory.

- [ ] **Step 6: Implement the 360 version**

Requirements:

- Drag horizontally or use keyboard arrow controls.
- Preload the nearest frames before the full set.
- Expose the same hotspot buttons and description panel.
- Work without WebGL.

- [ ] **Step 7: Verify and commit**

Run:

```powershell
npx vitest run src/spikes/showroom/showroom.test.tsx
npm run build
```

Expected: PASS.

```powershell
git add src/spikes/showroom public/spike-assets/showroom public/spike-assets/turntable
git commit -m "feat: add showroom technology comparison"
```

## Task 7: Verify Spike B Behavior And Choose A Winner

**Files:**
- Create: `e2e/showroom.spec.ts`
- Modify: `docs/spikes/measurement-template.md`
- Create: `docs/spikes/technical-decisions.md`

- [ ] **Step 1: Write the showroom browser test**

The test must visit each implementation, rotate or change frame, select all three hotspots, and verify that switching implementations does not leave duplicate canvases or unusable controls.

- [ ] **Step 2: Run the browser test**

Run:

```powershell
npx playwright test e2e/showroom.spec.ts
```

Expected: PASS on desktop and mobile projects.

- [ ] **Step 3: Measure all three implementations**

Record for R3F, direct Three.js, and 360:

- Download bytes.
- Time until first interaction.
- Average FPS during rotation.
- Renderer memory when available.
- Idle CPU/render behavior.
- Visual score from `1-5`.
- Implementation complexity and cleanup reliability.

Acceptance:

- The chosen implementation looks convincing on the presentation computer.
- Rotation and zoom do not produce input traps.
- Idle mode stops unnecessary rendering.
- The 360 fallback works with WebGL disabled.
- Switching variants does not leak canvases, listeners, or animation frames.

- [ ] **Step 4: Record the showroom decision**

Start `docs/spikes/technical-decisions.md` with this decision format:

```markdown
# Cootrasec Spike Decisions

## Showroom

**Decision:** R3F | direct Three.js | 360

**Evidence:** Summarize measured bytes, FPS, load time, visual score, and cleanup behavior.

**Fallback:** Describe the implementation used when WebGL fails or the selected tier is lite.

**Rejected options:** Explain why each alternative lost using measured evidence.
```

Do not select R3F merely because it is already React-based. Select the smallest implementation that meets the visual and performance criteria.

- [ ] **Step 5: Commit**

```powershell
git add e2e/showroom.spec.ts docs/spikes
git commit -m "docs: record showroom spike decision"
```

## Task 8: Build Spike C Adaptive Quality Switching

**Files:**
- Create: `src/experience/ExperienceProvider.tsx`
- Create: `src/experience/ExperienceProvider.test.tsx`
- Create: `src/spikes/adaptive/AdaptiveSpike.tsx`
- Create: `src/spikes/adaptive/AdaptiveSpike.test.tsx`

- [ ] **Step 1: Write failing provider tests**

Test that:

- Initial tier comes from `detectCapabilities`.
- A user override persists for the current session.
- Changing tier increments an `experienceRevision`.
- Reduced-motion changes force `reduced-motion`.
- A runtime downgrade can move `high` to `balanced`, then `lite`, but never upgrade automatically.

- [ ] **Step 2: Run the tests to verify they fail**

Run:

```powershell
npx vitest run src/experience/ExperienceProvider.test.tsx src/spikes/adaptive/AdaptiveSpike.test.tsx
```

Expected: FAIL because provider and spike do not exist.

- [ ] **Step 3: Implement the provider contract**

Expose:

```ts
interface ExperienceContextValue {
  tier: ExperienceTier;
  detectedTier: ExperienceTier;
  experienceRevision: number;
  setTier: (tier: ExperienceTier) => void;
  downgrade: () => void;
}
```

Rules:

- `setTier` is an explicit user choice and writes to `sessionStorage`.
- `downgrade` only moves downward.
- Any tier change increments `experienceRevision`.
- Consumers use the revision as a React key when a clean runtime recreation is required.

- [ ] **Step 4: Implement the adaptive spike**

The screen must:

- Show the capability snapshot and selected tier.
- Mount the narrative and showroom representatives for the selected tier.
- Allow explicit tier switching.
- Simulate WebGL failure.
- Simulate low performance and trigger a downgrade.
- Show a cleanup counter for active ScrollTriggers, canvases, and animation loops.

- [ ] **Step 5: Verify and commit**

Run:

```powershell
npx vitest run src/experience/ExperienceProvider.test.tsx src/spikes/adaptive/AdaptiveSpike.test.tsx
npm run build
```

Expected: PASS.

```powershell
git add src/experience src/spikes/adaptive
git commit -m "feat: add adaptive quality spike"
```

## Task 9: Verify Spike C And Lock Tier Rules

**Files:**
- Create: `e2e/adaptive.spec.ts`
- Modify: `docs/spikes/measurement-template.md`
- Modify: `docs/spikes/technical-decisions.md`

- [ ] **Step 1: Write the adaptive browser tests**

Cover:

- Default tier selection.
- User switching among all four tiers.
- Reduced-motion emulation.
- WebGL failure fallback.
- Resize and mobile layout.
- Repeated tier switching without duplicate runtimes.

Use Playwright reduced-motion emulation:

```ts
test.use({ reducedMotion: "reduce" });
```

- [ ] **Step 2: Run the adaptive browser tests**

Run:

```powershell
npx playwright test e2e/adaptive.spec.ts
```

Expected: PASS on desktop and mobile projects.

- [ ] **Step 3: Measure and record tier behavior**

Acceptance:

- Every tier communicates the same core message.
- `reduced-motion` has no pinned narrative or forced movement.
- `lite` remains functional without WebGL.
- Switching tiers leaves one narrative runtime and at most one showroom runtime.
- Resizing does not leave blank or overlapping scenes.
- Automatic behavior only downgrades quality; it never surprises the user with an automatic upgrade.

- [ ] **Step 4: Record the capability decision**

Append to `docs/spikes/technical-decisions.md`:

```markdown
## Adaptive Quality

**Initial tier rules:** List the final capability thresholds.

**Runtime downgrade trigger:** State the measured slow-frame window and downgrade rule.

**User control:** State how the user selects a lighter mode and how long it persists.

**Cleanup evidence:** Record the result of repeated tier switches, resize, and WebGL failure.
```

- [ ] **Step 5: Commit**

```powershell
git add e2e/adaptive.spec.ts docs/spikes
git commit -m "docs: lock adaptive quality rules"
```

## Task 10: Make The Cross-Spike Technical Decisions

**Files:**
- Modify: `docs/spikes/technical-decisions.md`
- Create: `docs/spikes/final-results.md`

- [ ] **Step 1: Run the complete automated verification**

Run:

```powershell
npm run check
```

Expected: unit tests, production build, and all Playwright projects pass.

- [ ] **Step 2: Compare Spike A narrative techniques**

Use the recorded measurements to choose:

- Image sequence, when reverse-scroll precision and cinematic control justify its bytes.
- Synchronized video strategy, when it produces equivalent perceived quality with clearly lower load and complexity.
- Layered stills, when neither moving strategy meets the budgets.

Append the decision, evidence, fallback, and rejected alternatives to `docs/spikes/technical-decisions.md`.

- [ ] **Step 3: Create the final results report**

Create `docs/spikes/final-results.md` with:

```markdown
# Cootrasec Technical Spike Results

## Executive Summary
State the three decisions and whether full-demo planning may begin.

## Measured Results
Include the completed comparison tables for narrative, showroom, and tiers.

## Locked Technical Choices
List narrative method, showroom method, fallback, tier rules, and asset budgets.

## Risks Remaining
List only risks that must be handled in the full-demo plan.

## Full-Demo Planning Inputs
List the exact components and production assets the next plan must include.
```

- [ ] **Step 4: Check the exit gate**

The next full-demo implementation plan may begin only when:

- Every automated check passes.
- Each spike has measurements from all required device classes.
- Narrative, showroom, and tier decisions are explicit.
- The fallback path works.
- No decision section contains ambiguous alternatives.

- [ ] **Step 5: Commit**

```powershell
git add docs/spikes
git commit -m "docs: finalize technical spike results"
```

## Final Verification Checklist

- [ ] `npm run check` passes.
- [ ] The default laboratory page labels all work as experimental.
- [ ] Spike A works forward, backward, mobile, and reduced-motion.
- [ ] Spike B compares R3F, direct Three.js, and 360 with the same interaction contract.
- [ ] Spike C switches and cleans up all tiers correctly.
- [ ] Measurements include all required device classes.
- [ ] `docs/spikes/technical-decisions.md` contains one unambiguous choice per spike.
- [ ] `docs/spikes/final-results.md` states whether planning for the full demo may begin.
- [ ] The repository contains no production landing-page work outside spike needs.
