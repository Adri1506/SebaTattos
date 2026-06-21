# QA Report — T07: Calculadora de Precios

**Project:** SebaTatto  
**Task ID:** T07  
**Feature:** FEAT-PRECIOS-CALCULATOR  
**QA Date:** 2026-06-21  
**Status:** ✅ APROBADO

---

## Acceptance Criteria Verification

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| 1 | Sección `#precios` con título "Cotizá tu precio" | ✅ PASS | `index.html:180-181` — `<section id="precios">` con `<h2>Cotizá tu precio</h2>` |
| 2 | Layout 3 columnas desktop: tabla \| silueta \| controles | ✅ PASS | `components.css:882-886` — `@media (min-width: 768px) { .precios-grid { grid-template-columns: 1fr 1fr 1fr } }`. Grid children: `.reference-table`, `.silhouette-wrapper`, `.precios-controls` (`index.html:188-266`) |
| 3 | Mobile: stacked vertical | ✅ PASS | `components.css:603-607` — `.precios-grid { grid-template-columns: 1fr }` default (no media query) |
| 4 | Silueta.png (322×726) con `<map>` + 12 `<area shape="rect">` | ✅ PASS | `index.html:203-222` — `<img src="imagenes/silueta.png" width="322" height="726">` + `<map name="bodyMap">` con 12 `<area shape="rect">`. Silueta.png exists (237 KB) |
| 5 | 12 zonas cliqueables con data-zone y data-label | ✅ PASS | `index.html:210-221` — Cada `<area>` tiene `data-zone` y `data-label`. Verificado: 12 ocurrencias de cada atributo |
| 6 | Click en zona: resalta + muestra label | ✅ PASS | `calculator.js:84-99` — `addEventListener('click')` en cada area: resalta con `style.outline` y actualiza `zoneLabel.innerHTML` + `selectedDisplay.textContent` |
| 7 | Slider 1-30cm con valor mostrado | ✅ PASS | `index.html:241` — `<input type="range" id="sizeSlider" min="1" max="30" step="1">`. `calculator.js:103-105` — muestra valor en `#sizeDisplay` |
| 8 | Toggle ByN/Color funcional | ✅ PASS | `index.html:246-253` — Toggle con checkbox `#colorToggle`. `calculator.js:109-113` — alterna clases `.active` y recalcula precio |
| 9 | Precio en vivo se actualiza | ✅ PASS | `calculator.js:52-81` — `calculatePrice()` llamado en click de zona (line 98), input de slider (line 105), change de toggle (line 113) |
| 10 | Pricing: tiers (mini/pequeño/mediano/grande/mega) × zone factor × color | ✅ PASS | `calculator.js:5-30` — TIERS 5 niveles, ZONE_FACTORS 12 zonas, COLOR_MULTIPLIER 1.3. Lógica en `calculatePrice()` lines 64-80 |
| 11 | Mega (>25cm): muestra "A cotizar" | ✅ PASS | `calculator.js:67-71` — Si `!tier.base`, muestra "A cotizar". Mega tier id='mega' tiene `base: null` (line 10) |
| 12 | Tabla de referencia con 5 tiers | ✅ PASS | `index.html:191-196` — Tabla HTML con Mini (≤5), Pequeño (6-10), Mediano (11-15), Grande (16-25), Mega (>25) |
| 13 | Botón CTA "Solicitar presupuesto exacto" | ✅ PASS | `index.html:264` — `<a href="#contact" class="btn btn-primary">Solicitar presupuesto exacto</a>` |
| 14 | calculator.js sin errores de sintaxis | ✅ PASS | Verificado con `new Function(code)` — sin errores. JS en IIFE + `'use strict'` |
| 15 | Sin modificar archivos fuera del scope | ✅ PASS | Scope limitado a `index.html` (#precios), `js/calculator.js`, `css/components.css` (secciones calculator), `imagenes/silueta.png`. Archivos no tocados fuera de estos. |

---

## Pricing Logic Verification

| Test Case | Zone | Size | Color | Expected | Actual | Result |
|-----------|------|------|-------|----------|--------|--------|
| Mini ByN | brazo-izq | 5 | false | $35.000 | $35.000 | ✅ |
| Mini + factor | cabeza | 3 | false | $52.500 (35k × 1.5) | $52.500 | ✅ |
| Pequeño ByN | brazo-der | 10 | false | $70.000 | $70.000 | ✅ |
| Pequeño Color + factor | mano-izq | 8 | true | $72.800 (70k × 0.8 × 1.3) | $72.800 | ✅ |
| Mediano + factor | pecho | 12 | false | $216.000 (120k × 1.8) | $216.000 | ✅ |
| Mediano Color | vientre | 14 | true | $249.600 (120k × 1.6 × 1.3) | $249.600 | ✅ |
| Grande + factor | pierna-izq | 20 | false | $280.000 (200k × 1.4) | $280.000 | ✅ |
| Grande Color | pierna-der | 25 | true | $364.000 (200k × 1.4 × 1.3) | $364.000 | ✅ |
| Mega (>25cm) | brazo-izq | 30 | true | "A cotizar" | "A cotizar" | ✅ |
| All 12 zone factors | cada zona | 5 | false | base × factor | correcto por zona | ✅ |

---

## Code Quality Verification

| Check | Result |
|-------|--------|
| HTML semántico (section, map, label) | ✅ PASS — `#precios` section, `map` con áreas, labels vinculados |
| CSS sin errores de sintaxis | ✅ PASS — Selectores válidos, media queries correctas, animaciones keyframes |
| JS sin errores de sintaxis | ✅ PASS — `'use strict'`, IIFE, todas las variables declaradas |
| JS sin dependencias externas | ✅ PASS — Cero dependencias. Cálculo inline con datos hardcodeados |
| No console errors | ✅ PASS — No se detectan errores en runtime (screenshots tomados sin errores) |
| No modifica otros archivos | ✅ PASS — Solo se modificaron archivos del scope T07 |

---

## Visual Screenshots

| Viewport | File | Notes |
|----------|------|-------|
| Mobile (375×812) | `screenshots/precios-mobile.png` | Stacked vertical (1 columna) |
| Tablet (768×1024) | `screenshots/precios-tablet.png` | 3 columnas |
| Desktop (1440×900) | `screenshots/precios-desktop.png` | 3 columnas |

Screenshots capturados con Puppeteer headless. No se detectaron problemas visuales críticos.

---

## Design Constraints Verification

| Constraint | Expected | Actual | Result |
|------------|----------|--------|--------|
| Section bg | `--color-bg-secondary` (#1A1A1A) | `section-dark` aplicado (`layout.css:30`) | ✅ |
| Title font | Bebas Neue | `var(--font-heading)` en `.section__title` | ✅ |
| Card bg | #1A1A1A | `var(--color-bg-secondary)` en `.precios-grid > *` | ✅ |
| Accent color | #D4A017 | `var(--color-accent-primary)` usado en outline, price, toggle, slider | ✅ |
| Toggle slider checked bg | #D4A017 | `var(--color-accent-primary)` en `toggle input:checked + .toggle-slider` | ✅ |
| Price amount font | Bebas Neue | `var(--font-heading)` en `.price-amount` | ✅ |
| Price animation | pulse keyframe | `@keyframes pricePulse` + `.price-amount.pulse` | ✅ |
| Slider thumb | gold (#D4A017) | `var(--color-accent-primary)` en `::-webkit-slider-thumb` y `::-moz-range-thumb` | ✅ |

---

## Summary

**All 15 acceptance criteria PASS.** Zero failures.

The calculator section T07 is fully compliant with:
- ✅ Functional requirements (12 interactive zones, slider, toggle, live pricing, mega detection)
- ✅ Design system (dark theme, gold accents, Bebas Neue headings, Montserrat body)
- ✅ Architecture constraints (no external JS dependencies, IIFE pattern, semantic HTML)
- ✅ Code quality (no syntax errors, proper event handling, clean pricing logic)
- ✅ Visual layout (3-col desktop, stacked mobile, screenshots verified)

**Veredicto: APROBADO**
