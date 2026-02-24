pa# BalkonGrün — TODO

## UX Test Prep (do before test day)

### Share Prototype via QR Code

You need two terminals running side by side. Both must stay open during the test.

**Terminal 1 — build and serve the app:**
```bash
cd c:\Users\alviz\Desktop\Proto
npm run build
npx serve dist -l 5173
```

**Terminal 2 — create a public HTTPS tunnel:**
```bash
npx cloudflared tunnel --url http://localhost:5173
```
It prints a URL like `https://some-random-words.trycloudflare.com`.
That's your public link — works from any phone, any network.

**Generate a QR code from it:**
```bash
npx qrcode-terminal "https://your-url.trycloudflare.com"
```

**Why HTTPS matters:** Phone browsers block camera access on plain HTTP.
The tunnel gives you HTTPS for free — no certs, no config.
The photo step (camera + upload) works out of the box over the tunnel.

**When you're done:** Close both terminals. The URL dies instantly.

#### Checklist
- [ ] Install cloudflared: `winget install Cloudflare.cloudflared`
- [ ] Install serve: `npm i -g serve`
- [ ] Do a dry run on your own phone before the session
- [ ] Verify camera works (photo step opens rear camera)
- [ ] Print QR code or have it on screen for participants

### Content & Assets
- [ ] Add plant thumbnail images (30 photos → `/public/images/plants/`)
- [ ] Add garden marker photos (3 photos → `/public/images/gardens/`)
- [ ] Add logo SVG asset → `/public/images/logo.svg`
- [ ] Review all English copy for tone and clarity

### Critical UX Fixes
- [ ] Form validation — require at least: orientation, one goal, experience
- [ ] Photo step fallback — use balconybefore.jpg if user skips
- [ ] Step transitions — slide animation between questionnaire steps
- [ ] Loading screen — rotating text messages ("Analyzing...", "Matching...", "Almost there!")

---

## Post-Test Improvements

### Accessibility
- [ ] Focus-visible outlines on all interactive elements
- [ ] Auto-focus first input on each questionnaire step
- [ ] Verify all touch targets ≥ 44px on real devices
- [ ] Verify text contrast with browser dev tools
- [ ] Semantic landmark roles (`<main>`, `<nav>`, `<section>`)

### Map Page
- [ ] Cosmetic search bar (pre-filled with area name)
- [ ] Marker popup with plant list + garden image
- [ ] Cluster markers if more are added later

### Plan Page
- [ ] Real plant thumbnail images (replace emoji placeholders)
- [ ] Share button (Web Share API or copy-link)
- [ ] Checkbox state persistence in calendar tasks

### PWA
- [ ] Install `vite-plugin-pwa`
- [ ] Create manifest.json with app name, icons, theme color
- [ ] Generate app icons (192×192, 512×512)
- [ ] Add install prompt banner
- [ ] Test offline capability

### Polish
- [ ] Responsive desktop breakpoint (max-width container, centered)
- [ ] Page transition animations (route-level)
- [ ] Error boundary with friendly fallback screen
- [ ] 404 page

---

## Deferred to v2
- [ ] Real PDF generation (plan download)
- [ ] User accounts / authentication
- [ ] Backend API for saving plans
- [ ] i18n (German translation)
- [ ] Real community garden data + user submissions
