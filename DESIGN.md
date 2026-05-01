---
name: Vaibhav Manaji Portfolio
colors:
  # ── Global backgrounds ──────────────────────────────
  background-dark: "#0e0e0e"
  background-near-black: "#0a0a0a"
  background-pure-black: "#000000"
  background-white: "#ffffff"
  background-off-white: "#f8f9fa"

  # ── Hero gradient stops (top → bottom) ──────────────
  hero-sky-deep: "#020617"
  hero-sky-night: "#0b1a30"
  hero-sky-blue: "#1e4b8a"
  hero-sky-light: "#93c5fd"
  hero-sky-horizon: "#ffffff"

  # ── Text ────────────────────────────────────────────
  on-dark: "#ededed"
  on-dark-muted: "rgba(255, 255, 255, 0.8)"
  on-dark-subtle: "rgba(255, 255, 255, 0.5)"
  on-dark-faint: "rgba(255, 255, 255, 0.35)"
  on-dark-ghost: "rgba(255, 255, 255, 0.45)"
  on-light: "#000000"
  on-light-muted: "rgba(0, 0, 0, 0.6)"
  on-light-subtle: "rgba(0, 0, 0, 0.4)"

  # ── Primary interactive accent ──────────────────────
  accent: "#1a8cff"
  accent-glow-near: "rgba(26, 140, 255, 0.4)"
  accent-glow-far: "rgba(26, 140, 255, 0.15)"
  accent-glow-inset: "rgba(26, 140, 255, 0.06)"
  accent-ambient: "rgba(26, 140, 255, 0.12)"

  # ── Navigation dock ─────────────────────────────────
  nav-surface: "rgba(30, 30, 30, 0.65)"
  nav-border: "rgba(255, 255, 255, 0.08)"
  nav-shine: "rgba(255, 255, 255, 0.1)"
  nav-link-default: "rgba(255, 255, 255, 0.6)"
  nav-link-hover: "#ffffff"
  nav-cta-bg: "#ffffff"
  nav-cta-text: "#000000"
  nav-cta-hover-bg: "#f0f0f0"

  # ── Cursor ──────────────────────────────────────────
  cursor: "#ffffff"

  # ── Scrollbar ───────────────────────────────────────
  scrollbar-thumb: "rgba(255, 255, 255, 0.2)"
  scrollbar-thumb-hover: "rgba(255, 255, 255, 0.4)"

  # ── Loading screen ──────────────────────────────────
  loading-overlay: "#000000"
  loading-box: "#ffffff"

  # ── ShrinkBox / orb ────────────────────────────────
  shrink-box-surface: "#f8f9fa"
  shrink-orb-glow: "rgba(255, 255, 255, 0.3)"

  # ── ExpandBox ───────────────────────────────────────
  expand-box: "#000000"
  expand-text: "#ffffff"

  # ── Footer parallax showcase ────────────────────────
  footer-bg: "#f8f9fa"
  footer-text: "#0e0e0e"

  # ── Misc utility ────────────────────────────────────
  white: "#ffffff"
  black: "#000000"
  neutral-light: "#a3a3a3"

typography:
  # ── Display: hero name ──────────────────────────────
  display-hero:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(3.5rem, 10vw, 9rem)"
    fontWeight: "300"
    lineHeight: 0.85
    letterSpacing: "-0.03em"
    textTransform: uppercase

  # ── Display: section headings (sticky reveal) ───────
  display-lg:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(2rem, 5vw, 4.5rem)"
    fontWeight: "400"
    lineHeight: 1.15
    letterSpacing: "-0.02em"

  # ── Serif: footer thank-you ──────────────────────────
  display-footer:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(3.75rem, 10vw, 7.5rem)"
    fontWeight: "400"
    lineHeight: 1.0
    fontStyle: italic

  # ── Serif italic accent (sticky heading) ────────────
  heading-accent:
    fontFamily: "Cormorant Garamond"
    fontStyle: italic
    color: "rgba(255, 255, 255, 0.45)"

  # ── Body: bio, subtexts ──────────────────────────────
  body-lg:
    fontFamily: Inter
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: "300"
    lineHeight: 1.6

  body-md:
    fontFamily: Inter
    fontSize: "0.95rem"
    fontWeight: "400"
    lineHeight: 1.6

  body-sm:
    fontFamily: Inter
    fontSize: "0.85rem"
    fontWeight: "400"
    lineHeight: 1.6

  # ── Label: navigation links ──────────────────────────
  label-nav:
    fontFamily: Inter
    fontSize: "0.75rem"
    fontWeight: "500"
    letterSpacing: "0.1em"
    textTransform: uppercase

  # ── Label: small caps / mono ─────────────────────────
  label-sm:
    fontFamily: Inter
    fontSize: "0.65rem"
    fontWeight: "400"
    letterSpacing: "0.2em"
    textTransform: uppercase

  # ── Monospace: expand-box, footer tagline, tags ──────
  mono-display:
    fontFamily: "Courier New, Courier, monospace"
    fontSize: "1.5rem"
    fontWeight: "400"
    lineHeight: 1.0
    letterSpacing: "0"

  mono-sm:
    fontFamily: "Courier New, Courier, monospace"
    fontSize: "0.875rem"
    fontWeight: "500"
    lineHeight: 1.5

