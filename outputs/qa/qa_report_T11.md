# QA Report — T11 Performance

**Project:** SebaTatto  
**Test:** T11 — Performance  
**Date:** 2026-06-21  
**QA Agent:** automated  

---

## Acceptance Criteria Verification

| # | Criterion | Status | Evidence |
|---|-----------|--------|----------|
| 1 | Preload fonts añadidos (3 fuentes) | ✅ PASS | `index.html:62-64` — Bebas Neue, Montserrat, Dancing Script preloaded with `rel="preload" as="font"` |
| 2 | `fetchpriority="high"` en banner y logo | ✅ PASS | `index.html:67-68` — `<link rel="preload" as="image" fetchpriority="high">` for both `banner.png` and `Logo.png` |
| 3 | `loading="lazy"` en imágenes no-hero | ✅ PASS | All non-hero `<img>` tags (about, proceso, portfolio, silhouette) include `loading="lazy"`. Gallery JS dynamically generates images with `loading="lazy"` (`gallery.js:33`). |
| 4 | `loading="eager"` en hero logo | ✅ PASS | `index.html:105-106` — Hero logo `<img>` includes `loading="eager"` |
| 5 | `OPTIMIZACION_IMAGENES.md` creado con instrucciones | ✅ PASS | File exists at project root with Squoosh CLI commands, WebP conversion steps, `<picture>` tag examples, and Lighthouse verification instructions |
| 6 | Sin errores de sintaxis | ✅ PASS | HTML: 185 open tags / 185 close tags (balanced). JS: all 4 files parse without errors. No duplicate IDs. |

---

## Additional Checks

- **Preconnect hints:** `fonts.googleapis.com` and `fonts.gstatic.com` preconnected (`index.html:58-59`)
- **CSS delivery:** 5 CSS files loaded synchronously in `<head>` (no render-blocking analysis)
- **JS delivery:** All 4 JS scripts use `defer` (`index.html:388-391`)
- **Image dimensions:** Logo has explicit `width="200" height="200"`; Silhouette has `width="322" height="726"`
- **Portfolio images (dynamic):** 12 images rendered via JS with `loading="lazy"` — proper lazy loading for non-critical assets

---

## Verdict

**APROBADO** — All 6 acceptance criteria met.
