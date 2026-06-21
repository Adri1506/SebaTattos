# QA Report — T08: Sección Contacto + Formulario

**Project:** SebaTatto  
**Task ID:** T08  
**Feature:** FEAT-CONTACT  
**QA Date:** 2026-06-21  
**Status:** ✅ APROBADO (con defectos menores)

---

## Acceptance Criteria Verification

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| 1 | Sección `#contact` con título "Contacto" | ✅ PASS | `index.html:271-272` — `<section id="contact">` con `<h2 class="section__title">Contacto</h2>`. Título usa `--font-heading` (Bebas Neue). |
| 2 | Layout 2 columnas desktop (formulario \| contacto directo) | ✅ PASS | `components.css:1003-1012` — `@media (min-width: 768px) { .contact-grid { flex-direction: row } }`. Form `flex: 1.5`, social `flex: 1`. |
| 3 | Mobile: stacked | ✅ PASS | `components.css:893-896` — `.contact-grid { display: flex; flex-direction: column }` (default). |
| 4 | Campos: nombre (required), email (required), teléfono (opt), mensaje (required) | ✅ PASS | `index.html:277-291` — name: `required minlength="2"`, email: `type="email" required`, phone: sin `required` (opcional), message: `required minlength="10"`. |
| 5 | Validación cliente: nombre ≥2, email formato, mensaje ≥10 | ✅ PASS | `contact.js:42-44` — `nameInput: (v) => v.length >= 2`, `emailInput: (v) => validateEmail(v)` (regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), `messageInput: (v) => v.length >= 10`. |
| 6 | Estados input: default, focus (gold glow), error (red), success (green) | ✅ PASS | `components.css:919-946` — Default: `border: 1px solid var(--color-border)`. Focus: `border-color: var(--color-accent-primary)` + `box-shadow: 0 0 0 3px rgba(212,160,23,0.2)`. Error: `border-color: var(--color-error)`. Success: `border-color: var(--color-success)`. |
| 7 | Mensajes de error inline | ✅ PASS | `index.html:278,283,292` — `<span class="form-error">` debajo de cada input. `components.css:953-957` — `.form-error { color: var(--color-error) }`. `contact.js` asigna texto de error dinámicamente. |
| 8 | Botón submit con estados (default, loading, success, error) | ⚠️ PASS (with defect) | Default: "Enviar Mensaje". Loading: `disabled=true` + texto "Enviando..." + `<span class="spinner">`. Success: feedback verde "✅ Mensaje enviado con éxito...". Error: feedback rojo "❌ Hubo un error...". **Defecto:** `.spinner` CSS class y `@keyframes spin` no están definidos en `components.css` (solo existen en `wireframe.html`). El spinner no es visible. |
| 9 | Integración Formspree (POST action) | ✅ PASS | `index.html:274` — `<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">`. `contact.js:69-73` — fetch POST con `FormData` y headers `Accept: application/json`. La URL usa placeholder `YOUR_FORM_ID` que debe reemplazarse con un ID real de Formspree antes de deploy. |
| 10 | Botón WhatsApp `wa.me/56971930350` | ✅ PASS | `index.html:304` — `<a href="https://wa.me/56971930350?text=Hola%20SebaTatto!%20Quiero%20consultar%20por%20un%20tatuaje" target="_blank" rel="noopener noreferrer">`. |
| 11 | Email `mailto:adriaticosama@gmail.com` | ✅ PASS | `index.html:309` — `<a href="mailto:adriaticosama@gmail.com">adriaticosama@gmail.com</a>`. |
| 12 | Sin errores sintaxis | ✅ PASS | JS (`contact.js`, `main.js`, `gallery.js`, `calculator.js`): validados con `new Function()` — sin errores. CSS (`reset.css`, `variables.css`, `layout.css`, `components.css`): braces balanceados. HTML: div(49/49), section(7/7), form(1/1) correctamente anidados. |

---

## Defectos Encontrados

