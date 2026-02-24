# BalkonGrün — Implementation Plan

## Phase 0: Project Setup
- [x] Create CLAUDE.md with full spec
- [x] Create plants.json (30 plants, 3 garden markers, materials, matching rules)
- [x] Scaffold React 19 + Vite 7 + TypeScript 5.9 project
- [x] Install dependencies: tailwindcss, react-router-dom, zustand, leaflet
- [x] Configure Tailwind v4 with @theme design tokens (cream, lime, mint, forest)
- [x] Copy local fonts (Unbounded, Afacad variable TTFs) to public/fonts/
- [x] Copy balconybefore.jpg + balconyafter.png to public/images/
- [ ] Set up PWA manifest + service worker (vite-plugin-pwa)
- [ ] Add app icons to public/icons/

## Phase 1: Design System & Shared Components
- [x] Logo component (asterisk icon in dark rounded square)
- [x] Button component (primary/outline/ghost variants, 44px+ touch targets)
- [x] Input component (mint-green bg, green border, label)
- [x] Select component (mint-green, custom chevron, label)
- [x] GoalChip component (checkbox chip for multi-select)
- [x] ProgressBar component (segmented bar for step progress)
- [ ] Add focus-visible outlines on all interactive elements
- [ ] Add step transition animations (slide left/right)

## Phase 2: Questionnaire Flow (Steps 1–6)
- [x] QuestionnairePage with step-based navigation (Zustand store)
- [x] Step 1 — Location: Street, Postcode, Region text inputs
- [x] Step 2 — Sunlight: Orientation dropdown + Wall type dropdown
- [x] Step 3 — Space: Floor / Railing / Wall inputs (m²)
- [x] Step 4 — Goals: Multi-select checkbox chips (edible, decorative, biodiversity)
- [x] Step 5 — Experience: Beginner / Intermediate / Advanced dropdown
- [x] Step 6 — Neighbours: Text input with autocomplete (Berte101, Gartenguru, Maria.L)
- [x] Back + Next/Done bottom navigation
- [ ] Form validation (required fields, numeric checks)
- [ ] Info icons/tooltips on Steps 2, 3, 5

## Phase 3: Photo Capture (Step 7)
- [x] PhotoCapture component with Camera + Upload buttons
- [x] Fake capture: both buttons show balconybefore.jpg in camera-style frame (aspect 4/5)
- [x] Retake option clears photo and shows buttons again

## Phase 4: Loading Animation (Step 9)
- [x] Full-screen forest-green background
- [x] Animated leaf SVG (pulse)
- [x] "One moment... Your plant plan is being created!" heading
- [x] Auto-navigates to /plan after 3 seconds
- [x] Cancel button → returns to home
- [ ] Rotating text messages during loading

## Phase 5: Personalised Plan (Steps 10–13)
- [x] PlanPage with cover view + 4-tab card (Plants, Neighbours, Materials, Tasks)
- [x] Plants tab: "Your new balcony!" with balconyafter.png overview
- [x] Plants tab: Horizontal scrollable plant grid with quantity badges
- [x] Plants tab: Tap plant to see detail (name, description, care, info pills)
- [x] Neighbours tab: Berte101's balcony, plant list, complementary match card
- [x] Materials tab: Aggregated/deduplicated materials list
- [x] Tasks tab: 5-day task list (from March 12) + mini calendar with task dots
- [x] Tasks tab: Info text about 2-week materials gathering period
- [x] Back/Next navigation with scroll-to-top; "Let's go!" on Tasks tab → /cta
- [x] Plant matching algorithm (plantMatcher.ts): sun, space, goals, difficulty scoring
- [x] Auto-generated materials list + planting calendar from matched plants
- [ ] Plant thumbnail images (currently using emoji placeholders)
- [ ] Share button functionality

## Phase 6: CTA Screen (Step 14)
- [x] Forest-green background with "Bring your balcony to life" heading
- [x] balconyafter.png hero image
- [x] "Create account" CTA button (dead end — non-functional)
- [x] Description text below CTA about account benefits
- [x] "Download PDF plan" with toast notification mock
- [x] "Explore community gardens" link → /map
- [x] "Go to home page" link → resets state + navigates home + scrolls to top
- [ ] Real PDF generation (deferred to v2)

## Phase 7: Home Page (Step 15)
- [x] Logo header (clickable — resets state + navigates home)
- [x] Bold hero heading with lime-green highlight on "Balcony"
- [x] "Let's get started!" CTA → resets state + navigates to /questionnaire
- [x] 3 feature cards with emojis (plant plan, shopping list, planting calendar)
- [x] "So many possibilities..." section with 10-image autoplay carousel (2s, nav dots)
- [x] "Explore balconies" CTA (lime pill button) → /map
- [x] 3 testimonials (Berte101, Gartenguru, Maria.L) — all forest-green bg with person icons
- [x] "What is BalkonGrün?" about section

## Phase 8: Map Page (Step 17)
- [x] Leaflet OpenStreetMap centered on Kreuzberg
- [x] 5 custom markers (3 original + BalkonLisa + GruenerMax)
- [x] First garden pre-selected on load
- [x] Selected marker: neon green (#C8F540) with black border; default: forest green with white border
- [x] Tap marker → info card overlapping map (-mt-16) with image carousel (3 slides, 2s autoplay, nav dots)
- [x] Logo header (no back button)
- [x] Dynamic Leaflet import (lazy-loaded)
- [x] Leaflet attribution z-index fixed behind info cards
- [ ] Search bar (cosmetic, pre-filled)

## Phase 9: Polish & Hardening
- [ ] PWA install prompt
- [ ] Plant thumbnail images (30 photos for /public/images/plants/)
- [ ] Garden marker photos (3 photos for /public/images/gardens/)
- [ ] Logo SVG asset
- [ ] Form validation across all steps
- [ ] Step transition animations
- [ ] Focus management (trap focus in modals, auto-focus inputs)
- [ ] Test on mobile Chrome + Safari (iOS)
- [ ] Verify all touch targets ≥ 44px
- [ ] Verify text contrast with browser dev tools
- [ ] Responsive desktop breakpoint (currently mobile-only)

---

## Current Status
**Phases 0–8 are functionally complete.** All pages render, routing works,
questionnaire state flows through to plan generation. The app is usable
end-to-end on mobile viewport. State resets correctly when navigating home
via logo, hero CTA, or CTA page links.

**Remaining work is polish:** PWA setup, real images, validation,
animations, accessibility hardening, and desktop responsive breakpoints.

**Ready for UX testing deployment** — see deployment options below.
