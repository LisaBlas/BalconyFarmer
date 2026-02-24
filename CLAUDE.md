# BalkonGrün — Balcony Farm Planner PWA

## Overview
Mobile-first PWA helping Berlin residents plan and set up balcony gardens.
Built for UX testing — all data is client-side, no backend.

## Tech Stack
- **Framework:** React 19 + TypeScript 5.9 + Vite 7
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite` plugin, `@theme` tokens in `index.css`)
- **State:** Zustand 5 (questionnaire flow + plan results)
- **Routing:** React Router v7
- **Map:** Leaflet 1.9 (dynamic import on MapPage only)
- **Fonts:** Local variable fonts — Unbounded (headings), Afacad (body) in `public/fonts/`
- **Accessibility:** WCAG 2.1 AA (contrast, touch targets 44px, text ≥16px)

## Folder Structure
```
Proto/
├── CLAUDE.md
├── PLAN.md
├── index.html
├── package.json
├── vite.config.ts              # React + Tailwind plugins
├── tsconfig.json
├── tsconfig.app.json
├── public/
│   ├── fonts/
│   │   ├── Unbounded-VariableFont_wght.ttf
│   │   ├── Afacad-VariableFont_wght.ttf
│   │   └── Afacad-Italic-VariableFont_wght.ttf
│   └── images/
│       ├── balconybefore.jpg         # Reference photo (camera step)
│       ├── balconyafter.png          # "AI-generated" result image
│       ├── plants/                   # Plant thumbnails (empty — placeholders used)
│       └── gardens/                  # Map marker garden photos (empty — placeholders used)
├── src/
│   ├── main.tsx                      # React entry point
│   ├── App.tsx                       # BrowserRouter with 6 routes
│   ├── index.css                     # @font-face, Tailwind @theme tokens, base styles
│   ├── types/
│   │   └── index.ts                  # Plant, QuestionnaireAnswers, PlanResult, etc.
│   ├── data/
│   │   └── plants.json               # 30 plants + 5 garden markers + materials + matching rules
│   ├── store/
│   │   └── useAppStore.ts            # Zustand: step, answers, photo, plan
│   ├── utils/
│   │   └── plantMatcher.ts           # Scoring algorithm: answers → 5-8 plants + materials + calendar
│   ├── hooks/
│   │   └── usePlantPlan.ts           # Hook wrapping matcher + setPlan
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx            # primary / outline / ghost variants
│   │   │   ├── Input.tsx             # Mint-green styled text input with label
│   │   │   ├── Select.tsx            # Mint-green styled dropdown with label
│   │   │   ├── GoalChip.tsx          # Checkbox chip for goal multi-select
│   │   │   └── ProgressBar.tsx       # Segmented bar showing current step
│   │   ├── layout/
│   │   │   └── Logo.tsx              # Clickable asterisk logo — resets state + navigates home
│   │   ├── questionnaire/
│   │   │   ├── StepLocation.tsx      # Street, Postcode, Region inputs
│   │   │   ├── StepSunlight.tsx      # Orientation + Wall type selects
│   │   │   ├── StepSpace.tsx         # Floor, Railing, Wall space inputs (m²)
│   │   │   ├── StepGoals.tsx         # Edible / Decorative / Biodiversity chips
│   │   │   ├── StepExperience.tsx    # Beginner / Intermediate / Advanced select
│   │   │   └── StepNeighbours.tsx    # Username input with autocomplete
│   │   └── photo/
│   │       └── PhotoCapture.tsx      # Fake capture (shows balconybefore.jpg), camera-style frame, retake
│   └── pages/
│       ├── HomePage.tsx              # Landing: hero, features (with emojis), carousel, green testimonials, about
│       ├── QuestionnairePage.tsx      # 7-step flow (6 questions + photo) with progress bar
│       ├── LoadingPage.tsx           # Forest-green screen, animated leaf, 3s auto-redirect
│       ├── PlanPage.tsx              # Cover + 4 tabs: Plants, Neighbours, Materials, Tasks (calendar)
│       ├── CtaPage.tsx               # Post-plan: dead-end account CTA, PDF mock, explore, home link
│       └── MapPage.tsx               # Leaflet map with 5 Berlin garden markers, carousel, overlay cards
```

## Routes
| Path | Page | Description |
|------|------|-------------|
| `/` | HomePage | Landing page with hero, features, testimonials |
| `/questionnaire` | QuestionnairePage | 7-step form (steps 1-7 managed by Zustand `step`) |
| `/loading` | LoadingPage | 3-second animated transition, generates plan |
| `/plan` | PlanPage | Cover view → 4 tabbed results: Plants, Neighbours, Materials, Tasks |
| `/cta` | CtaPage | Post-plan actions (account, PDF download, explore) |
| `/map` | MapPage | Leaflet map with 5 garden markers, carousels, overlay info cards |

## Typography
- **Headings & CTA buttons:** Unbounded (local variable font) — bold, rounded, playful
- **Body text & UI:** Afacad (local variable font) — clean, readable sans-serif

## Design Tokens (Tailwind @theme in index.css)
```
--color-cream:        #FDF6E3   (background)
--color-lime:         #C8F540   (primary CTA)
--color-mint:         #C5F0D2   (input fields)
--color-mint-border:  #7CC99E   (input borders, step labels)
--color-forest:       #6BAF73   (loading/CTA backgrounds)
--color-text:         #1A1A1A   (primary text)
--color-text-secondary: #666666
--color-card-border:  #E0E0E0
--font-heading:       "Unbounded", system-ui, sans-serif
--font-body:          "Afacad", system-ui, sans-serif
```

## UX Testing Config
- **Calendar start date:** 2026-03-12 (hardcoded for UX test session)
- **Progress bar:** Segmented bar (one segment per step, fills on completion)
- **Goals (Step 4):** Checkbox chips (not dropdown)
- **Space inputs:** Square metres (m²)
- **PDF download:** Mock button with toast notification
- **Neighbour autocomplete:** "Berte101", "Gartenguru", "Maria.L"
- **Loading duration:** 3 seconds, then auto-navigates to plan
- **Photo capture:** Faked — both Camera and Upload show balconybefore.jpg in a camera-style frame
- **Logo:** Clickable on all pages — resets state + navigates home + scrolls to top
- **State reset:** Triggered at navigation points (logo, home CTA, CTA page buttons), not on mount
- **Create account button:** Dead end (non-functional) on CTA page
- **Garden markers:** 5 markers in Kreuzberg, first pre-selected, neon green highlight on selected
- **Garden info cards:** Overlay map with image carousel (3 slides, 2s autoplay, nav dots)
- **Plan tabs:** 4 tabs — Plants, Neighbours (Berte101), Materials, Tasks (5-day view + mini calendar)
- **Home page:** All testimonials green bg, feature cards with emojis, 10-slide inspiration carousel

## Key Conventions
- **Language:** English (simple, approachable, fun tone)
- **All text content** lives in component files (no i18n for v1)
- **Plant matching** is deterministic from JSON — no API calls
- **No backend** — everything runs client-side
- **Fonts** are local variable `.ttf` files in `/public/fonts/` (not Google Fonts CDN)
- **Leaflet** is dynamically imported only on MapPage to keep bundle lean
- **Accessibility:** min 4.5:1 contrast on text, 44×44px touch targets, semantic HTML, aria-labels on icons

## Questionnaire Flow
1. Location → 2. Sunlight → 3. Space → 4. Goals → 5. Experience → 6. Neighbours → 7. Photo → Loading → Plan → CTA

## Plant Matching Logic
The scorer in `plantMatcher.ts` ranks all 30 plants from `plants.json`:
1. **Sun compatibility** (+10 exact match, +4 adjacent) based on orientation → sunMapping
2. **Space type match** (+5, hard filter — must have at least one matching space)
3. **Goal alignment** (+6 if plant category overlaps user goals)
4. **Difficulty** (+3 if plant difficulty ≤ user experience)
5. **Wall compatibility** (+2 if plant supports user's wall type)
Then selects top 5-8, ensuring at least one plant per selected goal category.
Auto-generates materials list (deduplicated) and planting calendar from selected plants.

## What's Not Yet Built
- PWA manifest + service worker (`vite-plugin-pwa` not installed)
- Plant thumbnail images (30 images in `/public/images/plants/`)
- Garden marker photos (3 images in `/public/images/gardens/`)
- Logo SVG asset
- Step transition animations
- Form validation (required fields, numeric checks)
- Responsive desktop breakpoint (mobile-only for now)

## Commands
```bash
npm install          # Install dependencies
npm run dev          # Dev server on localhost:5173
npm run build        # Production build (tsc + vite)
npm run preview      # Preview production build
npm run lint         # ESLint check
```