rounded:
  none: "0px"
  sm: "0.25rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  "2xl": "2rem"
  full: "9999px"
  # Design note: primary interactive surfaces (nav dock, hero sound toggle,
  # nav CTA, loading box, scroll-hint mouse) all use border-radius: 0.
  # Rounded corners appear only on parallax portrait (1rem), side images
  # (0.75rem), project cards (2rem), and social icon circles (full).
  default-interactive: "0px"
  portrait-card: "1rem"
  side-image: "0.75rem"
  project-card: "2rem"
  social-icon: "9999px"

spacing:
  unit: "8px"
  section-gap: "2rem"
  hero-content-max-width: "900px"
  sticky-content-max-width: "896px"
  nav-padding-x: "1.5rem"
  nav-padding-y: "0.6rem"
  bio-max-width: "320px"
  container-max-width: "1280px"
  container-padding: "1.5rem"

elevation:
  # Nav dock glass layer
  nav-dock:
    background: "rgba(30, 30, 30, 0.65)"
    backdropFilter: "blur(20px)"
    border: "1px solid rgba(255, 255, 255, 0.08)"
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
  # Parallax portrait card
  portrait-card:
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)"
  # Parallax side images
  side-image:
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)"
  # Project section lift
  project-panel:
    boxShadow: "0 -30px 60px rgba(0, 0, 0, 0.1)"

motion:
  # Standard UI transition
  default:
    duration: "0.3s"
    easing: "ease"
  # Cursor morph (shape + size)
  cursor-morph:
    duration: "0.35s"
    easing: "cubic-bezier(0.25, 1, 0.5, 1)"
  # Text/element reveal (spring-like)
  reveal-spring:
    duration: "0.7s"
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  # Card scale-in with overshoot
  card-bounce:
    duration: "0.7s"
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  # Bio line stagger reveal
  bio-reveal:
    duration: "1200ms"
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    stagger: "140ms"
  # Hero name slide-in (Motion)
  hero-name:
    duration: "1.2s"
    easing: "easeOut"
    staggerDelay: "0.2s"
  # Hero bio fade-up
  hero-bio:
    duration: "1s"
    delay: "0.8s"
  # Hero scroll indicator fade
  hero-scroll-indicator:
    duration: "1.2s"
    delay: "2s"
  # Loading screen expand (easeOutQuart)
  loading-expand:
    duration: "1800ms"
    easing: "easeOutQuart"
  # Loading screen reveal (overlay fade)
  loading-reveal:
    duration: "600ms"
    easing: "cubic-bezier(0.25, 1, 0.5, 1)"
  # Sticky reveal subtexts
  sticky-sub:
    duration: "0.8s"
    easing: "cubic-bezier(0.16, 1, 0.3, 1)"
  # Glow entry fade-out
  glow-fade:
    duration: "0.8s"
    easing: "cubic-bezier(0.25, 1, 0.5, 1)"
  # Mouse scroll dot bounce
  scroll-dot:
    duration: "2s"
    easing: "ease-in-out"
    iteration: infinite
  # Nav dock hide/show
  nav-slide:
    duration: "0.35s"
    easing: "easeInOut"

shadows:
  glow-active:
    value: "0 0 0 3px #1a8cff, 0 0 40px 4px rgba(26, 140, 255, 0.4), 0 0 80px 8px rgba(26, 140, 255, 0.15), inset 0 0 30px 0 rgba(26, 140, 255, 0.06)"
  glow-fade:
    value: "0 0 0 0px transparent"
  orb-glow:
    value: "0 0 60px rgba(255, 255, 255, 0.3)"
  nav-hover-cta:
    value: "0 4px 15px rgba(255, 255, 255, 0.2)"
  portrait:
    value: "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06)"
  side-image:
    value: "0 10px 40px rgba(0, 0, 0, 0.5)"
  scrollbar-thumb: "rgba(255, 255, 255, 0.2)"

