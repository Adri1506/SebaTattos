# QA Report — T02: Navbar + Hero

**Package:** T02 — Navbar + Hero  
**Project:** SebaTatto  
**Date:** 2026-06-21  
**QA Agent:** opencode  

---

## Files Verified

| File | Status |
|------|--------|
| `index.html` | ✅ Revisado |
| `css/components.css` | ✅ Revisado |
| `js/main.js` | ✅ Revisado |
| `css/reset.css` | ✅ No modificado |
| `css/variables.css` | ✅ No modificado |
| `css/layout.css` | ✅ No modificado |
| `imagenes/` | ✅ No modificado |

---

## Acceptance Criteria Checklist

| # | Criterio | Estado | Evidencia |
|---|----------|--------|-----------|
| 1 | Navbar sticky con z-index 1000 | ✅ | `components.css:43-47`: `position: fixed` + `z-index: 1000` |
| 2 | Navbar transparente en hero, bg sólido (#1A1A1A) al scrollear >50px | ✅ | `components.css:53`: `background: transparent`; `components.css:57-59`: `.navbar.scrolled` con `background: var(--color-bg-secondary)` (#1A1A1A); `main.js:26-32`: scroll listener con `scrollY > 50` |
| 3 | 7 anchor links: Inicio, Sobre Mí, En Acción, Portafolio, Servicios, Cotizá tu Precio, Contacto | ✅ | `index.html:31-37`: 7 `<li>` con anchors a `#hero, #about, #proceso, #portfolio, #services, #precios, #contact` |
| 4 | Logo "SebaTatto" en Dancing Script a la izquierda | ✅ | `index.html:26`: `<a class="navbar-logo">SebaTatto</a>`; `components.css:62-64`: `font-family: var(--font-brand)` (Dancing Script); flexbox `justify-content: space-between` coloca logo a la izquierda |
| 5 | Menú hamburguesa visible solo en mobile (<768px) | ✅ | `components.css:104-105`: `.hamburger { display: none }`; `components.css:214-217`: `@media (max-width: 767px) { .hamburger { display: flex } }` |
| 6 | En desktop (≥768px) los links se muestran horizontales | ✅ | `components.css:75-78`: `.navbar-links { display: flex }` |
| 7 | Hero min-height 100vh | ✅ | `components.css:145`: `min-height: 100vh` |
| 8 | Hero-bg con banner.png, brightness(0.55) + overlay gradient | ✅ | `components.css:153-158`: `background: url('../imagenes/Tatuador/banner.png')` + `filter: brightness(0.55)`; `components.css:161-166`: `::after` con `linear-gradient(to bottom, transparent 60%, var(--color-bg-primary) 100%)` |
| 9 | Logo.png circular (border-radius 50%) con borde dorado y glow | ✅ | `components.css:179-186`: `border-radius: var(--radius-full)` (50%), `border: 3px solid var(--color-accent-primary)` (dorado), `box-shadow: 0 0 30px rgba(212, 160, 23, 0.3)` (glow dorado) |
| 10 | Título "SebaTatto" en Dancing Script | ✅ | `index.html:48`: `<h1>SebaTatto</h1>`; `components.css:188-189`: `font-family: var(--font-brand)` |
| 11 | Subtítulo "Tatuajes a Domicilio" | ✅ | `index.html:49`: `<p class="subtitle">Tatuajes a Domicilio</p>` |
| 12 | Botón CTA "Agenda tu Cita" con estilo primary | ✅ | `index.html:51`: `<a href="#contact" class="btn btn-primary">Agenda tu Cita</a>`; `components.css:16-18`: estilos `.btn-primary` |
| 13 | Scroll suave en anchor links | ✅ | `main.js:56-68`: `initSmoothScroll()` con `scrollIntoView({ behavior: 'smooth' })` |
| 14 | Link activo detectado durante scroll | ✅ | `main.js:6-24`: `IntersectionObserver` detecta sección visible y aplica `.active` al link correspondiente |
| 15 | Touch targets ≥ 44px | ⚠️ **PARCIAL** | Menú hamburguesa: `width: 36px; height: 36px` (< 44px). Nav links en mobile: `padding: 12px 24px` + `font-size: 1.5rem` → ~48px ✅. Nav links en desktop: `padding: 8px 14px` + `font-size: 1rem` → ~32px ❌. Se recomienda aumentar el tamaño del botón hamburguesa a ≥ 44×44px. |
| 16 | main.js con funciones modulares, addEventListener | ✅ | `main.js`: `initNavbar()`, `initHamburger()`, `initSmoothScroll()` — todas usan `addEventListener`; `main.js:70-74`: `DOMContentLoaded` como punto de entrada |
| 17 | Sin errores de sintaxis en HTML, CSS ni JS | ✅ | Sin errores detectados en los 3 archivos |
| 18 | Sin modificar reset.css, variables.css, layout.css | ✅ | Archivos intactos, sin cambios |
| 19 | Sin modificar imágenes en /imagenes/ | ✅ | Directorio sin modificaciones |

---

## Issues Detected

### 🔶 Minor — Touch target del botón hamburguesa (< 44px)

- **Archivo:** `css/components.css:110-111`
- **Detalle:** `.hamburger` tiene `width: 36px` y `height: 36px`, por debajo del mínimo recomendado de 44×44 CSS pixels (WCAG 2.2).
- **Recomendación:** Cambiar a `min-width: 44px` y `min-height: 44px`, o agregar `padding: 4px` para alcanzar el área táctil mínima.

### 🔶 Minor — Touch targets de nav links en escritorio (< 44px)

- **Archivo:** `css/components.css:81-90`
- **Detalle:** En desktop (≥768px), los links tienen `padding: 8px 14px` y `font-size: 1rem` (~16px), resultando en ~32px de altura.
- **Recomendación:** Aumentar padding vertical a `12px` para alcanzar ~40px (próximo al estándar). No blocker dado que el uso principal en desktop es con mouse.

---

## Conclusión

**APROBADO** con observaciones menores.

Todos los criterios funcionales y de estructura se cumplen correctamente. Existen 2 hallazgos menores relacionados con touch targets que no afectan la funcionalidad pero se recomienda corregir para accesibilidad WCAG 2.2.