| ID | Severidad | Descripción | Archivo | Línea |
|----|-----------|-------------|---------|-------|
| D01 | **Minor** | `.spinner` CSS class no está definida en `components.css`. El loading state del botón submit referencia `<span class="spinner">` pero la clase no existe en los CSS del proyecto (solo en `wireframe.html`). El spinner no será visible durante el envío. También falta `@keyframes spin`. | `css/components.css` | — |
| D02 | **Info** | Formspree action usa `YOUR_FORM_ID` como placeholder. Debe reemplazarse con un form ID real de Formspree antes del deploy (`https://formspree.io/f/XXXXXXXX`). | `index.html` | 274 |

---

## Code Quality Verification

| Check | Result |
|-------|--------|
| HTML semántico (`section`, `form`, `label`, `aria-label`) | ✅ PASS — Contact section con `aria-label="Contacto"`, form con `aria-label="Formulario de contacto"`, labels vinculados con `for` |
| CSS sin errores de sintaxis | ✅ PASS — Todos los archivos CSS con braces balanceados |
| JS sin errores de sintaxis | ✅ PASS — `'use strict'`, IIFE, todas las variables declaradas |
| Validación en blur + submit | ✅ PASS — `blur` events (lines 96-98) y `submit` handler (line 49) |
| Limpieza de estados en focus | ✅ PASS — `focus` event remueve clase `.error` (lines 101-105) |
| Fallback visible si Formspree falla | ✅ PASS — `catch` block (line 85-88) muestra email directo como alternativa |
| Touch targets ≥ 44px | ✅ PASS — Botones y inputs con `padding: 12px 16px`, height suficiente |
| No console errors | ✅ PASS — Sin errores de sintaxis. Sin console.log() statements. |

---

## Design Constraints Verification

| Constraint | Expected | Actual | Result |
|------------|----------|--------|--------|
| Input bg | `#1A1A1A` | `var(--color-bg-secondary)` = #1A1A1A | ✅ |
| Input border | `1px solid #333` | `1px solid var(--color-border)` = #333 | ✅ |
| Input color | `#F5F5F5` | `var(--color-text-primary)` = #F5F5F5 | ✅ |
| Input border-radius | `4px` | `var(--radius-sm)` = 4px | ✅ |
| Focus border-color | `#D4A017` | `var(--color-accent-primary)` = #D4A017 | ✅ |
| Focus glow | gold box-shadow | `0 0 0 3px rgba(212,160,23,0.2)` | ✅ |
| Error border-color | `#E74C3C` | `var(--color-error)` = #E74C3C | ✅ |
| Success border-color | `#2ECC71` | `var(--color-success)` = #2ECC71 | ✅ |
| Labels font | Montserrat | `var(--font-body)` = Montserrat | ✅ |
| Labels color | `#AAAAAA` | `var(--color-text-secondary)` = #AAAAAA | ✅ |
| Submit btn | CTA primary style | `class="btn btn-primary"` con bg #D4A017 | ✅ |
| WhatsApp btn bg | `#25D366` | `.btn-whatsapp { background: #25D366 }` | ✅ |
| Touch targets ≥ 44px | mín. 44px | Inputs: 12px padding ×2 + font ≈ 44px+. Botones: 12px padding ×2 + font | ✅ |

---

## Summary

**12/12 acceptance criteria PASS.** 1 defecto menor (D01) y 1 informativo (D02).

La sección de contacto está funcionalmente completa:
- ✅ Formulario con 4 campos y validación en cliente
- ✅ Estados visuales (default, focus, error, success)
- ✅ Layout responsive (2 columnas desktop, stacked mobile)
- ✅ Integración Formspree (placeholder reemplazable)
- ✅ Botón WhatsApp y email directo
- ✅ Código sin errores de sintaxis

**Defecto D01** (spinner CSS faltante) no bloquea la funcionalidad pero debe corregirse para completar el loading state del botón submit.

**Veredicto: APROBADO** (con defectos menores registrados)