components:
  loading-screen:
    overlayBackground: "#000000"
    boxBackground: "#ffffff"
    boxStartSize: "24px"
    boxEndSize: "100vw × 100vh"
    expandEasing: "easeOutQuart"
    expandDuration: "1800ms"
    revealDuration: "600ms"

  custom-cursor:
    size: "24px"
    background: "#ffffff"
    mixBlendMode: difference
    lerpFactor: 0.12
    hoverSize: "40px"
    hoverBorderRadius: "50%"
    morphDuration: "0.35s"
    morphEasing: "cubic-bezier(0.25, 1, 0.5, 1)"
    hiddenOnTouch: true

  nav-dock:
    position: "fixed bottom-center"
    background: "rgba(30, 30, 30, 0.65)"
    backdropFilter: "blur(20px)"
    border: "1px solid rgba(255, 255, 255, 0.08)"
    borderRadius: "0px"
    paddingX: "1.5rem"
    paddingY: "0.6rem"
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
    linkColor: "rgba(255, 255, 255, 0.6)"
    linkHoverColor: "#ffffff"
    linkUnderlineTransition: "width 0.3s ease"
    ctaBackground: "#ffffff"
    ctaTextColor: "#000000"
    ctaBorderRadius: "0px"
    hideOnScrollDown: true
    showOnScrollUp: true

  hero-name:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(3.5rem, 10vw, 9rem)"
    fontWeight: "300"
    textTransform: uppercase
    letterSpacing: "-0.03em"
    lineHeight: 0.85
    color: "#ffffff"
    animation: "slide-in from opposite sides, 1.2s easeOut"

  hero-scroll-indicator:
    mouseWidth: "22px"
    mouseHeight: "36px"
    mouseBorder: "1.5px solid #000000"
    mouseBorderRadius: "12px"
    dotWidth: "3px"
    dotHeight: "6px"
    dotBackground: "#000000"
    dotAnimation: "mouseScrollDot 2s ease-in-out infinite"
    labelFontSize: "0.55rem"
    labelLetterSpacing: "0.2em"
    labelColor: "#000000"

  expand-box:
    background: "#000000"
    startWidth: "320px"
    startHeight: "70px"
    endWidth: "100vw"
    endHeight: "100vh"
    textFont: "Courier New, monospace"
    textColor: "#ffffff"
    borderRadius: "0px"
    phase1: "ghost text on white page (0–15%)"
    phase2: "black box expands from pill to fullscreen (15–65%)"
    phase3: "full panel, text transitions (65–85%)"
    phase4: "panel anchors at scroll end (85–100%)"

  shrink-box:
    background: "#f8f9fa"
    startWidth: "100vw"
    startHeight: "100vh"
    orbSizeDesktop: "120px"
    orbSizeMobile: "80px"
    orbGlow: "0 0 60px rgba(255, 255, 255, 0.3)"
    phase1: "full white box shrinks to glowing orb (0–50%)"
    phase2: "text fades out (0–30%)"
    phase3: "orb fades into dark (70–95%)"

  sticky-reveal:
    wrapperHeight: "450vh"
    stickyBackground: "#0a0a0a"
    grainTexture: "fractalNoise baseFrequency=0.85, opacity 4%"
    progressBarWidth: "2px"
    progressBarColor: "rgba(255, 255, 255, 0.35)"
    progressBarTrack: "rgba(255, 255, 255, 0.08)"

  about-section:
    background: "#000000"
    portraitScaleRange: "1.0 → 1.28 (scroll driven)"
    handXRange: "-25% → +60% (dampened 0.85×)"
    bioRevealTransition: "opacity + translateY 20px"

  parallax-showcase:
    background: "#0a0a0a"
    portraitBorderRadius: "1rem"
    portraitBoxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)"
    sideImageBorderRadius: "0.75rem"
    ambientGlow: "radial-gradient rgba(26, 140, 255, 0.12)"

  footer:
    background: "#f8f9fa"
    textColor: "#0e0e0e"
    socialIconSize: "40px"
    socialIconBorder: "1px solid currentColor"
    socialIconBorderRadius: "9999px"
    socialIconOpacity: 0.6
    socialIconHoverOpacity: 1
---

## Brand & Style

This is a **personal portfolio** for **Vaibhav Manaji** — a Data Science and AI student at IIT Madras — built around the belief that beautiful design and robust architecture are not mutually exclusive. The brand personality sits at the intersection of *analytical precision* and *artistic intuition*: code meets consciousness, machines meet the human mind.

The overarching visual language is **editorial minimalism with cinematic scroll theatre**. Every section transition is choreographed — the page doesn't just scroll, it *performs*. Sections emerge, collapse, pin, and dissolve through carefully timed scroll-driven animations, creating a continuous narrative rather than a list of disconnected pages.

## Color Strategy

The palette is built on a strict **dark-first, dual-mode** philosophy. The primary canvas is near-black (`#0e0e0e`/`#0a0a0a`), and the only deviations are intentional and narrative:

- **Hero** transitions from deep midnight blue (`#020617`) through a cinematic multi-stop gradient to pure white at the horizon — evoking the pre-dawn sky. This is the *only* rich color in the dark world.
- **Dark sections** (StickyReveal, AboutSection, ParallaxShowcase) use `#0a0a0a`–`#000000`. White text appears at 35–85% opacity depending on hierarchy, using alpha as the primary legibility tool rather than hue.
- **Light sections** (ExpandBox background, ShrinkBox surface, post-reveal card, Footer) are pure white or near-white (`#f8f9fa`). Black text with 40–60% alpha handles muted hierarchy here.
- **Accent**: A single electric blue (`#1a8cff`) is used exclusively for the "entry glow" effect — a pulsing box-shadow that appears on section entry and fades out, never polluting the rest of the UI.
- **No decorative colors**. There are no teal, pink, purple, or gradient accents in the UI chrome itself. The hero sky gradient is a photographic illusion, not a branding choice.

## Typography

Two typefaces define the entire voice:

### Cormorant Garamond (Display Serif)
Used for all headline-weight text that carries emotional weight: the hero name (`VAIBHAV MANAJI`), the sticky reveal heading, the "Thank You." footer display, and italic accent phrases. Weights stay at 300–400 (light to regular), leveraging the typeface's inherent elegance. The hero name is set at `clamp(3.5rem, 10vw, 9rem)` with `-0.03em` letter-spacing and 0.85 line-height — it intentionally compresses vertically to create a dense, poster-like mass.

### Inter (Sans-Serif Body)
Used for all navigational, functional, and secondary descriptive text. Nav links are `0.75rem / 500 / 0.1em tracking / uppercase`. Bio copy runs at `0.95rem / 400 / 1.6 line-height`. Small labels (scroll indicator text, parallax labels) drop to `0.55–0.65rem` with wide `0.2–0.25em` tracking for a refined micro-typographic feel.

### Courier New (Monospace)
Reserved for the ExpandBox and ShrinkBox scroll-theatre sequences ("just Data Science?", "keep Scrolling", "Beyond the surface.") and the footer tagline. The monospace choice creates a deliberate contrast — a typewriter aesthetic inside the cinematic black box, as if the page is *thinking aloud*.

### Hierarchy Rules
- One serif display per section, always rendered at the largest possible size the layout allows.
- Italic is used sparingly and always on serif: it marks the "accent thought" — the second half of a contrasting statement.
- Uppercase is used only for functional labels (nav links, tags, scroll indicator text) never for content headings. It signals metadata, not meaning.

## Layout & Spacing

The layout operates on an **8px base grid** with liberal use of `clamp()` for fluid responsive scaling. The maximum container width is `1280px` with `1.5rem` horizontal padding. The hero content well is capped at `900px` to ensure the name isn't overly wide on large screens.

Sections are full-viewport-height by default. The page's scrollable length far exceeds its section count — the extra scroll distance is consumed by the scroll theatre sequences (ExpandBox at `500vh`, ShrinkBox at `250vh`, StickyReveal at `450vh`). This deliberate "scroll debt" is what creates the cinematic pacing.

The post-reveal light section (the `#f8f9fa` card) slides in from the bottom with a `borderTopLeftRadius`/`borderTopRightRadius` that smoothly transitions from `20%` to `0%` as you scroll — a subtle peeling-page reveal.

## Shape Language

The design is intentionally **angular in interactive chrome, rounded in content**:

- **Nav dock, hero sound toggle, nav CTA, loading box, scroll hint mouse**: `border-radius: 0` — sharp, architectural.
- **Portrait image**: `1rem` radius — warm, human.
- **Side parallax images**: `0.75rem` — softened.
- **Project card container**: `2rem` — friendly.
- **Social media icons**: `9999px` (full circle) — conventional web affordance.

This split signals: "the interface is precise and intentional; the content is organic and human."

## Motion & Animation Philosophy

Motion is the soul of this design. Every interaction and scroll event is treated as a scene in a film:

### Scroll Theatre (Primary UX)
Three major scroll-driven sequences define the page's narrative arc:

1. **ExpandBox** — On a pure white background, ghost monospace text fades in, then a black rectangle morphs from a pill shape to a fullscreen takeover over `500vh` of scroll distance. The world goes dark.
2. **ShrinkBox** — The white world re-enters as a full-viewport panel, then crushes down to a glowing white orb and disappears into the dark, connecting light and dark modes.
3. **StickyReveal** — A dark section pins to the viewport for `450vh` of scroll. A serif heading fades from opacity 0 → 1 while three body lines stagger in at 30%, 60%, and 85% thresholds with `cubic-bezier(0.16, 1, 0.3, 1)` spring easing.

### Entry Animations
- **Hero name**: two lines slide in from opposite horizontal directions (`x: ±30`) simultaneously, staggered 200ms, over 1.2s with `easeOut`.
- **Bio text**: fades up from `y: 20px` with 800ms delay after name.
- **Scroll indicator**: fades in last, at 2s delay.
- **About section**: portrait scales `1.0 → 1.28` and hands sweep inward as you scroll through the section. Bio text fades up from 20px simultaneously.

### Micro-interactions
- **Custom cursor**: A 24×24px white square with `mix-blend-mode: difference` (inverts all colors beneath it) lerp-tracks the mouse at factor `0.12`, creating intentional lag. On hover over interactive elements it morphs to a 40×40px circle in 0.35s with `cubic-bezier(0.25, 1, 0.5, 1)`.
- **Nav dock**: hides downward (`y: 100`) when scrolling down past 150px, re-appears when scrolling up.
- **Nav links**: underline slides in from `width: 0` to `width: 100%` on hover, 0.3s ease.
- **Nav CTA hover**: scales `1.02`, adds a white glow shadow.
- **Fade-up on scroll**: Any element with `data-scroll="fade-up"` starts at `opacity: 0, translateY: 24px` and transitions to visible with staggered delays at 0.7s `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Scale-in on scroll**: `data-scroll="scale-in"` elements start at `scale(0.88)` with `cubic-bezier(0.34, 1.56, 0.64, 1)` overshoot bounce.
- **Entry glow**: `data-glow="entry"` elements flash an electric blue box-shadow on intersection, then fade it out over 0.8s.

### Scroll Smoothing
Lenis smooth scroll is used globally, adding an organic, decelerated scroll feel that makes the scroll theatre sequences feel continuous and cinematic.

### Accessibility
All scroll-driven and entry animations respect `prefers-reduced-motion: reduce`. Under this preference, all transforms are set to `none` and all opacities to `1` immediately.

## Special Surfaces

### Loading Screen
On page load, a 24×24px white square sits centered on a black canvas. It expands using an `easeOutQuart` curve over 1.8 seconds to fill the entire viewport, then the black overlay fades out over 0.6s. This gives the impression of the page "opening" like an aperture.

### Navigation Dock
A bottom-center fixed pill (sharp corners) using glassmorphism: `backdrop-filter: blur(20px)` on `rgba(30, 30, 30, 0.65)`, bordered by a `1px rgba(255,255,255,0.08)` edge and a `inset 0 1px 0 rgba(255,255,255,0.1)` inner shine that simulates light catching the top edge of a glass surface.

### Parallax Showcase
A dark section where a center portrait and two flanking side images move at different speeds on scroll (the sides at a damped 0.85× rate). An ambient `radial-gradient` blue glow sits behind the center portrait. Portrait labels appear beneath in small-caps sans and italic serif — a refined editorial captioning style.

### About Section
A layered cinematic reveal: two hand images sweep inward from opposite sides at a dampened scroll rate while a center portrait scales up. Below the portrait, a MetaBalls WebGL canvas renders white blobs that respond to mouse movement — embedding organic, living motion inside an otherwise type-driven section.

### MyVibe Masonry Grid
An asymmetric CSS Grid bento layout displaying cosmos images and animated GIFs with staggered `IntersectionObserver` fade-ins (`transitionDelay` cycling through `0–0.7s`). Items are categorized as `normal`, `large` (every 5th), `wide` (every 7th), or `tall` (every 4th) to create visual rhythm without full randomness.

## Writing & Voice

The copy is deliberately introspective and poetic — short, punchy serif statements ("I don't just build models — I engineer intelligence.") contrasted with quieter mono asides ("Every pixel placed with purpose. Every algorithm built to scale."). The footer message is written in the voice of an AI metaphor: "I may not have all the algorithms tuned yet, but I have the compute to train them with you." This duality — human creativity expressed through technical language — mirrors the subject matter: a person who lives at the intersection of data science and the human mind.
